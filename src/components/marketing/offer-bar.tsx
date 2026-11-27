"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Copy, Gift, X } from "lucide-react";
import { ctaHref, loadPublicOffers, track, type Offer } from "@/components/marketing/offer-popups";

type BarOffer = Pick<Offer, "id" | "title" | "body" | "ctaLabel" | "ctaUrl" | "promoCode">;

/** CSS variable with the banner's live height; the navbar and page offsets add it to the 80px navbar. */
const HEIGHT_VAR = "--offer-bar-h";
const WINDOW_MS = { session: 0, day: 86_400_000, week: 7 * 86_400_000, always: 0 } as const;

const keyFor = (o: Offer) => `cnx.offerbar.${o.id}.${o.version}`;

/** Hidden after a visitor closes it: for the visit, a day, a week, or never remembered ("always"). */
function dismissed(o: Offer): boolean {
  if (o.frequency === "always") return false;
  try {
    if (o.frequency === "session") return Boolean(sessionStorage.getItem(keyFor(o)));
    return Date.now() - Number(localStorage.getItem(keyFor(o)) ?? 0) < WINDOW_MS[o.frequency];
  } catch {
    return false;
  }
}

function rememberDismiss(o: Offer) {
  try {
    if (o.frequency === "session") sessionStorage.setItem(keyFor(o), "1");
    else if (o.frequency !== "always") localStorage.setItem(keyFor(o), String(Date.now()));
  } catch {
    /* private mode */
  }
}

/**
 * The banner's look. Colours are inline so the site's light/dark theme rules
 * (which repaint `.text-white` in light mode) can never make it unreadable.
 */
export function OfferBarView({ offer, onClose, onCta, preview }: { offer: BarOffer; onClose?: () => void; onCta?: () => void; preview?: boolean }) {
  const [copied, setCopied] = useState(false);
  const title = offer.title?.trim();
  const href = ctaHref(offer);
  const external = /^https:\/\//.test(href);
  const linkProps = {
    href,
    target: external ? "_blank" : undefined,
    rel: external ? "noopener noreferrer" : undefined,
    onClick: (e: React.MouseEvent) => (preview ? e.preventDefault() : onCta?.()),
  };

  const copy = async () => {
    if (!offer.promoCode) return;
    try {
      await navigator.clipboard.writeText(offer.promoCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked: the code is still visible */
    }
  };

  const text = (
    <>
      {title && <span className="font-semibold">{title}</span>}
      {offer.body && <span className="hidden sm:inline" style={{ color: "rgba(255,255,255,0.82)" }}>{offer.body}</span>}
    </>
  );

  return (
    <div className="relative flex min-h-10 items-center justify-center gap-x-3 gap-y-1 px-10 py-2 text-center text-[12px] leading-snug sm:text-[13px]" style={{ background: "linear-gradient(90deg, #065f46, #047857 50%, #065f46)", color: "#ffffff" }}>
      <Gift className="hidden size-4 shrink-0 sm:block" aria-hidden="true" />
      {offer.ctaUrl && !offer.ctaLabel ? (
        <Link {...linkProps} className="flex flex-wrap items-baseline justify-center gap-x-2 underline-offset-2 hover:underline">{text}</Link>
      ) : (
        <span className="flex flex-wrap items-baseline justify-center gap-x-2">{text}</span>
      )}
      {offer.promoCode && (
        <button
          type="button"
          onClick={copy}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-md px-2 py-0.5 font-mono text-[11px] font-bold tracking-wider transition-colors sm:text-[12px]"
          style={{ border: "1px dashed rgba(255,255,255,0.75)", background: "rgba(255,255,255,0.12)", color: "#ffffff" }}
          aria-label={copied ? `Promo code ${offer.promoCode} copied` : `Copy promo code ${offer.promoCode}`}
        >
          {offer.promoCode}
          {copied ? <Check className="size-3.5" aria-hidden="true" /> : <Copy className="size-3.5" aria-hidden="true" />}
        </button>
      )}
      {offer.ctaLabel && (
        <Link {...linkProps} className="group inline-flex shrink-0 items-center gap-1 font-semibold underline underline-offset-2" style={{ color: "#ffffff" }}>
          {offer.ctaLabel}
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
      )}
      {onClose && (
        <button type="button" onClick={onClose} aria-label="Close offer banner" className="absolute right-2 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-full transition-colors hover:bg-white/15" style={{ color: "#ffffff" }}>
          <X className="size-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}

/** Offer strip above the home-page hero, set up in Super Admin → Offers → Top banner. */
export function OfferBar() {
  const [offer, setOffer] = useState<Offer | null>(null);
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const clicked = useRef(false);

  useEffect(() => {
    let live = true;
    void loadPublicOffers().then((data) => {
      const o = data?.topBanner;
      if (!live || !o || dismissed(o)) return;
      setOffer(o);
      // Two frames: mount collapsed first so the height change actually animates.
      requestAnimationFrame(() => requestAnimationFrame(() => setOpen(true)));
      track(o.id, "view");
    });
    return () => {
      live = false;
    };
  }, []);

  // Publish the banner's height every frame it changes, so the page slides with it.
  useEffect(() => {
    const el = wrapRef.current;
    const root = document.documentElement;
    if (!el) return;
    const sync = () => root.style.setProperty(HEIGHT_VAR, `${el.getBoundingClientRect().height}px`);
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    sync();
    return () => {
      ro.disconnect();
      root.style.setProperty(HEIGHT_VAR, "0px");
    };
  }, [offer]);

  if (!offer) return null;

  const close = () => {
    if (!clicked.current) track(offer.id, "dismiss");
    rememberDismiss(offer);
    setOpen(false);
  };

  return (
    <div
      ref={wrapRef}
      className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      aria-hidden={!open}
      onTransitionEnd={(e) => e.target === e.currentTarget && !open && setOffer(null)}
    >
      <div className="min-h-0 overflow-hidden" role="region" aria-label="Current offer">
        <OfferBarView offer={offer} onClose={close} onCta={() => { clicked.current = true; track(offer.id, "click"); }} />
      </div>
    </div>
  );
}
