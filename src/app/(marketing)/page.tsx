import React from "react";
import Link from "next/link";
import { ArrowRight, Check, ChevronDown, Landmark } from "lucide-react";
import { PLANS } from "@/lib/billing/plans";
import { InteractiveHero } from "@/components/marketing/interactive-hero";
import { OfferPopups } from "@/components/marketing/offer-popups";
import { SpotlightCard } from "@/components/marketing/spotlight-card";
import { MagneticButton } from "@/components/marketing/magnetic-button";
import { AiSupportSection } from "@/components/marketing/ai-support-section";

import { BookDemoTrigger } from "@/components/marketing/book-demo-trigger";
import { WhatWeDoSection } from "@/components/marketing/what-we-do-section";
import { WhatsAppStats } from "@/components/marketing/whatsapp-stats";
import { QrStandeeShowcase } from "@/components/marketing/qr-standee-showcase";
import { BroadcastSection } from "@/components/marketing/broadcast-section";
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, OG_IMAGE, SITE_NAME, SITE_URL, jsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: DEFAULT_TITLE,
  absoluteTitle: true,
  description: DEFAULT_DESCRIPTION,
  path: "/",
  keywords: ["best WhatsApp marketing software", "WhatsApp bulk message sender", "WhatsApp API provider India"],
});

/** Software listing for Google, built from the real plans and features. */
const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${SITE_URL}/#software`,
  name: SITE_NAME,
  url: SITE_URL,
  image: `${SITE_URL}${OG_IMAGE.url}`,
  description: DEFAULT_DESCRIPTION,
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "WhatsApp Marketing Software",
  operatingSystem: "Web",
  publisher: { "@id": `${SITE_URL}/#organization` },
  featureList: [
    "Official WhatsApp Business API (Meta Cloud API)",
    "Bulk WhatsApp broadcast campaigns with personalization",
    "AI chatbot and automated replies",
    "Shared team inbox",
    "WhatsApp CRM and sales pipelines",
    "Drip sequences and follow-ups",
    "Click-to-WhatsApp ads",
    "Real-time campaign analytics",
    "API and webhooks",
  ],
  offers: PLANS.filter((p) => p.pricePaise).map((p) => ({
    "@type": "Offer",
    name: p.name,
    description: p.description,
    price: (p.pricePaise! / 100).toFixed(2),
    priceCurrency: "INR",
    url: `${SITE_URL}/pricing`,
    availability: "https://schema.org/InStock",
  })),
};

interface FAQItem {
  q: string;
  a: string;
}

export default function HomePage() {
  const useCases = [
    {
      title: "Appointment Reminders & Triage",
      category: "Healthcare & Wellness",
      content: "Automate patient consultation reminders, handle rescheduling, and answer clinic FAQs with instant routing to front-desk staff.",
      metric: "Zero Missed Appointments",
      tag: "Clinical Automation",
    },
    {
      title: "Order Alerts & Delivery Tracking",
      category: "D2C & Online Retail",
      content: "Send real-time dispatch updates, tracking notifications, and opt-in customer service responses via verified Meta Cloud API templates.",
      metric: "Direct Customer Reach",
      tag: "E-Commerce",
    },
    {
      title: "Inbound Lead Qualification",
      category: "B2B & Professional Services",
      content: "Capture leads from Click-to-WhatsApp ads, qualify prospects automatically, and assign conversation cards in the shared team inbox.",
      metric: "Sub-Second Ingestion",
      tag: "Sales Pipelines",
    },
  ];

  const faqs: FAQItem[] = [
    {
      q: "What is WappNext and how does it work?",
      a: "WappNext is a WhatsApp Business communication and automation SaaS platform operated by Brightwave Digital Products LLP. It enables businesses to connect their own WhatsApp Business Account via Meta Cloud API, manage conversations in a collaborative team inbox, build automated response flows, and organize deals in visual kanban pipelines.",
    },
    {
      q: "Is WappNext compliant with WhatsApp policies?",
      a: "Yes. WappNext strictly follows Meta's Business Messaging Policy and Commerce Policy. We integrate exclusively via the official WhatsApp Cloud API. We strictly require user opt-in consent and provide automated opt-out mechanisms (STOP keyword), protecting your business reputation.",
    },
    {
      q: "Do I need my own WhatsApp Business Account (WABA)?",
      a: "Yes. Under our multi-tenant architecture, each business authorizes and connects their own WhatsApp Business Account using their Phone Number ID and permanent Meta access token. You maintain complete ownership of your customer relationships and phone numbers.",
    },
    {
      q: "What are the subscription rates and Meta API fees?",
      a: "Self-Managed is ₹999/month per WhatsApp number (you run everything), Fully Managed is ₹1,999/month (our team runs it for you), and Custom plans are quoted for larger setups. Meta conversation-based fees (Utility, Authentication, Marketing, Service) are paid directly to Meta according to their official regional card rates; WappNext passes through Meta API charges with 0% markup.",
    },
    {
      q: "How does the AI Assistant resolve queries?",
      a: "You can upload your database guidelines, FAQs, and service files directly to the platform. Our AI parses user intent, answers client inquiries using your knowledge base guidelines, and flags human agents when a manual takeover is required.",
    },
  ];

  const pricingCards = PLANS.map((p) => ({
    name: p.name,
    tag: p.tagline,
    price: p.price,
    period: p.period,
    renewal: p.selfServe ? "per WhatsApp number" : "Pricing tailored to your setup",
    desc: p.description,
    features: p.features,
    cta: p.cta,
    link: p.selfServe ? `/signup?plan=${p.id}` : "/book-demo",
    primary: Boolean(p.popular),
  }));
  return (
    <div className="w-full flex flex-col overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(softwareJsonLd) }} />
      {/* FAQ Schema Injector */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map((faq) => ({
              "@type": "Question",
              "name": faq.q,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a,
              },
            })),
          }),
        }}
      />

      {/* 1. HERO SECTION */}
      <OfferPopups />
      <InteractiveHero />

      {/* 2. WHAT WE DO */}
      <WhatWeDoSection />

      {/* 2b. WHY WHATSAPP STATS */}
      <WhatsAppStats />

      {/* 3. BROADCAST */}
      <BroadcastSection />

      {/* 4. AI CUSTOMER SUPPORT */}
      <AiSupportSection />

      {/* 5. QR CODES AND STANDEES */}
      <QrStandeeShowcase />

      {/* 6. TESTIMONIALS SECTION */}
      <section className="py-24 max-w-full overflow-hidden space-y-12 relative">
        <style>{`
          @keyframes testimonial-marquee {
            0% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .animate-testimonial-marquee {
            display: flex;
            width: max-content;
            animation: testimonial-marquee 45s linear infinite;
          }
          .animate-testimonial-marquee:hover {
            animation-play-state: paused;
          }
        `}</style>

        <div className="text-center space-y-4 max-w-3xl mx-auto px-8 sm:px-20 lg:px-32">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Industry Blueprints</span>
          <h2 className="text-3xl sm:text-4xl font-semibold text-[var(--m-text-heading)] tracking-tight">
            Built for Real-World Customer Workflows
          </h2>
          <p className="text-sm text-[var(--m-text-tertiary)]">
            Explore how modern teams deploy official WhatsApp Business automation across sectors.
          </p>
        </div>

        {/* Marquee Wrapper */}
        <div className="relative w-full overflow-hidden py-4 select-none">
          {/* Fade gradients */}
          <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[var(--m-bg-primary)] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[var(--m-bg-primary)] to-transparent z-10 pointer-events-none" />

          <div className="animate-testimonial-marquee flex gap-6">
            {/* Duplicated list to enable seamless loop */}
            {[...useCases, ...useCases, ...useCases, ...useCases].map((u, idx) => (
              <div key={idx} className="w-[320px] sm:w-[380px] shrink-0">
                <SpotlightCard interactive={false}>
                  <div className="space-y-4 flex flex-col justify-between h-full min-h-[165px]">
                    <div className="space-y-2">
                      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {u.tag}
                      </div>
                      <h4 className="text-sm font-bold text-[var(--m-text-primary)]">{u.title}</h4>
                      <p className="text-xs text-[var(--m-text-tertiary)] leading-relaxed pt-1">
                        {u.content}
                      </p>
                    </div>
                    <div className="border-t border-[var(--m-border-primary)]/50 pt-3 mt-4 flex items-center justify-between">
                      <span className="text-[10px] text-[var(--m-text-muted)] font-medium">{u.category}</span>
                      <span className="text-[10px] text-teal-400 font-semibold">{u.metric}</span>
                    </div>
                  </div>
                </SpotlightCard>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* 8. PRICING PREVIEW */}
      <section className="box-content py-24 px-8 sm:px-20 lg:px-32 border-t border-[var(--m-border-primary)] max-w-[1360px] mx-auto space-y-16">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-500/25 bg-[var(--m-badge-bg)] text-emerald-500 text-[10px] font-bold uppercase tracking-wider">
            <Landmark className="size-3.5" /> Pricing Options
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--m-text-heading)]">
            Simple pricing.
          </h2>
          <p className="text-sm text-[var(--m-text-tertiary)]">
            ₹999/month if you manage it, ₹1,999/month if we manage everything, or a custom plan. Prices per WhatsApp number, exclusive of GST.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingCards.map((plan, idx) => (
            <SpotlightCard
              key={idx}
              interactive={true}
              className={plan.primary ? "border-emerald-500/50 shadow-lg relative" : "border-[var(--m-border-primary)]/80"}
              glowColor={plan.primary ? "rgba(16, 185, 129, 0.15)" : "rgba(148, 163, 184, 0.08)"}
            >
              <div className="space-y-6 flex flex-col justify-between h-full">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[var(--m-text-muted)]">{plan.name}</span>
                    {plan.primary && (
                      <span className="bg-[#047857] !text-white text-[9px] font-bold uppercase px-2 py-0.5 rounded-full tracking-wider">
                        Recommended
                      </span>
                    )}
                  </div>
                  <h4 className="text-xs font-semibold text-[var(--m-text-tertiary)]">{plan.tag}</h4>
                  
                  <div className="flex items-baseline gap-1 py-2 border-y border-[var(--m-border-primary)]/50">
                    <span className="text-3xl font-extrabold text-[var(--m-text-heading)]">{plan.price}</span>
                    <span className="text-xs text-[var(--m-text-muted)]">{plan.period}</span>
                  </div>
                  {plan.renewal && (
                    <p className="text-[10px] text-emerald-400 font-medium">{plan.renewal}</p>
                  )}
                  <p className="text-xs text-[var(--m-text-tertiary)] leading-relaxed pt-1">
                    {plan.desc}
                  </p>
                </div>

                <div className="space-y-4 pt-4">
                  <ul className="space-y-2 border-t border-[var(--m-border-primary)]/40 pt-4 text-xs text-[var(--m-text-tertiary)]">
                    {plan.features.slice(0, 5).map((f, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="size-3.5 text-emerald-400 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={plan.link || "/pricing"}
                    className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all duration-300 ease-out text-center flex items-center justify-center gap-1.5 ${
                      plan.primary
                        ? "bg-[#047857] !text-white hover:bg-[#065f46] shadow-[0_0_12px_rgba(16,185,129,0.2)]"
                        : "bg-[var(--m-bg-secondary)] border border-[var(--m-border-primary)] text-[var(--m-text-secondary)] hover:bg-[var(--m-bg-tertiary)]"
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* 9. FAQ SECTION */}
      <section className="box-content py-24 px-8 sm:px-20 lg:px-32 border-t border-[var(--m-border-primary)] max-w-4xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Common Questions</span>
          <h2 className="text-3xl sm:text-4xl font-semibold text-[var(--m-text-heading)] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-[var(--m-text-tertiary)]">
            Find details regarding API guidelines, verification steps, and compliant workflows.
          </p>
        </div>

        <div className="space-y-4 pt-6">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group border border-[var(--m-border-primary)] bg-[var(--m-bg-secondary)]/10 rounded-xl overflow-hidden"
            >
              <summary className="w-full px-6 py-4 flex items-center justify-between text-left font-semibold text-xs sm:text-sm text-[var(--m-text-secondary)] hover:text-[var(--m-text-heading)] transition-colors cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                <span>{faq.q}</span>
                <ChevronDown className="size-4 text-[var(--m-text-muted)] transition-transform group-open:rotate-180 group-open:text-emerald-400" />
              </summary>
              <div className="px-6 pb-5 pt-3 text-xs text-[var(--m-text-tertiary)] leading-relaxed border-t border-[var(--m-border-primary)]/40 bg-[var(--m-bg-secondary)]/20">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* 10. GIANT CTA SECTION */}
      <section className="box-content py-24 px-8 sm:px-20 lg:px-32 relative text-center max-w-[1360px] mx-auto border-t border-[var(--m-border-primary)] transition-colors duration-300">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[350px] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />

        <div className="space-y-6 relative z-10">
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-tight text-[var(--m-text-heading)] transition-colors duration-300">
            Ready to Automate your WhatsApp?
          </h2>
          <p className="text-sm max-w-xl mx-auto text-[var(--m-text-tertiary)] transition-colors duration-300">
            Get started in minutes. Connect your Meta Business account, setup your AI customer support workspace, and watch your business scale.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <MagneticButton>
              <Link
                href="/login"
                className="bg-[#047857] hover:bg-[#065f46] !text-white px-6 py-3 rounded-xl text-xs font-semibold transition-all duration-300 ease-out shadow-[0_0_16px_rgba(16,185,129,0.2)] hover:shadow-[0_0_24px_rgba(16,185,129,0.4)] flex items-center gap-1.5"
              >
                Start Free Trial <ArrowRight className="size-3.5" />
              </Link>
            </MagneticButton>
            <BookDemoTrigger className="px-6 py-3 rounded-xl text-xs font-semibold transition-all duration-300 ease-out border bg-[var(--m-bg-secondary)] border-[var(--m-border-primary)] text-[var(--m-text-secondary)] hover:bg-[var(--m-bg-tertiary)]">
              Contact Enterprise
            </BookDemoTrigger>
          </div>
        </div>
      </section>
    </div>
  );
}
