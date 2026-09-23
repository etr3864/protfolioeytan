"use client";

import { Document, Font, Link, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { cv, type Locale } from "../../data/cv";

let fontsReady = false;

export function registerFonts(fontDir?: string) {
  if (fontsReady) return;
  const dir = fontDir || (typeof window !== "undefined" ? `${window.location.origin}/fonts` : "");
  if (!dir) return;
  Font.register({
    family: "Rubik",
    fonts: [
      { src: `${dir}/Rubik-Regular.ttf`, fontWeight: 400 },
      { src: `${dir}/Rubik-Medium.ttf`, fontWeight: 500 },
      { src: `${dir}/Rubik-Bold.ttf`, fontWeight: 700 },
      { src: `${dir}/Rubik-ExtraBold.ttf`, fontWeight: 800 },
    ],
  });
  Font.registerHyphenationCallback((word) => [word]);
  fontsReady = true;
}

const ink = "#1f211a";
const muted = "#5e5c52";
const accent = "#c56a32";
const paper = "#f4f0e8";
const line = "#ddd6c8";
const body = "#2c2e26";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Rubik",
    backgroundColor: paper,
    color: ink,
    paddingTop: 28,
    paddingBottom: 26,
    paddingHorizontal: 32,
  },
  rule: { height: 3, backgroundColor: accent, marginBottom: 12 },
  name: { fontSize: 22, fontWeight: 800, letterSpacing: -0.4, lineHeight: 1.05 },
  role: { marginTop: 3, fontSize: 9.5, fontWeight: 500, color: muted },
  contacts: { marginTop: 5, fontSize: 8.5, color: ink },
  summary: { marginTop: 8, fontSize: 9.5, lineHeight: 1.4, color: body },
  stats: { marginTop: 9, paddingVertical: 6, borderTopWidth: 1, borderBottomWidth: 1, borderColor: line },
  statV: { fontSize: 11, fontWeight: 700, color: accent },
  statK: { marginTop: 1, fontSize: 7, color: muted },
  section: { marginTop: 11, marginBottom: 4, flexDirection: "row", alignItems: "center" },
  sectionLabel: { fontSize: 8, fontWeight: 700, letterSpacing: 1.1, color: accent },
  hairline: { flex: 1, height: 1, backgroundColor: line, marginHorizontal: 8 },
  block: { marginTop: 6 },
  top: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" },
  title: { fontSize: 10, fontWeight: 700 },
  meta: { marginTop: 1, fontSize: 8, color: accent },
  time: { fontSize: 8, color: muted },
  pointRow: { flexDirection: "row", marginTop: 1.5 },
  dot: { width: 8, fontSize: 8.4, lineHeight: 1.45, color: accent },
  point: { flex: 1, fontSize: 8.4, lineHeight: 1.45, color: body },
  line: { marginTop: 1, fontSize: 8.4, lineHeight: 1.45, color: body },
  skill: { marginTop: 2, fontSize: 8.2, lineHeight: 1.45, color: body },
  skillName: { fontWeight: 700 },
});

const sheet: Record<Locale, { summary: string[]; jobs: string[][]; projects: string[] }> = {
  he: {
    summary: [
      "אני בונה מערכות AI, תהליכי תפעול וצוותים שמבצעים.",
      "היום אני מוביל את התפעול בקליינטו, אחרי שהקמתי כמייסד ו-CTO פלטפורמת סוכנים לעשרות לקוחות בפרודקשן.",
    ],
    jobs: [
      [
        "הקמתי את חטיבת התפעול מאפס: Implementation, Customer Success, קו אוטומציות ומודל מרווח ללקוח.",
        "כתבתי 17 פרקי תפעול ו-24 נהלים, ומדדים של SLA, Churn, Time-to-Live ו-Health Score.",
        "אני מנהל צוות מהנדסים בפייפליין של 10 שלבים, ואפיינתי אייג'נטים, BI ומרכזיות שחסכו אלפי שקלים.",
      ],
      [
        "תכננתי ובניתי שתי פלטפורמות AI בפרודקשן, קול ו-WhatsApp, לעשרות לקוחות ולעשרות אלפי שיחות.",
        "ניהלתי 8 מפתחים ותקציב של מאות אלפי שקלים. GKE, Gemini Live, Telnyx, FastAPI ו-pgvector. שתיהן עברו Google OAuth.",
      ],
      [
        "ייעצתי למאות עסקים על פלטפורמה, משפך, תקציב וקמפיין, וסגרתי חבילות של 15K עד 80K ש״ח.",
        "אבחנתי ערוצי רכישה חלשים, בניתי משפכים מחדש, ושיפרתי ROAS בפרסום ממומן.",
      ],
      [
        "הקמתי וניהלתי קמפיינים בגוגל ובמטא בתקציבים חודשיים של מאות אלפי שקלים.",
        "הטמעתי מדידה מלאה, Pixel, GTM ו-GA4, והובלתי קריאייטיב ובדיקות לדפי נחיתה.",
      ],
      ["פיקדתי על כוחות הנדסה קרבית בלחימה במלחמת חרבות ברזל, עם החלטות בזמן אמת ותחת לחץ."],
    ],
    projects: [
      "פלטפורמת SaaS שהקמתי לסוכני עברית בקול ובכתב. התמחור לפי לידים, לא לפי דקות. דקת שיחה עלתה 8-11 אגורות.",
      "מחולל מכתבי התראה שבניתי עם עורך דין. מכתב מוכן בכשלוש דקות, ורק מסעיפים שאומתו.",
      "פודקאסט בעברית על AI שאני מגיש עם דורון סויסה, CTO קליינטו. פרק חדש כל שבועיים.",
    ],
  },
  en: {
    summary: [
      "I build AI systems, operating processes, and teams that execute.",
      "I lead Operations at Kliento, after founding a voice and text agent platform that serves dozens of clients in production.",
    ],
    jobs: [
      [
        "I built the Operations division from scratch: Implementation, Customer Success, the automations line, and a margin model per client.",
        "I wrote a 17-chapter framework and 24 SOPs, with KPIs for SLA, churn, Time-to-Live, and Health Score.",
        "I run an engineering team on a 10-stage pipeline, and rolled out agents, BI, and switchboards that save thousands of shekels.",
      ],
      [
        "I designed and shipped two production AI platforms, voice and WhatsApp, for dozens of paying clients and tens of thousands of conversations.",
        "I led 8 developers and a six-figure budget. GKE, Gemini Live, Telnyx, FastAPI, and pgvector. Both passed Google OAuth.",
      ],
      [
        "I advised hundreds of businesses on platform, funnel, budget, and campaigns, and closed packages from 15K to 80K NIS.",
        "I found weak acquisition channels, rebuilt funnels, and improved ROAS across paid media.",
      ],
      [
        "I built and ran Google and Meta campaigns on six-figure monthly budgets for e-commerce and lead-gen clients.",
        "I set up full tracking, Pixel, GTM, and GA4, and led creative and landing-page tests.",
      ],
      ["I commanded combat engineering forces in the Iron Swords war, making real-time decisions under pressure."],
    ],
    projects: [
      "A SaaS platform I built for Hebrew voice and text agents. Priced by leads, not minutes. A voice minute cost 8-11 agorot.",
      "A demand-letter generator I built with an attorney. A letter in about three minutes, and only from verified clauses.",
      "A Hebrew AI podcast I co-host with Doron Swissa, CTO of Kliento. A new episode every two weeks.",
    ],
  },
};

export function CvDocument({ lang }: { lang: Locale }) {
  registerFonts();
  const t = cv[lang];
  const copy = sheet[lang];
  const rtl = lang === "he";
  const writing = rtl
    ? { direction: "rtl" as const, textAlign: "right" as const }
    : { textAlign: "left" as const };
  const page = { ...styles.page, textAlign: writing.textAlign };
  const row = rtl ? { flexDirection: "row-reverse" as const } : {};
  const stats = [...t.facts, t.commandStat];
  const phone = t.contact[1];
  const email = t.contact[0];
  const linkedin = t.contact[2];

  return (
    <Document title={t.full} author={t.full} language={lang}>
      <Page size="A4" style={page}>
        <View style={styles.rule} />
        <Text style={{ ...styles.name, ...writing }}>{t.full}</Text>
        <Text style={{ ...styles.role, ...writing }}>
          {t.role}  ·  {t.available}
        </Text>
        <View style={{ marginTop: 5, flexDirection: "row", alignItems: "center", ...row }}>
          <Text style={{ ...styles.contacts, marginTop: 0, ...writing }}>{t.location}</Text>
          <Text style={{ ...styles.contacts, marginTop: 0, ...writing }}>  ·  </Text>
          <Link src={phone.href} style={{ color: ink, textDecoration: "none" }}>
            <Text style={{ ...styles.contacts, marginTop: 0, ...writing }}>{phone.v}</Text>
          </Link>
          <Text style={{ ...styles.contacts, marginTop: 0, ...writing }}>  ·  </Text>
          <Link src={email.href} style={{ color: ink, textDecoration: "none" }}>
            <Text style={{ ...styles.contacts, marginTop: 0, ...writing }}>{email.v}</Text>
          </Link>
          <Text style={{ ...styles.contacts, marginTop: 0, ...writing }}>  ·  </Text>
          <Link src={linkedin.href} style={{ color: ink, textDecoration: "none" }}>
            <Text style={{ ...styles.contacts, marginTop: 0, ...writing }}>{linkedin.v}</Text>
          </Link>
        </View>
        {copy.summary.map((line, index) => (
          <Text key={line} style={{ ...styles.summary, marginTop: index === 0 ? 8 : 1, ...writing }}>
            {line}
          </Text>
        ))}
        <View style={styles.stats}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", ...row }}>
            {stats.map((fact) => (
              <View key={fact.k}>
                <Text style={{ ...styles.statV, ...writing }}>{fact.v}</Text>
                <Text style={{ ...styles.statK, ...writing }}>{fact.k}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={{ ...styles.section, ...row }}>
          <Text style={{ ...styles.sectionLabel, ...writing }}>{t.expLabel}</Text>
          <View style={styles.hairline} />
        </View>
        {t.experience.map((job, index) => (
          <View key={job.org} style={styles.block} wrap={false}>
            <View style={{ ...styles.top, ...row }}>
              <Text style={{ ...styles.title, ...writing }}>{job.role}</Text>
              <Text style={{ ...styles.time, ...writing }}>{job.time}</Text>
            </View>
            <Text style={{ ...styles.meta, ...writing }}>
              {job.org} · {job.place}
            </Text>
            {copy.jobs[index].map((point) => (
              <View key={point} style={{ ...styles.pointRow, ...row }}>
                <Text style={styles.dot}>·</Text>
                <Text style={{ ...styles.point, ...writing }}>{point}</Text>
              </View>
            ))}
          </View>
        ))}

        <View style={{ ...styles.section, ...row }}>
          <Text style={{ ...styles.sectionLabel, ...writing }}>{t.projLabel}</Text>
          <View style={styles.hairline} />
        </View>
        {t.projects.map((project, index) => (
          <View key={project.name} style={styles.block} wrap={false}>
            <View style={{ ...styles.top, ...row }}>
              <Text style={{ ...styles.title, ...writing }}>{project.name}</Text>
              <Text style={{ ...styles.time, ...writing }}>{project.year}</Text>
            </View>
            <Text style={{ ...styles.line, ...writing }}>{copy.projects[index]}</Text>
          </View>
        ))}

        <View style={{ ...styles.section, ...row }}>
          <Text style={{ ...styles.sectionLabel, ...writing }}>{t.eduLabel}</Text>
          <View style={styles.hairline} />
        </View>
        {t.education.map((item) => (
          <View key={item.name} style={styles.block} wrap={false}>
            <View style={{ ...styles.top, ...row }}>
              <Text style={{ ...styles.title, ...writing }}>{item.name}</Text>
              <Text style={{ ...styles.time, ...writing }}>{item.time}</Text>
            </View>
            <Text style={{ ...styles.meta, ...writing }}>
              {item.org}
              {item.grade ? ` · ${item.grade}` : ""}
            </Text>
            <Text style={{ ...styles.line, ...writing }}>{item.note}</Text>
          </View>
        ))}

        <View style={{ ...styles.section, ...row }}>
          <Text style={{ ...styles.sectionLabel, ...writing }}>{t.skillsLabel}</Text>
          <View style={styles.hairline} />
        </View>
        {t.skills.map((group) => (
          <Text key={group.group} style={{ ...styles.skill, ...writing }}>
            <Text style={{ ...styles.skillName, ...writing }}>{group.group}</Text>
            {"  ·  "}
            {group.items.join("  ·  ")}
          </Text>
        ))}
      </Page>
    </Document>
  );
}
