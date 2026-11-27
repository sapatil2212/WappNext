import React from "react";
import { Cookie } from "lucide-react";
import { ContactPhones } from "@/components/marketing/contact-phones";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Cookie Policy",
  description: "Which cookies and browser storage WappNext uses, why, and how you can control them.",
  path: "/cookie-policy",
});

export default function CookiePolicyPage() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 md:px-6 py-20 space-y-10">
      <div className="space-y-4 border-b border-[var(--m-border-primary)] pb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-500/25 bg-emerald-950/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
          <Cookie className="size-3" /> Legal Document
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[var(--m-text-heading)] tracking-tight">
          Cookie Policy
        </h1>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[var(--m-text-muted)]">
          <p>Last updated: November 2026</p>
          <span>•</span>
          <p className="font-medium text-[var(--m-text-secondary)]">Operated by Brightwave Digital Products LLP (India)</p>
        </div>
      </div>

      <div className="space-y-8 text-xs sm:text-sm text-[var(--m-text-secondary)] leading-relaxed">
        <p>
          This Cookie Policy explains how WappNext, operated by <strong className="text-[var(--m-text-secondary)] font-semibold">Brightwave Digital Products LLP</strong>, uses cookies and similar browser storage on our website and dashboard. It should be read together with our Privacy Policy.
        </p>

        <section className="space-y-3">
          <h3 className="text-lg font-bold text-[var(--m-text-heading)]">1. What Cookies Are</h3>
          <p>
            Cookies are small text files that a website stores in your browser. Browsers also offer &quot;local storage&quot;, which works in a similar way but is only read by the website itself. We use both, only for the purposes described below.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-lg font-bold text-[var(--m-text-heading)]">2. Strictly Necessary Cookies</h3>
          <p>These cookies are required to sign you in and keep your account secure. The service cannot work without them.</p>
          <ul className="list-disc pl-5 space-y-1 text-[var(--m-text-tertiary)]">
            <li><strong className="text-[var(--m-text-secondary)]">accessToken</strong> keeps you signed in. It expires after 15 minutes and is renewed automatically while you use the dashboard.</li>
            <li><strong className="text-[var(--m-text-secondary)]">refreshToken</strong> renews your session securely. It expires after 7 days or when you sign out.</li>
          </ul>
          <p>
            Both cookies are marked HTTP-only, so scripts on the page cannot read them, and are sent only over secure (HTTPS) connections.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-lg font-bold text-[var(--m-text-heading)]">3. Preference Storage</h3>
          <p>We store a few settings in your browser&apos;s local storage so the site remembers your choices:</p>
          <ul className="list-disc pl-5 space-y-1 text-[var(--m-text-tertiary)]">
            <li>Your light or dark mode and colour theme.</li>
            <li>Announcements and offers you have dismissed, so they are not shown again.</li>
            <li>Unsaved drafts in the dashboard, such as a campaign you are still creating.</li>
          </ul>
          <p>This information stays on your device and is not used to track you.</p>
        </section>

        <section className="space-y-3">
          <h3 className="text-lg font-bold text-[var(--m-text-heading)]">4. No Advertising or Tracking Cookies</h3>
          <p>
            We do not use advertising cookies, and we do not use cookies to track you across other websites or to build advertising profiles.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-lg font-bold text-[var(--m-text-heading)]">5. Third-Party Services</h3>
          <p>
            Payments are processed by Razorpay. When you open the payment window, Razorpay may set its own cookies to process the payment securely and prevent fraud. These are governed by Razorpay&apos;s own policies.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-lg font-bold text-[var(--m-text-heading)]">6. Managing Cookies</h3>
          <p>
            You can delete or block cookies and site data in your browser settings at any time. If you block the strictly necessary cookies, you will not be able to sign in to the dashboard. Clearing local storage resets your theme and dismissed announcements.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-lg font-bold text-[var(--m-text-heading)]">7. Changes to This Policy</h3>
          <p>
            If we start using new kinds of cookies, we will update this page and the &quot;Last updated&quot; date above.
          </p>
        </section>

        <section className="space-y-3 text-center pt-8 border-t border-[var(--m-border-primary)]/50">
          <h3 className="text-lg font-bold text-[var(--m-text-heading)]">8. Contact Us</h3>
          <p>For any questions about this Cookie Policy, please contact us:</p>
          <div className="text-xs text-[var(--m-text-tertiary)] mt-3 space-y-1">
            <p className="font-bold text-[var(--m-text-primary)]">Brightwave Digital Products LLP</p>
            <p className="text-[var(--m-text-secondary)] font-medium">Operators of WappNext</p>
            <p>Pune, Maharashtra, India</p>
            <p>
              Email: <a href="mailto:contactwappnext@gmail.com" className="text-emerald-400 hover:underline">contactwappnext@gmail.com</a>
            </p>
            <p>
              Phone: <ContactPhones />
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
