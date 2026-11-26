"use client";

import { CalendarPlus, Check, Copy, Download, ExternalLink } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  getLocaleFontClass,
  type EventConfig,
  type InvitationCopy,
  type Locale,
} from "../data/invitation-data";
import { GoldBotanicalCrest, GoldHeartDivider, RevealSection } from "./Ornaments";

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
  embedded = false,
  onReveal,
}: {
  copy: InvitationCopy;
  eventConfig: EventConfig;
  locale: Locale;
  embedded?: boolean;
  onReveal?: () => void;
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

    // Base luxurious brushed gold metallic foil gradient
    const baseGrad = ctx.createRadialGradient(
      width * 0.34,
      height * 0.26,
      10,
      width * 0.5,
      height * 0.5,
      width * 0.68
    );
    baseGrad.addColorStop(0, "#faeaab");
    baseGrad.addColorStop(0.28, "#e6c05e");
    baseGrad.addColorStop(0.6, "#c89632");
    baseGrad.addColorStop(0.88, "#a6751d");
    baseGrad.addColorStop(1, "#875c11");
    ctx.fillStyle = baseGrad;
    ctx.fillRect(0, 0, width, height);

    // Diagonal metallic gold sheen bands
    const sheenGrad = ctx.createLinearGradient(0, 0, width, height);
    sheenGrad.addColorStop(0, "rgba(255, 248, 214, 0.28)");
    sheenGrad.addColorStop(0.35, "rgba(255, 255, 255, 0)");
    sheenGrad.addColorStop(0.5, "rgba(255, 247, 205, 0.35)");
    sheenGrad.addColorStop(0.68, "rgba(255, 255, 255, 0)");
    sheenGrad.addColorStop(1, "rgba(104, 68, 8, 0.24)");
    ctx.fillStyle = sheenGrad;
    ctx.fillRect(0, 0, width, height);

    // Brushed gold foil streaks
    ctx.strokeStyle = "rgba(255, 246, 200, 0.16)";
    ctx.lineWidth = 1;
    for (let i = -height; i < width + height; i += 3) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i - height * 0.65, height);
      ctx.stroke();
    }

    // Fine metallic gold glitter & depth flecks (deterministic)
    for (let y = 3; y < height; y += 4) {
      for (let x = 3; x < width; x += 4) {
        const hash = ((x * 73856093) ^ (y * 19349663)) >>> 0;
        if (hash % 9 === 0) {
          ctx.fillStyle = "rgba(255, 250, 224, 0.32)";
          ctx.fillRect(x, y, 1.5, 1.5);
        } else if (hash % 13 === 0) {
          ctx.fillStyle = "rgba(110, 74, 12, 0.18)";
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
    onReveal?.();
    setConfettiPieces(createConfettiPieces());
    setShowConfetti(true);
    window.setTimeout(() => setShowConfetti(false), 3400);
  }, [revealed, onReveal]);

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

  const content = (
    <>
      <div className="text-center">
        <svg width="0" height="0" aria-hidden="true" className="absolute">
          <defs>
            <clipPath id="royal-heart-clip" clipPathUnits="objectBoundingBox">
              <path d="M0.5,0.96 C0.5,0.96 0.06,0.70 0.06,0.36 C0.06,0.18 0.20,0.06 0.32,0.06 C0.42,0.06 0.48,0.14 0.5,0.24 C0.52,0.14 0.58,0.06 0.68,0.06 C0.80,0.06 0.94,0.18 0.94,0.36 C0.94,0.70 0.5,0.96 0.5,0.96 Z" />
            </clipPath>
          </defs>
        </svg>

        <div>
          <GoldBotanicalCrest className="mb-1" />
          <h2
            className={`${
              embedded ? "text-3xl sm:text-4xl md:text-5xl mb-1" : "text-4xl md:text-5xl mb-2"
            } ${
              locale === "en"
                ? "font-calligraphy"
                : `${getLocaleFontClass(locale, "")} font-bold`
            }`}
            style={{
              color: "#1d3b27",
              textShadow: "rgba(250, 249, 244, 0.85) 0px 1px 6px",
            }}
          >
            {copy.scratch.title}
          </h2>
          <GoldHeartDivider className="my-3" />
        </div>

        {/* Heart Scratch Card Patch with outer drop shadow */}
        <div
          className={`relative mx-auto aspect-[13/12] w-full select-none ${
            embedded ? "max-w-[195px] sm:max-w-[230px]" : "max-w-[230px] sm:max-w-[270px]"
          }`}
          style={{
            filter: "drop-shadow(0px 12px 22px rgba(96, 68, 16, 0.34))",
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
                backgroundColor: "rgb(251, 249, 244)",
                backgroundImage:
                  "radial-gradient(rgba(255, 254, 250, 0.96) 0%, rgba(245, 239, 224, 0.85) 70%, rgba(232, 217, 180, 0.72) 100%)",
              }}
            >
              <p
                className={`text-lg sm:text-xl mb-1 transition-all duration-500 ${
                  locale === "en"
                    ? "font-calligraphic italic"
                    : getLocaleFontClass(locale, "")
                }`}
                style={{
                  color: "#1d3b27",
                  opacity: revealed || hasScratched ? 1 : 0,
                  transform: revealed ? "scale(1)" : "scale(0.95)",
                }}
              >
                {copy.scratch.revealLabel}
              </p>
              <p
                className="font-display text-sm sm:text-base font-bold"
                style={{ color: "#1d3b27" }}
              >
                {copy.scratch.date}
              </p>
              <p
                className="font-calligraphic text-xs sm:text-sm"
                style={{ color: "#2b4d36" }}
              >
                {copy.scratch.day}
              </p>
              <p
                className="font-display text-[11px] font-semibold mt-0.5"
                style={{ color: "#2b4d36" }}
              >
                {copy.scratch.time}
              </p>
              <span
                aria-hidden="true"
                className="mt-1 inline-block w-1.5 h-1.5 rotate-45 bg-[#c79d42]/80"
              />
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

          {/* Crisp metallic gold rim outline */}
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 w-full h-full pointer-events-none"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M50,96 C50,96 6,70 6,36 C6,18 20,6 32,6 C42,6 48,14 50,24 C52,14 58,6 68,6 C80,6 94,18 94,36 C94,70 50,96 50,96 Z"
              fill="none"
              stroke="#b88826"
              strokeWidth="1.8"
              vectorEffect="non-scaling-stroke"
              opacity="0.88"
            />
          </svg>

          {/* Golden embossed lotus scratch coin resting on the edge */}
          {!revealed && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-1 right-1 sm:right-2 w-10 h-10 sm:w-12 sm:h-12 rounded-full transition-opacity duration-500"
              style={{
                opacity: hasScratched ? 0.5 : 1,
                filter: "drop-shadow(0 6px 10px rgba(72, 48, 8, 0.38))",
              }}
            >
              <svg viewBox="0 0 48 48" className="w-full h-full">
                <defs>
                  <radialGradient id="gold-coin-grad" cx="35%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#fbe9a7" />
                    <stop offset="55%" stopColor="#d8a63c" />
                    <stop offset="100%" stopColor="#946716" />
                  </radialGradient>
                </defs>
                <circle
                  cx="24"
                  cy="24"
                  r="21"
                  fill="url(#gold-coin-grad)"
                  stroke="#7b530e"
                  strokeWidth="1.5"
                />
                <circle
                  cx="24"
                  cy="24"
                  r="17.5"
                  fill="none"
                  stroke="#fef3c7"
                  strokeWidth="0.9"
                  opacity="0.7"
                />
                {/* Embossed lotus motif */}
                <path
                  d="M24 13C26.5 17 26.5 22 24 26C21.5 22 21.5 17 24 13Z"
                  fill="none"
                  stroke="#7b530e"
                  strokeWidth="1.2"
                />
                <path
                  d="M24 26C19 24.5 15.5 20.5 15.5 16.5C19 17.5 22 21 24 26ZM24 26C29 24.5 32.5 20.5 32.5 16.5C29 17.5 26 21 24 26Z"
                  fill="none"
                  stroke="#7b530e"
                  strokeWidth="1.15"
                />
                <path
                  d="M14.5 27.5C18 28.5 21.5 28 24 26C26.5 28 30 28.5 33.5 27.5"
                  fill="none"
                  stroke="#7b530e"
                  strokeWidth="1.1"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Subtle hint below the heart foil patch */}
        {!revealed && (
          <p className="mt-2.5 text-xs italic text-[#4e6147] font-calligraphic tracking-wide">
            {copy.scratch.hint}
          </p>
        )}
      </div>

      {/* Save the Date Button + Calendar Dropdown */}
      <div
        ref={menuWrapperRef}
        className={`${embedded ? "mt-4" : "mt-7"} flex flex-col items-center relative`}
      >
        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-expanded={menuOpen}
          className="group inline-flex items-center gap-2 rounded-full px-7 py-2.5 text-xs md:text-sm font-semibold uppercase tracking-[0.18em] transition-all duration-300 text-[#fbf5e6] border border-[#cfa856] hover:opacity-95 cursor-pointer"
          style={{
            background: "linear-gradient(180deg, #254830 0%, #193422 100%)",
            boxShadow:
              "0 8px 20px -8px rgba(25, 52, 34, 0.55), inset 0 0 0 1px rgba(235, 206, 132, 0.25)",
          }}
        >
          <CalendarPlus className="w-4 h-4" />
          <span>{copy.scratch.saveDate}</span>
        </button>

        {menuOpen && (
          <div className="absolute top-full mt-2 w-60 rounded-xl border border-primary/25 bg-[#faf7ef]/95 backdrop-blur-md shadow-elegant p-1.5 z-30 text-left">
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
    </>
  );

  return embedded ? <div>{content}</div> : <RevealSection>{content}</RevealSection>;
}
