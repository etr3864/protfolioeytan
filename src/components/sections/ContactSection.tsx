"use client";

import { motion } from "framer-motion";
import { IconLinkedIn, IconMail, IconPhone } from "@/components/ui/Icons";
import { useLanguage } from "@/context/LanguageContext";
import { cvDownloads } from "@/data/cv";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ContactSection() {
  const { content } = useLanguage();
  const { meta, contact } = content;

  const links = [
    {
      label: contact.email,
      value: meta.email,
      href: `mailto:${meta.email}`,
      icon: <IconMail className="h-5 w-5 text-amber-300" />,
    },
    {
      label: contact.phone,
      value: meta.phone,
      href: `tel:+972${meta.phone.replace(/^0/, "")}`,
      icon: <IconPhone className="h-5 w-5 text-amber-300" />,
    },
    {
      label: contact.linkedin,
      value: "linkedin.com/in/eytan-turgeman",
      href: meta.linkedin,
      icon: <IconLinkedIn className="h-5 w-5 text-white/80" />,
    },
  ];

  return (
    <section id="contact" className="scroll-mt-20 px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title={contact.title} subtitle={contact.subtitle} />

        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="space-y-3">
            {links.map((link, i) => (
              <Reveal key={link.label} delay={i * 0.06}>
                <motion.a
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  whileHover={{ x: 4, borderColor: "rgba(217,169,56,0.35)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:bg-white/[0.05]"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5">
                    {link.icon}
                  </span>
                  <div>
                    <p className="text-xs text-white/50">{link.label}</p>
                    <p className="font-medium text-white/90">{link.value}</p>
                  </div>
                </motion.a>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15}>
            <motion.div
              whileHover={{ borderColor: "rgba(217,169,56,0.3)" }}
              className="flex h-full flex-col justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-amber-600/8 via-transparent to-amber-600/5 p-6 sm:p-8"
            >
              <p className="text-sm text-white/60">Download full CV</p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <motion.a
                  href={cvDownloads.en}
                  download
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 rounded-xl bg-gradient-to-r from-amber-600 to-amber-400 px-4 py-3 text-center text-sm font-semibold text-white"
                >
                  {contact.downloadEn}
                </motion.a>
                <motion.a
                  href={cvDownloads.he}
                  download
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-center text-sm font-semibold text-white/90"
                >
                  {contact.downloadHe}
                </motion.a>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
