"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

function CertBadge({ delay, position }: { delay: number; position: "start" | "end" }) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0, rotate: -15 }}
      whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`absolute top-6 z-20 flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-500/25 bg-[#0c0c12]/95 shadow-xl shadow-amber-500/10 backdrop-blur-md ${position === "start" ? "start-6" : "end-6"}`}
    >
      <svg className="h-7 w-7 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 7a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V7z" />
        <path d="M9 12l2 2 4-4" />
        <path d="M8 5V3M16 5V3" />
      </svg>
    </motion.div>
  );
}

export function EducationSection() {
  const { content, locale } = useLanguage();

  return (
    <section id="education" className="scroll-mt-20 px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title={content.education.title} />

        <div className="space-y-10">
          {content.education.items.map((item, index) => {
            const imageOnStart = index % 2 !== 0;

            return (
              <Reveal key={item.id} delay={index * 0.12}>
                <motion.div
                  whileHover={{ borderColor: "rgba(217,169,56,0.15)" }}
                  transition={{ duration: 0.4 }}
                  className="group relative overflow-visible rounded-[2rem] border border-white/[0.06] bg-gradient-to-br from-white/[0.04] via-white/[0.015] to-transparent shadow-2xl shadow-black/40"
                >

                  {/* Ambient glow */}
                  <div className="pointer-events-none absolute -end-32 -top-32 h-64 w-64 rounded-full bg-amber-500/[0.03] blur-[80px] transition-all duration-700 group-hover:bg-amber-500/[0.06]" />
                  <div className="pointer-events-none absolute -bottom-20 -start-20 h-48 w-48 rounded-full bg-white/[0.02] blur-[60px]" />

                  <div className="grid gap-0 md:grid-cols-[1.1fr_1.5fr] overflow-hidden rounded-[2rem]">
                    {/* Certificate image */}
                    {(item.certImage.endsWith(".jpg") || item.certImage.endsWith(".png")) && (
                      <div className={`relative overflow-hidden border-b border-white/[0.06] md:border-b-0 ${imageOnStart ? "md:order-1 md:border-e" : "md:order-2 md:border-s"}`}>
                        <div className="relative aspect-[4/3] md:aspect-auto md:h-full">
                          <div className="absolute inset-0 bg-gradient-to-br from-[#0d0d14] to-[#0d0d14]" />
                          <div className="absolute inset-4 rounded-2xl border border-white/[0.04]" />
                          <Image
                            src={item.certImage}
                            alt={item.degree}
                            fill
                            className="object-contain p-8 sm:p-10 transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                            sizes="(max-width: 768px) 100vw, 44vw"
                          />
                          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.4)_100%)]" />
                        </div>
                      </div>
                    )}

                    {/* Content side */}
                    <div className={`relative flex flex-col justify-center p-8 sm:p-12 ${imageOnStart ? "md:order-2" : "md:order-1"}`}>
                      {/* Decorative accent line */}
                      <div className="absolute start-0 top-10 h-16 w-px bg-gradient-to-b from-amber-500/30 to-transparent sm:top-12" />

                      <div className="flex items-start gap-5 ps-4 sm:ps-6">
                        {item.institutionLogo && (
                          <a
                            href={item.institutionUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-white/8 bg-white/[0.04] p-2 transition-all duration-300 hover:border-amber-500/25 hover:bg-white/[0.06] hover:scale-105"
                          >
                            <Image
                              src={item.institutionLogo}
                              alt={item.institution}
                              fill
                              className="object-contain p-1.5"
                              sizes="64px"
                            />
                          </a>
                        )}
                        <div>
                          <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                            {item.degree}
                          </h3>
                          {item.institutionUrl ? (
                            <a
                              href={item.institutionUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-white/40 transition-colors duration-200 hover:text-amber-300"
                            >
                              {item.institution}
                              <svg className="h-3.5 w-3.5" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l6-6M4.5 3H9v4.5" /></svg>
                            </a>
                          ) : (
                            <p className="mt-2 text-sm font-medium text-white/40">{item.institution}</p>
                          )}
                        </div>
                      </div>

                      <div className="mt-7 flex flex-wrap items-center gap-3 ps-4 sm:ps-6">
                        <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-4 py-1.5 text-xs font-medium text-white/45">
                          {item.period}
                        </span>
                        {item.grade && (
                          <span className="rounded-full border border-amber-500/15 bg-amber-500/[0.06] px-4 py-1.5 text-xs font-bold tracking-wide text-amber-300">
                            {locale === "he" ? `ציון: ${item.grade}` : `Grade: ${item.grade}`}
                          </span>
                        )}
                      </div>

                      <div className="mx-4 mt-7 h-px bg-gradient-to-r from-white/[0.06] via-white/[0.04] to-transparent sm:mx-6" />

                      <p dir="auto" className="mt-6 ps-4 text-[13px] leading-[1.8] text-white/45 sm:ps-6 sm:text-sm">
                        {item.id === "marketing-cert"
                          ? locale === "he"
                            ? "מסלול מקיף הכולל: אסטרטגיית שיווק דיגיטלי, בניית משפכי המרה, קופירייטינג מקצועי (AIDA, FOMO), בניית דפי נחיתה, ניהול קמפיינים ב-Google Ads (Search, GDN, PMAX, YouTube, Shopping), Meta Ads (Pixel, Custom Audiences, אופטימיזציית KPI), TikTok Ads, Taboola, LinkedIn Ads, הטמעת Google Tag Manager, GA4, מסגרות UTM ומדידת המרות מתקדמת."
                            : "Comprehensive program covering: digital marketing strategy, conversion funnel architecture, professional copywriting (AIDA, FOMO), landing page development, Google Ads campaign management (Search, GDN, PMAX, YouTube, Shopping), Meta Ads (Pixel implementation, Custom Audiences, KPI optimization), TikTok Ads, Taboola, LinkedIn Ads, Google Tag Manager event tracking, GA4 analytics, UTM frameworks, and advanced conversion measurement."
                          : locale === "he"
                            ? "מסלול מקיף הכולל: יסודות תכנות ב-Python, תכנות מונחה-עצמים (OOP), רשתות מחשבים (TCP/IP, OSI, HTTP, DNS), Flask, Git, מסדי נתונים ו-SQL מתקדם, ניתוח נתונים עם NumPy/Pandas/Scipy, Machine Learning (Regression, Classification, SVM, XGBoost, Random Forests), Deep Learning (ANN, CNN, RNN, LSTM, TensorFlow), GAN & Autoencoders, מערכות המלצה, ו-Reinforcement Learning (Deep Q-Learning, Minimax)."
                            : "Comprehensive program covering: Python fundamentals, Object-Oriented Programming (OOP), computer networks (TCP/IP, OSI, HTTP, DNS), Flask, Git, databases & advanced SQL, data analysis with NumPy/Pandas/Scipy, Machine Learning (Regression, Classification, SVM, XGBoost, Random Forests), Deep Learning (ANN, CNN, RNN, LSTM, TensorFlow), GAN & Autoencoders, Recommender Systems, and Reinforcement Learning (Deep Q-Learning, Minimax)."}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
