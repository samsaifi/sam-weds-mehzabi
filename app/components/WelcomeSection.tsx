"use client";

import Image from "next/image";
import {
  getLocaleFontClass,
  type InvitationCopy,
  type Locale,
} from "../data/invitation-data";
import { GoldHeartCrest, GoldHeartDivider } from "./Ornaments";
import { TimelineBottomFlourish } from "./TimelineSection";

/**
 * Ornate gold scalloped medallion & tapered hairlines framing the "&" ampersand.
 */
function WelcomeAmpersandDivider() {
  return (
    <Image
      src="/asset/and.png"
      alt="&"
      width={200}
      height={100}
      className="my-1 sm:my-1.5 mx-auto w-40 sm:w-48 h-auto pointer-events-none select-none drop-shadow-[0_2px_4px_rgba(116,84,20,0.14)]"
    />
  );
}

/**
 * Symmetrical peach-rose and olive-leaf botanical garland divider.
 */
function WelcomeRoseDivider({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/asset/flower.png"
      alt=""
      width={360}
      height={120}
      aria-hidden="true"
      className={`mx-auto w-56 sm:w-64 h-auto pointer-events-none select-none mix-blend-multiply   ${className}`}
    />
  );
}

export function WelcomeSection({
  copy,
  locale,
}: {
  copy: InvitationCopy;
  locale: Locale;
}) {
  const isEnglish = locale === "en";

  return (
    <section
      data-snap-section="true"
      className="relative min-h-[100svh] flex flex-col justify-center px-[clamp(3.75rem,15vw,15rem)] py-12 md:py-16 pb-20 sm:pb-16 overflow-hidden"
    >
      <div className="max-w-xl mx-auto text-center relative px-4 py-6 sm:px-10 sm:py-8">
        <GoldHeartCrest className="mb-3" />

        {copy.welcomeIntro &&
          copy.welcomeCoupleLeft &&
          copy.welcomeCoupleRight &&
          copy.welcomeBlessing ? (
          <>
            <p
              className={`text-lg sm:text-2xl md:text-[1.6rem] leading-snug whitespace-pre-line ${getLocaleFontClass(
                locale,
                "font-calligraphic italic"
              )}`}
              style={{ color: "#1d3b27" }}
            >
              {copy.welcomeIntro}
            </p>

            <div
              className={`my-3 sm:my-4 leading-tight flex flex-col items-center justify-center ${isEnglish
                ? "font-great-vibes text-5xl sm:text-6xl"
                : `${getLocaleFontClass(locale, "")} text-3xl sm:text-4xl font-bold`
                }`}
              style={{
                color: "#153821",
                WebkitTextStroke: isEnglish ? "0.4px currentColor" : undefined,
              }}
            >
              <span>{copy.welcomeCoupleLeft}</span>

              <WelcomeAmpersandDivider />

              <span>{copy.welcomeCoupleRight}</span>
            </div>

            <WelcomeRoseDivider className="my-3 sm:my-4" />

            <p
              className={`text-lg sm:text-2xl md:text-[1.55rem] leading-relaxed whitespace-pre-line ${getLocaleFontClass(
                locale,
                "font-calligraphic italic"
              )}`}
              style={{ color: "#1d3b27" }}
            >
              {copy.welcomeBlessing}
            </p>

            <TimelineBottomFlourish className="mt-5" />
          </>
        ) : (
          <>
            <p
              className={`text-xl sm:text-2xl md:text-3xl leading-relaxed whitespace-pre-wrap break-words ${getLocaleFontClass(
                locale,
                "font-calligraphic italic"
              )}`}
              style={{
                color: "#1d3b27",
                textShadow: "rgba(255, 255, 255, 0.5) 0px 1px 6px",
              }}
            >
              {copy.welcomeMessage}
            </p>
            <GoldHeartDivider className="mt-6" />
          </>
        )}
      </div>
    </section>
  );
}
