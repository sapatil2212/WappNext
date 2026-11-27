"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import QRCode from "qrcode";
import { ArrowRight, BarChart3, CalendarCheck, Check, Download, MessageCircle, Palette, Printer, QrCode, Share2, Sparkles, Star, type LucideIcon } from "lucide-react";
import { GoogleLogo, SocialLogo } from "@/components/reviews/social-logo";
import type { SocialPlatform } from "@/lib/reviews/social-platforms";
import { cn } from "@/lib/utils";

type TabId = "booking" | "review" | "social";

interface Tab {
  id: TabId;
  label: string;
  icon: LucideIcon;
  heading: string;
  pitch: string;
  benefits: { icon: LucideIcon; text: string }[];
  accent: string;
  standee: { kicker: string; title: string; caption: string };
}

const TABS: Tab[] = [
  {
    id: "booking",
    label: "Booking link",
    icon: CalendarCheck,
    heading: "Let customers book from a QR code",
    pitch: "Every business gets its own booking page. Customers scan, pick a free slot and get the confirmation on WhatsApp. No calls, no back-and-forth.",
    benefits: [
      { icon: CalendarCheck, text: "Customers see only free slots for your doctors, trainers or services" },
      { icon: MessageCircle, text: "Booking confirmation goes out on WhatsApp automatically" },
      { icon: Share2, text: "Share the same link on WhatsApp, Instagram bio and Google Business" },
      { icon: Download, text: "Download the QR as PNG or SVG, or print it for the front desk" },
    ],
    accent: "#047857",
    standee: { kicker: "Skip the queue", title: "Book your appointment", caption: "Scan, pick a time, get it confirmed on WhatsApp" },
  },
  {
    id: "review",
    label: "Google reviews",
    icon: Star,
    heading: "Turn happy visits into Google reviews",
    pitch: "Put a review QR code on the counter, on invoices and in WhatsApp messages. Customers land on a short page that sends them straight to your Google review box.",
    benefits: [
      { icon: Sparkles, text: "AI helps customers write a review in their own words and language" },
      { icon: QrCode, text: "A separate QR code for each counter, branch or campaign" },
      { icon: BarChart3, text: "See scans and review clicks for every QR code" },
      { icon: Palette, text: "Your logo in the middle of the QR, in your brand colours" },
    ],
    accent: "#f59e0b",
    standee: { kicker: "Loved your visit?", title: "Review us on Google", caption: "Scan and share your experience in 30 seconds" },
  },
  {
    id: "social",
    label: "Social media",
    icon: Share2,
    heading: "One QR code for all your social pages",
    pitch: "Instead of five stickers, print one. The scan opens a page with all your profiles so customers follow you where they already spend time.",
    benefits: [
      { icon: Share2, text: "Instagram, Facebook, YouTube, X, LinkedIn, WhatsApp, Threads, Telegram, Pinterest, Snapchat, TikTok and your website" },
      { icon: BarChart3, text: "See which platform customers open most" },
      { icon: Star, text: "Your Google review button sits on the same page" },
      { icon: Printer, text: "One printed standee instead of a sticker for every platform" },
    ],
    accent: "#8b5cf6",
    standee: { kicker: "Stay connected", title: "Follow us everywhere", caption: "Scan to find us on all our social pages" },
  },
];

const SOCIAL_ROW: SocialPlatform[] = ["instagram", "facebook", "youtube", "whatsapp", "linkedin", "x"];
const DEMO_URL = "https://chatnexgen.online/signup";

function useQr(url: string) {
  const [src, setSrc] = useState<string | null>(null);
  useEffect(() => {
    let live = true;
    QRCode.toDataURL(url, { width: 360, margin: 1, errorCorrectionLevel: "M", color: { dark: "#0f172a", light: "#ffffff" } })
      .then((d) => live && setSrc(d))
      .catch(() => undefined);
    return () => {
      live = false;
    };
  }, [url]);
  return src;
}

/** Acrylic table standee that tilts toward the pointer. */
function Standee({ tab }: { tab: Tab }) {
  const qr = useQr(`${DEMO_URL}?utm_source=qr_${tab.id}`);
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: -py * 14, y: px * 18 });
  };

  return (
    <div ref={ref} onPointerMove={onMove} onPointerLeave={() => setTilt({ x: 0, y: 0 })} className="relative flex items-center justify-center py-6 [perspective:1100px]">
      {/* glow */}
      <div className="pointer-events-none absolute inset-x-10 bottom-4 h-24 rounded-full blur-3xl transition-colors duration-500" style={{ background: `${tab.accent}55` }} />

      <div
        className="relative transition-transform duration-200 ease-out motion-reduce:transition-none [transform-style:preserve-3d]"
        style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
      >
        {/* acrylic plate */}
        <div className="relative w-[250px] rounded-[22px] border border-white/40 bg-white/10 p-2.5 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.55)] backdrop-blur-sm sm:w-[280px]">
          <div key={tab.id} className="qr-standee-card overflow-hidden rounded-2xl" style={{ background: "#ffffff", color: "#0f172a" }}>
            <div className="px-5 pb-3 pt-5 text-center" style={{ background: `linear-gradient(160deg, ${tab.accent}22, transparent 70%)` }}>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: tab.accent }}>{tab.standee.kicker}</p>
              <p className="mt-1 text-lg font-extrabold leading-tight" style={{ color: "#0f172a" }}>{tab.standee.title}</p>
              {tab.id === "review" && (
                <div className="mt-2 flex items-center justify-center gap-1.5">
                  <GoogleLogo size="sm" />
                  <span className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="qr-star size-4 fill-amber-400 text-amber-400" style={{ animationDelay: `${i * 90}ms` }} />
                    ))}
                  </span>
                </div>
              )}
              {tab.id === "social" && (
                <div className="mt-2 flex items-center justify-center gap-1">
                  {SOCIAL_ROW.map((p, i) => (
                    <span key={p} className="qr-pop" style={{ animationDelay: `${i * 70}ms` }}><SocialLogo platform={p} size="sm" /></span>
                  ))}
                </div>
              )}
              {tab.id === "booking" && (
                <div className="mt-2 flex items-center justify-center gap-1.5">
                  {["10:00", "11:30", "4:15"].map((t, i) => (
                    <span key={t} className="qr-pop rounded-md border px-1.5 py-0.5 text-[10px] font-semibold" style={{ animationDelay: `${i * 90}ms`, borderColor: `${tab.accent}66`, color: "#065f46", background: "#ecfdf5" }}>{t}</span>
                  ))}
                </div>
              )}
            </div>

            <div className="relative mx-auto my-2 size-40 overflow-hidden rounded-xl border p-1.5 sm:size-44" style={{ borderColor: "#e2e8f0", background: "#ffffff" }}>
              {qr ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={qr} alt={`Sample ${tab.label} QR code`} className="size-full" />
              ) : (
                <div className="size-full animate-pulse rounded-lg" style={{ background: "#f1f5f9" }} />
              )}
              <span className="qr-scan pointer-events-none absolute inset-x-1 h-8 motion-reduce:hidden" style={{ background: `linear-gradient(to bottom, transparent, ${tab.accent}55, transparent)` }} />
            </div>

            <p className="px-5 text-center text-[11px] leading-snug" style={{ color: "#475569" }}>{tab.standee.caption}</p>
            <div className="mt-3 flex items-center justify-center gap-1.5 py-2 text-[9px] font-semibold uppercase tracking-wider" style={{ background: "#f8fafc", color: "#94a3b8" }}>
              <QrCode className="size-3" /> Your Business · Powered by WappNext
            </div>
          </div>
        </div>
        {/* stand base */}
        <div className="mx-auto -mt-1 h-3 w-[200px] rounded-b-xl bg-gradient-to-b from-white/30 to-white/5 sm:w-[230px]" />
        <div className="mx-auto h-1.5 w-[240px] rounded-full bg-black/30 blur-sm sm:w-[270px]" />
      </div>
    </div>
  );
}

/** Home-page section: booking, Google review and social QR codes on a printable standee. */
export function QrStandeeShowcase() {
  const [active, setActive] = useState<TabId>("booking");
  const [auto, setAuto] = useState(true);
  const tab = TABS.find((t) => t.id === active)!;

  // Rotate tabs until the visitor picks one.
  useEffect(() => {
    if (!auto || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setActive((a) => TABS[(TABS.findIndex((x) => x.id === a) + 1) % TABS.length].id), 6000);
    return () => clearInterval(t);
  }, [auto]);

  const pick = (id: TabId) => {
    setAuto(false);
    setActive(id);
  };

  return (
    <section id="qr-codes" className="box-content relative mx-auto max-w-[1360px] scroll-mt-[calc(5rem+var(--offer-bar-h,0px))] px-8 py-24 sm:px-20 lg:px-32">
      <style>{`
        @keyframes qrScan { 0% { top: -2rem } 100% { top: 100% } }
        .qr-scan { animation: qrScan 2.4s ease-in-out infinite; }
        @keyframes qrIn { from { opacity: 0; transform: translateY(10px) scale(.97) } to { opacity: 1; transform: none } }
        .qr-standee-card, .qr-panel { animation: qrIn .45s ease-out both; }
        @keyframes qrPop { from { opacity: 0; transform: scale(.6) } to { opacity: 1; transform: none } }
        .qr-pop, .qr-star { animation: qrPop .35s ease-out both; display: inline-flex; }
        @media (prefers-reduced-motion: reduce) { .qr-scan, .qr-standee-card, .qr-panel, .qr-pop, .qr-star { animation: none } }
      `}</style>

      <div className="mx-auto max-w-3xl space-y-4 text-center">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-emerald-500">
          <QrCode className="size-3.5" /> QR codes and standees
        </div>
        <h2 className="text-3xl font-semibold tracking-tight text-[var(--m-text-heading)] sm:text-4xl md:text-5xl">One scan to book, review or follow</h2>
        <p className="text-sm text-[var(--m-text-tertiary)]">Print a standee for your counter. Customers scan it to book a slot, leave a Google review or find all your social pages.</p>
      </div>

      <div role="tablist" aria-label="QR code types" className="mx-auto mt-10 flex w-fit flex-wrap justify-center gap-1 rounded-xl border border-[var(--m-border-primary)] bg-[var(--m-bg-secondary)] p-1">
        {TABS.map((t) => {
          const on = t.id === active;
          return (
            <button
              key={t.id}
              role="tab"
              aria-selected={on}
              aria-controls="qr-panel"
              onClick={() => pick(t.id)}
              className={cn("relative flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold transition-colors", on ? "" : "text-[var(--m-text-secondary)] hover:text-[var(--m-text-heading)]")}
              style={on ? { background: t.accent, color: "#ffffff" } : undefined}
            >
              <t.icon className="size-3.5" /> {t.label}
            </button>
          );
        })}
      </div>

      <div id="qr-panel" role="tabpanel" className="mt-10 grid items-center gap-10 lg:grid-cols-2">
        <div key={tab.id} className="qr-panel space-y-6">
          <div className="space-y-3">
            <h3 className="text-2xl font-semibold tracking-tight text-[var(--m-text-heading)] sm:text-3xl">{tab.heading}</h3>
            <p className="text-sm leading-relaxed text-[var(--m-text-tertiary)]">{tab.pitch}</p>
          </div>
          <ul className="space-y-3">
            {tab.benefits.map((b, i) => (
              <li key={b.text} className="qr-pop flex items-start gap-3 rounded-xl border border-[var(--m-border-primary)] bg-[var(--m-bg-secondary)]/60 p-3 transition-colors hover:border-[var(--m-border-hover,var(--m-border-primary))]" style={{ animationDelay: `${120 + i * 80}ms`, display: "flex" }}>
                <span className="grid size-8 shrink-0 place-items-center rounded-lg" style={{ background: `${tab.accent}1f`, color: tab.accent }}>
                  <b.icon className="size-4" />
                </span>
                <span className="pt-1 text-[13px] leading-snug text-[var(--m-text-secondary)]">{b.text}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Link href="/signup" className="group inline-flex items-center gap-2 rounded-lg bg-[#047857] px-5 py-2.5 text-xs font-semibold !text-white shadow-[0_6px_24px_rgba(4,120,87,0.25)] transition-colors hover:bg-[#065f46]">
              Create your QR codes free <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <span className="flex items-center gap-1.5 text-[11px] text-[var(--m-text-muted)]"><Check className="size-3.5 text-emerald-500" /> Print-ready PNG and SVG downloads</span>
          </div>
        </div>

        <Standee tab={tab} />
      </div>
    </section>
  );
}
