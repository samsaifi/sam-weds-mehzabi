"use client";

import { CalendarPlus, Check, Copy, Download, ExternalLink } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  getLocaleFontClass,
  withBasePath,
  type EventConfig,
  type InvitationCopy,
  type Locale,
} from "../data/invitation-data";
import { GoldHeartDivider, RevealSection } from "./Ornaments";

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

/**
 * Top golden gift box flanked by delicate gold filigree curls.
 */
function ScratchGiftCrest() {
  return (
    <svg
      viewBox="0 0 180 54"
      className="mx-auto w-36 sm:w-44 h-auto pointer-events-none mb-0.5 drop-shadow-[0_2px_4px_rgba(125,92,22,0.18)]"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="scratch-gift-gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f2d67d" />
          <stop offset="50%" stopColor="#c99632" />
          <stop offset="100%" stopColor="#8d6214" />
        </linearGradient>
      </defs>
      {/* Left curl flourish */}
      <path
        d="M58 34C48 34 44 27 36 27C30 27 27 31 29 35C31 38 35 37 34 34M49 34C43 37 36 39 28 37"
        stroke="url(#scratch-gift-gold)"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      {/* Right curl flourish */}
      <path
        d="M122 34C132 34 136 27 144 27C150 27 153 31 151 35C149 38 145 37 146 34M131 34C137 37 144 39 152 37"
        stroke="url(#scratch-gift-gold)"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      {/* Gift box ribbon bow */}
      <path
        d="M90 17C85 11 76 9 76 14C76 17 83 18 90 17ZM90 17C95 11 104 9 104 14C104 17 97 18 90 17Z"
        stroke="url(#scratch-gift-gold)"
        strokeWidth="2"
        strokeLinejoin="round"
        fill="rgba(242,214,125,0.22)"
      />
      {/* Gift box lid */}
      <rect
        x="71"
        y="17.5"
        width="38"
        height="7.5"
        rx="1.8"
        stroke="url(#scratch-gift-gold)"
        strokeWidth="2"
        fill="rgba(253,246,226,0.6)"
      />
      {/* Gift box body */}
      <rect
        x="74"
        y="25"
        width="32"
        height="21"
        rx="1.8"
        stroke="url(#scratch-gift-gold)"
        strokeWidth="2"
        fill="rgba(253,246,226,0.45)"
      />
      {/* Vertical ribbon */}
      <rect
        x="87.5"
        y="17.5"
        width="5"
        height="28.5"
        fill="url(#scratch-gift-gold)"
      />
    </svg>
  );
}

/**
 * Compact centered gold filigree scroll flourish for above/below Save the Date.
 */
function ScratchGoldScroll({
  wide = false,
  className = "",
}: {
  wide?: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 220 34"
      className={`mx-auto ${wide ? "w-40 sm:w-48" : "w-32 sm:w-36"} h-auto pointer-events-none ${className}`}
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="scratch-scroll-gold" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#d9b259" stopOpacity="0" />
          <stop offset="22%" stopColor="#c79532" />
          <stop offset="50%" stopColor="#f0d17b" />
          <stop offset="78%" stopColor="#c79532" />
          <stop offset="100%" stopColor="#d9b259" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Horizontal hairlines */}
      <path
        d="M12 16H82M138 16H208"
        stroke="url(#scratch-scroll-gold)"
        strokeWidth="1.2"
      />
      {/* Central fleur */}
      <path
        d="M110 6C112 11 114 14 110 18C106 14 108 11 110 6Z"
        fill="#dfba63"
        stroke="#a17520"
        strokeWidth="0.9"
      />
      <path
        d="M110 18C106 23 108 28 110 30C112 28 114 23 110 18Z"
        fill="#cfa142"
        stroke="#a17520"
        strokeWidth="0.85"
      />
      {/* Symmetrical filigree curls */}
      <path
        d="M107 16C98 15 92 10 85 11C80 12 79 16 83 18C87 20 92 17 97 20C102 23 100 28 94 27M113 16C122 15 128 10 135 11C140 12 141 16 137 18C133 20 128 17 123 20C118 23 120 28 126 27"
        stroke="#b6882b"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle cx="77" cy="16" r="1.4" fill="#c79532" />
      <circle cx="143" cy="16" r="1.4" fill="#c79532" />
    </svg>
  );
}

/**
 * Draw the cream-gold card face with an embossed 3D metallic gold heart
 * directly onto the scratch canvas so the user scratches away the heart/card
 * layer to uncover the wedding date card underneath.
 */
function paintCardHeartFoil(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return;

  const { width, height } = canvas;
  ctx.globalCompositeOperation = "source-over";
  ctx.clearRect(0, 0, width, height);

  // Warm cream parchment foil base matching the reference card inside the envelope
  const cardGrad = ctx.createLinearGradient(0, 0, width, height);
  cardGrad.addColorStop(0, "#fdf9ee");
  cardGrad.addColorStop(0.5, "#f7eed8");
  cardGrad.addColorStop(1, "#ede0c1");
  ctx.fillStyle = cardGrad;
  ctx.fillRect(0, 0, width, height);

  // Subtle parchment stipple grain + soft metallic gold shimmer flecks
  for (let y = 2; y < height; y += 3) {
    for (let x = 2; x < width; x += 3) {
      const hash = ((x * 73856093) ^ (y * 19349663)) >>> 0;
      if (hash % 11 === 0) {
        ctx.fillStyle = "rgba(218, 179, 86, 0.14)";
        ctx.fillRect(x, y, 1.3, 1.3);
      } else if (hash % 17 === 0) {
        ctx.fillStyle = "rgba(155, 118, 42, 0.08)";
        ctx.fillRect(x, y, 1.2, 1.2);
      }
    }
  }

  // Thin brushed-gold inner border lines matching the mockup card
  ctx.strokeStyle = "rgba(196, 148, 48, 0.8)";
  ctx.lineWidth = 1.6;
  ctx.strokeRect(7, 7, width - 14, height - 14);
  ctx.strokeStyle = "rgba(232, 198, 114, 0.55)";
  ctx.lineWidth = 0.8;
  ctx.strokeRect(11, 11, width - 22, height - 22);

  // Subtle radial golden aura behind the heart
  const cx = width * 0.5;
  const cy = height * 0.42;
  const aura = ctx.createRadialGradient(cx, cy, 4, cx, cy, 70);
  aura.addColorStop(0, "rgba(230, 186, 82, 0.28)");
  aura.addColorStop(1, "rgba(230, 186, 82, 0)");
  ctx.fillStyle = aura;
  ctx.fillRect(0, 0, width, height);

  // 3D Puffy Metallic Gold Heart path in upper-center visible area
  const drawHeartPath = (offsetY = 0) => {
    ctx.beginPath();
    ctx.moveTo(cx, cy + 31 + offsetY);
    ctx.bezierCurveTo(
      cx - 6,
      cy + 26 + offsetY,
      cx - 38,
      cy + 6 + offsetY,
      cx - 38,
      cy - 13 + offsetY
    );
    ctx.bezierCurveTo(
      cx - 38,
      cy - 28 + offsetY,
      cx - 21,
      cy - 35 + offsetY,
      cx - 10,
      cy - 27 + offsetY
    );
    ctx.bezierCurveTo(
      cx - 4,
      cy - 23 + offsetY,
      cx - 1,
      cy - 18 + offsetY,
      cx,
      cy - 15 + offsetY
    );
    ctx.bezierCurveTo(
      cx + 1,
      cy - 18 + offsetY,
      cx + 4,
      cy - 23 + offsetY,
      cx + 10,
      cy - 27 + offsetY
    );
    ctx.bezierCurveTo(
      cx + 21,
      cy - 35 + offsetY,
      cx + 38,
      cy - 28 + offsetY,
      cx + 38,
      cy - 13 + offsetY
    );
    ctx.bezierCurveTo(
      cx + 38,
      cy + 6 + offsetY,
      cx + 6,
      cy + 26 + offsetY,
      cx,
      cy + 31 + offsetY
    );
    ctx.closePath();
  };

  // Soft cast drop shadow
  ctx.save();
  ctx.shadowColor = "rgba(104, 72, 16, 0.36)";
  ctx.shadowBlur = 12;
  ctx.shadowOffsetY = 5;
  drawHeartPath();
  const goldGrad = ctx.createRadialGradient(
    cx - 12,
    cy - 18,
    3,
    cx + 4,
    cy + 2,
    46
  );
  goldGrad.addColorStop(0, "#fff4bd");
  goldGrad.addColorStop(0.28, "#f0c85d");
  goldGrad.addColorStop(0.68, "#c8922b");
  goldGrad.addColorStop(1, "#8d5e10");
  ctx.fillStyle = goldGrad;
  ctx.fill();
  ctx.restore();

  // Crisp gold rim
  ctx.save();
  drawHeartPath();
  ctx.strokeStyle = "#8a5c12";
  ctx.lineWidth = 1.4;
  ctx.stroke();

  // Glossy specular sheen on upper-left lobe
  ctx.beginPath();
  ctx.ellipse(cx - 15, cy - 16, 9, 4.5, -0.45, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(255, 252, 232, 0.55)";
  ctx.fill();

  // Secondary subtle highlight on right lobe
  ctx.beginPath();
  ctx.ellipse(cx + 16, cy - 16, 6, 3, 0.45, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(255, 246, 200, 0.28)";
  ctx.fill();
  ctx.restore();
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
    paintCardHeartFoil(canvas);
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
      const angle =
        ((strokeCountRef.current * 47 + i * 72) % 360) * (Math.PI / 180);
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

    if (strokeCountRef.current % 6 === 0) {
      // Sample only the visible upper-center card window (above the envelope V-pocket)
      const imgData = ctx.getImageData(38, 16, 184, 118).data;
      let transparent = 0;
      let sampled = 0;
      for (let i = 3; i < imgData.length; i += 16) {
        sampled += 1;
        if (imgData[i] < 128) transparent += 1;
      }
      if (sampled > 0 && transparent / sampled > 0.3) {
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

  const isEnglish = locale === "en";

  const content = (
    <>
      <div className="text-center">
        {/* Top Gift Box Crest & Heading */}
        <div>
          <ScratchGiftCrest />
          <h2
            className={`${embedded
              ? "text-3xl sm:text-4xl md:text-5xl mb-0.5"
              : "text-4xl md:text-5xl mb-1.5"
              } ${isEnglish
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
          <GoldHeartDivider className="my-2.5" />
        </div>

        {/* Ornate Open Wedding Envelope + Interactive Card Scratch Patch */}
        <div
          className={`relative mx-auto w-full aspect-[300/242] select-none ${embedded
            ? "max-w-[264px] sm:max-w-[296px]"
            : "max-w-[288px] sm:max-w-[324px]"
            }`}
          style={{
            filter: "drop-shadow(0px 12px 22px rgba(96, 68, 16, 0.24))",
          }}
          onDoubleClick={triggerReveal}
        >
          {/* Back Layer: Open Top Envelope Flap & Pocket Interior */}
          <svg
            viewBox="0 0 300 242"
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="env-back-flap" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fdf9ee" />
                <stop offset="100%" stopColor="#efe2c4" />
              </linearGradient>
              <linearGradient id="env-inner-gold" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#e8c775" />
                <stop offset="50%" stopColor="#ca9734" />
                <stop offset="100%" stopColor="#9c6c18" />
              </linearGradient>
              <linearGradient id="env-rim-gold" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#f3d989" />
                <stop offset="50%" stopColor="#c99531" />
                <stop offset="100%" stopColor="#9d6d19" />
              </linearGradient>
            </defs>

            {/* Outer top triangular flap */}
            <path
              d="M36 88 L138 14 Q150 4 162 14 L264 88 L264 224 Q264 230 258 230 L42 230 Q36 230 36 224 Z"
              fill="url(#env-back-flap)"
              stroke="url(#env-rim-gold)"
              strokeWidth="2.4"
              strokeLinejoin="round"
            />
            {/* Rich golden inner flap bevel lining */}
            <path
              d="M44 88 L140 19 Q150 11 160 19 L256 88 L256 112 L44 112 Z"
              fill="url(#env-inner-gold)"
              opacity="0.92"
            />
            {/* Dark warm pocket shadow inside envelope */}
            <path d="M48 86 L252 86 L252 178 L48 178 Z" fill="#6d4b16" opacity="0.28" />
          </svg>

          {/* Middle Layer: Interactive Invitation Insert Card */}
          <div
            className={`absolute left-[18%] right-[18%] z-10 overflow-hidden rounded-[4px] border border-[#cfa142] bg-[#fbf8ee] shadow-[0_2px_10px_rgba(64,46,12,0.18)] transition-transform duration-700 ease-out ${revealed ? "-translate-y-2" : "translate-y-0"
              }`}
            style={{
              top: "14.5%",
              height: "66%",
            }}
          >
            {/* Revealed invitation details underneath */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center px-3 pt-2 pb-10 sm:pb-11 text-center"
              style={{
                backgroundColor: "rgb(251, 249, 244)",
                backgroundImage:
                  "radial-gradient(rgba(255, 254, 250, 0.98) 0%, rgba(246, 239, 223, 0.9) 75%, rgba(235, 220, 184, 0.78) 100%)",
              }}
            >
              {/* Crisp double inner gold frame */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-[5px] rounded-[2px] border border-[#cfa144]/75"
              />
              <p
                className={`text-sm sm:text-base leading-tight mb-0.5 transition-all duration-500 ${isEnglish
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
                className="font-display text-xs sm:text-sm font-bold leading-snug"
                style={{ color: "#1d3b27" }}
              >
                {copy.scratch.date}
              </p>
              <p
                className="font-calligraphic text-[11px] sm:text-xs leading-tight"
                style={{ color: "#2b4d36" }}
              >
                {copy.scratch.day} &bull; {copy.scratch.time}
              </p>
              <span
                aria-hidden="true"
                className="mt-1 inline-block w-1.5 h-1.5 rotate-45 bg-[#c79d42]/85"
              />
            </div>

            {/* Interactive Scratch Foil Canvas (Heart + Parchment Card Surface) */}
            <canvas
              ref={canvasRef}
              width={260}
              height={210}
              className={`absolute inset-0 w-full h-full cursor-crosshair touch-none transition-opacity duration-700 ${revealed ? "opacity-0 pointer-events-none" : "opacity-100"
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
          </div>

          {/* Front Layer: Envelope V-Flaps & Embossed Damask */}
          <svg
            viewBox="0 0 300 242"
            className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-visible"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="env-front-ivory" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fdf9ee" />
                <stop offset="65%" stopColor="#f3e9d2" />
                <stop offset="100%" stopColor="#e8d8b7" />
              </linearGradient>
              <pattern
                id="env-damask-tex"
                width="26"
                height="26"
                patternUnits="userSpaceOnUse"
              >
                <circle
                  cx="13"
                  cy="13"
                  r="6"
                  fill="none"
                  stroke="rgba(182,146,72,0.12)"
                  strokeWidth="0.8"
                />
                <path
                  d="M13 5C15 9 17 11 21 13C17 15 15 17 13 21C11 17 9 15 5 13C9 11 11 9 13 5Z"
                  fill="none"
                  stroke="rgba(182,146,72,0.1)"
                  strokeWidth="0.7"
                />
              </pattern>
            </defs>

            {/* Front Left/Right Crossed Pocket Body */}
            <path
              d="M36 88 L150 174 L264 88 L264 224 Q264 230 258 230 L42 230 Q36 230 36 224 Z"
              fill="url(#env-front-ivory)"
              stroke="#c99834"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M36 88 L150 174 L264 88 L264 224 Q264 230 258 230 L42 230 Q36 230 36 224 Z"
              fill="url(#env-damask-tex)"
            />

            {/* Subtle diagonal flap folds & golden piping */}
            <path
              d="M38 228 L150 156 L262 228"
              fill="none"
              stroke="#d7bc83"
              strokeWidth="1.1"
              opacity="0.75"
            />
            <path
              d="M36 88 L150 174 L264 88"
              fill="none"
              stroke="#fbf3dc"
              strokeWidth="1.2"
              opacity="0.9"
            />
          </svg>

          {/* Gold Satin Ribbon Bow, Wax Seal & Roses Image */}
          <Image
            src={withBasePath("/asset/ribbon.png")}
            alt=""
            width={400}
            height={200}
            aria-hidden="true"
            className="pointer-events-none select-none absolute left-1/2 -translate-x-1/2 bottom-[20%] w-[40%] h-auto z-30 drop-shadow-[0_4px_8px_rgba(78,54,12,0.28)]"
          />
        </div>

        {/* Subtle hint below the envelope */}
        {!revealed && (
          <p className="mt-2.5 text-sm sm:text-base italic whitespace-pre-line leading-snug text-[#1d3b27] font-calligraphic tracking-wide">
            {copy.scratch.hint}
          </p>
        )}
      </div>

      {/* Save the Date Button + Filigree Dividers */}
      <div
        ref={menuWrapperRef}
        className={`${embedded ? "mt-2" : "mt-4"} flex flex-col items-center relative`}
      >
        <ScratchGoldScroll className="mb-2.5" />

        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-expanded={menuOpen}
          className="group inline-flex items-center gap-2.5 rounded-full px-8 py-2.5 text-xs md:text-sm font-semibold uppercase tracking-[0.2em] transition-all duration-300 text-[#fbf5e6] border border-[#d4ae5b] hover:opacity-95 cursor-pointer"
          style={{
            background: "linear-gradient(180deg, #254830 0%, #193422 100%)",
            boxShadow:
              "0 8px 20px -8px rgba(25, 52, 34, 0.55), inset 0 0 0 1px rgba(242, 217, 149, 0.28)",
          }}
        >
          <CalendarPlus className="w-4 h-4 shrink-0" />
          <span>{copy.scratch.saveDate}</span>
        </button>

        {!embedded && <ScratchGoldScroll wide className="mt-5" />}
        {embedded && !revealed && <ScratchGoldScroll wide className="mt-4" />}

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
