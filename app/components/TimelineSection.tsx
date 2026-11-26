"use client";

import {
  getLocaleFontClass,
  type Locale,
  type TimelineDay,
} from "../data/invitation-data";

export function TimelineBottomFlourish() {
  return (
    <svg
      viewBox="0 0 280 34"
      className="mx-auto mt-5 w-52 sm:w-64 h-auto pointer-events-none"
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
        fill="rgba(212,178,99,0.22)"
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

export function OrnateTimelineList({
  days,
  locale,
}: {
  days: TimelineDay[];
  locale: Locale;
}) {
  const isEnglish = locale === "en";

  return (
    <div className="max-w-lg mx-auto space-y-4 sm:space-y-5">
      {days.map((day) => (
        <div key={day.date}>
          {/* Ornate Emerald & Gold Date Banner */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3">
            <div className="hidden min-[380px]:flex items-center flex-1">
              <div
                className="h-px flex-1"
                style={{
                  background:
                    "linear-gradient(to right, transparent, #c7a455)",
                }}
              />
              <span className="w-1.5 h-1.5 rotate-45 bg-[#c7a455] shrink-0" />
            </div>

            <div
              className="relative px-5 sm:px-7 py-1.5 rounded-full border border-[#cfa856] shadow-md"
              style={{
                background:
                  "linear-gradient(180deg, #254830 0%, #193422 100%)",
                boxShadow:
                  "0 4px 14px -4px rgba(25, 52, 34, 0.45), inset 0 0 0 1px rgba(235, 206, 132, 0.25)",
              }}
            >
              <p
                className={`text-xs sm:text-sm font-semibold text-[#fbf5e6] text-center whitespace-nowrap ${
                  isEnglish
                    ? "font-display uppercase tracking-[0.16em]"
                    : getLocaleFontClass(locale, "")
                }`}
              >
                {day.date}
              </p>
            </div>

            <div className="hidden min-[380px]:flex items-center flex-1">
              <span className="w-1.5 h-1.5 rotate-45 bg-[#c7a455] shrink-0" />
              <div
                className="h-px flex-1"
                style={{
                  background:
                    "linear-gradient(to left, transparent, #c7a455)",
                }}
              />
            </div>
          </div>

          {/* Vertical Gold Timeline Rows */}
          <div className="relative">
            {day.events.map((event, idx) => {
              const isFirst = idx === 0;
              const isLast = idx === day.events.length - 1;

              return (
                <div
                  key={`${day.date}-${event.time}-${event.title}`}
                  className="relative flex items-center gap-3 sm:gap-4 py-2"
                >
                  {/* Transparent Time Label */}
                  <span
                    className={`w-[68px] sm:w-[82px] shrink-0 text-end text-[#1d3925] text-xs sm:text-sm font-bold tabular-nums leading-tight ${
                      isEnglish ? "font-display" : getLocaleFontClass(locale, "")
                    }`}
                  >
                    {event.time}
                  </span>

                  {/* Gold Vertical Line + Metallic Bead */}
                  <div className="relative w-3 self-stretch flex items-center justify-center shrink-0">
                    <span
                      aria-hidden="true"
                      className="absolute w-[1.5px] bg-[#c8a354]/75"
                      style={{
                        top: isFirst ? "50%" : "-8px",
                        bottom: isLast ? "50%" : "-8px",
                      }}
                    />
                    <span
                      aria-hidden="true"
                      className="relative z-10 w-2.5 h-2.5 rounded-full border border-[#8e6c24] shadow-sm"
                      style={{
                        background:
                          "radial-gradient(circle at 32% 32%, #f9e4a2, #c99f44 70%, #8e6c24 100%)",
                      }}
                    />
                  </div>

                  {/* Event Title & Description */}
                  <div
                    className={`flex-1 min-w-0 py-0.5 ${
                      !isLast ? "border-b border-[#c2a463]/25 pb-2.5" : ""
                    }`}
                  >
                    <p
                      className={`text-[#1b3623] font-bold text-base sm:text-lg leading-snug break-words ${getLocaleFontClass(
                        locale,
                        "font-display"
                      )}`}
                    >
                      {event.title}
                    </p>
                    {event.description && (
                      <p
                        className={`text-xs sm:text-sm text-[#4e6147] mt-0.5 whitespace-pre-wrap break-words leading-relaxed ${
                          isEnglish ? "italic" : getLocaleFontClass(locale, "")
                        }`}
                      >
                        {event.description}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <TimelineBottomFlourish />
    </div>
  );
}
