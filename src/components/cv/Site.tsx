"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Hed } from "@/components/hed/Hed";
import { DevMark } from "./DevMark";
import { Intro } from "./Intro";
import { LangShift } from "./LangShift";
import { LanguageProvider, scrollToId, useLang } from "./language";
import { PdfButton } from "./PdfButton";
import { useStackMotion } from "./useStackMotion";

function Frame({ children }: { children: React.ReactNode }) {
  const { lang } = useLang();
  useStackMotion(lang);
  const origin = lang === "he" ? "right" : "left";
  const mask = lang === "he" ? "to left" : "to right";
  return (
    <div className="cv" dir={lang === "he" ? "rtl" : "ltr"} lang={lang} style={{ ["--origin" as string]: origin, ["--mask" as string]: mask, ["--mask-end" as string]: mask }}>
      {children}
    </div>
  );
}

function Nav() {
  const { t, lang, beginShift, pending } = useLang();
  return (
    <nav className="nav">
      <div className="nav-side">
        <div className="nav-pills">
          {t.nav.map((item) => (
            <a key={item.id} href={`#${item.id}`} onClick={(event) => { event.preventDefault(); scrollToId(item.id); }}>
              {item.label}
            </a>
          ))}
        </div>
        <div className="nav-tools">
          <button type="button" className="lang-btn" disabled={Boolean(pending)} onClick={() => beginShift(lang === "he" ? "en" : "he")}>
            {lang === "he" ? "English" : "עברית"}
          </button>
          <PdfButton />
        </div>
      </div>
    </nav>
  );
}

function Dots() {
  const { t } = useLang();
  const items = [{ id: "top", label: t.full }, ...t.nav];
  return (
    <div className="dots">
      {items.map((item, index) => (
        <a key={item.id} href={`#${item.id}`} data-dot={index} data-on={index === 0 ? "1" : "0"} title={item.label} onClick={(event) => { event.preventDefault(); scrollToId(item.id); }} />
      ))}
    </div>
  );
}

function ease(t: number) {
  const cx = 0.6;
  const bx = -0.6;
  const ax = 1;
  const cy = 2.1;
  const by = -1.2;
  const ay = 0.1;
  const sampleX = (u: number) => ((ax * u + bx) * u + cx) * u;
  const sampleY = (u: number) => ((ay * u + by) * u + cy) * u;
  const slope = (u: number) => (3 * ax * u + 2 * bx) * u + cx;
  let u = t;
  for (let i = 0; i < 6; i += 1) {
    const delta = sampleX(u) - t;
    if (Math.abs(delta) < 1e-4) break;
    u -= delta / slope(u);
  }
  return sampleY(Math.min(1, Math.max(0, u)));
}

function StatValue({ value, delay }: { value: string; delay: number }) {
  const match = /^(\d+)(.*)$/.exec(value);
  const target = match ? Number(match[1]) : null;
  const suffix = match?.[2] ?? "";
  const [shown, setShown] = useState(target === null ? value : `0${suffix}`);

  useEffect(() => {
    if (target === null) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(value);
      return;
    }
    let frame = 0;
    let timer = 0;
    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / 1200);
        setShown(`${Math.round(target * ease(t))}${suffix}`);
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };
    const arm = () => {
      timer = window.setTimeout(run, delay);
    };
    let obs: MutationObserver | null = null;
    if (document.querySelector(".intro")) {
      obs = new MutationObserver(() => {
        if (!document.querySelector(".intro")) {
          obs?.disconnect();
          arm();
        }
      });
      obs.observe(document.documentElement, { childList: true, subtree: true });
    } else {
      arm();
    }
    return () => {
      obs?.disconnect();
      window.clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
  }, [delay, suffix, target, value]);

  return shown;
}

function Hero() {
  const { t } = useLang();
  const stats = [...t.facts, t.commandStat];
  return (
    <section id="top" data-pin="1">
      <div className="hero" data-pin-inner="1">
        <div className="hero-photo" data-hero-photo="1">
          <Image src="/media/eytan-hero.jpg" alt={t.full} fill priority unoptimized sizes="100vw" />
        </div>
        <div className="hero-shade" />
        <div className="spine">
          <span>Eytan Turgeman</span>
        </div>
        <div className="hero-copy" data-hero-copy="1">
          <span className="kicker">{t.heroKicker}</span>
          <h1>{t.heroTitle}</h1>
        </div>
        <div className="hero-bottom">
          <div className="expertise">
            {t.expertise.map((item) => (
              <a key={item.to} href={`#${item.to}`} onClick={(event) => { event.preventDefault(); scrollToId(item.to); }}>
                {item.label} <span>›</span>
              </a>
            ))}
          </div>
          <div className="stats">
            {stats.map((fact, index) => (
              <div key={fact.k}>
                <strong><StatValue value={fact.v} delay={index * 80} /></strong>
                <span>{fact.k}</span>
              </div>
            ))}
          </div>
        </div>
        <div data-pin-shade="1" />
      </div>
    </section>
  );
}

function Fill({ text }: { text: string }) {
  const parts = text.split(/(\s+|\b(?:AI|CTO|Python|JS)\b)/g);
  return parts.map((part, index) => {
    if (!part || /^\s+$/.test(part)) return part;
    const body = /^(AI|CTO|Python|JS)$/.test(part) ? <bdi>{part}</bdi> : part;
    return (
      <span key={`${part}-${index}`} data-w="1">
        {body}
      </span>
    );
  });
}

function Words({ text }: { text: string }) {
  return (
    <p className="statement" data-words="1">
      {text.split(" ").map((word, index) => (
        <span key={`${word}-${index}`} data-w="1">
          {word}
        </span>
      ))}
    </p>
  );
}

function About() {
  const { t } = useLang();
  return (
    <section id="about" data-pin="1">
      <div className="about-sheet" data-pin-inner="1">
        <div className="about-photo">
          <div className="fade">
            <div data-par-y="1">
              <Image src="/media/eytan-profile.webp" alt="" fill sizes="48vw" />
            </div>
          </div>
        </div>
        <div className="about-grid">
          <div className="about-copy">
            <Words text={t.statement} />
            <div className="about-prose" data-words="rest">
              <p className="about-lead"><Fill text={t.aboutLead} /></p>
              {t.aboutBody.map((paragraph) => (
                <p key={paragraph}><Fill text={paragraph} /></p>
              ))}
            </div>
          </div>
        </div>
        <div data-pin-shade="1" />
      </div>
    </section>
  );
}

function Experience() {
  const { t } = useLang();
  const [open, setOpen] = useState<number | null>(null);
  const [hot, setHot] = useState<number | null>(null);
  const glide = useRef(0);

  useEffect(() => {
    const stop = () => cancelAnimationFrame(glide.current);
    window.addEventListener("wheel", stop, { passive: true });
    window.addEventListener("touchstart", stop, { passive: true });
    return () => {
      stop();
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchstart", stop);
    };
  }, []);

  const toggle = (card: HTMLElement, index: number) => {
    const opening = open !== index;
    setOpen(opening ? index : null);
    if (!opening) return;
    cancelAnimationFrame(glide.current);
    const section = card.closest("section");
    const inner = section?.querySelector<HTMLElement>("[data-pin-inner]");
    const root = section?.parentElement;
    const detail = card.querySelector<HTMLElement>(".exp-detail");
    if (!section || !inner || !root || !detail) return;

    let natural = root.getBoundingClientRect().top + window.scrollY;
    for (let node = root.firstElementChild; node && node !== section; node = node.nextElementSibling) {
      const position = getComputedStyle(node).position;
      if (position !== "fixed" && position !== "absolute") natural += (node as HTMLElement).offsetHeight;
    }

    let closing = 0;
    let closingAbove = 0;
    inner.querySelectorAll<HTMLElement>('.exp-card[data-open="1"]').forEach((other) => {
      if (other === card) return;
      const height = other.querySelector<HTMLElement>(".exp-fold-in")?.offsetHeight ?? 0;
      closing += height;
      if (other.compareDocumentPosition(card) & Node.DOCUMENT_POSITION_FOLLOWING) closingAbove += height;
    });

    const gap = window.matchMedia("(max-width: 900px)").matches ? 16 : 96;
    const offset = card.getBoundingClientRect().top - inner.getBoundingClientRect().top - closingAbove;
    const finalHeight = inner.offsetHeight + detail.offsetHeight - closing;
    const target = Math.min(natural + offset - gap, natural + Math.max(0, finalHeight - window.innerHeight));
    const from = window.scrollY;
    if (Math.abs(target - from) < 2) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.scrollTo({ top: target, behavior: "instant" });
      return;
    }
    let began = -1;
    const step = (now: number) => {
      if (began < 0) began = now;
      const progress = Math.min(1, (now - began) / 700);
      const eased = 1 - (1 - progress) ** 3;
      window.scrollTo({ top: from + (target - from) * eased, behavior: "instant" });
      if (progress < 1) glide.current = requestAnimationFrame(step);
    };
    glide.current = requestAnimationFrame(step);
  };

  return (
    <section id="experience" data-pin="1">
      <div data-pin-inner="1">
        <div className="exp-panel" data-circle="1">
          <div className="section-head">
            <h2>{t.expLabel}</h2>
          </div>
          <div className="exp-list">
            {t.experience.map((job, index) => {
              const on = open === index;
              const dim = hot !== null && hot !== index && !on;
              return (
                <article
                  key={job.org}
                  className="exp-card"
                  data-hot={hot === index ? "1" : "0"}
                  data-open={on ? "1" : "0"}
                  style={{ opacity: dim ? 0.5 : 1 }}
                  onMouseEnter={() => {
                    if (window.matchMedia("(hover: hover)").matches) setHot(index);
                  }}
                  onMouseLeave={() => setHot(null)}
                  onMouseMove={(event) => {
                    if (!window.matchMedia("(hover: hover)").matches) return;
                    const rect = event.currentTarget.getBoundingClientRect();
                    event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
                    event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
                  }}
                  onClick={(event) => {
                    if ((event.target as HTMLElement).closest("a")) return;
                    toggle(event.currentTarget, index);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      toggle(event.currentTarget, index);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <div className="exp-sweep" />
                  <div className="exp-glow" />
                  <div className="exp-row">
                    <div className="logo">
                      {job.url ? (
                        <a href={job.url} target="_blank" rel="noreferrer" aria-label={job.org}>
                          <img src={job.logo} alt="" />
                        </a>
                      ) : (
                        <img src={job.logo} alt="" />
                      )}
                    </div>
                    <div className="exp-role">
                      <h3>
                        <span className="idx">{String(index + 1).padStart(2, "0")}</span>
                        {job.role}
                      </h3>
                      <p>
                        {job.url ? (
                          <a href={job.url} target="_blank" rel="noreferrer">
                            {job.org}
                          </a>
                        ) : (
                          job.org
                        )}
                        {" · "}
                        {job.place}
                      </p>
                    </div>
                    <span className="exp-time">{job.time}</span>
                    <span className="plus" aria-hidden="true">+</span>
                  </div>
                  <div className="exp-fold">
                    <div className="exp-fold-in">
                      <div className="exp-detail">
                        <span />
                        <div data-exp-words="1">
                          <p className="summary"><Fill text={job.summary} /></p>
                          <ul className="points">
                            {job.points.map((point) => (
                              <li key={point}><span><Fill text={point} /></span></li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
        <div data-pin-shade="1" />
      </div>
    </section>
  );
}

function ShotView({
  shots,
  name,
  index,
  rtl,
  closeLabel,
  onIndex,
  onClose,
}: {
  shots: string[];
  name: string;
  index: number;
  rtl: boolean;
  closeLabel: string;
  onIndex: (index: number) => void;
  onClose: () => void;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(index);
  const many = shots.length > 1;

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (!many) return;
      const forward = rtl ? "ArrowLeft" : "ArrowRight";
      const back = rtl ? "ArrowRight" : "ArrowLeft";
      if (event.key === forward) onIndex(Math.min(shots.length - 1, indexRef.current + 1));
      if (event.key === back) onIndex(Math.max(0, indexRef.current - 1));
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [many, onClose, onIndex, rtl, shots.length]);

  useEffect(() => {
    const frame = frameRef.current;
    const strip = stripRef.current;
    if (!frame || !strip) return;
    const apply = () => {
      const width = frame.clientWidth;
      if (!width) return;
      strip.style.transition = strip.dataset.ready ? "transform 0.45s cubic-bezier(0.2, 0.7, 0.2, 1)" : "none";
      strip.dataset.ready = "1";
      strip.style.transform = `translateX(${(rtl ? 1 : -1) * index * width}px)`;
    };
    apply();
    const frameId = requestAnimationFrame(apply);
    return () => cancelAnimationFrame(frameId);
  }, [index, rtl, shots.length]);

  useEffect(() => {
    const frame = frameRef.current;
    const strip = stripRef.current;
    if (!frame || !strip || !many) return;
    let dragging = false;
    let axis: "" | "x" | "y" = "";
    let startX = 0;
    let startY = 0;
    let origin = 0;
    const down = (event: PointerEvent) => {
      if (event.pointerType === "mouse") return;
      if ((event.target as HTMLElement).closest(".shot-nav")) return;
      dragging = true;
      axis = "";
      startX = event.clientX;
      startY = event.clientY;
      origin = indexRef.current;
      strip.style.transition = "none";
    };
    const move = (event: PointerEvent) => {
      if (!dragging) return;
      const dx = event.clientX - startX;
      const travelY = event.clientY - startY;
      if (!axis) {
        if (Math.abs(dx) < 8 && Math.abs(travelY) < 8) return;
        axis = Math.abs(dx) > Math.abs(travelY) ? "x" : "y";
        if (axis === "y") {
          dragging = false;
          return;
        }
      }
      if (axis !== "x") return;
      event.preventDefault();
      const width = frame.clientWidth || 1;
      const ahead = rtl ? dx : -dx;
      const atStart = origin <= 0 && ahead < 0;
      const atEnd = origin >= shots.length - 1 && ahead > 0;
      const drag = atStart || atEnd ? dx * 0.35 : dx;
      strip.style.transform = `translateX(${(rtl ? 1 : -1) * origin * width + drag}px)`;
    };
    const up = (event: PointerEvent) => {
      if (!dragging && axis !== "x") {
        dragging = false;
        axis = "";
        return;
      }
      const moved = axis === "x";
      dragging = false;
      axis = "";
      if (!moved) return;
      const width = frame.clientWidth || 1;
      const ahead = rtl ? event.clientX - startX : startX - event.clientX;
      let next = origin;
      if (ahead > width * 0.18) next = origin + 1;
      else if (ahead < -width * 0.18) next = origin - 1;
      next = Math.min(shots.length - 1, Math.max(0, next));
      strip.style.transition = "transform 0.45s cubic-bezier(0.2, 0.7, 0.2, 1)";
      strip.style.transform = `translateX(${(rtl ? 1 : -1) * next * width}px)`;
      onIndex(next);
    };
    frame.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move, { passive: false });
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    return () => {
      frame.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
  }, [many, onIndex, rtl, shots.length]);

  const step = (dir: number) => onIndex(Math.min(shots.length - 1, Math.max(0, index + dir)));

  return (
    <div className="shot-view" role="dialog" aria-modal="true" aria-label={name} dir={rtl ? "rtl" : "ltr"}>
      <div className="shot-view-bar">
        <div>
          <b>{name}</b>
          {many ? <span><bdi dir="ltr">{String(index + 1).padStart(2, "0")} / {String(shots.length).padStart(2, "0")}</bdi></span> : null}
        </div>
        <button type="button" className="shot-view-x" aria-label={closeLabel} onClick={onClose} />
      </div>
      <div className="shot-view-frame" ref={frameRef}>
        <div className="shot-view-strip" ref={stripRef}>
          {shots.map((src) => (
            <img key={src} src={src} alt="" />
          ))}
        </div>
        {many ? (
          <>
            <button type="button" className="shot-nav shot-prev" data-off={index === 0 ? "1" : "0"} aria-label={rtl ? "הקודם" : "Previous"} onClick={() => step(-1)}>
              <i className="go" />
            </button>
            <button type="button" className="shot-nav shot-next" data-off={index === shots.length - 1 ? "1" : "0"} aria-label={rtl ? "הבא" : "Next"} onClick={() => step(1)}>
              <i className="go" />
            </button>
          </>
        ) : null}
      </div>
      {many ? (
        <div className="shot-view-dots">
          {shots.map((src, shotIndex) => (
            <button key={src} type="button" data-on={shotIndex === index ? "1" : "0"} aria-label={`${name} ${shotIndex + 1}`} onClick={() => onIndex(shotIndex)} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
function Projects() {
  const { t } = useLang();
  const [shot, setShot] = useState<number[]>(() => t.projects.map(() => 0));
  const [zoom, setZoom] = useState<{ project: number; shot: number } | null>(null);
  const total = String(t.projects.length).padStart(2, "0");

  return (
    <section id="projects" className="projects" data-hs="1">
      <div className="projects-frame" data-hs-frame="1">
        <div className="projects-head">
          <div>
            <h2>{t.projLabel}</h2>
            <p>{t.projIntro}</p>
          </div>
          <div className="meter">
            <b>
              <span data-hs-count="1">01</span>
              <span> / {total}</span>
            </b>
            <div className="bar">
              <i data-hs-bar="1" />
            </div>
          </div>
        </div>
        <div className="track" data-track="1">
          {t.projects.map((project, index) => {
            const active = shot[index] ?? 0;
            return (
              <article key={project.name} className="project" data-card="1">
                <div className="shots">
                  <div className="shot-stage" data-par="1">
                    {project.shots.map((src, shotIndex) => (
                      <img key={src} src={src} alt={shotIndex === active ? project.name : ""} style={{ opacity: shotIndex === active ? 1 : 0, transform: `scale(${shotIndex === active ? 1 : 1.06})` }} />
                    ))}
                    <button type="button" className="shot-zoom" aria-label={t.enlarge} onClick={() => setZoom({ project: index, shot: active })}>
                      <span>{t.enlarge}</span>
                    </button>
                  </div>
                  <span className="shot-no">{String(index + 1).padStart(2, "0")}</span>
                  {project.shots.length > 1 ? (
                    <div className="thumbs">
                      {project.shots.map((src, shotIndex) => (
                        <button key={src} type="button" data-on={shotIndex === active ? "1" : "0"} aria-label={`${project.name} ${shotIndex + 1}`} onClick={() => setShot((current) => current.map((value, i) => (i === index ? shotIndex : value)))} onMouseEnter={() => setShot((current) => current.map((value, i) => (i === index ? shotIndex : value)))}>
                          <img src={src} alt="" />
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
                <div className="project-copy" data-project-words="1">
                  <div className="meta">
                    <span>{project.kind}</span>
                    <span>·</span>
                    <span>{project.year}</span>
                  </div>
                  <h3>{project.name}</h3>
                  <p className="desc"><Fill text={project.desc} /></p>
                  <div>
                    <div className="block-label">{t.highlightsLabel}</div>
                    <ul className="highlights">
                      {project.highlights.map((item) => (
                        <li key={item}>
                          <i />
                          <span><Fill text={item} /></span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pair">
                    <div>
                      <span className="block-label">{t.strategyLabel}</span>
                      <span><Fill text={project.strategy} /></span>
                    </div>
                    <div>
                      <span className="block-label">{t.modelLabel}</span>
                      <span><Fill text={project.model} /></span>
                    </div>
                  </div>
                  {project.lesson ? (
                    <div className="lesson">
                      <span className="block-label">{t.lessonLabel}</span>
                      <span><Fill text={project.lesson} /></span>
                    </div>
                  ) : null}
                  <div>
                    <div className="block-label">{t.stackLabel}</div>
                    <div className="stack">
                      {project.stack.map((item) => (
                        <span key={item} dir="ltr">{item}</span>
                      ))}
                    </div>
                  </div>
                  <div className="links">
                    <a className="solid" href={project.link} target="_blank" rel="noreferrer">
                      {project.linkLabel} <span className="go" aria-hidden="true" />
                    </a>
                    {project.link2 && project.link2Label ? (
                      <a className="ghost" href={project.link2} target="_blank" rel="noreferrer">
                        {project.link2Label} <span className="go" aria-hidden="true" />
                      </a>
                    ) : null}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
      {zoom && typeof document !== "undefined"
        ? createPortal(
            <ShotView
              shots={t.projects[zoom.project]?.shots ?? []}
              name={t.projects[zoom.project]?.name ?? ""}
              index={zoom.shot}
              rtl={t.dir === "rtl"}
              closeLabel={t.dir === "rtl" ? "סגירה" : "Close"}
              onIndex={(shotIndex) => {
                setShot((current) => current.map((value, i) => (i === zoom.project ? shotIndex : value)));
                setZoom({ project: zoom.project, shot: shotIndex });
              }}
              onClose={() => setZoom(null)}
            />,
            document.body,
          )
        : null}
    </section>
  );
}


function Education() {
  const { t } = useLang();
  const [cert, setCert] = useState<string | null>(null);

  return (
    <section id="education" data-pin="1">
      <div data-pin-inner="1">
        <div className="edu-panel" data-wipe="1">
          <div>
            <div className="section-head">
              <h2>{t.eduLabel}</h2>
            </div>
            <div className="edu-list">
              {t.education.map((item, index) => (
                <div className="edu-row" key={item.name}>
                  <div className="edu-info">
                    <div className="when">
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <span>{item.time}</span>
                    </div>
                    <h3>{item.name}</h3>
                    <div className="org">{item.org}</div>
                    <div className="note">{item.note}</div>
                    {item.grade ? <span className="grade">{item.grade}</span> : null}
                    <button type="button" className="enlarge" onClick={() => setCert(item.cert)}>
                      {t.enlarge} <span className="go" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="cert">
                    <img src={item.cert} alt={item.name} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="skills-wrap">
            <div className="skills-block">
              <h2>{t.skillsLabel}</h2>
              <div>
                {t.skills.map((group) => (
                  <div className="skill-row" key={group.group}>
                    <b>{group.group}</b>
                    <span>
                      {group.items.map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="illustration" data-par-y="1">
              <div>
                <img src="/media/eytan-illustration.webp" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div data-pin-shade="1" />
      </div>
      {cert ? (
        <button type="button" className="lightbox" onClick={() => setCert(null)}>
          <img src={cert} alt="" />
          <span>✕</span>
        </button>
      ) : null}
    </section>
  );
}

function Contact() {
  const { t, lang, beginShift, pending } = useLang();
  return (
    <section id="contact" data-pin="1">
      <div className="contact-sheet" data-pin-inner="1">
        <div className="contact-photo" data-par-y="1">
          <div>
            <img className="pencil" src="/media/eytan-pencil.webp" alt="" />
            <img className="contact-illu" src="/media/eytan-illustration.webp" alt="" />
          </div>
        </div>
        <h2 className="contact-title" data-chars="1">
          {t.contactTitle.split(" ").map((word, wordIndex) => (
            <span className="contact-word" key={`${word}-${wordIndex}`}>
              {[...word].map((char, index) => (
                <span key={`${char}-${index}`}>
                  <i data-ch="1">{char}</i>
                </span>
              ))}
            </span>
          ))}
        </h2>
        <div className="contact-list">
          {t.contact.map((item) => (
            <a key={item.k} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
              <small>{item.k}</small>
              <b>{item.v}</b>
              <em className="go" aria-hidden="true" />
            </a>
          ))}
        </div>
        <footer className="foot">
          <div className="foot-tools">
            <button type="button" className="lang-btn" disabled={Boolean(pending)} onClick={() => beginShift(lang === "he" ? "en" : "he")}>
              {lang === "he" ? "English" : "עברית"}
            </button>
            <PdfButton />
          </div>
          <span>{t.credit}</span>
          <span>{t.location}</span>
        </footer>
      </div>
    </section>
  );
}

export function Site() {
  return (
    <LanguageProvider>
      <Hed>
        <Frame>
          <DevMark />
          <Intro />
          <LangShift />
          <Nav />
          <Dots />
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Education />
          <Contact />
        </Frame>
      </Hed>
    </LanguageProvider>
  );
}
