"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Bot, BrainCircuit, CalendarCheck, Inbox, MessageSquareText, ShieldCheck, Tags, type LucideIcon } from "lucide-react";
import { AIChatSimulation } from "@/components/marketing/ai-chat-simulation";

const STEPS: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: MessageSquareText, title: "Reads the message", text: "Every inbound WhatsApp chat, day or night." },
  { icon: BrainCircuit, title: "Understands intent", text: "Pricing question, booking, complaint or new lead." },
  { icon: BookOpen, title: "Answers from your knowledge base", text: "Replies with your prices, services and policies." },
  { icon: Tags, title: "Tags and routes", text: "High-value leads go straight to the right team queue." },
];

const FEATURES: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: CalendarCheck, title: "Instant booking sync", text: "Customers check free slots and book on WhatsApp." },
  { icon: Inbox, title: "Human handover", text: "Your team takes over any chat from the shared inbox." },
  { icon: ShieldCheck, title: "Secure data controls", text: "Encrypted storage, with each business's data kept separate." },
];

/** Home page: "Smart Customer Support" story with a 4-step flow beside the WhatsApp chat demo. */
export function AiSupportSection() {
  return (
    <section className="relative px-8 py-16 sm:px-20 lg:px-32">
      <div className="mx-auto grid max-w-[1360px] grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="space-y-5">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-emerald-500">
            <Bot className="size-3.5" /> Smart customer support
          </div>

          <div className="space-y-2.5">
            <h2 className="text-3xl font-semibold leading-tight tracking-tight text-[var(--m-text-heading)] sm:text-4xl md:text-5xl">
              An AI assistant that resolves queries <span className="text-emerald-500">24/7.</span>
            </h2>
            <p className="max-w-xl text-sm leading-relaxed text-[var(--m-text-tertiary)]">
              It reads every inbound message, works out what the customer wants, replies from your own knowledge base and tags the chat so high-value leads reach the right team.
            </p>
          </div>

          {/* How it works */}
          <ol className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {STEPS.map((s, i) => (
              <li key={s.title} className="flex items-start gap-3 rounded-xl px-3.5 py-2.5">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-emerald-500/40 bg-emerald-500/10 text-emerald-500">
                  <s.icon className="size-4" />
                </span>
                <span className="min-w-0 pt-0.5">
                  <span className="flex items-center gap-2 text-sm font-semibold text-[var(--m-text-heading)]">
                    <span className="font-mono text-[10px] text-emerald-500">0{i + 1}</span>
                    {s.title}
                  </span>
                  <span className="mt-0.5 block text-xs leading-snug text-[var(--m-text-tertiary)]">{s.text}</span>
                </span>
              </li>
            ))}
          </ol>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="group rounded-xl border border-[var(--m-border-primary)] bg-[var(--m-bg-secondary)]/50 px-3.5 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-500/40">
                <span className="grid size-8 place-items-center rounded-lg bg-emerald-500/10 text-emerald-500 transition-colors group-hover:bg-emerald-500 group-hover:!text-white">
                  <f.icon className="size-4" />
                </span>
                <h3 className="mt-2 text-xs font-semibold text-[var(--m-text-heading)]">{f.title}</h3>
                <p className="mt-1 text-[11px] leading-snug text-[var(--m-text-tertiary)]">{f.text}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link href="/signup" className="group inline-flex items-center gap-2 rounded-lg bg-[#047857] px-5 py-2.5 text-xs font-semibold !text-white shadow-[0_6px_24px_rgba(4,120,87,0.25)] transition-colors hover:bg-[#065f46]">
              Try the AI assistant free <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/ai-automation" className="text-xs font-semibold text-[var(--m-text-secondary)] transition-colors hover:text-emerald-500">
              See how AI automation works →
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute inset-0 bg-emerald-500/10 blur-[90px]" />
          <AIChatSimulation />
        </div>
      </div>
    </section>
  );
}
