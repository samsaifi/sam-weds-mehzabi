export type Locale = "en" | "ur" | "hi";

export interface ContactItem {
  name: string;
  phone: string;
  whatsapp?: string;
}

export interface TimelineEvent {
  time: string;
  title: string;
  description?: string;
  icon?: string;
}

export interface TimelineDay {
  date: string;
  events: TimelineEvent[];
}

export interface InvitationCopy {
  langToggleLabel?: string;
  bismillahArabic?: string;
  bismillahTranslation?: string;
  heroMessage: string;
  heroFooter?: string;
  heroLead?: string;
  heroHighlight?: string;
  heroTail?: string;
  groom: {
    name: string;
    subtext: string;
  };
  bride: {
    name: string;
    subtext: string;
  };
  welcomeMessage: string;
  welcomeIntro?: string;
  welcomeCoupleLeft?: string;
  welcomeCoupleRight?: string;
  welcomeBlessing?: string;
  scratch: {
    title: string;
    hint: string;
    revealLabel: string;
    date: string;
    day: string;
    time: string;
    saveDate: string;
    addToGoogle: string;
    downloadIcs: string;
    copyDetails: string;
    copied: string;
  };
  countdown: {
    title: string;
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
  };
  timeline: {
    title: string;
    days: TimelineDay[];
  };
  venue: {
    title: string;
    name: string;
    address: string;
    openMap: string;
  };
  preWedding?: {
    title: string;
    days: TimelineDay[];
  };
  gifts: {
    title: string;
    description: string;
  };
  closing: {
    message: string;
    couple: string;
    footerNote: string;
    contactTitle?: string;
    contacts?: ContactItem[];
  };
}

export interface EventConfig {
  targetDateIso: string;
  calendarStartUtc: string;
  calendarEndUtc: string;
  calendarTitle: string;
  calendarLocation: string;
  calendarDescription: string;
  icsFilename: string;
  copySummary: string;
  mapEmbedUrl: string;
  mapOpenUrl: string;
}

export interface MediaConfig {
  heroVideo: string;
  heroRevealAtSeconds: number;
  welcomeBackground: string;
  generalBackground: string;
  endBackground: string;
  logo: string;
}

export interface InvitationConfig {
  meta: {
    title: string;
    description: string;
  };
  event: EventConfig;
  media: MediaConfig;
  locales: {
    en: InvitationCopy;
    ur?: InvitationCopy;
    hi?: InvitationCopy;
  };
}

export function withBasePath(assetPath: string): string {
  if (!assetPath || /^(https?:|data:|blob:)/.test(assetPath)) {
    return assetPath;
  }
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (!basePath || assetPath.startsWith(`${basePath}/`) || assetPath === basePath) {
    return assetPath;
  }
  const normalized = assetPath.startsWith("/") ? assetPath : `/${assetPath}`;
  return `${basePath}${normalized}`;
}

export function getLocaleFontClass(locale: Locale, englishClass: string): string {
  if (locale === "ur") return "font-urdu";
  if (locale === "hi") return "font-hindi";
  return englishClass;
}
