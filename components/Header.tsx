"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SiteMarkLink } from "./SiteMark";
import { NavDropdown, within } from "./NavDropdown";
import { services, servicePath } from "@/lib/data/services";
import { practiceAreas } from "@/lib/data/practice-areas";

const primaryNavLinks = [
  { href: "/about", label: "About" },
  { href: "/how-we-work", label: "How We Work" },
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
      { href: "/case-studies", label: "Example Engagements" },
      { href: "/insights", label: "Insights" },
      { href: "/blog", label: "Blog" },
      { href: "/faq", label: "FAQ" },
    ],
  },
];

export function Header() {
  const pathname = usePathname() || "/";
  const linkCls = (active: boolean) =>
    `relative inline-flex h-[4.75rem] items-center px-3 text-sm font-medium transition ${active ? "text-copper" : "text-white/80 hover:text-white"}`;
  const contactActive = within(pathname, "/contact");

  return (
    <header className="sticky top-0 z-50 pt-safe">
      {/* Keyed on the path so the mobile menu closes after each navigation. */}
      <input key={pathname} id="mobile-nav-toggle" type="checkbox" className="peer sr-only" aria-label="Toggle menu" />

      <div className="header-bar bg-ink">
        <div className="container-page flex items-center justify-between gap-4">
          <SiteMarkLink current={pathname === "/"} className="min-h-[4.25rem] nav:min-h-[4.75rem]" />

          <nav className="hidden items-center nav:flex" aria-label="Main navigation">
            {primaryNavLinks.map((link) => {
              const active = within(pathname, link.href);
              return (
                <Link key={link.href} href={link.href} aria-current={active ? "page" : undefined} className={linkCls(active)}>
                  {link.label}
                  {active && <span aria-hidden="true" className="absolute inset-x-3 bottom-0 h-[3px] bg-copper" />}
                </Link>
              );
            })}
            <NavDropdown label="Services" href="/services" items={serviceDropdownItems} pathname={pathname} />
            <NavDropdown label="Practice Areas" href="/practice-areas" items={practiceAreaDropdownItems} pathname={pathname} align="right" />
            <Link
              href="/contact"
              aria-current={contactActive ? "page" : undefined}
              className="ml-4 inline-flex min-h-[46px] items-center rounded-tr-3xl bg-copper px-6 text-sm font-semibold text-white transition hover:bg-copper-deep"
            >
              Discuss your case
            </Link>
          </nav>

          <label
            htmlFor="mobile-nav-toggle"
            className="inline-flex min-h-touch min-w-touch shrink-0 cursor-pointer items-center justify-center rounded-tr-2xl bg-copper text-white nav:hidden"
          >
            <span className="sr-only">Menu</span>
            <svg className="icon-open h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeWidth={2} d="M4 7h16M4 12h16M4 17h10" />
            </svg>
            <svg className="icon-close hidden h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </label>
        </div>
      </div>

      <nav
        id="mobile-menu"
        className="hidden max-h-[calc(100dvh-4.25rem)] overflow-y-auto overscroll-contain border-t border-white/10 bg-ink peer-checked:block nav:hidden"
        aria-label="Mobile navigation"
      >
        <div className="container-page py-4 pb-safe">
          <Link
            href="/"
            aria-current={pathname === "/" ? "page" : undefined}
            className={`flex min-h-[52px] items-center border-b border-white/10 font-serif text-lg font-bold ${pathname === "/" ? "text-copper" : "text-white"}`}
          >
            Home
          </Link>
          {mobileGroups.map((group) => {
            const active = group.links.some((l) => within(pathname, l.href));
            return (
              <details key={group.label} className="fold border-b border-white/10" open={active}>
                <summary className={`flex min-h-[52px] items-center justify-between font-serif text-lg font-bold ${active ? "text-copper" : "text-white"}`}>
                  <span className="flex items-baseline gap-3">
                    <span className="font-sans text-[11px] font-bold text-sage">{group.index}</span>
                    {group.label}
                  </span>
                  <span aria-hidden="true" className="fold-sign font-sans text-xl font-normal text-copper transition-transform">
                    +
                  </span>
                </summary>
                <ul className="pb-3">
                  {group.links.map((link) => {
                    const current = pathname === link.href;
                    return (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          aria-current={current ? "page" : undefined}
                          className={`flex min-h-[42px] items-center gap-3 px-1 ${current ? "font-semibold text-copper" : "text-white/75"}`}
                        >
                          <span aria-hidden="true" className={`h-1.5 w-1.5 shrink-0 ${current ? "bg-copper" : "bg-sage"}`} />
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </details>
            );
          })}
          <Link
            href="/contact"
            className="mt-5 flex min-h-[48px] items-center justify-center rounded-tr-3xl bg-copper font-semibold text-white"
          >
            Discuss your case
          </Link>
        </div>
      </nav>

      {/* Practice rail: a topic strip beneath the main bar. */}
      <div className="hidden border-b border-border bg-stone-dark sm:block">
        <div className="container-page flex items-center gap-1 overflow-x-auto py-2 text-xs">
          <span className="mr-2 shrink-0 font-semibold uppercase tracking-[0.14em] text-sage">Practice focus</span>
          {practiceRail.map((item, i) => {
            const current = pathname === item.href;
            return (
              <span key={item.href} className="flex shrink-0 items-center">
                {i > 0 && <span aria-hidden="true" className="mx-2 h-1 w-1 bg-copper" />}
                <Link
                  href={item.href}
                  aria-current={current ? "page" : undefined}
                  className={`whitespace-nowrap font-medium transition hover:text-copper focus:outline-none focus-visible:underline ${current ? "text-copper" : "text-body"}`}
                >
                  {item.label}
                </Link>
              </span>
            );
          })}
        </div>
      </div>
    </header>
  );
}
