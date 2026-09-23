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
    const between = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
    const enter = (el: Element) => clamp(1 - el.getBoundingClientRect().top / window.innerHeight);
    const narrow = () => window.matchMedia(narrowQuery).matches;
    let sizedCard = -1;
    let clearedWords = false;

    const paintProjectWords = (viewHeight: number, card: HTMLElement | undefined) => {
      if (!card) return;
      clearedWords = true;
      const words = card.querySelectorAll<HTMLElement>("[data-w]");
      const copy = card.querySelector<HTMLElement>("[data-project-words]");
      if (!copy || !words.length) return;
      const rect = copy.getBoundingClientRect();
      const progress = clamp((viewHeight * 0.72 - rect.top) / Math.max(1, rect.height * 0.92));
      const count = words.length;
      words.forEach((word, wordIndex) => {
        const on = wordIndex / count < progress ? "1" : "0.18";
        if (word.style.opacity !== on) word.style.opacity = on;
      });
    };

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

      const expInner = document.querySelector<HTMLElement>("#experience [data-pin-inner]");
      let growth = 0;
      document.querySelectorAll<HTMLElement>(".exp-card").forEach((card) => {
        const fold = card.querySelector<HTMLElement>(".exp-fold-in");
        const detail = card.querySelector<HTMLElement>(".exp-detail");
        if (!fold || !detail) return;
        growth += (card.dataset.open === "1" ? detail.offsetHeight : 0) - fold.offsetHeight;
      });
      const below = expInner ? Math.max(0, expInner.getBoundingClientRect().bottom + growth - vh) : 0;
      const line = vh - Math.min(below, vh * 0.3);
      document.querySelectorAll<HTMLElement>("[data-exp-words]").forEach((block) => {
        const words = block.querySelectorAll<HTMLElement>("[data-w]");
        if (!block.closest('.exp-card[data-open="1"]')) {
          words.forEach((word) => {
            if (word.style.opacity) word.style.opacity = "";
          });
          return;
        }
        const rect = block.getBoundingClientRect();
        const progress = clamp((line - rect.top) / Math.max(1, rect.height));
        words.forEach((word, index) => {
          const on = index / words.length < progress ? "1" : "0.18";
          if (word.style.opacity !== on) word.style.opacity = on;
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
        const frame = scroller.querySelector<HTMLElement>("[data-hs-frame]");
        let shown = 0;
        if (narrow()) {
          if (scroller.style.height) scroller.style.height = "";
          if (!dragging) target = between(manual, 0, distance);
          if (frame) frame.style.clipPath = "none";
          shown = distance ? clamp(target / distance) : 0;
          const cards = [...track.querySelectorAll<HTMLElement>("[data-card]")];
          const step = Math.max(1, (cards[0]?.offsetWidth ?? 1) + 14);
          const index = Math.min(Math.max(cards.length - 1, 0), Math.max(0, Math.round(target / step)));
          if (index !== sizedCard) {
            if (sizedCard >= 0) {
              cards[sizedCard]?.querySelectorAll<HTMLElement>("[data-w]").forEach((word) => {
                word.style.opacity = "";
              });
            }
            sizedCard = index;
          }
          paintProjectWords(vh, cards[index]);
        } else {
          manual = 0;
          sizedCard = -1;
          scroller.style.height = `${vh * 1.2 + distance}px`;
          const rect = scroller.getBoundingClientRect();
          const progress = clamp(-rect.top / Math.max(1, distance));
          if (!dragging) target = progress * distance;
          shown = progress;
          const reveal = enter(scroller);
          if (frame) {
            const insetY = (1 - reveal) * 8;
            const insetX = (1 - reveal) * 6;
            frame.style.clipPath = reveal >= 1 ? "none" : `inset(${insetY}% ${insetX}% 0 ${insetX}% round 28px)`;
          }
          if (clearedWords) {
            scroller.querySelectorAll<HTMLElement>(".project-copy [data-w]").forEach((word) => {
              word.style.opacity = "";
            });
            clearedWords = false;
          }
        }
        const bar = scroller.querySelector<HTMLElement>("[data-hs-bar]");
        if (bar) bar.style.transform = `scaleX(${shown})`;
        const count = scroller.querySelector<HTMLElement>("[data-hs-count]");
        const total = track.children.length;
        if (count && total) {
          count.textContent = String(Math.min(total, Math.round(shown * (total - 1)) + 1)).padStart(2, "0");
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
          const to = Math.min(resting, vh * 0.8);
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

    let manual = 0;
    let dragging = false;
    let dragOrigin = 0;
    let startX = 0;
    let startY = 0;
    let axis: "" | "x" | "y" = "";
    let suppressClick = false;

    const animate = () => {
      const track = document.querySelector<HTMLElement>("[data-track]");
      if (!track) {
        loop = 0;
        return;
      }
      current += (target - current) * (narrow() ? 0.34 : 0.085);
      const delta = target - current;
      const limit = narrow() ? 2.2 : 5;
      const skew = narrow() || dragging ? 0 : Math.max(-limit, Math.min(limit, delta * 0.012));
      track.style.transform = `translateX(${(rtl ? 1 : -1) * current}px)`;
      track.querySelectorAll<HTMLElement>("[data-card]").forEach((card) => {
        card.style.transform = `skewX(${(rtl ? 1 : -1) * skew}deg)`;
        if (narrow()) return;
        const image = card.querySelector<HTMLElement>("[data-par]");
        if (!image) return;
        const rect = card.getBoundingClientRect();
        const offset = (rect.left + rect.width / 2 - window.innerWidth / 2) / window.innerWidth;
        image.style.transform = `translateX(${offset * -3}%) scale(1.03)`;
      });
      loop = Math.abs(delta) > 0.3 ? requestAnimationFrame(animate) : 0;
    };

    const trackEl = document.querySelector<HTMLElement>("[data-track]");
    const paintMeter = () => {
      const scroller = trackEl?.closest<HTMLElement>("[data-hs]");
      if (!scroller || !trackEl || !distance) return;
      const shown = between(target, 0, distance) / distance;
      const bar = scroller.querySelector<HTMLElement>("[data-hs-bar]");
      if (bar) bar.style.transform = `scaleX(${shown})`;
      const count = scroller.querySelector<HTMLElement>("[data-hs-count]");
      const total = trackEl.children.length;
      if (count && total) count.textContent = String(Math.min(total, Math.round(shown * (total - 1)) + 1)).padStart(2, "0");
    };
    const stopPointer = () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!narrow() || event.pointerType === "mouse" || !trackEl) return;
      dragging = true;
      axis = "";
      startX = event.clientX;
      startY = event.clientY;
      dragOrigin = current;
      window.addEventListener("pointermove", onPointerMove, { passive: false });
      window.addEventListener("pointerup", onPointerUp);
      window.addEventListener("pointercancel", onPointerUp);
    };
    const onPointerMove = (event: PointerEvent) => {
      if (!dragging) return;
      const dx = event.clientX - startX;
      const dy = event.clientY - startY;
      if (!axis) {
        if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
        axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
        if (axis === "y") {
          dragging = false;
          stopPointer();
          return;
        }
      }
      if (axis !== "x" || !trackEl) return;
      event.preventDefault();
      const next = between(dragOrigin - dx, 0, distance);
      current = next;
      target = next;
      manual = next;
      trackEl.style.transform = `translateX(${(rtl ? 1 : -1) * next}px)`;
      paintMeter();
    };
    const onPointerUp = () => {
      stopPointer();
      if (!dragging && axis !== "x") {
        dragging = false;
        axis = "";
        return;
      }
      const moved = axis === "x";
      dragging = false;
      axis = "";
      if (!moved || !trackEl) return;
      suppressClick = true;
      const card = trackEl.querySelector<HTMLElement>("[data-card]");
      const gap = Number.parseFloat(getComputedStyle(trackEl).columnGap || getComputedStyle(trackEl).gap) || 0;
      const step = Math.max(1, (card?.offsetWidth ?? 1) + gap);
      const snapped = between(Math.round(current / step) * step, 0, distance);
      target = snapped;
      manual = snapped;
      paintMeter();
      if (!loop) animate();
    };
    const onClickCapture = (event: Event) => {
      if (!suppressClick) return;
      event.preventDefault();
      event.stopPropagation();
      suppressClick = false;
    };
    trackEl?.addEventListener("pointerdown", onPointerDown);
    trackEl?.addEventListener("click", onClickCapture, true);

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    let pulse = 0;
    const onExpToggle = (event: Event) => {
      if (!(event.target as HTMLElement | null)?.closest?.(".exp-card")) return;
      const until = performance.now() + 900;
      cancelAnimationFrame(pulse);
      const step = () => {
        tick();
        pulse = performance.now() < until ? requestAnimationFrame(step) : 0;
      };
      pulse = requestAnimationFrame(step);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    document.addEventListener("click", onExpToggle);
    document.addEventListener("keydown", onExpToggle);
    const start = window.setTimeout(tick, 80);

    return () => {
      window.clearTimeout(start);
      cancelAnimationFrame(pulse);
      document.removeEventListener("click", onExpToggle);
      document.removeEventListener("keydown", onExpToggle);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
      cancelAnimationFrame(loop);
      stopPointer();
      trackEl?.removeEventListener("pointerdown", onPointerDown);
      trackEl?.removeEventListener("click", onClickCapture, true);
    };
  }, [lang]);
}
