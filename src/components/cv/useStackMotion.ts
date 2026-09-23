"use client";

import { useEffect } from "react";
import type { Locale } from "@/data/cv";

const narrowQuery = "(max-width: 900px)";

export function useStackMotion(lang: Locale) {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.querySelector(".cv");
    if (!root || reduced) return;

    let raf = 0;
    let loop = 0;
    let current = 0;
    let target = 0;
    let distance = 0;
    const rtl = lang === "he";

    const clamp = (v: number) => Math.min(1, Math.max(0, v));
    const enter = (el: Element) => clamp(1 - el.getBoundingClientRect().top / window.innerHeight);
    const narrow = () => window.matchMedia(narrowQuery).matches;

    const tick = () => {
      raf = 0;
      const y = window.scrollY;
      const vh = window.innerHeight;
      const layers = [...document.querySelectorAll<HTMLElement>("[data-pin], [data-hs]")];

      const mobile = narrow();

      layers.forEach((layer, index) => {
        if (!layer.hasAttribute("data-pin")) return;
        const inner = layer.querySelector<HTMLElement>("[data-pin-inner]");
        const shade = layer.querySelector<HTMLElement>("[data-pin-shade]");
        if (!inner) return;
        const pinTop = layer.id === "contact" ? "0px" : `${Math.min(0, vh - inner.offsetHeight)}px`;
        if (layer.style.top !== pinTop) layer.style.top = pinTop;
        const next = layers[index + 1];
        const progress = next ? enter(next) : 0;
        inner.style.transform = !mobile && progress ? `scale(${1 - progress * 0.06})` : "none";
        if (shade) shade.style.opacity = String(progress * 0.6);
      });

      const photo = document.querySelector<HTMLElement>("[data-hero-photo]");
      const copy = document.querySelector<HTMLElement>("[data-hero-copy]");
      const travel = Math.min(y, vh);
      if (mobile) {
        if (photo) photo.style.transform = "none";
        if (copy) {
          copy.style.transform = "none";
          copy.style.opacity = "";
        }
      } else {
        if (photo) photo.style.transform = `translateY(${travel * 0.12}px) scale(${1 + (travel / vh) * 0.08})`;
        if (copy) {
          copy.style.transform = `translateY(${-travel * 0.25}px)`;
          copy.style.opacity = String(1 - (travel / vh) * 1.4);
        }
      }

      if (!mobile) {
        document.querySelectorAll<HTMLElement>(".about-prose [data-w]").forEach((word) => {
          word.style.opacity = "";
        });
      }
      document.querySelectorAll<HTMLElement>("[data-words]").forEach((block) => {
        if (block.dataset.words === "rest") return;
        if (mobile && block.closest(".about-copy")) return;
        const rect = block.getBoundingClientRect();
        const progress = clamp((vh * 0.85 - rect.top) / (rect.height + vh * 0.25));
        const words = block.querySelectorAll<HTMLElement>("[data-w]");
        words.forEach((word, index) => {
          word.style.opacity = index / words.length < progress ? "1" : "0.18";
        });
      });

      if (mobile) {
        const copy = document.querySelector<HTMLElement>(".about-copy");
        const about = document.getElementById("about");
        const inner = about?.querySelector<HTMLElement>("[data-pin-inner]");
        if (copy && about && inner) {
          let layout = 0;
          let node: HTMLElement | null = about;
          while (node) {
            layout += node.offsetTop;
            node = node.offsetParent as HTMLElement | null;
          }
          const travel = Math.max(1, inner.offsetHeight - vh);
          const progress = clamp((y - layout) / travel);
          const words = [...copy.querySelectorAll<HTMLElement>("[data-w]")];
          words.forEach((word, index) => {
            word.style.opacity = index / words.length < progress ? "1" : "0.18";
          });
        }
      }

      document.querySelectorAll<HTMLElement>("[data-par-y]").forEach((el) => {
        if (mobile) {
          el.style.transform = "none";
          return;
        }
        const parent = el.parentElement;
        if (!parent) return;
        const rect = parent.getBoundingClientRect();
        const offset = (rect.top + rect.height / 2 - vh / 2) / vh;
        el.style.transform = `translateY(${offset * -8}%)`;
      });

      const circle = document.querySelector<HTMLElement>("[data-circle]");
      if (circle) {
        if (mobile) {
          circle.style.clipPath = "none";
        } else if (circle.parentElement) {
          const progress = enter(circle.parentElement);
          circle.style.clipPath = progress >= 1 ? "none" : `circle(${progress * 150}% at 50% 100%)`;
        }
      }

      const wipe = document.querySelector<HTMLElement>("[data-wipe]");
      if (wipe?.parentElement) {
        const progress = enter(wipe.parentElement);
        const lead = Math.max(0, (1 - progress) * 130);
        const lag = Math.max(0, (1 - progress) * 130 - 30);
        const start = rtl ? lag : lead;
        const end = rtl ? lead : lag;
        wipe.style.clipPath = progress >= 1 ? "none" : `polygon(0 ${start}%, 100% ${end}%, 100% 100%, 0 100%)`;
      }

      const scroller = document.querySelector<HTMLElement>("[data-hs]");
      const track = document.querySelector<HTMLElement>("[data-track]");
      if (scroller && track) {
        distance = Math.max(0, track.scrollWidth - window.innerWidth);
        scroller.style.height = `${vh * 1.2 + distance}px`;
        const rect = scroller.getBoundingClientRect();
        const progress = clamp(-rect.top / Math.max(1, distance));
        target = progress * distance;
        const frame = scroller.querySelector<HTMLElement>("[data-hs-frame]");
        const reveal = enter(scroller);
        if (frame) {
          const insetY = (1 - reveal) * 8;
          const insetX = (1 - reveal) * 6;
          frame.style.clipPath = reveal >= 1 ? "none" : `inset(${insetY}% ${insetX}% 0 ${insetX}% round 28px)`;
        }
        const bar = scroller.querySelector<HTMLElement>("[data-hs-bar]");
        if (bar) bar.style.transform = `scaleX(${progress})`;
        const count = scroller.querySelector<HTMLElement>("[data-hs-count]");
        const total = track.children.length;
        if (count && total) {
          count.textContent = String(Math.min(total, Math.round(progress * (total - 1)) + 1)).padStart(2, "0");
        }
        if (!loop) animate();
      }

      document.querySelectorAll<HTMLElement>("[data-chars]").forEach((block) => {
        const chars = [...block.querySelectorAll<HTMLElement>("[data-ch]")];
        let progress: number;
        if (narrow()) {
          const section = block.closest("section");
          const sectionTop = section?.getBoundingClientRect().top ?? 0;
          const resting = block.getBoundingClientRect().top - sectionTop;
          const from = vh * 0.92;
          const to = Math.min(resting, vh * 0.55);
          progress = clamp((from - block.getBoundingClientRect().top) / Math.max(1, from - to));
        } else {
          progress = clamp((vh - block.getBoundingClientRect().top) / (vh * 0.7));
        }
        chars.forEach((char, index) => {
          const local = clamp(progress * 1.7 - (index / Math.max(1, chars.length)) * 0.7);
          if (local >= 1) {
            char.style.transform = "none";
            return;
          }
          const tilt = (1 - local) * (rtl ? -8 : 8);
          char.style.transform = `translateY(${(1 - local) * 105}%) rotate(${tilt}deg)`;
        });
      });

      const sections = ["top", "about", "experience", "projects", "education", "contact"].map((id) => document.getElementById(id));
      let active = 0;
      sections.forEach((section, index) => {
        if (section && section.getBoundingClientRect().top < vh * 0.5) active = index;
      });
      document.querySelectorAll<HTMLElement>("[data-dot]").forEach((dot, index) => {
        dot.dataset.on = index === active ? "1" : "0";
      });
    };

    const animate = () => {
      const track = document.querySelector<HTMLElement>("[data-track]");
      if (!track) {
        loop = 0;
        return;
      }
      current += (target - current) * 0.085;
      const delta = target - current;
      const limit = narrow() ? 2.2 : 5;
      const skew = Math.max(-limit, Math.min(limit, delta * (narrow() ? 0.006 : 0.012)));
      track.style.transform = `translateX(${(rtl ? 1 : -1) * current}px)`;
      track.querySelectorAll<HTMLElement>("[data-card]").forEach((card) => {
        card.style.transform = `skewX(${(rtl ? 1 : -1) * skew}deg)`;
        const image = card.querySelector<HTMLElement>("[data-par]");
        if (!image) return;
        const rect = card.getBoundingClientRect();
        const offset = (rect.left + rect.width / 2 - window.innerWidth / 2) / window.innerWidth;
        image.style.transform = `translateX(${offset * -3}%) scale(1.03)`;
      });
      loop = Math.abs(delta) > 0.3 ? requestAnimationFrame(animate) : 0;
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    const start = window.setTimeout(tick, 80);

    return () => {
      window.clearTimeout(start);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
      cancelAnimationFrame(loop);
    };
  }, [lang]);
}
