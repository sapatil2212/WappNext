"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Check, Copy, Gift, X } from "lucide-react";

export interface PublicOffers {
  welcome: Offer | null;
  exitIntent: Offer | null;
  topBanner: Offer | null;
}

let offersRequest: Promise<PublicOffers | null> | null = null;

/** Live offers, fetched once per page load and shared by the pop-ups and the top banner. */
export function loadPublicOffers(): Promise<PublicOffers | null> {
  offersRequest ??= fetch("/api/public/offers", { cache: "no-store" })
    .then((r) => (r.ok ? r.json() : null))
    .then((b) => (b?.data ? { welcome: null, exitIntent: null, topBanner: null, ...b.data } : null))
    .catch(() => null);
  const req = offersRequest;
  // Allow a fresh fetch on the next client-side visit to the home page.
  void req.finally(() => setTimeout(() => { if (offersRequest === req) offersRequest = null; }, 5000));
  return req;
}

export interface Offer {
  id: string;
  kind: "welcome" | "exit_intent" | "top_banner";
  title: string;
  body: string | null;
  imageUrl: string | null;
  ctaLabel: string | null;
  ctaUrl: string | null;
  promoCode: string | null;
  delaySeconds: number;
  frequency: "session" | "day" | "week" | "always";
  version: number;
}

const WINDOW_MS = { session: 0, day: 86_400_000, week: 7 * 86_400_000, always: 0 } as const;

/** Whether this visitor may see the offer again (per offer and per version, so an edited offer shows again). */
function allowed(o: Offer): boolean {
  if (o.frequency === "always") return true;
  const key = `cnx.offer.${o.id}.${o.version}`;
  try {
    if (o.frequency === "session") return !sessionStorage.getItem(key);
    const last = Number(localStorage.getItem(key) ?? 0);
    return Date.now() - last > WINDOW_MS[o.frequency];
  } catch {
    return true;
  }
}

function remember(o: Offer) {
  const key = `cnx.offer.${o.id}.${o.version}`;
  try {
    if (o.frequency === "session") sessionStorage.setItem(key, "1");
    else if (o.frequency !== "always") localStorage.setItem(key, String(Date.now()));
  } catch {
    /* private mode: show again next time */
  }
}

export const track = (id: string, type: "view" | "click" | "dismiss") =>
  void fetch(`/api/public/offers/${id}/event`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type }), keepalive: true }).catch(() => undefined);

/** CTA target, with the promo code attached when it points at signup. */
export function ctaHref(o: Pick<Offer, "ctaUrl" | "promoCode">): string {
  const url = o.ctaUrl || "/signup";
  if (!o.promoCode || !url.startsWith("/signup")) return url;
  return `${url}${url.includes("?") ? "&" : "?"}promo=${encodeURIComponent(o.promoCode)}`;
}

/**
 * Home-page pop-ups set up in Super Admin → Offers.
 *   welcome      opens a few seconds after the visitor lands
 *   exit intent  opens when the pointer leaves through the top of the window
 *                (desktop), or on a quick scroll back to the top (phones)
 * Only one pop-up is shown per visit, and each respects its frequency.
 */
export function OfferPopups() {
  const [offers, setOffers] = useState<PublicOffers | null>(null);
  const [open, setOpen] = useState<Offer | null>(null);
  const shownThisVisit = useRef(false);
  const clicked = useRef(false);

  useEffect(() => {
    let live = true;
    void loadPublicOffers().then((data) => live && data && setOffers(data));
    return () => {
      live = false;
    };
  }, []);

  const show = useCallback((o: Offer) => {
    if (shownThisVisit.current || !allowed(o)) return;
    shownThisVisit.current = true;
    remember(o);
    setOpen(o);
    track(o.id, "view");
  }, []);

  // Welcome pop-up after its delay.
  useEffect(() => {
    const o = offers?.welcome;
    if (!o) return;
    const t = setTimeout(() => show(o), Math.max(0, o.delaySeconds) * 1000);
    return () => clearTimeout(t);
  }, [offers, show]);

  // Exit intent.
  useEffect(() => {
    const o = offers?.exitIntent;
    if (!o) return;
    const armedAt = Date.now() + 4000; // never right after landing
    const onLeave = (e: MouseEvent) => {
      if (Date.now() < armedAt || e.relatedTarget || e.clientY > 10) return;
      show(o);
    };
    // Phones have no pointer: a fast scroll back to the top after reading is the usual sign of leaving.
    let maxY = 0;
    let lastY = window.scrollY;
    let lastT = performance.now();
    const onScroll = () => {
      const y = window.scrollY;
      const t = performance.now();
      maxY = Math.max(maxY, y);
      const speed = (lastY - y) / Math.max(1, t - lastT); // px/ms upward
      if (Date.now() > armedAt && maxY > window.innerHeight * 1.5 && y < window.innerHeight * 0.4 && speed > 1.2) show(o);
      lastY = y;
      lastT = t;
    };
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (coarse) window.addEventListener("scroll", onScroll, { passive: true });
    else document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [offers, show]);

  if (!open) return null;
  return (
    <OfferModal
      offer={open}
      onClose={() => { if (!clicked.current) track(open.id, "dismiss"); setOpen(null); }}
      onCta={() => { clicked.current = true; track(open.id, "click"); }}
    />
  );
}

/** Must match the `duration-300` transition on the backdrop and panel. */
const EXIT_MS = 300;

export function OfferModal({ offer, onClose, onCta, preview }: { offer: Pick<Offer, "id" | "kind" | "title" | "body" | "imageUrl" | "ctaLabel" | "ctaUrl" | "promoCode">; onClose: () => void; onCta?: () => void; preview?: boolean }) {
  const [copied, setCopied] = useState(false);
  // `shown` drives the enter/exit transition: mount hidden, flip on next frame, flip back before unmounting.
  const [shown, setShown] = useState(false);
  const closing = useRef(false);

  useEffect(() => {
    let inner = 0;
    const outer = requestAnimationFrame(() => { inner = requestAnimationFrame(() => setShown(true)); });
    return () => { cancelAnimationFrame(outer); cancelAnimationFrame(inner); };
  }, []);

  const close = useCallback(() => {
    if (closing.current) return;
    closing.current = true;
    setShown(false);
    const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setTimeout(onClose, reduced ? 0 : EXIT_MS);
  }, [onClose]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

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

  const href = ctaHref(offer as Offer);
  const external = /^https:\/\//.test(href);
  const title = offer.title?.trim() || "";
  const hasText = Boolean(title || offer.body);
  // Only the parts that were filled in are shown; an image on its own shows just the image.
  const hasDetails = Boolean(hasText || offer.promoCode || offer.ctaLabel);
  const imageOnly = Boolean(offer.imageUrl) && !hasDetails;

  const follow = (e: React.MouseEvent) => {
    if (preview) return e.preventDefault();
    onCta?.();
    if (!external) close();
  };
  const linkProps = { href, target: external ? "_blank" : undefined, rel: external ? "noopener noreferrer" : undefined, onClick: follow };

  const image = offer.imageUrl ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={offer.imageUrl}
      alt={title}
      className={imageOnly ? "block h-auto max-h-[85vh] w-full object-contain" : "block h-auto max-h-72 w-full object-cover"}
    />
  ) : null;

  return (
    <div
      className={`${preview ? "absolute" : "fixed"} inset-0 z-[300] flex items-end justify-center bg-black/60 p-0 backdrop-blur-sm transition-opacity duration-300 ease-out motion-reduce:transition-none sm:items-center sm:p-4 ${shown ? "opacity-100" : "opacity-0"}`}
      role="dialog"
      aria-modal="true"
      aria-label={title || "Special offer"}
      onMouseDown={(e) => e.target === e.currentTarget && close()}
    >
      <div
        className={`relative w-full overflow-hidden rounded-t-2xl bg-white text-slate-900 shadow-2xl transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none sm:rounded-2xl ${imageOnly ? "max-w-lg" : "max-w-md"} ${shown ? "translate-y-0 opacity-100 sm:scale-100" : "translate-y-full opacity-0 sm:translate-y-4 sm:scale-95"}`}
      >
        <button type="button" onClick={close} aria-label="Close" className="absolute right-2.5 top-2.5 z-10 grid size-8 place-items-center rounded-full bg-white/90 text-slate-600 shadow-sm transition-colors hover:bg-white hover:text-slate-900">
          <X className="size-4" />
        </button>
        {image ? (
          offer.ctaUrl ? <Link {...linkProps} aria-label={offer.ctaLabel || title || "Open offer"} className="block">{image}</Link> : image
        ) : (
          <div className="flex h-24 items-center justify-center bg-gradient-to-br from-emerald-400 to-emerald-600">
            <Gift className="size-10 text-white" />
          </div>
        )}
        {hasDetails && (
        <div className="space-y-3 p-5 text-center">
          {offer.kind === "exit_intent" && hasText && <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-600">Wait, before you go</p>}
          {title && <h2 className="text-xl font-bold leading-snug">{title}</h2>}
          {offer.body && <p className="whitespace-pre-line text-sm text-slate-600">{offer.body}</p>}
          {offer.promoCode && (
            <button type="button" onClick={copy} className="mx-auto flex items-center gap-2 rounded-lg border-2 border-dashed border-emerald-500 bg-emerald-50 px-4 py-2 font-mono text-base font-bold tracking-wider text-emerald-700 transition-colors hover:bg-emerald-100">
              {offer.promoCode}
              {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
            </button>
          )}
          {offer.promoCode && <p className="text-[11px] text-slate-500">{copied ? "Copied. It's applied automatically at signup." : "Tap to copy. It's applied automatically at signup."}</p>}
          {offer.ctaLabel && (
            <>
              <Link
                {...linkProps}
                className="flex h-11 w-full items-center justify-center rounded-xl bg-[#047857] text-sm font-semibold !text-white shadow-[0_6px_24px_rgba(4,120,87,0.25)] transition-colors hover:bg-[#065f46]"
              >
                {offer.ctaLabel}
              </Link>
              <button type="button" onClick={close} className="text-xs text-slate-500 hover:text-slate-700">No thanks</button>
            </>
          )}
        </div>
        )}
      </div>
    </div>
  );
}
