import React from "react";

/** Public contact numbers shown on the contact and legal pages. */
export const CONTACT_PHONES = [
  { label: "+91 88305 53868", tel: "+918830553868" },
  { label: "+91 9168 08 1355", tel: "+919168081355" },
] as const;

/** "+91 88305 53868 / +91 9168 08 1355", each number a tap-to-call link. */
export function ContactPhones({ className = "text-emerald-400 hover:underline" }: { className?: string }) {
  return (
    <>
      {CONTACT_PHONES.map((p, i) => (
        <React.Fragment key={p.tel}>
          {i > 0 && " / "}
          <a href={`tel:${p.tel}`} className={className}>
            {p.label}
          </a>
        </React.Fragment>
      ))}
    </>
  );
}
