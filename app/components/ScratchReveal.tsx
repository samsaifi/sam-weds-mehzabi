"use client";

import { CalendarPlus, Check, Copy, Download, ExternalLink } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  getLocaleFontClass,
  type EventConfig,
  type InvitationCopy,
  type Locale,
} from "../data/invitation-data";
import { HeartDivider, RevealSection } from "./Ornaments";

interface ConfettiPiece {
  id: number;
  left: string;
  dx: string;
  rot: string;
  dur: string;
  size: number;
  color: string;
  isRibbon: boolean;
}

const CONFETTI_COLORS = [
  "#dfad49",
  "#f0c775",
  "#4a5c3d",
  "#8a7a4e",
  "#dd3c3c",
  "#3c8cdd",
];

function createConfettiPieces(): ConfettiPiece[] {
  return Array.from({ length: 48 }, (_, i) => ({
    id: i,
    left: `${(i * 2.1 + (i % 7) * 3) % 98}%`,
    dx: `${(i % 2 === 0 ? 1 : -1) * (20 + ((i * 17) % 80))}px`,
    rot: `${(i % 2 === 0 ? 1 : -1) * (360 + ((i * 73) % 540))}deg`,
    dur: `${2.2 + (i % 5) * 0.35}s`,
    size: 6 + (i % 5),
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    isRibbon: i % 4 === 0,
  }));
}

export function ScratchReveal({
  copy,
  eventConfig,
  locale,
}: {
  copy: InvitationCopy;
  eventConfig: EventConfig;
  locale: Locale;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const strokeCountRef = useRef(0);
  const [revealed, setRevealed] = useState(false);
  const [hasScratched, setHasScratched] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiPieces, setConfettiPieces] = useState<ConfettiPiece[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const menuWrapperRef = useRef<HTMLDivElement | null>(null);

  const paintScratchSurface = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const { width, height } = canvas;
    ctx.globalCompositeOperation = "source-over";
    ctx.clearRect(0, 0, width, height);

    // Base puffed metallic sage-silver foil gradient
    const baseGrad = ctx.createRadialGradient(
      width * 0.38,
      height * 0.28,
      8,
      width * 0.5,
      height * 0.48,
      width * 0.65
    );
    baseGrad.addColorStop(0, "#eef1e8");
    baseGrad.addColorStop(0.28, "#ced5c3");
    baseGrad.addColorStop(0.62, "#9eab90");
    baseGrad.addColorStop(0.88, "#7e8e70");
    baseGrad.addColorStop(1, "#67765b");
    ctx.fillStyle = baseGrad;
    ctx.fillRect(0, 0, width, height);

    // Diagonal metallic foil sheen bands
    const sheenGrad = ctx.createLinearGradient(0, 0, width, height);
    sheenGrad.addColorStop(0, "rgba(255, 255, 255, 0.16)");
    sheenGrad.addColorStop(0.35, "rgba(255, 255, 255, 0)");
    sheenGrad.addColorStop(0.5, "rgba(255, 255, 255, 0.22)");
    sheenGrad.addColorStop(0.65, "rgba(255, 255, 255, 0)");
    sheenGrad.addColorStop(1, "rgba(35, 48, 28, 0.18)");
    ctx.fillStyle = sheenGrad;
    ctx.fillRect(0, 0, width, height);

    // Brushed metallic foil micro-lines
    ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
    ctx.lineWidth = 1;
    for (let i = -height; i < width + height; i += 4) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i - height * 0.6, height);
      ctx.stroke();
    }

    // Fine metallic foil grain & sparkle flecks (deterministic pattern)
    for (let y = 3; y < height; y += 5) {
      for (let x = 3; x < width; x += 5) {
        const hash = ((x * 73856093) ^ (y * 19349663)) >>> 0;
        if (hash % 11 === 0) {
          ctx.fillStyle = "rgba(255, 255, 255, 0.24)";
          ctx.fillRect(x, y, 1.5, 1.5);
        } else if (hash % 17 === 0) {
          ctx.fillStyle = "rgba(42, 56, 35, 0.12)";
          ctx.fillRect(x, y, 1.5, 1.5);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (!revealed) {
      paintScratchSurface();
    }
  }, [revealed, paintScratchSurface]);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (
        menuWrapperRef.current &&
        !menuWrapperRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const triggerReveal = useCallback(() => {
    if (revealed) return;
    setRevealed(true);
    setConfettiPieces(createConfettiPieces());
    setShowConfetti(true);
    window.setTimeout(() => setShowConfetti(false), 3400);
  }, [revealed]);

  const scratchAt = (clientX: number, clientY: number, isStart = false) => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    if (!hasScratched) {
      setHasScratched(true);
    }

    ctx.save();
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 38;
    ctx.strokeStyle = "rgba(0,0,0,1)";
    ctx.fillStyle = "rgba(0,0,0,1)";

    if (isStart || !lastPointRef.current) {
      ctx.beginPath();
      ctx.arc(x, y, 19, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    }

    // Irregular foil-flake edge flecks for authentic scratch texture
    for (let i = 0; i < 5; i += 1) {
      const angle = ((strokeCountRef.current * 47 + i * 72) % 360) * (Math.PI / 180);
      const dist = 16 + ((strokeCountRef.current + i * 3) % 9);
      ctx.beginPath();
      ctx.arc(
        x + Math.cos(angle) * dist,
        y + Math.sin(angle) * dist,
        3.5,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }
    ctx.restore();

    lastPointRef.current = { x, y };
    strokeCountRef.current += 1;

    if (strokeCountRef.current % 8 === 0) {
      // Sample core heart area (avoids outer clipped corners)
      const imgData = ctx.getImageData(40, 30, 180, 175).data;
      let transparent = 0;
      let sampled = 0;
      for (let i = 3; i < imgData.length; i += 16) {
        sampled += 1;
        if (imgData[i] < 128) transparent += 1;
      }
      if (sampled > 0 && transparent / sampled > 0.42) {
        triggerReveal();
      }
    }
  };

  const handleDownloadIcs = () => {
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Royal Grace//Wedding Invitation//EN",
      "BEGIN:VEVENT",
      `DTSTART:${eventConfig.calendarStartUtc}`,
      `DTEND:${eventConfig.calendarEndUtc}`,
      `SUMMARY:${eventConfig.calendarTitle}`,
      `LOCATION:${eventConfig.calendarLocation}`,
      `DESCRIPTION:${eventConfig.calendarDescription}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = eventConfig.icsFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setMenuOpen(false);
  };

  const handleCopyDetails = async () => {
    try {
      await navigator.clipboard.writeText(eventConfig.copySummary);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback ignored if clipboard blocked
    }
  };

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventConfig.calendarTitle)}&dates=${encodeURIComponent(`${eventConfig.calendarStartUtc}/${eventConfig.calendarEndUtc}`)}&details=${encodeURIComponent(eventConfig.calendarDescription)}&location=${encodeURIComponent(eventConfig.calendarLocation)}`;

  return (
    <RevealSection>
      <div className="text-center">
        <svg width="0" height="0" aria-hidden="true" className="absolute">
          <defs>
            <clipPath id="royal-heart-clip" clipPathUnits="objectBoundingBox">
              <path d="M0.5,0.96 C0.5,0.96 0.06,0.70 0.06,0.36 C0.06,0.18 0.20,0.06 0.32,0.06 C0.42,0.06 0.48,0.14 0.5,0.24 C0.52,0.14 0.58,0.06 0.68,0.06 C0.80,0.06 0.94,0.18 0.94,0.36 C0.94,0.70 0.5,0.96 0.5,0.96 Z" />
            </clipPath>
          </defs>
        </svg>

        <div>
          <h2
            className={`text-4xl md:text-5xl mb-3 ${
              locale === "en"
                ? "font-calligraphy"
                : `${getLocaleFontClass(locale, "")} font-bold`
            }`}
            style={{
              color: "rgb(74, 92, 61)",
              textShadow: "rgba(250, 249, 244, 0.8) 0px 1px 6px",
            }}
          >
            {copy.scratch.title}
          </h2>
          <HeartDivider />
        </div>

        {/* Heart Scratch Card Patch with outer drop shadow */}
        <div
          className="relative mx-auto aspect-[13/12] w-full max-w-[220px] sm:max-w-[260px] select-none"
          style={{
            filter: "drop-shadow(0px 12px 20px rgba(45, 58, 36, 0.34))",
          }}
          onDoubleClick={triggerReveal}
        >
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: 'url("#royal-heart-clip")' }}
          >
            {/* Revealed invitation details underneath */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
              style={{
                backgroundColor: "rgb(249, 247, 241)",
                backgroundImage:
                  "radial-gradient(rgba(254, 253, 251, 0.92) 0%, rgba(239, 234, 220, 0.6) 70%, rgba(226, 219, 202, 0.72) 100%), radial-gradient(circle at 1px 1px, rgba(68, 89, 54, 0.1) 1px, transparent 1.5px), repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.03) 0px, rgba(0, 0, 0, 0.03) 1px, transparent 1px, transparent 8px), repeating-linear-gradient(-45deg, rgba(0, 0, 0, 0.025) 0px, rgba(0, 0, 0, 0.025) 1px, transparent 1px, transparent 10px)",
                backgroundSize: "auto, 12px 12px, auto, auto",
              }}
            >
              <p
                className={`text-xl mb-1 transition-all duration-500 ${
                  locale === "en"
                    ? "font-calligraphic italic"
                    : getLocaleFontClass(locale, "")
                }`}
                style={{
                  color: "rgb(74, 92, 61)",
                  opacity: revealed || hasScratched ? 1 : 0,
                  transform: revealed ? "scale(1)" : "scale(0.95)",
                }}
              >
                {copy.scratch.revealLabel}
              </p>
              <p
                className="font-display text-base font-bold"
                style={{ color: "rgb(39, 51, 31)" }}
              >
                {copy.scratch.date}
              </p>
              <p
                className="font-calligraphic text-sm"
                style={{ color: "rgb(79, 100, 64)" }}
              >
                {copy.scratch.day}
              </p>
              <p
                className="text-[10px] mt-1"
                style={{ color: "rgb(95, 109, 85)" }}
              >
                {copy.scratch.time}
              </p>
            </div>

            {/* Interactive Metallic Scratch Foil Canvas */}
            <canvas
              ref={canvasRef}
              width={260}
              height={240}
              className={`absolute inset-0 w-full h-full cursor-crosshair touch-none transition-opacity duration-700 ${
                revealed ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
              onPointerDown={(e) => {
                e.currentTarget.setPointerCapture(e.pointerId);
                isDrawingRef.current = true;
                scratchAt(e.clientX, e.clientY, true);
              }}
              onPointerMove={(e) => {
                if (isDrawingRef.current) {
                  scratchAt(e.clientX, e.clientY);
                }
              }}
              onPointerUp={(e) => {
                if (e.currentTarget.hasPointerCapture(e.pointerId)) {
                  e.currentTarget.releasePointerCapture(e.pointerId);
                }
                isDrawingRef.current = false;
                lastPointRef.current = null;
              }}
              onPointerCancel={() => {
                isDrawingRef.current = false;
                lastPointRef.current = null;
              }}
            />

            {/* 3D Puffed Foil Rim Vignette & Specular Gloss */}
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(rgba(0, 0, 0, 0) 68%, rgba(25, 34, 18, 0.28) 88%, rgba(16, 22, 11, 0.5) 100%)",
                mixBlendMode: "multiply",
              }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(at 36% 24%, rgba(255, 255, 255, 0.34) 0%, rgba(255, 255, 255, 0.08) 24%, rgba(255, 255, 255, 0) 46%)",
              }}
            />
          </div>

          {/* Crisp sage border outline */}
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 w-full h-full pointer-events-none"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M50,96 C50,96 6,70 6,36 C6,18 20,6 32,6 C42,6 48,14 50,24 C52,14 58,6 68,6 C80,6 94,18 94,36 C94,70 50,96 50,96 Z"
              fill="none"
              stroke="hsl(95, 22%, 32%)"
              strokeWidth="1.2"
              vectorEffect="non-scaling-stroke"
              opacity="0.7"
            />
          </svg>
        </div>

        {/* Subtle hint below the heart foil patch */}
        {!revealed && (
          <p className="mt-3 text-xs italic text-muted-foreground/85 font-calligraphic tracking-wide">
            {copy.scratch.hint}
          </p>
        )}
      </div>

      {/* Save the Date Button + Calendar Dropdown */}
      <div
        ref={menuWrapperRef}
        className="mt-8 flex flex-col items-center relative"
      >
        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-expanded={menuOpen}
          className="group inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs md:text-sm font-semibold uppercase tracking-[0.18em] transition-all duration-300 bg-primary text-primary-foreground hover:opacity-95 cursor-pointer"
          style={{
            boxShadow: "rgba(0, 0, 0, 0.45) 0px 12px 30px -12px",
          }}
        >
          <CalendarPlus className="w-4 h-4" />
          <span>{copy.scratch.saveDate}</span>
        </button>

        {menuOpen && (
          <div className="mt-3 w-60 rounded-xl border border-primary/25 bg-[#faf7ef]/95 backdrop-blur-md shadow-elegant p-1.5 z-30 text-left">
            <a
              href={googleCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium text-foreground hover:bg-primary/10 transition-colors"
            >
              <span>{copy.scratch.addToGoogle}</span>
              <ExternalLink className="w-3.5 h-3.5 text-primary" />
            </a>
            <button
              type="button"
              onClick={handleDownloadIcs}
              className="w-full flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium text-foreground hover:bg-primary/10 transition-colors cursor-pointer"
            >
              <span>{copy.scratch.downloadIcs}</span>
              <Download className="w-3.5 h-3.5 text-primary" />
            </button>
            <button
              type="button"
              onClick={handleCopyDetails}
              className="w-full flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium text-foreground hover:bg-primary/10 transition-colors cursor-pointer"
            >
              <span>
                {copied ? copy.scratch.copied : copy.scratch.copyDetails}
              </span>
              {copied ? (
                <Check className="w-3.5 h-3.5 text-primary" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-primary" />
              )}
            </button>
          </div>
        )}
      </div>

      {/* Celebratory Confetti Overlay */}
      {showConfetti && (
        <div
          className="fixed inset-0 pointer-events-none z-[80] overflow-hidden"
          aria-hidden="true"
        >
          {confettiPieces.map((piece) => (
            <div
              key={piece.id}
              className="absolute animate-confetti"
              style={
                {
                  left: piece.left,
                  top: "-6%",
                  width: piece.isRibbon ? "3px" : `${piece.size}px`,
                  height: piece.isRibbon
                    ? `${piece.size * 4}px`
                    : `${piece.size}px`,
                  borderRadius: piece.isRibbon ? "2px" : "50%",
                  background: piece.color,
                  "--confetti-dx": piece.dx,
                  "--confetti-rot": piece.rot,
                  "--confetti-dur": piece.dur,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      )}
    </RevealSection>
  );
}
