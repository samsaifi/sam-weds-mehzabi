"use client";

import {
  getLocaleFontClass,
  type Locale,
  type TimelineDay,
  type TimelineEvent,
} from "../data/invitation-data";

type TimelineTheme =
  | "mandah"
  | "haldi"
  | "sehra"
  | "departure"
  | "arrival"
  | "reception"
  | "default";

function resolveEventTheme(event: TimelineEvent): TimelineTheme {
  const text = `${event.icon ?? ""} ${event.title} ${event.description ?? ""}`.toLowerCase();
  if (/mandah|mandha|منڈھا|मंढा/.test(text)) return "mandah";
  if (/haldi|ہلدی|हल्दी/.test(text)) return "haldi";
  if (/sehra|shera|bandi|سہرا|सेहरा/.test(text)) return "sehra";
  if (/departure|going|barat.*go|روانگی|प्रस्थान|जाने/.test(text))
    return "departure";
  if (/arrival|coming|barat.*com|آمد|آगमन|आगमन|लौटने/.test(text))
    return "arrival";
  if (/reception|walima|استقبالیہ|ولیمہ|रिसेप्शन/.test(text))
    return "reception";
  return "default";
}

export function TimelineTopClockCrest() {
  return (
    <div className="relative mx-auto mb-2 w-11 h-11 flex items-center justify-center">
      <div
        className="w-9 h-9 rotate-45 rounded-lg border-2 border-[#d4b262] shadow-md flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, #274c33 0%, #173120 100%)",
          boxShadow:
            "0 4px 12px -3px rgba(23, 49, 32, 0.5), inset 0 0 0 1px rgba(242, 217, 149, 0.3)",
        }}
      >
        <svg
          viewBox="0 0 24 24"
          className="-rotate-45 w-5 h-5"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="8.5" stroke="#f7ebd0" strokeWidth="1.6" />
          <path
            d="M12 7.5V12L15 13.8"
            stroke="#f7ebd0"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

export function TimelineBottomFlourish({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 280 34"
      className={`mx-auto w-48 sm:w-60 h-auto pointer-events-none ${className}`}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M10 17H108M172 17H270"
        stroke="url(#timeline-gold-line)"
        strokeWidth="1"
      />
      <path
        d="M140 6C142 12 146 15 152 17C146 19 142 22 140 28C138 22 134 19 128 17C134 15 138 12 140 6Z"
        stroke="#b69143"
        strokeWidth="1.15"
        fill="rgba(212,178,99,0.28)"
      />
      <path
        d="M126 17C119 11 112 12 110 16C115 18 120 18 126 17ZM154 17C161 11 168 12 170 16C165 18 160 18 154 17Z"
        stroke="#b69143"
        strokeWidth="1.05"
      />
      <defs>
        <linearGradient
          id="timeline-gold-line"
          x1="10"
          y1="17"
          x2="270"
          y2="17"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#b69143" stopOpacity="0" />
          <stop offset="0.5" stopColor="#b69143" stopOpacity="0.85" />
          <stop offset="1" stopColor="#b69143" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function GoldSprig({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 38 18"
      className={`w-7 sm:w-9 h-auto shrink-0 pointer-events-none ${
        flip ? "-scale-x-100" : ""
      }`}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M35 10C25 10 14 8 4 4"
        stroke="#b88e36"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <path
        d="M27 9C24 4 19 3 16 6C19 9 23 10 27 9ZM17 7C15 3 10 2 8 5C10 7 14 8 17 7ZM25 11C22 15 17 15 14 12C17 10 21 10 25 11Z"
        fill="rgba(216,174,72,0.45)"
        stroke="#9f7520"
        strokeWidth="0.8"
      />
    </svg>
  );
}

function MedallionIcon({ theme }: { theme: TimelineTheme }) {
  switch (theme) {
    case "mandah":
    case "haldi":
      return (
        <svg viewBox="0 0 28 28" className="w-5 h-5" fill="none">
          <path
            d="M6.5 15.5H21.5C21 19.5 18 22 14 22C10 22 7 19.5 6.5 15.5Z"
            fill="#c68f27"
            stroke="#5a3f11"
            strokeWidth="1.1"
          />
          <path
            d="M9.5 15.5C11 13.2 17 13.2 18.5 15.5"
            fill="#f2c44d"
            stroke="#6e4d13"
            strokeWidth="0.9"
          />
          <path
            d="M14 7V12.5M10.5 9.5L13 12.5M17.5 9.5L15 12.5"
            stroke="#3d5a34"
            strokeWidth="1.15"
            strokeLinecap="round"
          />
        </svg>
      );
    case "sehra":
      return (
        <svg viewBox="0 0 28 28" className="w-5 h-5" fill="none">
          {/* Turban / Sehra */}
          <path
            d="M7 18C7 12.5 10 9 14 9C18 9 21 12.5 21 18C18.5 19.5 9.5 19.5 7 18Z"
            fill="#d49334"
            stroke="#733c18"
            strokeWidth="1.1"
          />
          <path
            d="M8.5 14.5C11 12 17 12 19.5 14.5"
            stroke="#fff1c4"
            strokeWidth="1.1"
          />
          {/* Kalgi Plume & Pearl strands */}
          <path
            d="M17 9.5C18.5 6.5 20.5 6 21 7.5C21.3 8.8 19.2 10.2 17 9.5Z"
            fill="#b63a2c"
            stroke="#6b1d14"
            strokeWidth="0.8"
          />
          <path
            d="M11 19V22M14 19.3V22.5M17 19V22"
            stroke="#c9932d"
            strokeWidth="1.1"
            strokeLinecap="round"
          />
        </svg>
      );
    case "departure":
      return (
        <svg viewBox="0 0 28 28" className="w-5 h-5" fill="none">
          <path
            d="M6.5 15.5L8.8 11.2C9.2 10.5 9.9 10 10.7 10H17.3C18.1 10 18.8 10.5 19.2 11.2L21.5 15.5"
            stroke="#2f4a2e"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
          <rect
            x="5.2"
            y="15"
            width="17.6"
            height="4.6"
            rx="1.6"
            fill="#d7ae4e"
            stroke="#2f4a2e"
            strokeWidth="1.1"
          />
          <circle cx="9.2" cy="19.6" r="1.8" fill="#1d3b27" stroke="#f7ebd0" strokeWidth="0.8" />
          <circle cx="18.8" cy="19.6" r="1.8" fill="#1d3b27" stroke="#f7ebd0" strokeWidth="0.8" />
        </svg>
      );
    case "arrival":
      return (
        <svg viewBox="0 0 28 28" className="w-5 h-5" fill="none">
          {/* Royal Horse & Rider silhouette */}
          <path
            d="M8 21L9.5 16.5L13 15.5L16.5 15.5L19.5 11.5L21.5 12.2L20 15L18.5 16.8L19.5 21M12.5 16L12 21M16 16.5L16.2 21"
            stroke="#593c14"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Rider */}
          <path
            d="M14 15V10.5M14 10.5L16.2 12.5M14 8.2V6.2"
            stroke="#23432c"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <circle cx="14" cy="9" r="1.4" fill="#c9952c" />
        </svg>
      );
    case "reception":
      return (
        <svg viewBox="0 0 28 28" className="w-5 h-5" fill="none">
          {/* Cloche platter */}
          <path
            d="M6.5 18.5C6.5 13.8 9.8 11 14 11C18.2 11 21.5 13.8 21.5 18.5H6.5Z"
            fill="#d8b053"
            stroke="#5b4114"
            strokeWidth="1.1"
          />
          <circle cx="14" cy="9.5" r="1.3" fill="#b98624" stroke="#5b4114" strokeWidth="0.9" />
          <path
            d="M5 19.5H23"
            stroke="#23432c"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 28 28" className="w-5 h-5" fill="none">
          <path
            d="M14 6L16.2 11.8L22 14L16.2 16.2L14 22L11.8 16.2L6 14L11.8 11.8L14 6Z"
            fill="#d8b053"
            stroke="#5b4114"
            strokeWidth="1"
          />
        </svg>
      );
  }
}

function CardRightAccent({ theme }: { theme: TimelineTheme }) {
  switch (theme) {
    case "mandah":
    case "haldi":
      return (
        <svg viewBox="0 0 64 44" className="w-14 h-10 shrink-0" fill="none" aria-hidden="true">
          {/* Leaves */}
          <path d="M34 19C38 11 45 8 49 10C46 16 40 19 34 19Z" fill="#5e7941" />
          <path d="M31 18C27 11 21 9 18 11C21 16 26 19 31 18Z" fill="#708d4d" />
          {/* Golden turmeric mound */}
          <path d="M19 25C22 16 42 16 45 25Z" fill="#f3b829" stroke="#c88612" strokeWidth="0.9" />
          {/* Decorative brass bowl */}
          <path
            d="M15 25H49C47.5 34 41.5 38 32 38C22.5 38 16.5 34 15 25Z"
            fill="#345633"
            stroke="#d4ac4d"
            strokeWidth="1.2"
          />
          <path d="M18 28H46" stroke="#e4c36e" strokeWidth="1" strokeDasharray="2 2" />
        </svg>
      );
    case "sehra":
      return (
        <svg viewBox="0 0 64 44" className="w-14 h-10 shrink-0 opacity-45" fill="none" aria-hidden="true">
          <path d="M16 38C25 27 36 16 52 8" stroke="#c3a464" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M26 28C22 22 25 15 31 15C31 21 29 25 26 28Z" fill="#dfcb9d" />
          <path d="M36 20C32 14 35 8 41 8C41 14 39 17 36 20Z" fill="#dfcb9d" />
          <path d="M33 27C39 24 46 25 48 30C42 32 37 31 33 27Z" fill="#dfcb9d" />
        </svg>
      );
    case "departure":
      return (
        <svg viewBox="0 0 72 44" className="w-16 h-10 shrink-0" fill="none" aria-hidden="true">
          {/* Vintage floral wedding car */}
          <path
            d="M15 24L21 15.5C22 14 23.6 13 25.5 13H44C46 13 47.6 14 48.8 15.6L54 24"
            fill="#666235"
            stroke="#3d3a1c"
            strokeWidth="1.1"
          />
          <rect x="24" y="15.5" width="9" height="7" rx="1" fill="#e9e4d3" />
          <rect x="35.5" y="15.5" width="10" height="7" rx="1" fill="#e9e4d3" />
          <rect x="10" y="23.5" width="52" height="10" rx="3.5" fill="#524e28" stroke="#c9a550" strokeWidth="1.1" />
          {/* Flower garland across hood & roof */}
          <circle cx="24" cy="24" r="2.6" fill="#f5b8b4" />
          <circle cx="30" cy="23.5" r="2.2" fill="#fbf5e6" />
          <circle cx="36" cy="24" r="2.6" fill="#f5b8b4" />
          <circle cx="42" cy="23.5" r="2.2" fill="#fbf5e6" />
          <circle cx="48" cy="24" r="2.5" fill="#f5b8b4" />
          <circle cx="21" cy="34" r="4.5" fill="#232214" stroke="#d4b262" strokeWidth="1.4" />
          <circle cx="51" cy="34" r="4.5" fill="#232214" stroke="#d4b262" strokeWidth="1.4" />
        </svg>
      );
    case "arrival":
      return (
        <svg viewBox="0 0 64 44" className="w-14 h-10 shrink-0" fill="none" aria-hidden="true">
          {/* Decorated royal white horse head */}
          <path
            d="M24 40C24 31 27 23 32 16L34 9L38 12L44 10L42 16C45 20 49 25 48 29C47 31 44 31 41 29L37 26C36 31 37 35 39 40H24Z"
            fill="#faf4e4"
            stroke="#b69354"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          {/* Gold bridle & rose garland */}
          <path d="M35 16L44 26M33 21L41 28" stroke="#c89a38" strokeWidth="1.3" />
          <circle cx="36" cy="24" r="2.2" fill="#e99a96" />
          <circle cx="39" cy="27" r="2" fill="#f8d89c" />
          <circle cx="39" cy="17.5" r="1.2" fill="#3a2c16" />
        </svg>
      );
    case "reception":
      return (
        <svg viewBox="0 0 64 44" className="w-14 h-10 shrink-0" fill="none" aria-hidden="true">
          {/* Pastel rose bouquet */}
          <path d="M14 26C19 18 27 14 34 16M50 26C45 18 37 14 30 16" stroke="#53703b" strokeWidth="1.3" />
          <ellipse cx="18" cy="22" rx="5" ry="2.6" transform="rotate(-25 18 22)" fill="#627d47" />
          <ellipse cx="46" cy="22" rx="5" ry="2.6" transform="rotate(25 46 22)" fill="#627d47" />
          <circle cx="24" cy="22" r="5.5" fill="#f3c4be" stroke="#c9857f" strokeWidth="0.9" />
          <circle cx="39" cy="22" r="5.5" fill="#f7dfd0" stroke="#c8a07a" strokeWidth="0.9" />
          <circle cx="32" cy="17" r="6" fill="#f0aba4" stroke="#b9726c" strokeWidth="0.9" />
          <circle cx="32" cy="28" r="4.5" fill="#fbf2df" stroke="#cbb07c" strokeWidth="0.8" />
        </svg>
      );
    default:
      return null;
  }
}

export function OrnateTimelineList({
  days,
  locale,
}: {
  days: TimelineDay[];
  locale: Locale;
}) {
  const isEnglish = locale === "en";

  return (
    <div className="max-w-xl mx-auto space-y-4">
      {days.map((day) => (
        <div key={day.date}>
          {/* Emerald & Gold Date Banner with Flanking Gold Sprigs */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2.5 mb-2.5">
            <GoldSprig />

            <div
              className="relative px-4 sm:px-7 py-1 rounded-full border border-[#cfa856] shadow-md"
              style={{
                background:
                  "linear-gradient(180deg, #254830 0%, #193422 100%)",
                boxShadow:
                  "0 4px 12px -4px rgba(25, 52, 34, 0.45), inset 0 0 0 1px rgba(235, 206, 132, 0.25)",
              }}
            >
              <p
                className={`text-xs sm:text-sm font-semibold text-[#fbf5e6] text-center whitespace-nowrap ${
                  isEnglish
                    ? "font-display tracking-[0.04em]"
                    : getLocaleFontClass(locale, "")
                }`}
              >
                {day.date}
              </p>
            </div>

            <GoldSprig flip />
          </div>

          {/* Event Ivory Pill Cards connected by a continuous vertical gold line */}
          <div className="relative space-y-2">
            {day.events.map((event, idx) => {
              const isFirst = idx === 0;
              const isLast = idx === day.events.length - 1;
              const theme = resolveEventTheme(event);

              return (
                <div
                  key={`${day.date}-${event.time}-${event.title}`}
                  className="relative flex items-center gap-2 sm:gap-3 rounded-2xl border border-[#d6bc7f]/75 px-2.5 sm:px-4 py-2 sm:py-2.5"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(251,247,236,0.92) 0%, rgba(253,250,242,0.96) 55%, rgba(246,238,219,0.88) 100%)",
                    boxShadow:
                      "0 4px 14px -6px rgba(120, 88, 28, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.85)",
                  }}
                >
                  {/* Time on Left */}
                  <span
                    className={`w-[58px] sm:w-[74px] shrink-0 text-end pe-2 sm:pe-3 border-e border-[#cfb473]/55 text-[#1d3925] text-[11px] sm:text-sm font-bold tabular-nums leading-tight ${
                      isEnglish ? "font-display" : getLocaleFontClass(locale, "")
                    }`}
                  >
                    {event.time}
                  </span>

                  {/* Vertical Gold Connecting Line + Ivory-Gold Circular Medallion */}
                  <div className="relative flex items-center justify-center shrink-0">
                    {!isFirst && (
                      <span
                        aria-hidden="true"
                        className="absolute bottom-full left-1/2 -translate-x-1/2 w-[1.5px] h-3 bg-[#c8a354]/80 pointer-events-none"
                      />
                    )}
                    {!isLast && (
                      <span
                        aria-hidden="true"
                        className="absolute top-full left-1/2 -translate-x-1/2 w-[1.5px] h-3 bg-[#c8a354]/80 pointer-events-none"
                      />
                    )}
                    <div
                      className="relative z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-2 border-[#cfa349] shadow-sm"
                      style={{
                        background:
                          "radial-gradient(circle at 35% 30%, #fffdf6 0%, #f5ebd1 85%)",
                        boxShadow: "0 2px 8px -2px rgba(140, 102, 26, 0.35)",
                      }}
                    >
                      <MedallionIcon theme={theme} />
                    </div>
                  </div>

                  {/* Event Title & Description */}
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-[#1b3623] font-bold text-sm sm:text-lg leading-snug break-words ${getLocaleFontClass(
                        locale,
                        "font-display"
                      )}`}
                    >
                      {event.title}
                    </p>
                    {event.description && (
                      <p
                        className={`text-[11px] sm:text-sm text-[#4e6147] mt-0.5 whitespace-pre-wrap break-words leading-snug ${
                          isEnglish ? "italic" : getLocaleFontClass(locale, "")
                        }`}
                      >
                        {event.description}
                      </p>
                    )}
                  </div>

                  {/* Right-Side Decorative Accent Illustration */}
                  <div className="hidden min-[430px]:flex items-center justify-end shrink-0">
                    <CardRightAccent theme={theme} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <TimelineBottomFlourish className="mt-4" />
    </div>
  );
}
