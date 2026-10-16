import type { FAQ } from "@/lib/data/faq";

export function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
  return (
    <div className="divide-y divide-border border border-border bg-white shadow-card">
      {faqs.map((faq, index) => (
        <details key={faq.question} className="fold group" open={index === 0}>
          <summary className="flex min-h-touch items-start justify-between gap-4 px-4 py-4 text-left font-semibold text-ink transition hover:bg-stone-dark sm:px-5">
            <span className="min-w-0 flex-1 break-words text-sm sm:text-base">{faq.question}</span>
            <span aria-hidden="true" className="fold-sign mt-0.5 shrink-0 text-xl leading-none text-copper transition-transform">
              +
            </span>
          </summary>
          <div className="px-4 pb-4 text-sm leading-relaxed text-body sm:px-5 sm:text-base">{faq.answer}</div>
        </details>
      ))}
    </div>
  );
}
