"use client";

import { useCallback, useSyncExternalStore } from "react";
import {
  getLocaleFontClass,
  type InvitationCopy,
  type Locale,
} from "../data/invitation-data";
import { GoldHeartDivider, RevealSection } from "./Ornaments";

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
  embedded = false,
}: {
  copy: InvitationCopy;
  targetDateIso: string;
  locale: Locale;
  embedded?: boolean;
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

  const content = (
    <div className="text-center relative">
      <GoldHeartDivider className="mb-4" />
      <h2
        className={`${embedded ? "text-lg  mb-1" : "  mb-2"
          } text-[#1d3b27] ${locale === "en"
            ? "font-calligraphy"
            : `${getLocaleFontClass(locale, "")} font-bold`
          }`}
      >
        {copy.countdown.title}
      </h2>

      <GoldHeartDivider className="my-3.5" />

      <div className="flex justify-center gap-2.5 sm:gap-4 md:gap-5">
        {units.map((unit) => (
          <div key={unit.label} className="text-center">
            <div
              className={`${embedded
                ? "w-14 sm:w-18 md:w-20 px-1 py-2 sm:px-2.5 sm:py-2.5"
                : "w-14 sm:w-20 md:w-24 px-1 py-2 sm:px-3 sm:py-3 md:py-4"
                } mb-1.5 rounded-lg border border-[#d2b36a] bg-gradient-to-b from-[#fdfaf1] to-[#f3ead4] shadow-[0_6px_16px_-6px_rgba(130,98,32,0.28),inset_0_1px_0_rgba(255,255,255,0.9)]`}
            >
              <div
                className={`font-display ${embedded ? "text-2xl sm:text-3xl md:text-4xl" : "text-2xl sm:text-4xl md:text-5xl"
                  } font-bold text-[#1d3b27] tabular-nums`}
              >
                {unit.value}
              </div>
            </div>
            <p
              className={`text-[10px] sm:text-xs md:text-sm text-[#4a5b43] ${locale === "en"
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
  );

  if (embedded) {
    return <div className="mt-5 pt-1">{content}</div>;
  }

  return <RevealSection>{content}</RevealSection>;
}
