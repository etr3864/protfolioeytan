import { neon } from "@neondatabase/serverless";

export type StoredTurn = { role: "user" | "model"; text: string };

export type ConversationRow = {
  id: string;
  name: string;
  phone: string;
  role: string;
  lang: string;
  started_at: string;
  last_at: string;
  turns: number;
  preview: string;
};

export type ConversationDetail = {
  id: string;
  name: string;
  phone: string;
  role: string;
  lang: string;
  started_at: string;
  last_at: string;
  messages: { role: "user" | "model"; text: string; at: string }[];
};

function url() {
  return process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.NEON_DATABASE_URL || "";
}

export function storeReady() {
  return Boolean(url());
}

function client() {
  const connection = url();
  if (!connection) throw new Error("no database url");
  return neon(connection);
}

let prepared: Promise<void> | null = null;

function ensureSchema() {
  prepared ??= (async () => {
    const sql = client();
    await sql`
      create table if not exists hed_conversations (
        id uuid primary key default gen_random_uuid(),
        name text not null,
        phone text not null,
        role text not null,
        lang text not null,
        started_at timestamptz not null default now(),
        last_at timestamptz not null default now()
      )
    `;
    await sql`
      create table if not exists hed_messages (
        id bigserial primary key,
        conversation_id uuid not null references hed_conversations(id) on delete cascade,
        role text not null,
        text text not null,
        at timestamptz not null default now()
      )
    `;
    await sql`create index if not exists hed_messages_conversation on hed_messages (conversation_id, id)`;
    await sql`create index if not exists hed_conversations_last on hed_conversations (last_at desc)`;
  })().catch((error) => {
    prepared = null;
    throw error;
  });
  return prepared;
}

export async function startConversation(person: { name: string; phone: string; role: string; lang: string }) {
  await ensureSchema();
  const sql = client();
  const rows = (await sql`
    insert into hed_conversations (name, phone, role, lang)
    values (${person.name}, ${person.phone}, ${person.role}, ${person.lang})
    returning id
  `) as { id: string }[];
  return rows[0].id;
}

export async function addTurns(conversationId: string, turns: StoredTurn[]) {
  if (!turns.length) return;
  await ensureSchema();
  const sql = client();
  for (const turn of turns) {
    await sql`
      insert into hed_messages (conversation_id, role, text)
      values (${conversationId}, ${turn.role}, ${turn.text})
    `;
  }
  await sql`update hed_conversations set last_at = now() where id = ${conversationId}`;
}

export async function listConversations(filter: { query?: string; from?: string; to?: string }) {
  await ensureSchema();
  const sql = client();
  const query = filter.query?.trim() ? `%${filter.query.trim()}%` : null;
  return (await sql`
    select c.id,
           c.name,
           c.phone,
           c.role,
           c.lang,
           c.started_at,
           c.last_at,
           count(m.id)::int as turns,
           coalesce(min(m.text) filter (where m.role = 'user'), '') as preview
      from hed_conversations c
      left join hed_messages m on m.conversation_id = c.id
     where (${filter.from}::timestamptz is null or c.started_at >= ${filter.from}::timestamptz)
       and (${filter.to}::timestamptz is null or c.started_at < ${filter.to}::timestamptz)
       and (${query}::text is null
            or c.name ilike ${query}
            or c.phone ilike ${query}
            or c.role ilike ${query}
            or exists (select 1 from hed_messages s where s.conversation_id = c.id and s.text ilike ${query}))
     group by c.id
     order by c.last_at desc
     limit 300
  `) as ConversationRow[];
}

export async function getConversation(id: string): Promise<ConversationDetail | null> {
  await ensureSchema();
  const sql = client();
  const rows = (await sql`
    select id, name, phone, role, lang, started_at, last_at
      from hed_conversations
     where id = ${id}::uuid
  `) as Omit<ConversationDetail, "messages">[];
  if (!rows.length) return null;
  const messages = (await sql`
    select role, text, at
      from hed_messages
     where conversation_id = ${id}::uuid
     order by id
  `) as ConversationDetail["messages"];
  return { ...rows[0], messages };
}

export async function deleteConversation(id: string) {
  await ensureSchema();
  const sql = client();
  await sql`delete from hed_conversations where id = ${id}::uuid`;
}

export async function exportConversations(range: { from?: string; to?: string }) {
  await ensureSchema();
  const sql = client();
  const rows = (await sql`
    select c.id,
           c.name,
           c.phone,
           c.role,
           c.lang,
           c.started_at,
           c.last_at,
           coalesce(
             json_agg(json_build_object('role', m.role, 'text', m.text, 'at', m.at) order by m.id)
               filter (where m.id is not null),
             '[]'
           ) as messages
      from hed_conversations c
      left join hed_messages m on m.conversation_id = c.id
     where (${range.from}::timestamptz is null or c.started_at >= ${range.from}::timestamptz)
       and (${range.to}::timestamptz is null or c.started_at < ${range.to}::timestamptz)
     group by c.id
     order by c.started_at
  `) as unknown[];
  return rows;
}
