import React from "react";
import { Truck } from "lucide-react";
import { ContactPhones } from "@/components/marketing/contact-phones";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Shipping & Delivery Policy",
  description: "How WappNext delivers its online WhatsApp marketing subscriptions and services. Access is activated digitally and no physical goods are shipped.",
  path: "/shipping-and-delivery",
});

export default function ShippingAndDeliveryPage() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 md:px-6 py-20 space-y-10">
      <div className="space-y-4 border-b border-[var(--m-border-primary)] pb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-500/25 bg-emerald-950/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
          <Truck className="size-3" /> Legal Document
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[var(--m-text-heading)] tracking-tight">
          Shipping &amp; Delivery Policy
        </h1>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[var(--m-text-muted)]">
          <p>Last updated: November 2026</p>
          <span>•</span>
          <p className="font-medium text-[var(--m-text-secondary)]">Operated by Brightwave Digital Products LLP (India)</p>
        </div>
      </div>

      <div className="space-y-8 text-xs sm:text-sm text-[var(--m-text-secondary)] leading-relaxed">
        <p>
          WappNext is an online software-as-a-service (SaaS) platform operated by <strong className="text-[var(--m-text-secondary)] font-semibold">Brightwave Digital Products LLP</strong>. Everything we sell is delivered digitally. This policy explains how and when you receive access to the subscriptions and services you purchase.
        </p>

        <section className="space-y-3">
          <h3 className="text-lg font-bold text-[var(--m-text-heading)]">1. No Physical Shipping</h3>
          <p>
            We do not sell or ship any physical products. No courier, postal or shipping charges apply to any order, and nothing is delivered to a physical address.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-lg font-bold text-[var(--m-text-heading)]">2. Delivery of Subscriptions</h3>
          <ul className="list-disc pl-5 space-y-1 text-[var(--m-text-tertiary)]">
            <li>Subscription plans are delivered as access to your WappNext account at our website.</li>
            <li>Access is usually activated immediately after your payment is confirmed, and in any case within 24 hours.</li>
            <li>A confirmation is sent to the email address registered on your account once the plan is active.</li>
            <li>Renewals are applied to the same account automatically when the renewal payment succeeds.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h3 className="text-lg font-bold text-[var(--m-text-heading)]">3. Setup, Onboarding &amp; Custom Services</h3>
          <p>
            Where you purchase onboarding, WhatsApp Business API setup, consultation or custom development, our team contacts you on your registered email or phone number to schedule the work. Timelines are shared with you before work begins and depend on the scope agreed for your project.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-lg font-bold text-[var(--m-text-heading)]">4. Third-Party Approvals</h3>
          <p>
            Some features depend on approvals from Meta, such as WhatsApp Business Account verification, phone number registration and message template review. These approvals are decided by Meta and their timing is outside our control. Your WappNext subscription itself is delivered regardless of the status of these approvals.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-lg font-bold text-[var(--m-text-heading)]">5. Delivery Issues</h3>
          <p>
            If your payment succeeded but your plan is not active within 24 hours, or you did not receive a confirmation, please contact us with your registered email address and payment reference. We will resolve the issue or, where we cannot deliver the service, handle it under our Refund Policy.
          </p>
        </section>

        <section className="space-y-3 text-center pt-8 border-t border-[var(--m-border-primary)]/50">
          <h3 className="text-lg font-bold text-[var(--m-text-heading)]">6. Contact Us</h3>
          <p>For any questions about delivery of your subscription or services, please contact us:</p>
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
