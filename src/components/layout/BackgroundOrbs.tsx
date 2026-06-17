"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function seededRandom(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

function generateNetwork(cols: number, rows: number, seedOffset: number) {
  const nodes: { x: number; y: number }[] = [];
  const spacingX = 100 / (cols - 1);
  const spacingY = 100 / (rows - 1);

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const seed = seedOffset + r * cols + c;
      nodes.push({
        x: c * spacingX + (seededRandom(seed * 3) - 0.5) * spacingX * 0.6,
        y: r * spacingY + (seededRandom(seed * 7) - 0.5) * spacingY * 0.5,
      });
    }
  }

  const edges: [number, number][] = [];
  for (let i = 0; i < nodes.length; i++) {
    const c = i % cols;
    const r = Math.floor(i / cols);
    if (c < cols - 1) edges.push([i, i + 1]);
    if (r < rows - 1 && seededRandom((seedOffset + i) * 11) > 0.3) edges.push([i, i + cols]);
    if (c < cols - 1 && r < rows - 1 && seededRandom((seedOffset + i) * 13) > 0.65) edges.push([i, i + cols + 1]);
  }

  return { nodes, edges };
}

export function BackgroundOrbs() {
  const reduced = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 800, damping: 40 });
  const smoothY = useSpring(mouseY, { stiffness: 800, damping: 40 });

  const [mounted, setMounted] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const layerFront = useMemo(() => generateNetwork(7, 10, 0), []);
  const layerBack = useMemo(() => generateNetwork(5, 7, 500), []);

  useEffect(() => {
    setMounted(true);
    const touch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsTouch(touch);
    if (reduced || touch) return;

    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY, reduced]);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[#0d0d14]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(217,169,56,0.06),transparent)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:64px_64px]" />

      {/* Back layer - larger, slower, dimmer (depth) */}
      {mounted && !reduced && (
        <motion.svg
          className="neural-net absolute inset-0 h-full w-full"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
          animate={{ x: [0, 8, 0], y: [0, 5, 0] }}
          transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
          style={{ opacity: 0.3, scale: 1.15 }}
        >
          {layerBack.edges.map(([from, to], i) => (
            <line
              key={`be${i}`}
              x1={layerBack.nodes[from].x}
              y1={layerBack.nodes[from].y}
              x2={layerBack.nodes[to].x}
              y2={layerBack.nodes[to].y}
              stroke="rgba(217,169,56,0.1)"
              strokeWidth="0.1"
            />
          ))}
          {layerBack.nodes.map((node, i) => (
            <circle
              key={`bn${i}`}
              cx={node.x}
              cy={node.y}
              r="0.25"
              fill="rgba(217,169,56,0.15)"
            />
          ))}
        </motion.svg>
      )}

      {/* Front layer - sharper, faster drift */}
      {mounted && !reduced && (
        <motion.svg
          className="neural-net absolute inset-0 h-full w-full"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
          animate={{ x: [0, -5, 0], y: [0, -3, 0] }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        >
          {layerFront.edges.map(([from, to], i) => (
            <line
              key={`fe${i}`}
              x1={layerFront.nodes[from].x}
              y1={layerFront.nodes[from].y}
              x2={layerFront.nodes[to].x}
              y2={layerFront.nodes[to].y}
              stroke="rgba(217,169,56,0.1)"
              strokeWidth="0.06"
            />
          ))}
          {layerFront.nodes.map((node, i) => (
            <circle
              key={`fn${i}`}
              cx={node.x}
              cy={node.y}
              r="0.15"
              fill="rgba(217,169,56,0.25)"
            />
          ))}
        </motion.svg>
      )}

      {/* Mouse-following amber glow - desktop only */}
      {mounted && !reduced && !isTouch && (
        <motion.div
          style={{
            left: smoothX,
            top: smoothY,
            x: "-50%",
            y: "-50%",
          }}
          className="absolute h-[400px] w-[400px] rounded-full bg-amber-500/[0.07] blur-[90px]"
        />
      )}

      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(10,10,15,0.4)_40%,#0d0d14_100%)]" />
    </div>
  );
}
