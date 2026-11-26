"use client";

import { useCallback, useSyncExternalStore } from "react";
import {
  getLocaleFontClass,
  type InvitationCopy,
  type Locale,
} from "../data/invitation-data";
import { HeartDivider, RevealSection } from "./Ornaments";

interface TimeLeft {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

function subscribeSeconds(onStoreChange: () => void) {
  const timer = window.setInterval(onStoreChange, 1000);
  return () => window.clearInterval(timer);
}

function getServerSnapshot(): number {
  return -1;
}

function formatSeconds(totalSeconds: number): TimeLeft {
  if (totalSeconds < 0) {
    return { days: "--", hours: "--", minutes: "--", seconds: "--" };
  }
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    days: String(days).padStart(2, "0"),
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
  };
}

export function CountdownSection({
  copy,
  targetDateIso,
  locale,
}: {
  copy: InvitationCopy;
  targetDateIso: string;
  locale: Locale;
}) {
  const getRemainingSecondsSnapshot = useCallback(() => {
    const targetMs = new Date(targetDateIso).getTime();
    return Math.floor(Math.max(0, targetMs - Date.now()) / 1000);
  }, [targetDateIso]);

  const remainingSeconds = useSyncExternalStore(
    subscribeSeconds,
    getRemainingSecondsSnapshot,
    getServerSnapshot
  );
  const timeLeft = formatSeconds(remainingSeconds);

  const units = [
    { value: timeLeft.days, label: copy.countdown.days },
    { value: timeLeft.hours, label: copy.countdown.hours },
    { value: timeLeft.minutes, label: copy.countdown.minutes },
    { value: timeLeft.seconds, label: copy.countdown.seconds },
  ];

  return (
    <RevealSection>
      <div className="text-center relative">
        <h2
          className={`text-4xl md:text-5xl text-primary mb-3 ${
            locale === "en"
              ? "font-calligraphy"
              : `${getLocaleFontClass(locale, "")} font-bold`
          }`}
        >
          {copy.countdown.title}
        </h2>

        <HeartDivider />

        <div className="flex justify-center gap-2 sm:gap-4 md:gap-6">
          {units.map((unit) => (
            <div key={unit.label} className="text-center">
              <div className="w-14 sm:w-20 md:w-24 px-1 py-2 sm:px-3 sm:py-3 md:py-4 mb-2 rounded-lg border border-primary/20 bg-primary/10 backdrop-blur-sm">
                <div className="font-display text-2xl sm:text-4xl md:text-5xl font-bold text-foreground tabular-nums">
                  {unit.value}
                </div>
              </div>
              <p
                className={`text-[10px] sm:text-xs md:text-sm text-muted-foreground ${
                  locale === "en"
                    ? "uppercase tracking-wider"
                    : getLocaleFontClass(locale, "")
                }`}
              >
                {unit.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}
