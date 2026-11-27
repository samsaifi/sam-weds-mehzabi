"use client";

import {
  getLocaleFontClass,
  type InvitationCopy,
  type Locale,
} from "../data/invitation-data";
import { GoldHeartDivider, RevealSection } from "./Ornaments";
import { TimelineBottomFlourish } from "./TimelineSection";

function VenueTopPinCrest() {
  return (
    <div className="flex items-center justify-center gap-2.5 mb-1.5">
      {/* Left gold olive sprig */}
      <svg
        viewBox="0 0 60 24"
        className="w-12 sm:w-14 h-auto pointer-events-none"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M56 14C42 15 26 12 8 6"
          stroke="#b98e35"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M44 13C41 7 35 6 32 9C36 12 40 14 44 13ZM31 11C28 5 22 4 19 7C23 10 27 12 31 11ZM19 8C17 3 11 2 9 5C12 8 15 9 19 8Z"
          fill="rgba(218,175,72,0.5)"
          stroke="#a47a24"
          strokeWidth="0.9"
        />
      </svg>

      {/* Emerald & Gold Medallion with Pin */}
      <div
        className="w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border-2 border-[#d4b262] shadow-md shrink-0"
        style={{
          background:
            "radial-gradient(circle at 35% 30%, #2a5136 0%, #193422 80%)",
          boxShadow:
            "0 4px 14px -3px rgba(25, 52, 34, 0.45), inset 0 0 0 1px rgba(242, 217, 149, 0.3)",
        }}
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
          <defs>
            <linearGradient id="venue-crest-pin" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fbe9a7" />
              <stop offset="100%" stopColor="#c5922b" />
            </linearGradient>
          </defs>
          <path
            d="M12 21s-6-5.3-6-10a6 6 0 1 1 12 0c0 4.7-6 10-6 10z"
            fill="url(#venue-crest-pin)"
            stroke="#8a6013"
            strokeWidth="1"
          />
          <circle cx="12" cy="11" r="2.2" fill="#193422" />
        </svg>
      </div>

      {/* Right gold olive sprig */}
      <svg
        viewBox="0 0 60 24"
        className="w-12 sm:w-14 h-auto -scale-x-100 pointer-events-none"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M56 14C42 15 26 12 8 6"
          stroke="#b98e35"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M44 13C41 7 35 6 32 9C36 12 40 14 44 13ZM31 11C28 5 22 4 19 7C23 10 27 12 31 11ZM19 8C17 3 11 2 9 5C12 8 15 9 19 8Z"
          fill="rgba(218,175,72,0.5)"
          stroke="#a47a24"
          strokeWidth="0.9"
        />
      </svg>
    </div>
  );
}

function PalaceIllustration() {
  return (
    <svg
      viewBox="0 0 420 135"
      className="mx-auto w-full max-w-[340px] sm:max-w-[400px] h-auto pointer-events-none drop-shadow-[0_6px_14px_rgba(92,70,22,0.16)]"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="palace-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fdf9ee" />
          <stop offset="100%" stopColor="#eadcc0" />
        </linearGradient>
        <radialGradient id="arch-glow" cx="50%" cy="60%" r="55%">
          <stop offset="0%" stopColor="#ffea9f" />
          <stop offset="55%" stopColor="#e6a83a" />
          <stop offset="100%" stopColor="#a76c1a" />
        </radialGradient>
        <linearGradient id="palace-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f3d883" />
          <stop offset="55%" stopColor="#c59431" />
          <stop offset="100%" stopColor="#946716" />
        </linearGradient>
        <linearGradient id="ground-fade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#cbb27a" stopOpacity="0" />
          <stop offset="50%" stopColor="#b89852" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#cbb27a" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Soft ground shadow */}
      <rect x="20" y="118" width="380" height="3" rx="1.5" fill="url(#ground-fade)" />

      {/* Left Wing */}
      <rect x="84" y="64" width="76" height="54" fill="url(#palace-wall)" stroke="#c59d49" strokeWidth="1.1" />
      <rect x="81" y="60" width="82" height="5" fill="#e7d6b3" stroke="#b98e35" strokeWidth="1" />
      {/* Left wing arched windows */}
      {[96, 122, 144].map((x) => (
        <g key={x}>
          <path
            d={`M${x} 112V82C${x} 76 ${x + 12} 76 ${x + 12} 82V112H${x}Z`}
            fill="url(#arch-glow)"
            stroke="#b5862c"
            strokeWidth="1"
          />
          <line x1={x + 6} y1="78" x2={x + 6} y2="112" stroke="#996d1d" strokeWidth="0.7" />
          <line x1={x} y1="95" x2={x + 12} y2="95" stroke="#996d1d" strokeWidth="0.7" />
        </g>
      ))}

      {/* Right Wing */}
      <rect x="260" y="64" width="76" height="54" fill="url(#palace-wall)" stroke="#c59d49" strokeWidth="1.1" />
      <rect x="257" y="60" width="82" height="5" fill="#e7d6b3" stroke="#b98e35" strokeWidth="1" />
      {[264, 286, 312].map((x) => (
        <g key={x}>
          <path
            d={`M${x} 112V82C${x} 76 ${x + 12} 76 ${x + 12} 82V112H${x}Z`}
            fill="url(#arch-glow)"
            stroke="#b5862c"
            strokeWidth="1"
          />
          <line x1={x + 6} y1="78" x2={x + 6} y2="112" stroke="#996d1d" strokeWidth="0.7" />
          <line x1={x} y1="95" x2={x + 12} y2="95" stroke="#996d1d" strokeWidth="0.7" />
        </g>
      ))}

      {/* Central Grand Pavilion */}
      <rect x="160" y="42" width="100" height="76" fill="url(#palace-wall)" stroke="#b98e35" strokeWidth="1.2" />
      {/* Classical Pediment Roof */}
      <polygon
        points="152,42 210,16 268,42"
        fill="#f7eed8"
        stroke="url(#palace-gold)"
        strokeWidth="1.5"
      />
      <polygon
        points="166,39 210,21 254,39"
        fill="none"
        stroke="#c99e42"
        strokeWidth="0.9"
      />
      {/* Top Finial */}
      <circle cx="210" cy="13" r="2.5" fill="url(#palace-gold)" />
      {/* Cornice */}
      <rect x="155" y="42" width="110" height="6" fill="#e8d6b0" stroke="#b98e35" strokeWidth="1" />

      {/* Classical Columns */}
      {[166, 179, 237, 250].map((x) => (
        <rect
          key={x}
          x={x}
          y="48"
          width="4"
          height="70"
          fill="#f6edd7"
          stroke="#c59c47"
          strokeWidth="0.8"
        />
      ))}

      {/* Grand Central Glowing Entrance Arch */}
      <path
        d="M188 118V74C188 58 232 58 232 74V118H188Z"
        fill="url(#arch-glow)"
        stroke="url(#palace-gold)"
        strokeWidth="1.8"
      />
      <line x1="210" y1="62" x2="210" y2="118" stroke="#8a5e14" strokeWidth="1" />
      <line x1="188" y1="84" x2="232" y2="84" stroke="#8a5e14" strokeWidth="0.9" />
      <line x1="188" y1="101" x2="232" y2="101" stroke="#8a5e14" strokeWidth="0.8" />

      {/* Warm Entry Steps */}
      <rect x="180" y="114" width="60" height="4" fill="#efe2c4" stroke="#c39a44" strokeWidth="0.8" />

      {/* Left Lush Garden Tree */}
      <g>
        <path d="M56 118V94" stroke="#6f5830" strokeWidth="3.2" strokeLinecap="round" />
        <circle cx="56" cy="76" r="19" fill="#5e7642" />
        <circle cx="44" cy="83" r="14" fill="#70894d" />
        <circle cx="68" cy="83" r="14" fill="#4f6635" />
        <circle cx="56" cy="68" r="13" fill="#899f5c" opacity="0.8" />
      </g>

      {/* Right Lush Garden Tree */}
      <g>
        <path d="M364 118V94" stroke="#6f5830" strokeWidth="3.2" strokeLinecap="round" />
        <circle cx="364" cy="76" r="19" fill="#5e7642" />
        <circle cx="352" cy="83" r="14" fill="#4f6635" />
        <circle cx="376" cy="83" r="14" fill="#70894d" />
        <circle cx="364" cy="68" r="13" fill="#899f5c" opacity="0.8" />
      </g>

      {/* Small Courtyard Bushes */}
      <circle cx="152" cy="113" r="6" fill="#4b6434" />
      <circle cx="268" cy="113" r="6" fill="#4b6434" />
      <circle cx="80" cy="114" r="5" fill="#5c7540" />
      <circle cx="340" cy="114" r="5" fill="#5c7540" />
    </svg>
  );
}

function FoldedMapPinIcon() {
  return (
    <svg viewBox="0 0 28 24" className="w-6 h-5 shrink-0" fill="none" aria-hidden="true">
      {/* Folded map base */}
      <polygon
        points="2,6 9,4 17,7 24,4 24,18 17,21 9,18 2,20"
        fill="#dce8cc"
        stroke="#e6c473"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <polygon points="9,4 17,7 17,21 9,18" fill="#5f8648" opacity="0.55" />
      <path d="M3 14L23 10" stroke="#f7eed8" strokeWidth="1.2" />
      {/* Red location pin */}
      <path
        d="M15 14C15 14 11.2 10.2 11.2 7.2A3.8 3.8 0 1 1 18.8 7.2C18.8 10.2 15 14 15 14Z"
        fill="#dc4b3e"
        stroke="#ffffff"
        strokeWidth="1"
      />
      <circle cx="15" cy="7.2" r="1.4" fill="#ffffff" />
    </svg>
  );
}

export function VenueSection({
  copy,
  mapOpenUrl,
  locale,
}: {
  copy: InvitationCopy;
  mapOpenUrl: string;
  locale: Locale;
}) {
  const isEnglish = locale === "en";
  const buttonLabel = copy.venue.openMap.trim() || "View on Map";

  return (
    <RevealSection className="!py-8 md:!py-12 pb-16 sm:pb-12">
      <div className="max-w-lg mx-auto text-center">
        <VenueTopPinCrest />

        <h2
          className={`text-4xl md:text-5xl text-[#1d3b27] mb-1 ${
            isEnglish
              ? "font-calligraphy"
              : `${getLocaleFontClass(locale, "")} font-bold`
          }`}
        >
          {copy.venue.title}
        </h2>

        <GoldHeartDivider className="my-3" />

        {/* Architectural Banquet Palace Facade */}
        <div className="my-2">
          <PalaceIllustration />
        </div>

        {/* Emerald & Gold Venue Name Plaque */}
        <div className="flex items-center justify-center gap-1.5 -mt-1 mb-4">
          <span
            aria-hidden="true"
            className="hidden min-[380px]:inline-block w-2 h-2 rotate-45 bg-[#c99e42]"
          />
          <div
            className="relative px-6 sm:px-9 py-2.5 rounded-2xl border-2 border-[#d4b262] shadow-md max-w-sm"
            style={{
              background:
                "linear-gradient(180deg, #24472f 0%, #173120 100%)",
              boxShadow:
                "0 8px 22px -6px rgba(23, 49, 32, 0.55), inset 0 0 0 1px rgba(242, 217, 149, 0.28)",
            }}
          >
            <p
              className={`text-base sm:text-xl font-semibold text-[#fbf5e6] leading-snug tracking-[0.06em] ${getLocaleFontClass(
                locale,
                "font-display uppercase"
              )}`}
            >
              {copy.venue.name}
            </p>
          </div>
          <span
            aria-hidden="true"
            className="hidden min-[380px]:inline-block w-2 h-2 rotate-45 bg-[#c99e42]"
          />
        </div>

        {/* Small Gold Pin + Address */}
        <div className="mb-3">
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4 mx-auto mb-1.5"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M12 21s-6-5.3-6-10a6 6 0 1 1 12 0c0 4.7-6 10-6 10z"
              fill="#c99b38"
              stroke="#8f6617"
              strokeWidth="1.1"
            />
            <circle cx="12" cy="11" r="2" fill="#fbf5e6" />
          </svg>
          <p
            className={`text-sm sm:text-base font-medium text-[#2c3f28] max-w-xs sm:max-w-sm mx-auto leading-relaxed ${getLocaleFontClass(
              locale,
              "font-display"
            )}`}
          >
            {copy.venue.address}
          </p>
        </div>

        <GoldHeartDivider className="my-3.5" />

        {/* View on Map Emerald Pill Button */}
        <div className="mt-3">
          <a
            href={mapOpenUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2.5 rounded-full px-6 py-2.5 text-xs sm:text-sm font-semibold text-[#fbf5e6] border border-[#d4b262] hover:opacity-95 transition-opacity ${
              isEnglish ? "font-display tracking-[0.06em]" : getLocaleFontClass(locale, "")
            }`}
            style={{
              background: "linear-gradient(180deg, #254830 0%, #193422 100%)",
              boxShadow:
                "0 8px 20px -8px rgba(25, 52, 34, 0.55), inset 0 0 0 1px rgba(235, 206, 132, 0.25)",
            }}
          >
            <FoldedMapPinIcon />
            <span>{buttonLabel}</span>
          </a>
        </div>

        <TimelineBottomFlourish />
      </div>
    </RevealSection>
  );
}
