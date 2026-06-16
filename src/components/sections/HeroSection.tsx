"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const terminalLines = [
  { cmd: "git push origin main --force-with-lease" },
  { cmd: "docker build -t voice-ai:prod .", output: "Successfully built 3a7f2d1" },
  { cmd: "python train.py --model=gpt-finetune --epochs=120 --lr=3e-5" },
  { cmd: "kubectl apply -f k8s/deployment.yaml", output: "deployment.apps/ai-agent configured" },
  { cmd: "pytest tests/ --cov=src --cov-report=term -q", output: "94 passed, 0 failed — 97% coverage" },
  { cmd: "terraform plan -var-file=prod.tfvars", output: "Plan: 3 to add, 1 to change" },
  { cmd: "celery -A tasks worker --loglevel=info --concurrency=8" },
  { cmd: "prisma migrate deploy --schema=./prisma/schema.prisma" },
  { cmd: "gcloud ai models upload --region=me-west1 --display-name=rag-v2" },
  { cmd: "npm run build && vercel --prod", output: "✓ Production deployed" },
  { cmd: "redis-cli ping", output: "PONG" },
  { cmd: "uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4" },
  { cmd: "gh pr merge 247 --squash", output: "✓ Merged pull request #247" },
  { cmd: "python -m embeddings.generate --dim=1536 --batch=512" },
];

const marketingMetrics = [
  { label: "ROAS", value: "4.7x", delta: "+23%" },
  { label: "CTR", value: "3.8%", delta: "+0.9%" },
  { label: "CPA", value: "₪42", delta: "-18%" },
  { label: "CVR", value: "6.2%", delta: "+1.4%" },
  { label: "LTV", value: "₪2,840", delta: "+31%" },
  { label: "MQL", value: "1,247", delta: "+156" },
];

const funnelData = [
  { stage: "Impressions", width: "100%", value: "248K" },
  { stage: "Clicks", width: "62%", value: "154K" },
  { stage: "Leads", width: "28%", value: "12.4K" },
  { stage: "Sales", width: "12%", value: "1,247" },
];

function TypingTerminal() {
  const [lines, setLines] = useState<{ text: string; isOutput: boolean }[]>(() => {
    const initial: { text: string; isOutput: boolean }[] = [];
    for (let i = 0; i < 3; i++) {
      initial.push({ text: `❯ ${terminalLines[i].cmd}`, isOutput: false });
      if (terminalLines[i].output) initial.push({ text: `  ${terminalLines[i].output}`, isOutput: true });
    }
    return initial;
  });
  const [currentCmd, setCurrentCmd] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let idx = 3;
    let charIdx = 0;
    let typing = true;
    let timeout: NodeJS.Timeout;

    const tick = () => {
      const line = terminalLines[idx % terminalLines.length];

      if (typing) {
        if (charIdx <= line.cmd.length) {
          setCurrentCmd(line.cmd.slice(0, charIdx));
          charIdx++;
          timeout = setTimeout(tick, 18 + Math.random() * 18);
        } else {
          typing = false;
          timeout = setTimeout(tick, 150);
        }
      } else {
        setLines((prev) => {
          const next = [...prev, { text: `❯ ${line.cmd}`, isOutput: false }];
          if (line.output) next.push({ text: `  ${line.output}`, isOutput: true });
          if (next.length > 12) return next.slice(-12);
          return next;
        });
        setCurrentCmd("");
        charIdx = 0;
        typing = true;
        idx++;
        timeout = setTimeout(tick, 400 + Math.random() * 200);
      }
    };

    timeout = setTimeout(tick, 300);

    const cursorBlink = setInterval(() => setShowCursor((v) => !v), 530);

    return () => {
      clearTimeout(timeout);
      clearInterval(cursorBlink);
    };
  }, []);

  return (
    <div className="relative h-full overflow-hidden font-mono text-[9px] leading-[1.6] xl:text-[10px]">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-4 bg-gradient-to-b from-[#0c0c14] to-transparent" />
      <div className="flex h-full flex-col overflow-hidden">
        <div className="flex-1 overflow-hidden flex flex-col justify-end space-y-0.5">
          {lines.map((line, i) => (
            <div key={i} className={`shrink-0 ${line.isOutput ? "ps-3 text-amber-400/40" : "text-white/50"}`}>
              {!line.isOutput && <span className="text-green-400/70">{"❯"} </span>}
              {line.isOutput ? line.text.slice(2) : line.text.slice(2)}
            </div>
          ))}
        </div>
        <div className="shrink-0 flex gap-1 text-white/50 pt-0.5">
          <span className="text-green-400/70">❯</span>
          <span className="truncate">{currentCmd}</span>
          <span className={`${showCursor ? "opacity-100" : "opacity-0"} text-amber-400`}>▋</span>
        </div>
      </div>
    </div>
  );
}

export function HeroSection() {
  const { content, locale } = useLanguage();

  return (
    <section id="hero" className="relative scroll-mt-20 overflow-hidden px-4 pb-16 pt-28 sm:px-6 sm:pb-24 sm:pt-36 lg:pt-32">
      {/* Animated gradient orbs behind hero */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="pointer-events-none absolute -top-32 start-1/4 h-[500px] w-[500px] rounded-full bg-amber-500/[0.04] blur-[120px]"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, delay: 0.3, ease: "easeOut" }}
        className="pointer-events-none absolute -bottom-20 end-1/4 h-[400px] w-[400px] rounded-full bg-white/[0.02] blur-[100px]"
      />

      {/* Main 3-column layout: Terminal | Center Content | Marketing */}
      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-center lg:grid-cols-[1fr_minmax(0,2.4fr)_1fr] lg:gap-6 xl:gap-10">

          {/* Terminal Panel (start) - desktop only in grid */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
            className="pointer-events-none hidden self-center lg:block"
          >
            <div className="rounded-xl border border-white/[0.06] bg-[#0c0c14]/80 p-3 shadow-2xl backdrop-blur-sm">
              <div className="mb-2 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-red-500/60" />
                <span className="h-2 w-2 rounded-full bg-yellow-500/60" />
                <span className="h-2 w-2 rounded-full bg-green-500/60" />
                <span className="ms-2 text-[9px] text-white/25 font-mono">zsh — 120×40</span>
              </div>
              <div className="h-[220px]">
                <TypingTerminal />
              </div>
            </div>
          </motion.div>

          {/* Center: Name + Title + Image */}
          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Profile image */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative mb-8 w-56 sm:w-64 lg:w-72"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                <Image
                  src="/images/profile.jpg"
                  alt={content.meta.name}
                  fill
                  priority
                  className="object-cover object-[center_15%] scale-110"
                  sizes="(max-width: 768px) 224px, 288px"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/40 via-transparent via-40% to-[#0a0a0f]" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-transparent via-transparent via-70% to-[#0a0a0f]/50" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0a0a0f]/60 via-transparent to-[#0a0a0f]/60" />
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.6 }}
                className="pointer-events-none absolute -inset-2 -z-10 rounded-3xl bg-gradient-to-br from-amber-500/10 via-transparent to-white/5 blur-xl"
              />
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl"
            >
              <span className="animate-gradient-text bg-gradient-to-r from-white via-amber-200 to-white bg-[length:200%_auto] bg-clip-text text-transparent">
                {content.meta.name}
              </span>
            </motion.h1>

            {/* Title */}
            <motion.p
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 max-w-md text-sm font-medium text-white/55 sm:text-lg"
            >
              {content.meta.title}
            </motion.p>

            {/* Divider line */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 h-px w-32 bg-gradient-to-r from-transparent via-amber-500/40 to-transparent"
            />
          </div>

          {/* Marketing Panel (end) - desktop only in grid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1, ease: "easeOut" }}
            className="pointer-events-none hidden self-center lg:block"
          >
            <div className="rounded-xl border border-white/[0.06] bg-[#0c0c14]/80 p-3 shadow-2xl backdrop-blur-sm">
              <div className="mb-2.5 flex items-center justify-between">
                <span className="text-[9px] font-medium tracking-wider text-white/30">CAMPAIGN ANALYTICS</span>
                <span className="flex items-center gap-1 rounded bg-green-500/10 px-1.5 py-0.5 text-[8px] text-green-400/70">
                  <motion.span
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="inline-block h-1.5 w-1.5 rounded-full bg-green-400"
                  />
                  LIVE
                </span>
              </div>

              {/* KPI Grid */}
              <div className="mb-3 grid grid-cols-3 gap-1.5">
                {marketingMetrics.map((m, i) => (
                  <motion.div
                    key={m.label}
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                    className="rounded-md border border-white/[0.04] bg-white/[0.02] px-1.5 py-1.5 text-center"
                  >
                    <div className="text-[8px] text-white/25">{m.label}</div>
                    <div className="text-[11px] font-semibold text-white/70">{m.value}</div>
                    <div className="text-[8px] text-green-400/60">{m.delta}</div>
                  </motion.div>
                ))}
              </div>

              {/* Funnel */}
              <div className="space-y-1">
                <span className="text-[8px] text-white/20">FUNNEL</span>
                {funnelData.map((f, i) => (
                  <div key={f.stage}>
                    <div className="flex items-center justify-between text-[8px]">
                      <span className="text-white/30">{f.stage}</span>
                      <span className="text-white/50">{f.value}</span>
                    </div>
                    <div className="mt-0.5 h-1 rounded-full bg-white/[0.04]">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-amber-500/40 to-amber-400/20"
                        animate={{ width: [f.width, `calc(${f.width} - 2%)`, f.width] }}
                        transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Mini chart */}
              <div className="mt-3 flex items-end gap-[3px] h-8">
                {Array.from({ length: 12 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 rounded-sm bg-amber-500/20"
                    animate={{ height: [`${20 + (i * 7) % 50}%`, `${35 + (i * 11) % 55}%`, `${20 + (i * 7) % 50}%`] }}
                    transition={{ duration: 3 + (i % 3), repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

        </div>

        {/* Mobile panels - shown below center content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
          className="mt-10 grid grid-cols-2 gap-3 lg:hidden"
        >
          {/* Mobile Terminal */}
          <div className="pointer-events-none rounded-xl border border-white/[0.06] bg-[#0c0c14]/80 p-2.5 shadow-xl backdrop-blur-sm">
            <div className="mb-1.5 flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500/60" />
              <span className="h-1.5 w-1.5 rounded-full bg-yellow-500/60" />
              <span className="h-1.5 w-1.5 rounded-full bg-green-500/60" />
              <span className="ms-1.5 text-[7px] text-white/20 font-mono">terminal</span>
            </div>
            <div className="h-[100px] overflow-hidden">
              <TypingTerminal />
            </div>
          </div>

          {/* Mobile Marketing */}
          <div className="pointer-events-none rounded-xl border border-white/[0.06] bg-[#0c0c14]/80 p-2.5 shadow-xl backdrop-blur-sm">
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-[7px] font-medium tracking-wider text-white/30">ANALYTICS</span>
              <span className="flex items-center gap-0.5 text-[7px] text-green-400/70">
                <motion.span
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="inline-block h-1 w-1 rounded-full bg-green-400"
                />
                LIVE
              </span>
            </div>
            <div className="grid grid-cols-2 gap-1 mb-2">
              {marketingMetrics.slice(0, 4).map((m, i) => (
                <motion.div
                  key={m.label}
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                  className="rounded border border-white/[0.04] bg-white/[0.02] px-1 py-1 text-center"
                >
                  <div className="text-[7px] text-white/25">{m.label}</div>
                  <div className="text-[9px] font-semibold text-white/70">{m.value}</div>
                  <div className="text-[7px] text-green-400/60">{m.delta}</div>
                </motion.div>
              ))}
            </div>
            <div className="flex items-end gap-[2px] h-5">
              {Array.from({ length: 10 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="flex-1 rounded-sm bg-amber-500/20"
                  animate={{ height: [`${20 + (i * 7) % 50}%`, `${35 + (i * 11) % 55}%`, `${20 + (i * 7) % 50}%`] }}
                  transition={{ duration: 3 + (i % 3), repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
