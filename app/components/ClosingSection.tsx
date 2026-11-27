"use client";

import { Gift, Phone, PhoneCall, User } from "lucide-react";
import {
  getLocaleFontClass,
  type InvitationCopy,
  type Locale,
} from "../data/invitation-data";
import { GoldHeartDivider, RevealSection } from "./Ornaments";
import { TimelineBottomFlourish } from "./TimelineSection";

function ClosingGoldSprig({ mirror = false }: { mirror?: boolean }) {
  return (
    <svg
      viewBox="0 0 56 26"
      className={`w-9 sm:w-11 h-auto shrink-0 pointer-events-none ${mirror ? "-scale-x-100" : ""
        }`}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M52 14C39 14 25 11 10 5"
        stroke="#c59735"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M42 13C39 7 33 6 30 9C34 12 38 14 42 13ZM30 11C27 5 21 4 18 7C22 10 26 12 30 11ZM18 8C16 3 10 2 8 5C11 8 14 9 18 8Z"
        fill="rgba(220,178,76,0.52)"
        stroke="#a77d24"
        strokeWidth="0.9"
      />
      <path
        d="M36 14C33 19 27 21 24 19C27 16 31 14 36 14ZM24 12C21 17 15 19 12 17C15 14 19 12 24 12Z"
        fill="rgba(220,178,76,0.42)"
        stroke="#a77d24"
        strokeWidth="0.85"
      />
    </svg>
  );
}

function GoldBotanicalLeafEmblem() {
  return (
    <svg
      viewBox="0 0 56 44"
      className="mx-auto w-9 sm:w-10 h-auto mb-1.5 pointer-events-none"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="closing-leaf-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f0d17b" />
          <stop offset="55%" stopColor="#c5922d" />
          <stop offset="100%" stopColor="#8d6113" />
        </linearGradient>
      </defs>
      {/* Top upright leaf */}
      <path
        d="M28 24C22 17 22 8 28 3C34 8 34 17 28 24Z"
        stroke="url(#closing-leaf-gold)"
        strokeWidth="1.4"
        fill="rgba(232,191,92,0.16)"
      />
      <path d="M28 23V6" stroke="url(#closing-leaf-gold)" strokeWidth="1" />
      {/* Left tilted leaf */}
      <path
        d="M27 28C18 26 11 21 9 14C16 14 23 19 27 28Z"
        stroke="url(#closing-leaf-gold)"
        strokeWidth="1.4"
        fill="rgba(232,191,92,0.14)"
      />
      <path
        d="M26 27L12 16"
        stroke="url(#closing-leaf-gold)"
        strokeWidth="0.95"
      />
      {/* Right tilted leaf */}
      <path
        d="M29 28C38 26 45 21 47 14C40 14 33 19 29 28Z"
        stroke="url(#closing-leaf-gold)"
        strokeWidth="1.4"
        fill="rgba(232,191,92,0.14)"
      />
      <path
        d="M30 27L44 16"
        stroke="url(#closing-leaf-gold)"
        strokeWidth="0.95"
      />
      {/* Curled stem base */}
      <path
        d="M28 24C28 31 24 36 18 39M28 28C31 33 35 36 39 36"
        stroke="url(#closing-leaf-gold)"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  );
}

function WhatsAppGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
      <path d="M12.04 2a9.9 9.9 0 0 0-8.49 15L2 22l5.14-1.5A9.92 9.92 0 1 0 12.04 2Zm5.79 14.07c-.24.68-1.39 1.3-1.93 1.38-.51.08-1.15.11-1.86-.12-.43-.14-.98-.32-1.69-.63-2.97-1.28-4.91-4.3-5.06-4.5-.15-.2-1.21-1.61-1.21-3.07 0-1.46.76-2.18 1.03-2.48.27-.3.59-.37.79-.37h.57c.18 0 .43-.07.67.52.25.6.85 2.07.92 2.22.07.15.12.33.02.53-.1.2-.15.33-.3.5-.15.17-.31.38-.45.51-.15.15-.3.31-.13.61.18.3.78 1.29 1.67 2.09 1.15 1.03 2.12 1.35 2.42 1.5.3.15.48.13.66-.08.18-.2.75-.88.95-1.18.2-.3.4-.25.67-.15.27.1 1.74.82 2.04.97.3.15.5.22.57.34.08.13.08.73-.16 1.41Z" />
    </svg>
  );
}

export function ClosingSection({
  copy,
  endBackground,
  locale,
}: {
  copy: InvitationCopy;
  endBackground: string;
  locale: Locale;
}) {
  const isEnglish = locale === "en";
  const contacts = copy.closing.contacts ?? [];
  const contactTitle = copy.closing.contactTitle ?? "Contact & RSVP";

  return (
    <div
      data-snap-section="true"
      className="min-h-[100svh] flex flex-col justify-between"
      style={{
        backgroundImage: `url('${endBackground}')`,
        backgroundPosition: "center bottom",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% auto",
      }}
    >
      <RevealSection
        snap={false}
        withTopWave={false}
        className="flex-1 flex flex-col justify-center !py-8 md:!py-10 pb-16 sm:pb-10"
      >
        <div className="max-w-md mx-auto w-full text-center">
          {/* Gifts Section */}
          <div>
            <Gift
              className="mx-auto text-[#2b5237] mb-1"
              size={34}
              strokeWidth={1.75}
              aria-hidden="true"
            />
            <h2
              className={`text-4xl md:text-5xl text-[#1d3b27] mb-0.5 ${isEnglish
                ? "font-calligraphy"
                : `${getLocaleFontClass(locale, "")} font-bold`
                }`}
            >
              {copy.gifts.title}
            </h2>
            <GoldHeartDivider className="my-2" />
            <p
              className={`text-sm sm:text-base text-[#1d3b27] whitespace-pre-line leading-relaxed break-words max-w-sm mx-auto ${getLocaleFontClass(
                locale,
                "font-calligraphic italic"
              )}`}
            >
              {copy.gifts.description}
            </p>
          </div>

          <TimelineBottomFlourish className="my-4" />

          {/* Contact & RSVP */}
          {contacts.length > 0 && (
            <div>
              <div className="flex items-center justify-center gap-2 mb-3.5">
                <ClosingGoldSprig />
                <div
                  className="inline-flex items-center justify-center px-6 py-1.5 rounded-full border border-[#d6b262] shadow-md"
                  style={{
                    background:
                      "linear-gradient(180deg, #21462e 0%, #163320 100%)",
                    boxShadow:
                      "0 5px 14px -5px rgba(22, 51, 32, 0.5), inset 0 0 0 1px rgba(242, 217, 149, 0.25)",
                  }}
                >
                  <span
                    className={`text-sm sm:text-base font-semibold tracking-wide text-[#faf3e0] ${getLocaleFontClass(
                      locale,
                      "font-display"
                    )}`}
                  >
                    {contactTitle}
                  </span>
                </div>
                <ClosingGoldSprig mirror />
              </div>

              <div className="space-y-2.5 max-w-[390px] mx-auto">
                {contacts.map((person, idx) => {
                  const cleanDigits = (
                    person.whatsapp || person.phone
                  ).replace(/[^0-9]/g, "");
                  const telHref = `tel:${person.phone.replace(/[^0-9+]/g, "")}`;
                  const waHref = `https://wa.me/${cleanDigits}`;

                  return (
                    <div
                      key={`${person.name}-${idx}`}
                      className="flex items-center gap-3 rounded-full border border-[#dfc896]/90 px-3.5 sm:px-4 py-2 sm:py-2.5 shadow-[0_6px_18px_-8px_rgba(92,70,22,0.22)]"
                      style={{
                        background:
                          "radial-gradient(ellipse at 50% 35%, rgba(255, 253, 245, 0.94) 0%, rgba(247, 237, 213, 0.88) 100%)",
                      }}
                    >
                      {/* Left User Avatar Medallion */}


                      {/* Middle Name + Phone */}
                      <div className="flex-1 flex flex-col gap-1.5 min-w-0 text-start items-center justify-center">
                        <p
                          className={`items-center justify-centertext-sm sm:text-base font-bold text-[#1d3b27] leading-tight truncate ${getLocaleFontClass(
                            locale,
                            "font-display"
                          )}`}
                        >
                          {person.name}
                        </p>
                        <p
                          dir="ltr"
                          className="mt-0.5 inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-medium text-[#294933] tabular-nums"
                        >
                          <PhoneCall className="w-3 h-3 shrink-0 opacity-85" />
                          <span>{person.phone}</span>
                        </p>
                      </div>

                      {/* Vertical Gold Rule */}

                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Closing Botanical Emblem, Couple Names & Tagline */}
          <div className="mt-4">
            <TimelineBottomFlourish className="mb-3" />
            <GoldBotanicalLeafEmblem />
            <p
              className={`text-2xl sm:text-3xl text-[#1d3b27] whitespace-pre-line ${isEnglish
                ? "font-calligraphy"
                : `${getLocaleFontClass(locale, "")} font-bold`
                }`}
            >
              {copy.closing.couple}
            </p>
            <div className="mt-2 flex items-center justify-center gap-3">
              <div
                aria-hidden="true"
                className="h-px w-10 sm:w-14"
                style={{
                  background:
                    "linear-gradient(to right, transparent, rgb(184, 146, 66))",
                }}
              />
              <span
                className={`text-[10px] sm:text-[11px] uppercase tracking-[0.22em] font-semibold text-[#6e572c] ${getLocaleFontClass(
                  locale,
                  "font-display"
                )}`}
              >
                {copy.closing.footerNote}
              </span>
              <div
                aria-hidden="true"
                className="h-px w-10 sm:w-14"
                style={{
                  background:
                    "linear-gradient(to left, transparent, rgb(184, 146, 66))",
                }}
              />
            </div>
          </div>
        </div>
      </RevealSection>
    </div>
  );
}
