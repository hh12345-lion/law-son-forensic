"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { SITE_EMAIL, SITE_REGION } from "@/lib/site";
import { SiteMarkLink } from "./SiteMark";
import { NavDropdown } from "./NavDropdown";
import { services, servicePath } from "@/lib/data/services";
import { practiceAreas } from "@/lib/data/practice-areas";

const primaryNavLinks = [
  { href: "/about", label: "About" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/insights", label: "Insights" },
  { href: "/blog", label: "Blog" },
];

const practiceRail = [
  { href: "/services/expert-witness", label: "Expert Witness" },
  { href: "/services/business-valuation", label: "Valuations" },
  { href: "/practice-areas/shareholder-disputes", label: "Shareholder Disputes" },
  { href: "/services/loss-quantification", label: "Loss & Damages" },
  { href: "/practice-areas/commercial-disputes", label: "Commercial Disputes" },
  { href: "/services/fraud-investigation", label: "Forensic Accounting" },
];

const serviceDropdownItems = services.map((s) => ({
  href: servicePath(s.id),
  label: s.title,
}));

const practiceAreaDropdownItems = practiceAreas.map((p) => ({
  href: `/practice-areas/${p.slug}`,
  label: p.title,
}));

const mobileGroups = [
  {
    index: "01",
    label: "About the Firm",
    links: [
      { href: "/about", label: "About" },
      { href: "/how-we-work", label: "How We Work" },
      { href: "/qualifications-accreditations", label: "Qualifications" },
    ],
  },
  {
    index: "02",
    label: "Services",
    links: [{ href: "/services", label: "All Services" }, ...serviceDropdownItems],
  },
  {
    index: "03",
    label: "Practice Areas",
    links: [
      { href: "/practice-areas", label: "All Practice Areas" },
      ...practiceAreaDropdownItems,
    ],
  },
  {
    index: "04",
    label: "Experience & Resources",
    links: [
      { href: "/case-studies", label: "Case Studies" },
      { href: "/insights", label: "Insights" },
      { href: "/blog", label: "Blog" },
      { href: "/faq", label: "FAQ" },
    ],
  },
];

const navLinkClass =
  "inline-flex min-h-touch shrink-0 items-center px-2 py-2 text-sm font-medium text-white/80 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-copper xl:px-3";

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 pt-safe">
      {/* Primary band — dark docket bar (distinct from sibling white headers) */}
      <div className="bg-ink">
        <div className="container-page flex items-center justify-between gap-3 py-3 sm:py-3.5">
          <SiteMarkLink />

          <nav
            className="hidden items-center nav:flex"
            aria-label="Main navigation"
          >
            <Link href="/" className={navLinkClass}>
              Home
            </Link>
            <span className="mx-0.5 h-1 w-1 shrink-0 rounded-full bg-copper/60" aria-hidden="true" />
            {primaryNavLinks.map((link) => (
              <span key={link.href} className="flex items-center">
                <Link href={link.href} className={navLinkClass}>
                  {link.label}
                </Link>
                <span className="mx-0.5 h-1 w-1 shrink-0 rounded-full bg-copper/60" aria-hidden="true" />
              </span>
            ))}
            <NavDropdown
              label="Services"
              href="/services"
              items={serviceDropdownItems}
              align="left"
              variant="dark"
            />
            <span className="mx-0.5 h-1 w-1 shrink-0 rounded-full bg-copper/60" aria-hidden="true" />
            <NavDropdown
              label="Practice Areas"
              href="/practice-areas"
              items={practiceAreaDropdownItems}
              align="right"
              variant="dark"
            />
          </nav>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <a
              href={`mailto:${SITE_EMAIL}`}
              className="hidden min-h-touch items-center text-xs font-medium text-white/70 transition hover:text-copper lg:inline-flex xl:text-sm"
            >
              {SITE_EMAIL}
            </a>
            <Link
              href="/contact"
              className="hidden min-h-touch items-center gap-1.5 border border-copper/60 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-copper transition hover:bg-copper hover:text-white sm:inline-flex xl:px-4 xl:text-sm"
            >
              Discuss Your Case
              <span aria-hidden="true">&rarr;</span>
            </Link>
            <button
              type="button"
              className="inline-flex min-h-touch min-w-touch flex-col items-center justify-center gap-1.5 rounded nav:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen(!open)}
            >
              <span
                className={`block h-0.5 w-6 bg-white transition ${open ? "translate-y-2 rotate-45" : ""}`}
              />
              <span
                className={`block h-0.5 w-6 bg-white transition ${open ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-0.5 w-6 bg-white transition ${open ? "-translate-y-2 -rotate-45" : ""}`}
              />
            </button>
          </div>
        </div>

        {/* Mobile menu — expands inside dark header, numbered index style */}
        {open && (
          <nav
            id="mobile-menu"
            className="max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-t border-white/10 nav:hidden"
            aria-label="Mobile navigation"
          >
            <div className="container-page space-y-6 py-6 pb-safe">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-copper">
                Site index &middot; {SITE_REGION}
              </p>
              <Link
                href="/"
                className="flex min-h-touch items-center gap-3 font-medium text-white"
                onClick={() => setOpen(false)}
              >
                <span className="font-serif text-xs text-copper">—</span>
                Home
              </Link>
              {mobileGroups.map((group) => (
                <div key={group.label}>
                  <p className="mb-2 flex items-baseline gap-2 font-serif text-sm text-white/90">
                    <span className="font-sans text-[10px] font-bold text-copper">
                      {group.index}
                    </span>
                    {group.label}
                  </p>
                  <ul className="space-y-0.5 border-l border-white/10 pl-3">
                    {group.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="flex min-h-touch items-center break-words text-sm text-white/70 hover:text-white"
                          onClick={() => setOpen(false)}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <Link
                href="/contact"
                className="flex min-h-touch w-full items-center justify-center gap-2 border border-copper bg-copper text-sm font-semibold uppercase tracking-wide text-white"
                onClick={() => setOpen(false)}
              >
                Discuss Your Case
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </nav>
        )}
      </div>

      {/* Practice rail — horizontal topic strip below header */}
      <div className="hidden border-b border-border bg-stone-dark sm:block">
        <div className="container-page flex items-center gap-1 overflow-x-auto py-2 text-xs">
          <span className="mr-2 shrink-0 font-semibold uppercase tracking-[0.14em] text-sage">
            Practice focus
          </span>
          {practiceRail.map((item, i) => (
            <span key={item.href} className="flex shrink-0 items-center">
              {i > 0 && (
                <span className="mx-2 text-border" aria-hidden="true">
                  /
                </span>
              )}
              <Link
                href={item.href}
                className="whitespace-nowrap font-medium text-body transition hover:text-copper focus:outline-none focus-visible:underline"
              >
                {item.label}
              </Link>
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}
