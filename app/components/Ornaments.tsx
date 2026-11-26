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
            "linear-gradient(to right, transparent, rgb(184, 146, 66))",
        }}
      />
      <svg
        viewBox="0 0 24 24"
        className="w-3.5 h-3.5 shrink-0 drop-shadow-[0_1px_2px_rgba(120,86,20,0.35)]"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="metallic-gold-heart" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f6df90" />
            <stop offset="50%" stopColor="#cf9f3c" />
            <stop offset="100%" stopColor="#946818" />
          </linearGradient>
        </defs>
        <path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          fill="url(#metallic-gold-heart)"
          stroke="#7e5712"
          strokeWidth="0.9"
        />
      </svg>
      <div
        className="h-px w-20"
        style={{
          background: "linear-gradient(to left, transparent, rgb(184, 146, 66))",
        }}
      />
    </div>
  );
}

export function GoldBotanicalCrest({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 180 34"
      className={`mx-auto w-36 sm:w-44 h-auto pointer-events-none ${className}`}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M90 29C84 23 82 14 86 7C89 12 91 12 94 7C98 14 96 23 90 29Z"
        stroke="#b88e36"
        strokeWidth="1.2"
        fill="rgba(223,179,73,0.2)"
      />
      <path
        d="M84 22C70 22 54 18 40 12M96 22C110 22 126 18 140 12"
        stroke="#b88e36"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <path
        d="M72 19C68 13 62 11 58 14C62 18 67 20 72 19ZM108 19C112 13 118 11 122 14C118 18 113 20 108 19Z"
        fill="rgba(218,175,72,0.45)"
        stroke="#a77d28"
        strokeWidth="0.9"
      />
      <path
        d="M57 16C53 10 47 9 44 12C48 15 52 17 57 16ZM123 16C127 10 133 9 136 12C132 15 128 17 123 16Z"
        fill="rgba(218,175,72,0.45)"
        stroke="#a77d28"
        strokeWidth="0.9"
      />
    </svg>
  );
}

export function GoldHeartCrest({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 56"
      className={`mx-auto w-44 sm:w-52 h-auto pointer-events-none drop-shadow-[0_2px_4px_rgba(125,92,22,0.22)] ${className}`}
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="crest-gold-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f3d883" />
          <stop offset="50%" stopColor="#c79532" />
          <stop offset="100%" stopColor="#946817" />
        </linearGradient>
      </defs>
      {/* Outlined metallic gold heart */}
      <path
        d="M110 34C110 34 94 23.5 94 13.5C94 8.5 98 5 102.5 5C106 5 108.8 7.2 110 10.2C111.2 7.2 114 5 117.5 5C122 5 126 8.5 126 13.5C126 23.5 110 34 110 34Z"
        stroke="url(#crest-gold-stroke)"
        strokeWidth="2.1"
        strokeLinejoin="round"
        fill="rgba(246,223,144,0.12)"
      />
      {/* Symmetrical gold filigree scrollwork */}
      <path
        d="M110 34V47M110 42C96 42 84 35 72 34C62 33 56 38 60 43C63 46 68 45 67 41M110 42C124 42 136 35 148 34C158 33 164 38 160 43C157 46 152 45 153 41"
        stroke="url(#crest-gold-stroke)"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
      <path
        d="M100 38C93 33 88 27 83 25M120 38C127 33 132 27 137 25M92 41C85 45 77 45 72 42M128 41C135 45 143 45 148 42"
        stroke="url(#crest-gold-stroke)"
        strokeWidth="1.05"
        strokeLinecap="round"
      />
      <circle cx="82" cy="25" r="1.4" fill="#c79532" />
      <circle cx="138" cy="25" r="1.4" fill="#c79532" />
    </svg>
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
  snap = true,
}: {
  children: React.ReactNode;
  className?: string;
  withTopWave?: boolean;
  snap?: boolean;
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
      data-snap-section={snap ? "true" : undefined}
      className={`py-14 md:py-18 px-[clamp(3.75rem,15vw,15rem)] relative overflow-hidden reveal-section ${
        snap ? "min-h-[100svh] flex flex-col justify-center" : ""
      } ${className}`}
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
