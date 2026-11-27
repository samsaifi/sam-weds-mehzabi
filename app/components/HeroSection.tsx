"use client";

import { useEffect, useRef, useState } from "react";
import {
  getLocaleFontClass,
  type InvitationCopy,
  type Locale,
} from "../data/invitation-data";

/**
 * Top golden three-petal botanical fleur crest inside the hero arch.
 */
function HeroGoldFleurCrest() {
  return (
    <svg
      viewBox="0 0 64 46"
      className="mx-auto w-9 sm:w-11 h-auto mb-2 pointer-events-none drop-shadow-[0_1px_4px_rgba(255,250,235,0.8)]"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="hero-fleur-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f2d67d" />
          <stop offset="50%" stopColor="#c9932b" />
          <stop offset="100%" stopColor="#946513" />
        </linearGradient>
      </defs>
      {/* Center upright leaf/petal */}
      <path
        d="M32 6C35 12 36 18 32 23C28 18 29 12 32 6Z"
        fill="url(#hero-fleur-gold)"
      />
      {/* Left & right arched petals */}
      <path
        d="M30 24C22 18 15 18 11 23C17 26 24 27 30 24ZM34 24C42 18 49 18 53 23C47 26 40 27 34 24Z"
        fill="url(#hero-fleur-gold)"
      />
      {/* Curled lower scrolls */}
      <path
        d="M31 24C28 31 21 34 15 31C18 36 25 36 30 30M33 24C36 31 43 34 49 31C46 36 39 36 34 30"
        stroke="url(#hero-fleur-gold)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Bottom finial */}
      <path
        d="M32 27L35 34L32 40L29 34Z"
        fill="url(#hero-fleur-gold)"
      />
      <circle cx="24" cy="14" r="1.4" fill="#c9932b" />
      <circle cx="40" cy="14" r="1.4" fill="#c9932b" />
    </svg>
  );
}

/**
 * Tapered metallic gold divider with centered diamond rosette.
 */
function HeroGoldDiamondDivider({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 22"
      className={`mx-auto w-44 sm:w-56 h-auto pointer-events-none ${className}`}
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="hero-div-l" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#d9b259" stopOpacity="0" />
          <stop offset="100%" stopColor="#b88422" />
        </linearGradient>
        <linearGradient id="hero-div-r" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#b88422" />
          <stop offset="100%" stopColor="#d9b259" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="hero-div-gem" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f5db89" />
          <stop offset="100%" stopColor="#a7741a" />
        </linearGradient>
      </defs>
      {/* Left tapered wedge bar */}
      <path d="M12 11L94 9.2L98 11L94 12.8Z" fill="url(#hero-div-l)" />
      {/* Right tapered wedge bar */}
      <path d="M208 11L126 9.2L122 11L126 12.8Z" fill="url(#hero-div-r)" />
      {/* Center diamond rosette */}
      <path
        d="M110 3L113.5 7.5L118 11L113.5 14.5L110 19L106.5 14.5L102 11L106.5 7.5Z"
        fill="url(#hero-div-gem)"
      />
      <circle cx="100" cy="11" r="1.2" fill="#b88422" />
      <circle cx="120" cy="11" r="1.2" fill="#b88422" />
    </svg>
  );
}

export function HeroSection({
  copy,
  videoSrc,
  revealAtSeconds,
  locale,
  isMuted,
  onVideoStart,
  onVideoEnd,
}: {
  copy: InvitationCopy;
  videoSrc: string;
  revealAtSeconds: number;
  locale: Locale;
  isMuted: boolean;
  onVideoStart?: () => void;
  onVideoEnd?: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [textRevealed, setTextRevealed] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = isMuted;
  }, [isMuted]);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.currentTime >= revealAtSeconds) {
      if (!textRevealed) setTextRevealed(true);
    } else if (textRevealed) {
      setTextRevealed(false);
    }
  };

  const handleTapVideo = async () => {
    const video = videoRef.current;
    if (!video) return;

    // Once playback starts or completes, tapping must not pause or interrupt the video
    if (hasStarted || video.ended || !video.paused) {
      return;
    }

    setHasStarted(true);
    video.muted = false;
    onVideoStart?.();
    try {
      await video.play();
    } catch {
      setHasStarted(false);
    }
  };

  return (
    <section
      data-snap-section="true"
      className="relative min-h-[100svh] w-full overflow-hidden flex items-center justify-center"
      style={{ backgroundColor: "rgb(15, 15, 15)" }}
    >
      <video
        ref={videoRef}
        src={videoSrc}
        className={`absolute inset-0 h-full w-full object-cover ${hasStarted ? "cursor-default" : "cursor-pointer"
          }`}
        playsInline
        preload="auto"
        disablePictureInPicture
        controlsList="nodownload noplaybackrate noremoteplayback nofullscreen"
        onClick={handleTapVideo}
        onPause={() => {
          const video = videoRef.current;
          if (video && hasStarted && !video.ended) {
            video.play().catch(() => { });
          }
        }}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => {
          setTextRevealed(true);
          onVideoEnd?.();
        }}
      />

      {/* Arch typography overlay: hidden until revealAtSeconds into the video */}
      <div
        aria-hidden={!textRevealed}
        className="relative bg-white/30 z-10 flex w-full max-w-[230px]  mx-auto flex-col items-center justify-center px-6 pt-12 sm:pt-14 pb-8 text-center pointer-events-none transition-all duration-1000 ease-out"
        style={{
          opacity: textRevealed ? 1 : 0,
          transform: textRevealed ? "translateY(0px)" : "translateY(28px)",
        }}
      >
        <HeroGoldFleurCrest />

        {copy.bismillahArabic && (
          <p
            dir="rtl"
            lang="ar"
            className="font-amiri text-3xl   font-bold leading-relaxed whitespace-nowrap"
            style={{
              color: "#153e24",
              textShadow:
                "rgba(255, 252, 240, 0.94) 0px 1px 10px, rgba(255, 255, 255, 0.72) 0px 2px 16px",
            }}
          >
            {copy.bismillahArabic}
          </p>
        )}

        <HeroGoldDiamondDivider className="my-2.5 sm:my-3" />

        {copy.bismillahTranslation && (
          <p
            className={`whitespace-pre-line font-bold text-lg  text-[#153e24]  leading-snug ${getLocaleFontClass(
              locale,
              "font-calligraphic"
            )}`}
            style={{

              textShadow: "rgba(255, 252, 244, 0.92) 0px 1px 10px",
            }}
          >
            {copy.bismillahTranslation}
          </p>
        )}

        <HeroGoldDiamondDivider className="my-2.5 sm:my-3" />

        {copy.heroLead && copy.heroHighlight ? (
          <div className="flex flex-col items-center">
            <p
              className="font-calligraphic italic font-bold text-lg  text-[#153e24] leading-snug"
              style={{

                textShadow: "rgba(255, 252, 244, 0.92) 0px 1px 10px",
              }}
            >
              {copy.heroLead}
            </p>
            <h1
              className="my-1 mt-5 font-great-vibes text-6xl sm:text-7xl md:text-[5.25rem] leading-none font-normal"
              style={{
                color: "#153e24",
                WebkitTextStroke: "0.45px currentColor",
                textShadow:
                  "rgba(255, 252, 244, 0.94) 0px 2px 14px, rgba(255, 255, 255, 0.7) 0px 1px 4px",
              }}
            >
              {copy.heroHighlight}
            </h1>
            {copy.heroTail && (
              <p
                className="font-calligraphic italic font-bold text-lg  text-[#153e24] leading-snug mt-0.5"
                style={{

                  textShadow: "rgba(255, 252, 244, 0.92) 0px 1px 10px",
                }}
              >
                {copy.heroTail}
              </p>
            )}
          </div>
        ) : (
          copy.heroFooter && (
            <h1
              className={`mt-1 whitespace-pre-line text-lg sm:text-2xl md:text-[1.65rem] font-semibold leading-relaxed ${getLocaleFontClass(
                locale,
                "font-calligraphic"
              )}`}
              style={{
                color: "#153e24",
                textShadow: "rgba(255, 252, 244, 0.94) 0px 1px 10px",
              }}
            >
              {copy.heroFooter}
            </h1>
          )
        )}

        <HeroGoldDiamondDivider className="mt-3 sm:mt-4" />
      </div>
    </section>
  );
}
