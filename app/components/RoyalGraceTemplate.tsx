"use client";

import { Globe, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  getLocaleFontClass,
  type InvitationConfig,
  type Locale,
} from "../data/invitation-data";
import { ClosingSection } from "./ClosingSection";
import { CountdownSection } from "./CountdownSection";
import { HeroSection } from "./HeroSection";
import { RevealSection } from "./Ornaments";
import { ScratchReveal } from "./ScratchReveal";
import { TapCelebration } from "./TapCelebration";
import {
  OrnateTimelineList,
  TimelineBottomFlourish,
  TimelineTopClockCrest,
} from "./TimelineSection";
import { VenueSection } from "./VenueSection";
import { WelcomeSection } from "./WelcomeSection";

const LOCALE_LABELS: { code: Locale; label: string }[] = [
  { code: "en", label: "English" },
  { code: "ur", label: "اردو" },
  { code: "hi", label: "हिन्दी" },
];

export function RoyalGraceTemplate({ config }: { config: InvitationConfig }) {
  const [locale, setLocale] = useState<Locale>("en");
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [videoCompleted, setVideoCompleted] = useState(false);
  const [heartRevealed, setHeartRevealed] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const chordIntervalRef = useRef<number | null>(null);
  const snapLockUntilRef = useRef<number>(0);
  const langSwitcherRef = useRef<HTMLDivElement | null>(null);
  const videoCompletedRef = useRef(false);

  useEffect(() => {
    videoCompletedRef.current = videoCompleted;
    const html = document.documentElement;
    const body = document.body;

    if (!videoCompleted) {
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
      window.scrollTo(0, 0);
    } else {
      html.style.overflow = "";
      body.style.overflow = "";
    }

    return () => {
      html.style.overflow = "";
      body.style.overflow = "";
    };
  }, [videoCompleted]);

  useEffect(() => {
    if (!langMenuOpen) return;
    const handleOutside = (e: PointerEvent) => {
      if (
        langSwitcherRef.current &&
        !langSwitcherRef.current.contains(e.target as Node)
      ) {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener("pointerdown", handleOutside);
    return () => document.removeEventListener("pointerdown", handleOutside);
  }, [langMenuOpen]);

  const availableLocales = LOCALE_LABELS.filter((item) =>
    Boolean(config.locales[item.code])
  );
  const activeLocale: Locale = config.locales[locale] ? locale : "en";
  const isEnglish = activeLocale === "en";
  const isRtl = activeLocale === "ur";
  const copy = config.locales[activeLocale] ?? config.locales.en;

  useEffect(() => {
    let rafId = 0;

    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const smoothScrollTo = (targetEl: HTMLElement) => {
      const startY = window.scrollY;
      const targetY = Math.max(
        0,
        Math.round(targetEl.getBoundingClientRect().top + startY)
      );
      const distance = targetY - startY;
      if (Math.abs(distance) < 2) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        window.scrollTo(0, targetY);
        return;
      }

      window.cancelAnimationFrame(rafId);
      const duration = 750;
      const startTime = performance.now();
      snapLockUntilRef.current = Date.now() + duration + 120;

      const step = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / duration);
        const eased = easeInOutCubic(progress);
        window.scrollTo({
          top: startY + distance * eased,
          behavior: "instant" as ScrollBehavior,
        });
        if (progress < 1) {
          rafId = window.requestAnimationFrame(step);
        }
      };

      rafId = window.requestAnimationFrame(step);
    };

    const scrollStep = (goingDown: boolean): boolean => {
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>('[data-snap-section="true"]')
      );
      if (sections.length === 0) return false;

      const vh = window.innerHeight;
      const mid = vh / 2;

      let currentIdx = sections.findIndex((el) => {
        const rect = el.getBoundingClientRect();
        return rect.top <= mid && rect.bottom >= mid;
      });
      if (currentIdx === -1) {
        currentIdx = 0;
        let bestDist = Infinity;
        sections.forEach((el, idx) => {
          const dist = Math.abs(el.getBoundingClientRect().top);
          if (dist < bestDist) {
            bestDist = dist;
            currentIdx = idx;
          }
        });
      }

      const currentRect = sections[currentIdx].getBoundingClientRect();
      // Allow normal inner scrolling only if the current section exceeds viewport height
      if (goingDown && currentRect.bottom > vh + 12) return false;
      if (!goingDown && currentRect.top < -12) return false;

      const targetIdx = goingDown
        ? Math.min(sections.length - 1, currentIdx + 1)
        : Math.max(0, currentIdx - 1);

      if (targetIdx === currentIdx) return false;

      smoothScrollTo(sections[targetIdx]);
      return true;
    };

    const handleWheel = (e: WheelEvent) => {
      if (!videoCompletedRef.current) {
        e.preventDefault();
        return;
      }

      if (Math.abs(e.deltaY) < 8 || Math.abs(e.deltaY) <= Math.abs(e.deltaX)) {
        return;
      }

      if (Date.now() < snapLockUntilRef.current) {
        e.preventDefault();
        return;
      }

      if (scrollStep(e.deltaY > 0)) {
        e.preventDefault();
      }
    };

    let touchStartY = 0;
    let touchIgnored = false;

    const handleTouchStart = (e: TouchEvent) => {
      const target = e.target as HTMLElement | null;
      touchIgnored = Boolean(
        target?.closest("canvas, iframe, input, textarea, select, button")
      );
      touchStartY = e.touches[0]?.clientY ?? 0;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!videoCompletedRef.current) {
        e.preventDefault();
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (
        !videoCompletedRef.current ||
        touchIgnored ||
        Date.now() < snapLockUntilRef.current
      ) {
        return;
      }
      const endY = e.changedTouches[0]?.clientY ?? touchStartY;
      const diff = touchStartY - endY;
      if (Math.abs(diff) < 36) return;
      scrollStep(diff > 0);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        !videoCompletedRef.current &&
        ["ArrowDown", "PageDown", "Space", "End"].includes(e.code)
      ) {
        e.preventDefault();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (chordIntervalRef.current) {
        window.clearInterval(chordIntervalRef.current);
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => { });
      }
    };
  }, []);

  const stopAmbientAudio = () => {
    if (chordIntervalRef.current) {
      window.clearInterval(chordIntervalRef.current);
      chordIntervalRef.current = null;
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close().catch(() => { });
      audioCtxRef.current = null;
    }
  };

  const playGentleChord = (ctx: AudioContext, step: number) => {
    const chords = [
      [261.63, 329.63, 392.0, 493.88],
      [220.0, 261.63, 329.63, 392.0],
      [174.61, 220.0, 261.63, 349.23],
      [196.0, 246.94, 293.66, 392.0],
    ];
    const notes = chords[step % chords.length];
    const now = ctx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);
      gain.gain.setValueAtTime(0.0001, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.025, now + idx * 0.08 + 0.45);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 3.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 3.6);
    });
  };

  const startAmbientAudio = async () => {
    if (audioCtxRef.current) return;
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioCtx) return;

    const ctx = new AudioCtx();
    await ctx.resume();
    audioCtxRef.current = ctx;

    let step = 0;
    playGentleChord(ctx, step);
    chordIntervalRef.current = window.setInterval(() => {
      step += 1;
      if (audioCtxRef.current) {
        playGentleChord(audioCtxRef.current, step);
      }
    }, 3400);
  };

  const toggleAudio = async () => {
    if (soundOn) {
      stopAmbientAudio();
      setSoundOn(false);
      return;
    }

    if (!videoPlaying) {
      await startAmbientAudio();
    }
    setSoundOn(true);
  };

  return (
    <div
      data-invitation-page="true"
      dir={isRtl ? "rtl" : "ltr"}
      className="min-h-screen relative bg-[#f9f7f1] text-[#27331f]"
    >
      {/* Subtle gold geometric texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c9a96e' fill-opacity='0.025'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Tap-anywhere celebratory sparkle/confetti burst */}
      <TapCelebration />

      {/* Floating Top-Left Language Switcher (opens on Globe tap) */}
      {availableLocales.length > 1 && (
        <div
          ref={langSwitcherRef}
          dir="ltr"
          className="fixed top-4 left-4 z-50 flex items-center gap-1 p-1 rounded-full bg-card/90 backdrop-blur-sm border border-primary/30 shadow-gold"
        >
          <button
            type="button"
            onClick={() => setLangMenuOpen((prev) => !prev)}
            aria-expanded={langMenuOpen}
            aria-label="Toggle language menu"
            className={`inline-flex items-center justify-center rounded-full h-8 w-8 transition-colors cursor-pointer shrink-0 ${
              langMenuOpen
                ? "bg-primary/15 text-primary"
                : "text-primary hover:bg-primary/10"
            }`}
          >
            <Globe size={16} />
          </button>

          {langMenuOpen &&
            availableLocales.map((item) => {
              const active = activeLocale === item.code;
              return (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => {
                    setLocale(item.code);
                    setLangMenuOpen(false);
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${active
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-foreground hover:bg-primary/10"
                    }`}
                >
                  {item.label}
                </button>
              );
            })}
        </div>
      )}

      {/* Floating Top-Right Music Toggle */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <button
          type="button"
          onClick={toggleAudio}
          aria-label={soundOn ? "Mute ambient music" : "Play ambient music"}
          className="inline-flex items-center justify-center rounded-md h-10 w-10 border border-primary/50 text-primary-foreground bg-primary hover:bg-primary/90 backdrop-blur-sm shadow-gold transition-colors cursor-pointer"
        >
          {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
        </button>
      </div>

      {/* 1. Hero Curtain Video & Couple Typography */}
      <HeroSection
        copy={copy}
        videoSrc={config.media.heroVideo}
        revealAtSeconds={config.media.heroRevealAtSeconds}
        locale={activeLocale}
        isMuted={!soundOn}
        onVideoStart={() => {
          stopAmbientAudio();
          setVideoPlaying(true);
          setSoundOn(true);
        }}
        onVideoEnd={() => {
          setVideoPlaying(false);
          setVideoCompleted(true);
        }}
      />

      {/* 2. Continuous Floral Parchment Canvas */}
      <div
        style={{
          backgroundColor: "rgb(214, 197, 172)",
          backgroundImage: `url('${config.media.welcomeBackground}'), url('${config.media.generalBackground}')`,
          backgroundPosition: "center top, center 140.4888vw",
          backgroundRepeat: "no-repeat, repeat-y",
          backgroundSize: "100% auto, 100% auto",
        }}
      >
        {/* Welcome Blessing Message */}
        <WelcomeSection copy={copy} locale={activeLocale} />

        {/* Sections framed inside side floral vines */}
        <div>
          {/* Scratch to Reveal & Counting Down to Forever merged in one screen */}
          <RevealSection className="!py-10 md:!py-12 pb-16 sm:pb-12">
            <ScratchReveal
              copy={copy}
              eventConfig={config.event}
              locale={activeLocale}
              embedded
              onReveal={() => setHeartRevealed(true)}
            />
            <div
              className={`grid transition-all duration-700 ease-out ${heartRevealed
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0 pointer-events-none"
                }`}
              aria-hidden={!heartRevealed}
            >
              <div className="overflow-hidden">
                <CountdownSection
                  copy={copy}
                  targetDateIso={config.event.targetDateIso}
                  locale={activeLocale}
                  embedded
                />
              </div>
            </div>
          </RevealSection>

          {/* Program Timeline */}
          <RevealSection className="!py-8 md:!py-10 pb-16 sm:pb-10">
            <div className="text-center">
              <TimelineTopClockCrest />
              <h2
                className={`text-4xl md:text-5xl text-[#1d3b27] mb-1 ${isEnglish
                  ? "font-calligraphy"
                  : `${getLocaleFontClass(activeLocale, "")} font-bold`
                  }`}
              >
                {copy.timeline.title}
              </h2>
              <TimelineBottomFlourish className="my-2.5" />
            </div>
            <OrnateTimelineList days={copy.timeline.days} locale={activeLocale} />
          </RevealSection>

          {/* Venue */}
          <VenueSection
            copy={copy}
            mapOpenUrl={config.event.mapOpenUrl}
            locale={activeLocale}
          />

          {/* Gifts, Contact & RSVP, Closing & Footer */}
          <ClosingSection
            copy={copy}
            endBackground={config.media.endBackground}
            locale={activeLocale}
          />
        </div>
      </div>
    </div>
  );
}
