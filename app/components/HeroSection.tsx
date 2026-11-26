"use client";

import { Heart } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  getLocaleFontClass,
  type InvitationCopy,
  type Locale,
} from "../data/invitation-data";

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
  const isEnglish = locale === "en";
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [textRevealed, setTextRevealed] = useState(false);

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

    if (video.ended) {
      video.currentTime = 0;
      setTextRevealed(false);
      video.muted = false;
      onVideoStart?.();
      await video.play().catch(() => { });
      return;
    }

    if (video.paused) {
      video.muted = false;
      onVideoStart?.();
      await video.play().catch(() => { });
    } else {
      video.pause();
    }
  };

  return (
    <section
      data-snap-section="true"
      className="relative min-h-[100svh] w-full overflow-hidden flex items-center justify-center snap-start snap-always"
      style={{ backgroundColor: "rgb(15, 15, 15)" }}
    >
      <video
        ref={videoRef}
        src={videoSrc}
        className="absolute inset-0 h-full w-full cursor-pointer object-cover"
        playsInline
        preload="auto"
        disablePictureInPicture
        controlsList="nodownload noplaybackrate noremoteplayback nofullscreen"
        onClick={handleTapVideo}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => {
          setTextRevealed(true);
          onVideoEnd?.();
        }}
      />

      {/* Couple typography: hidden until 5 seconds into the video */}
      <div
        aria-hidden={!textRevealed}
        className="relative -top-12 md:-top-16 z-10 flex w-full flex-col items-center justify-center px-6 text-center pointer-events-none transition-all duration-1000 ease-out"
        style={{
          opacity: textRevealed ? 1 : 0,
          transform: textRevealed ? "translateY(0px)" : "translateY(28px)",
        }}
      >
        <div
          className="mb-3 transition-all duration-700 delay-100"
          style={{
            opacity: textRevealed ? 1 : 0,
            transform: textRevealed ? "scale(1)" : "scale(0.8)",
          }}
        >
          <Heart
            size={26}
            className="mx-auto fill-current"
            style={{ color: "rgb(59, 68, 50)" }}
          />
        </div>

        <p
          className={`mb-3 whitespace-pre-line text-2xl md:text-4xl font-bold transition-all duration-700 delay-150 ${getLocaleFontClass(locale, "font-calligraphic")}`}
          data-invitation-message="true"
          style={{
            color: "#3E5634",
            textShadow:
              "rgba(255, 255, 255, 0.88) 0px 1px 10px, rgba(255, 255, 255, 0.65) 0px 2px 18px",
          }}
        >
          {copy.heroMessage}
        </p>

        <div className="my-3 flex items-center justify-center gap-3">
          <div
            className="h-px w-16"
            style={{ backgroundColor: "rgba(59, 68, 50, 0.55)" }}
          />
          <Heart
            size={10}
            className="fill-current"
            style={{ color: "rgb(59, 68, 50)" }}
          />
          <div
            className="h-px w-16"
            style={{ backgroundColor: "rgba(59, 68, 50, 0.55)" }}
          />
        </div>

        <h1
          data-couple-name="groom"
          className={`leading-none font-bold transition-all duration-700 delay-200 ${
            isEnglish
              ? "font-great-vibes text-6xl md:text-9xl"
              : `${getLocaleFontClass(locale, "")} text-5xl md:text-7xl`
          }`}
          style={{
            color: "#3E5634",
            WebkitTextStroke: isEnglish ? "0.7px currentColor" : undefined,
            textShadow:
              "rgba(255, 255, 255, 0.88) 0px 2px 14px, rgba(255, 255, 255, 0.55) 0px 1px 4px",
          }}
        >
          {copy.groom.name}
          <span
            data-couple-subtext="groom"
            className={`block text-sm md:text-base font-bold leading-snug whitespace-pre-line mt-1 mb-3 px-4 max-w-md mx-auto text-center drop-shadow-[0_1px_8px_rgba(255,255,255,0.92)] ${
              isEnglish
                ? "font-display italic"
                : getLocaleFontClass(locale, "")
            }`}
            style={{ color: "#3E5634", WebkitTextStroke: "0px" }}
          >
            {copy.groom.subtext}
          </span>
        </h1>

        <p
          data-couple-amp="true"
          className={`my-2 font-bold ${
            isEnglish
              ? "font-great-vibes text-3xl md:text-4xl"
              : `${getLocaleFontClass(locale, "")} text-2xl md:text-3xl`
          }`}
          style={{
            color: "rgba(62, 86, 52, 0.95)",
            WebkitTextStroke: isEnglish ? "0.5px currentColor" : undefined,
            textShadow: "rgba(255, 255, 255, 0.85) 0px 2px 10px",
          }}
        >
          &amp;
        </p>

        <h1
          data-couple-name="bride"
          className={`leading-none font-bold transition-all duration-700 delay-300 ${
            isEnglish
              ? "font-great-vibes text-6xl md:text-9xl"
              : `${getLocaleFontClass(locale, "")} text-5xl md:text-7xl`
          }`}
          style={{
            color: "#3E5634",
            WebkitTextStroke: isEnglish ? "0.7px currentColor" : undefined,
            textShadow:
              "rgba(255, 255, 255, 0.88) 0px 2px 14px, rgba(255, 255, 255, 0.55) 0px 1px 4px",
          }}
        >
          {copy.bride.name}
          <span
            data-couple-subtext="bride"
            className={`block text-sm md:text-base font-bold leading-snug whitespace-pre-line mt-1 mb-3 px-4 max-w-md mx-auto text-center drop-shadow-[0_1px_8px_rgba(255,255,255,0.92)] ${
              isEnglish
                ? "font-display italic"
                : getLocaleFontClass(locale, "")
            }`}
            style={{ color: "#3E5634", WebkitTextStroke: "0px" }}
          >
            {copy.bride.subtext}
          </span>
        </h1>
      </div>
    </section>
  );
}
