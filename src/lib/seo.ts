import type { Metadata } from "next";

/**
 * Single source of truth for SEO and link-preview metadata.
 *
 * SITE_URL comes from NEXT_PUBLIC_SITE_URL (set it to the live domain on the
 * server, e.g. https://chatnexgen.online). It is normalised to a bare origin
 * so a trailing slash or path in the env value cannot produce `//` URLs.
 */
function siteOrigin(): string {
  const fallback = "https://chatnexgen.online";
  try {
    const url = new URL(process.env.NEXT_PUBLIC_SITE_URL || fallback);
    return /^(localhost|127\.0\.0\.1)$/.test(url.hostname) ? fallback : url.origin;
  } catch {
    return fallback;
  }
}

export const SITE_URL = siteOrigin();
export const SITE_NAME = "WappNext";

export const DEFAULT_TITLE = "#1 WhatsApp Marketing Software | WappNext";
export const DEFAULT_DESCRIPTION =
  "Official WhatsApp Business API marketing software. Send personalized bulk campaigns, AI chatbot replies and manage leads in a team inbox & CRM. From ₹999/mo.";

/** Link-preview image (1200×630, generated from public/images/banner-image.png). */
export const OG_IMAGE = {
  url: "/images/og-banner.jpg",
  width: 1200,
  height: 630,
  type: "image/jpeg",
  alt: "WappNext – Engage, automate and grow on WhatsApp with bulk broadcasts, AI chatbot, team inbox and CRM",
};

export const DEFAULT_KEYWORDS = [
  "WhatsApp marketing software",
  "WhatsApp automation tool",
  "WhatsApp Business API",
  "official WhatsApp marketing",
  "bulk WhatsApp messages",
  "WhatsApp broadcast",
  "personalized WhatsApp campaigns",
  "WhatsApp chatbot",
  "WhatsApp CRM",
  "WhatsApp team inbox",
  "WhatsApp Cloud API",
  "Click-to-WhatsApp ads",
  "WhatsApp marketing India",
];

interface PageSeo {
  /** Page title. Gets " | WappNext" appended unless `absoluteTitle` is set. */
  title: string;
  description: string;
  /** Route path, e.g. "/pricing". Used for the canonical URL and og:url. */
  path: string;
  keywords?: string[];
  absoluteTitle?: boolean;
  noIndex?: boolean;
}

/** Builds consistent metadata (title, canonical, Open Graph, Twitter) for a public page. */
export function pageMetadata({ title, description, path, keywords, absoluteTitle, noIndex }: PageSeo): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`;
  // Absolute URL: a bare "/" canonical is dropped by Next.js on the home page.
  const url = path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords: keywords ? [...keywords, ...DEFAULT_KEYWORDS.slice(0, 4)] : undefined,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: SITE_NAME,
      locale: "en_IN",
      title: fullTitle,
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [OG_IMAGE.url],
    },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}

/** Serialises JSON-LD safely for a <script> tag (escapes `<` per the Next.js guide). */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
