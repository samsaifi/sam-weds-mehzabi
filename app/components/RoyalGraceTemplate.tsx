"use client";

import {
  Clock,
  ExternalLink,
  Gift,
  Globe,
  type LucideIcon,
  MapPin,
  PartyPopper,
  Volume2,
  VolumeX,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  getLocaleFontClass,
  type InvitationConfig,
  type Locale,
  type TimelineDay,
} from "../data/invitation-data";
import { CountdownSection } from "./CountdownSection";
import { HeroSection } from "./HeroSection";
import {
  CornerFlourish,
  GoldHeartDivider,
  HeartDivider,
  RevealSection,
  WaveDivider,
} from "./Ornaments";
import { ScratchReveal } from "./ScratchReveal";

const LOCALE_LABELS: { code: Locale; label: string }[] = [
  { code: "en", label: "English" },
  { code: "ur", label: "اردو" },
  { code: "hi", label: "हिन्दी" },
];

function TimelineDaysList({
  days,
  locale,
}: {
  days: TimelineDay[];
  locale: Locale;
}) {
  const isEnglish = locale === "en";

  return (
    <div className="max-w-md mx-auto space-y-8">
      {days.map((day) => (
        <div key={day.date}>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 bg-primary/30" />
            <p
              className={`text-sm md:text-base font-semibold text-primary text-center ${
                isEnglish
                  ? "font-display uppercase tracking-[0.15em]"
                  : getLocaleFontClass(locale, "")
              }`}
            >
              {day.date}
            </p>
            <div className="h-px flex-1 bg-primary/30" />
          </div>

          <div className="space-y-4">
            {day.events.map((event) => (
              <div
                key={`${day.date}-${event.time}-${event.title}`}
                className="flex gap-4 items-baseline"
              >
                <span
                  className={`w-20 shrink-0 text-end text-sm font-semibold text-foreground tabular-nums ${
                    isEnglish ? "" : getLocaleFontClass(locale, "")
                  }`}
                >
                  {event.time}
                </span>
                <div className="flex-1 min-w-0 border-s border-primary/30 ps-4">
                  <p
                    className={`text-primary font-semibold text-lg leading-tight break-words ${getLocaleFontClass(
                      locale,
                      "font-display"
                    )}`}
                  >
                    {event.title}
                  </p>
                  {event.description && (
                    <p
                      className={`text-sm text-muted-foreground mt-1 whitespace-pre-wrap break-words leading-relaxed ${getLocaleFontClass(
                        locale,
                        ""
                      )}`}
                    >
                      {event.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function InfoSection({
  icon: Icon,
  title,
  description,
  locale,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  locale: Locale;
}) {
  const isEnglish = locale === "en";
  return (
    <RevealSection>
      <Icon className="mx-auto text-primary mb-3" size={28} />
      <h2
        className={`text-4xl md:text-5xl text-primary mb-2 text-center ${
          isEnglish
            ? "font-calligraphy"
            : `${getLocaleFontClass(locale, "")} font-bold`
        }`}
      >
        {title}
      </h2>
      <HeartDivider />
      <div className="max-w-md mx-auto text-center">
        <p
          className={`text-muted-foreground whitespace-pre-line leading-relaxed break-words ${getLocaleFontClass(
            locale,
            ""
          )}`}
        >
          {description}
        </p>
      </div>
    </RevealSection>
  );
}

export function RoyalGraceTemplate({ config }: { config: InvitationConfig }) {
  const [locale, setLocale] = useState<Locale>("en");
  const [soundOn, setSoundOn] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const chordIntervalRef = useRef<number | null>(null);
  const snapLockUntilRef = useRef<number>(0);

  const availableLocales = LOCALE_LABELS.filter((item) =>
    Boolean(config.locales[item.code])
  );
  const activeLocale: Locale = config.locales[locale] ? locale : "en";
  const isEnglish = activeLocale === "en";
  const isRtl = activeLocale === "ur";
  const copy = config.locales[activeLocale] ?? config.locales.en;

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 8 || Math.abs(e.deltaY) <= Math.abs(e.deltaX)) {
        return;
      }

      const now = Date.now();
      if (now < snapLockUntilRef.current) {
        e.preventDefault();
        return;
      }

      const sections = Array.from(
        document.querySelectorAll<HTMLElement>('[data-snap-section="true"]')
      );
      if (sections.length === 0) return;

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
      const goingDown = e.deltaY > 0;

      // Allow normal scrolling inside a section taller than the viewport
      if (goingDown && currentRect.bottom > vh + 12) return;
      if (!goingDown && currentRect.top < -12) return;

      const targetIdx = goingDown
        ? Math.min(sections.length - 1, currentIdx + 1)
        : Math.max(0, currentIdx - 1);

      if (targetIdx === currentIdx) return;

      e.preventDefault();
      snapLockUntilRef.current = now + 700;
      sections[targetIdx].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  useEffect(() => {
    return () => {
      if (chordIntervalRef.current) {
        window.clearInterval(chordIntervalRef.current);
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  const stopAmbientAudio = () => {
    if (chordIntervalRef.current) {
      window.clearInterval(chordIntervalRef.current);
      chordIntervalRef.current = null;
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close().catch(() => {});
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

      {/* Floating Bottom-Left Language Switcher (English / Urdu / Hindi) */}
      {availableLocales.length > 1 && (
        <div
          dir="ltr"
          className="fixed bottom-4 left-4 z-50 flex items-center gap-1 p-1 rounded-full bg-card/90 backdrop-blur-sm border border-primary/30 shadow-gold"
        >
          <Globe size={14} className="text-primary mx-2 shrink-0" />
          {availableLocales.map((item) => {
            const active = activeLocale === item.code;
            return (
              <button
                key={item.code}
                type="button"
                onClick={() => setLocale(item.code)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                  active
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
        <section
          data-snap-section="true"
          className="relative min-h-[100svh] flex flex-col justify-center snap-start snap-always px-[clamp(4rem,16vw,15rem)] py-16 md:py-24 overflow-hidden"
        >
          <div className="max-w-xl mx-auto text-center relative">
            <GoldHeartDivider className="mb-8" />
            <p
              className={`text-xl sm:text-2xl md:text-3xl leading-relaxed whitespace-pre-wrap break-words ${getLocaleFontClass(
                activeLocale,
                "font-calligraphic italic"
              )}`}
              style={{
                color: "rgb(59, 68, 50)",
                textShadow: "rgba(255, 255, 255, 0.5) 0px 1px 6px",
              }}
            >
              {copy.welcomeMessage}
            </p>
            <GoldHeartDivider className="mt-8" />
          </div>
        </section>

        {/* Sections framed inside side floral vines */}
        <div>
          {/* Scratch to Reveal & Save the Date */}
          <ScratchReveal
            copy={copy}
            eventConfig={config.event}
            locale={activeLocale}
          />

          {/* Counting Down to Forever */}
          <CountdownSection
            copy={copy}
            targetDateIso={config.event.targetDateIso}
            locale={activeLocale}
          />

          {/* Program Timeline */}
          <RevealSection>
            <div className="text-center">
              <Clock className="mx-auto text-primary mb-3" size={28} />
              <h2
                className={`text-4xl md:text-5xl text-primary mb-2 ${
                  isEnglish
                    ? "font-calligraphy"
                    : `${getLocaleFontClass(activeLocale, "")} font-bold`
                }`}
              >
                {copy.timeline.title}
              </h2>
              <HeartDivider />
            </div>
            <TimelineDaysList days={copy.timeline.days} locale={activeLocale} />
          </RevealSection>

          {/* Venue & Map */}
          <RevealSection>
            <MapPin className="mx-auto text-primary mb-4" size={28} />
            <h2
              className={`text-4xl md:text-5xl text-primary mb-2 text-center ${
                isEnglish
                  ? "font-calligraphy"
                  : `${getLocaleFontClass(activeLocale, "")} font-bold`
              }`}
            >
              {copy.venue.title}
            </h2>
            <HeartDivider />
            <div className="text-center mb-8">
              <p
                className={`text-xl font-semibold mb-2 ${getLocaleFontClass(
                  activeLocale,
                  "font-display"
                )}`}
              >
                {copy.venue.name}
              </p>
              <p
                className={`text-muted-foreground ${getLocaleFontClass(
                  activeLocale,
                  ""
                )}`}
              >
                {copy.venue.address}
              </p>
            </div>

            <div className="max-w-2xl mx-auto rounded-xl overflow-hidden shadow-elegant mb-6 border border-primary/20 bg-card">
              <iframe
                src={config.event.mapEmbedUrl}
                width="100%"
                height="300"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                title="Venue Map"
                className="border-0 block"
              />
            </div>

            <div className="text-center">
              <a
                href={config.event.mapOpenUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1.5 text-xs font-display text-primary hover:underline ${
                  isEnglish
                    ? "uppercase tracking-[0.15em]"
                    : getLocaleFontClass(activeLocale, "")
                }`}
              >
                <span>{copy.venue.openMap}</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </RevealSection>

          {/* Pre-Wedding Events */}
          <RevealSection>
            <PartyPopper className="mx-auto text-primary mb-3" size={28} />
            <h2
              className={`text-4xl md:text-5xl text-primary mb-2 text-center ${
                isEnglish
                  ? "font-calligraphy"
                  : `${getLocaleFontClass(activeLocale, "")} font-bold`
              }`}
            >
              {copy.preWedding.title}
            </h2>
            <HeartDivider />
            <TimelineDaysList
              days={copy.preWedding.days}
              locale={activeLocale}
            />
          </RevealSection>

          {/* Gifts */}
          <InfoSection
            icon={Gift}
            title={copy.gifts.title}
            description={copy.gifts.description}
            locale={activeLocale}
          />

          {/* Closing & Footer framed by bottom floral bouquet image */}
          <div
            data-snap-section="true"
            className="min-h-[100svh] flex flex-col justify-between snap-start snap-always"
            style={{
              backgroundImage: `url('${config.media.endBackground}')`,
              backgroundPosition: "center bottom",
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% auto",
            }}
          >
            <RevealSection
              snap={false}
              className="flex-1 flex flex-col justify-center"
            >
              <div className="max-w-lg mx-auto text-center">
                <WaveDivider className="w-full text-primary mb-8" />
                <p
                  className={`text-4xl md:text-5xl text-primary leading-relaxed mb-4 whitespace-pre-line ${
                    isEnglish
                      ? "font-calligraphy"
                      : `${getLocaleFontClass(activeLocale, "")} font-bold`
                  }`}
                >
                  {copy.closing.message}
                </p>
                <p
                  className={`text-2xl text-muted-foreground whitespace-pre-line ${getLocaleFontClass(
                    activeLocale,
                    "font-calligraphy"
                  )}`}
                >
                  {copy.closing.couple}
                </p>
                <WaveDivider className="w-full text-primary mt-8 rotate-180" />
              </div>
            </RevealSection>

            <footer className="py-10 px-[clamp(3.75rem,15vw,15rem)] text-center relative border-t border-border">
              <CornerFlourish className="absolute top-2 left-2 w-12 h-12 text-primary opacity-15 pointer-events-none" />
              <CornerFlourish className="absolute top-2 right-2 w-12 h-12 text-primary opacity-15 -scale-x-100 pointer-events-none" />

              <Image
                src={config.media.logo}
                alt="Royal Grace Emblem"
                width={44}
                height={44}
                className="mx-auto mb-2 h-11 w-11 object-contain opacity-85"
              />
              <p
                className={`text-xl text-primary whitespace-pre-line ${
                  isEnglish
                    ? "font-calligraphy"
                    : `${getLocaleFontClass(activeLocale, "")} font-bold`
                }`}
              >
                {copy.closing.couple}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                <span
                  className={`text-sm gold-gradient-text font-semibold ${getLocaleFontClass(
                    activeLocale,
                    "font-calligraphic"
                  )}`}
                >
                  {copy.closing.footerNote}
                </span>
              </p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}
