import Link from "next/link";
import { SITE_NAME, SITE_EMAIL, SITE_REGION } from "@/lib/site";
import { CookieSettingsButton } from "./cookies/CookieSettingsButton";
import { SiteMark } from "./SiteMark";
import { services, servicePath } from "@/lib/data/services";
import { practiceAreas } from "@/lib/data/practice-areas";

const firmLinks = [
  { href: "/about", label: "About" },
  { href: "/how-we-work", label: "How We Work" },
  { href: "/qualifications-accreditations", label: "Qualifications" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/insights", label: "Insights" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
];

const linkMatrix = [
  {
    index: "A",
    title: "Expert Services",
    links: services.map((s) => ({ href: servicePath(s.id), label: s.title })),
  },
  {
    index: "B",
    title: "Practice Areas",
    links: practiceAreas.map((p) => ({
      href: `/practice-areas/${p.slug}`,
      label: p.title,
    })),
  },
  {
    index: "C",
    title: "The Firm",
    links: firmLinks,
  },
  {
    index: "D",
    title: "Key Topics",
    links: [
      { href: "/services/expert-witness", label: "Expert Witness" },
      { href: "/services/business-valuation", label: "Valuations" },
      { href: "/practice-areas/shareholder-disputes", label: "Shareholder Disputes" },
      { href: "/services/loss-quantification", label: "Loss & Damages" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-auto">
      {/* Copper CTA band — unique among sibling sites */}
      <div className="bg-copper">
        <div className="container-page flex flex-col items-start justify-between gap-6 py-10 sm:flex-row sm:items-center sm:py-12">
          <div className="max-w-xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink/60">
              Retain an expert
            </p>
            <p className="mt-2 font-serif text-2xl font-bold leading-tight text-ink sm:text-3xl">
              Need a forensic accountant for your case?
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ink/80">
              Expert witness testimony, valuations, shareholder disputes, and damages
              analysis for law firms and businesses nationwide.
            </p>
          </div>
          <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:items-end">
            <Link
              href="/contact"
              className="inline-flex min-h-touch w-full items-center justify-center gap-2 bg-ink px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-ink/90 sm:w-auto"
            >
              Discuss Your Case
              <span aria-hidden="true">&rarr;</span>
            </Link>
            <a
              href={`mailto:${SITE_EMAIL}`}
              className="text-center text-sm font-medium text-ink/80 underline-offset-2 hover:text-ink hover:underline sm:text-right"
            >
              {SITE_EMAIL}
            </a>
          </div>
        </div>
      </div>

      {/* Link matrix — dark asymmetric grid, not standard 4-column lists */}
      <div className="relative overflow-hidden bg-ink">
        <div
          className="pointer-events-none absolute -right-16 top-8 select-none font-serif text-[12rem] font-bold leading-none text-white/[0.03]"
          aria-hidden="true"
        >
          LF
        </div>
        <div className="container-page relative py-12 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <SiteMark inverted showText />
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/65">
                Independent forensic accounting practice serving clients across the{" "}
                {SITE_REGION}. We are not a law firm and do not provide legal advice.
              </p>
              <p className="mt-4 inline-block border border-copper/40 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-copper">
                {SITE_REGION} Only
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-2">
              {linkMatrix.map((section) => (
                <div key={section.index} className="min-w-0 border-t border-white/10 pt-5">
                  <h3 className="flex items-baseline gap-2 text-white/90">
                    <span className="font-serif text-lg text-copper">{section.index}.</span>
                    <span className="text-xs font-bold uppercase tracking-[0.14em]">
                      {section.title}
                    </span>
                  </h3>
                  <ul className="mt-4 space-y-2">
                    {section.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="inline-flex min-h-touch items-center text-sm text-white/60 transition hover:text-copper focus:outline-none focus-visible:underline"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Single legal strip */}
      <div className="border-t border-border bg-stone-dark">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-4 text-xs text-slate-muted sm:flex-row sm:py-5">
          <p>
            &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <Link href="/privacy" className="hover:text-copper">
              Privacy Policy
            </Link>
            <span aria-hidden="true">·</span>
            <Link href="/terms" className="hover:text-copper">
              Terms of Use
            </Link>
            <span aria-hidden="true">·</span>
            <Link href="/cookies" className="hover:text-copper">
              Cookie Policy
            </Link>
            <span aria-hidden="true">·</span>
            <CookieSettingsButton className="text-slate-muted hover:text-copper" />
          </p>
        </div>
      </div>
    </footer>
  );
}
