import Image from "next/image";
import { Megaphone } from "lucide-react";

const STATS = [
  { value: "200%", label: "Higher click-through rate than SMS" },
  { value: "40%", label: "Uptick in sales" },
  { value: "32%", label: "Increase in responses" },
];

/** Home page: WhatsApp broadcast campaigns, with headline stats beside the product image. */
export function BroadcastSection() {
  return (
    <section id="broadcast" className="relative px-8 py-16 sm:px-20 sm:py-20 lg:px-32">
      <div className="mx-auto max-w-[1360px] overflow-hidden rounded-3xl border border-[var(--m-border-primary)] bg-gradient-to-br from-emerald-500/[0.07] via-[var(--m-bg-secondary)]/40 to-violet-500/[0.06]">
        <div className="grid items-center gap-10 p-6 sm:p-10 lg:grid-cols-2 lg:gap-12 lg:p-14">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-emerald-500">
              <Megaphone className="size-3.5" aria-hidden="true" /> Broadcast
            </div>

            <div className="space-y-3">
              <h2 className="text-3xl font-semibold leading-tight tracking-tight text-[var(--m-text-heading)] sm:text-4xl md:text-5xl">
                Send messages to a <span className="text-emerald-500">targeted audience</span>
              </h2>
              <p className="max-w-xl text-sm leading-relaxed text-[var(--m-text-tertiary)] sm:text-base">
                Reach multiple customers at once with WhatsApp messages. Boost engagement, promote offers and share important
                updates effortlessly, all while keeping a personal touch.
              </p>
            </div>

            <dl className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-3">
              {STATS.map((s) => (
                <div key={s.value} className="rounded-2xl border border-[var(--m-border-primary)] bg-[var(--m-bg-primary)]/70 p-4">
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="text-3xl font-bold tracking-tight text-emerald-500 sm:text-4xl">{s.value}</dd>
                  <dd className="mt-1 text-xs leading-snug text-[var(--m-text-secondary)] sm:text-[13px]">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Image on the left from lg up; on phones the text still comes first. */}
          <div className="relative lg:order-first">
            <div aria-hidden="true" className="pointer-events-none absolute inset-8 rounded-full bg-violet-400/20 blur-3xl" />
            <Image
              src="/images/broadcast.png"
              alt="WhatsApp broadcast campaign: choosing a message template and recipients, with sent, delivered, read and replied results"
              width={1359}
              height={1157}
              sizes="(min-width: 1024px) 440px, 80vw"
              className="relative mx-auto h-auto w-full max-w-[340px] sm:max-w-[440px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
