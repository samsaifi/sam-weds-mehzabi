"use client";

import { Heart } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function WaveDivider({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 40"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ color: "rgb(107, 125, 85)" }}
      aria-hidden="true"
    >
      <path
        d="M0 20 Q50 5 100 20 Q150 35 200 20 Q250 5 300 20 Q350 35 400 20"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.3"
      />
      <path
        d="M0 20 Q50 10 100 20 Q150 30 200 20 Q250 10 300 20 Q350 30 400 20"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.2"
      />
      <circle cx="50" cy="28" r="2" fill="currentColor" opacity="0.25" />
      <circle cx="100" cy="21" r="2" fill="currentColor" opacity="0.25" />
      <circle cx="150" cy="12" r="2" fill="currentColor" opacity="0.25" />
      <circle cx="200" cy="18" r="2" fill="currentColor" opacity="0.25" />
      <circle cx="250" cy="27.5" r="2" fill="currentColor" opacity="0.25" />
      <circle cx="300" cy="23.3" r="2" fill="currentColor" opacity="0.25" />
      <circle cx="350" cy="13" r="2" fill="currentColor" opacity="0.25" />
    </svg>
  );
}

export function HeartDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-6">
      <div className="w-16 h-px bg-primary/30" />
      <Heart
        size={10}
        className="text-primary opacity-50 fill-current shrink-0"
      />
      <div className="w-16 h-px bg-primary/30" />
    </div>
  );
}

export function GoldHeartDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <div
        className="h-px w-20"
        style={{
          background:
            "linear-gradient(to right, transparent, rgb(138, 122, 78))",
        }}
      />
      <Heart
        size={14}
        className="fill-current shrink-0"
        style={{ color: "rgb(138, 122, 78)" }}
      />
      <div
        className="h-px w-20"
        style={{
          background: "linear-gradient(to left, transparent, rgb(138, 122, 78))",
        }}
      />
    </div>
  );
}

export function CornerFlourish({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M5 5C5 5 20 10 30 25C40 40 35 55 25 60C15 65 10 55 15 45C20 35 35 30 45 35C55 40 50 55 40 60"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M10 2C10 2 25 8 32 20C39 32 36 42 30 46"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.3"
      />
      <circle cx="30" cy="25" r="2" fill="currentColor" opacity="0.4" />
      <circle cx="25" cy="60" r="1.5" fill="currentColor" opacity="0.3" />
      <circle cx="45" cy="35" r="1.5" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

export function RevealSection({
  children,
  className = "",
  withTopWave = true,
}: {
  children: React.ReactNode;
  className?: string;
  withTopWave?: boolean;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const checkVisible = () => {
      const rect = el.getBoundingClientRect();
      if (rect.top <= window.innerHeight + 80) {
        setVisible(true);
        return true;
      }
      return false;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.01, rootMargin: "80px 0px 80px 0px" }
    );
    observer.observe(el);

    const onScroll = () => {
      if (checkVisible()) {
        observer.disconnect();
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    const rafId = window.requestAnimationFrame(onScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      ref={ref}
      className={`py-16 md:py-20 px-[clamp(3.75rem,15vw,15rem)] relative overflow-hidden reveal-section ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(32px)",
      }}
    >
      {withTopWave && (
        <WaveDivider className="absolute top-0 left-1/2 w-[70%] max-w-xl -translate-x-1/2 pointer-events-none" />
      )}
      {children}
    </section>
  );
}
