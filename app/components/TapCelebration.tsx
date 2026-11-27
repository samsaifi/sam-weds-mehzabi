"use client";

import { useEffect, useRef, useState } from "react";

interface BurstParticle {
  id: number;
  dx: string;
  dy: string;
  rot: string;
  size: number;
  color: string;
  shape: "circle" | "ribbon" | "diamond";
}

interface TapBurst {
  id: number;
  x: number;
  y: number;
  particles: BurstParticle[];
}

const BURST_COLORS = [
  "#e6b84c",
  "#f6df90",
  "#254830",
  "#c9922c",
  "#d96b70",
  "#fbf5e6",
];

function createBurstParticles(): BurstParticle[] {
  const count = 22;
  return Array.from({ length: count }, (_, i) => {
    const angle = (Math.PI * 2 * i) / count + ((i % 3) - 1) * 0.14;
    const radius = 38 + ((i * 23) % 58);
    const shapeIndex = i % 3;
    return {
      id: i,
      dx: `${Math.round(Math.cos(angle) * radius)}px`,
      dy: `${Math.round(Math.sin(angle) * radius - 10)}px`,
      rot: `${(i % 2 === 0 ? 1 : -1) * (140 + ((i * 47) % 220))}deg`,
      size: 5 + (i % 4),
      color: BURST_COLORS[i % BURST_COLORS.length],
      shape:
        shapeIndex === 0 ? "circle" : shapeIndex === 1 ? "ribbon" : "diamond",
    };
  });
}

export function TapCelebration() {
  const [bursts, setBursts] = useState<TapBurst[]>([]);
  const nextIdRef = useRef(1);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let downX = 0;
    let downY = 0;
    let ignoreCanvas = false;

    const handlePointerDown = (e: PointerEvent) => {
      downX = e.clientX;
      downY = e.clientY;
      ignoreCanvas = Boolean((e.target as HTMLElement | null)?.closest("canvas"));
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (ignoreCanvas) return;
      // Only trigger on actual tap/click, not scroll swipes
      if (
        Math.abs(e.clientX - downX) > 10 ||
        Math.abs(e.clientY - downY) > 10
      ) {
        return;
      }

      const id = nextIdRef.current++;
      const newBurst: TapBurst = {
        id,
        x: e.clientX,
        y: e.clientY,
        particles: createBurstParticles(),
      };

      setBursts((prev) => [...prev.slice(-4), newBurst]);
      window.setTimeout(() => {
        setBursts((prev) => prev.filter((b) => b.id !== id));
      }, 720);
    };

    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, []);

  if (bursts.length === 0) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[90] overflow-hidden"
      aria-hidden="true"
    >
      {bursts.map((burst) => (
        <div
          key={burst.id}
          className="absolute"
          style={{ left: burst.x, top: burst.y }}
        >
          <span className="absolute w-10 h-10 rounded-full border-2 border-[#e6b84c] animate-tap-ring" />
          {burst.particles.map((p) => (
            <span
              key={p.id}
              className="absolute animate-tap-burst"
              style={
                {
                  width: p.shape === "ribbon" ? "3px" : `${p.size}px`,
                  height: p.shape === "ribbon" ? `${p.size * 2.1}px` : `${p.size}px`,
                  borderRadius:
                    p.shape === "circle"
                      ? "9999px"
                      : p.shape === "ribbon"
                        ? "2px"
                        : "1px",
                  backgroundColor: p.color,
                  "--bx": p.dx,
                  "--by": p.dy,
                  "--brot": p.rot,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      ))}
    </div>
  );
}
