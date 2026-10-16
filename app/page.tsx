import Link from "next/link";
import { buildMetadata, HOME_TITLE } from "@/lib/metadata";
import { getHomepageInternalLinks } from "@/lib/seo/internalLinks";
import { InternalLinksSection } from "@/components/seo/InternalLinksSection";
import { homepageSchema } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { CTASection } from "@/components/CTASection";
import { Button } from "@/components/ui/Button";
import { services, servicePath } from "@/lib/data/services";
import {
  coreCapabilities,
  practiceFocusAreas,
} from "@/lib/data/core-capabilities";
import { SITE_REGION, SITE_REGION_NOTE } from "@/lib/site";
import Image from "next/image";
import { photos } from "@/lib/photos";

export const metadata = buildMetadata({
  title: HOME_TITLE,
  description:
    "Lawson Forensic is a U.S. boutique forensic accounting practice providing expert witness reports, business valuation, loss and damages quantification, shareholder dispute analysis, and litigation support for law firms and businesses nationwide.",
  path: "/",
});

const pillars = [
  {
    title: "Senior-led",
    text: "Every engagement is led by a senior forensic accountant with direct trial and deposition experience, not delegated to junior staff after the initial consultation.",
  },
  {
    title: "Court-ready",
    text: "Reports are written for judges and juries, not accountants. Clear methodology, transparent reasoning, and conclusions designed to withstand Daubert scrutiny and cross-examination.",
  },
  {
    title: "Responsive",
    text: "Litigation runs on deadlines. Tell us the motion, injunction, or discovery dates and we plan the work, including urgent preliminary assessments, around them.",
  },
];

export default function HomePage() {
  const links = getHomepageInternalLinks();
  const featured = coreCapabilities.filter((c) => c.featured);
  const standard = coreCapabilities.filter((c) => !c.featured);

  return (
    <>
      <JsonLd data={homepageSchema()} />
      <PageHero
        photo={photos.thurgoodColumns}
        title="Forensic Accounting & Expert Witness Services"
        subtitle="Lawson Forensic is an independent U.S. practice providing expert witness testimony, forensic accounting, business valuations, shareholder dispute analysis, and loss and damages quantification, with senior accountant involvement from retention through trial."
      >
        <h2 className="sr-only">Expert Witness &amp; Forensic Accounting Services</h2>
        <Button href="/contact">Request Consultation</Button>
        <Button href="/services" variant="outline">
          View Services
        </Button>
      </PageHero>

      <div className="border-b border-border bg-white">
        <div className="container-page grid divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {[
            { label: "Expert Witness", detail: "Reports & testimony" },
            { label: "Disputes & Valuations", detail: "Litigation support" },
            { label: "Loss & Damages", detail: "Quantum analysis" },
          ].map((item) => (
            <div key={item.label} className="px-2 py-5 text-center sm:py-6">
              <p className="font-serif text-base font-semibold text-ink sm:text-lg">
                {item.label}
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.1em] text-sage">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </div>

      <Section>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="section-label">United States Practice</p>
            <h2 className="mt-3 font-serif text-2xl font-bold text-ink sm:text-3xl">
              Independent Forensic Accounting for Litigation
            </h2>
            <div className="accent-bar mt-5" />
            <div className="print-frame relative mt-8 aspect-[4/3] overflow-hidden bg-mist">
              <Image src={photos.nyseFacade.src} alt={photos.nyseFacade.alt} fill sizes="(min-width: 1024px) 34vw, 100vw" className="object-cover" />
            </div>
          </div>
          <div className="lg:col-span-7">
            <p className="rounded-card border border-copper/30 bg-copper/5 px-4 py-3 text-sm font-medium text-ink sm:text-base">
              <span className="font-semibold text-copper">{SITE_REGION} only.</span>{" "}
              {SITE_REGION_NOTE}
            </p>
            <p className="mt-6 text-base leading-relaxed text-body sm:text-lg">
              Lawson Forensic serves law firms, businesses, and insurers across the{" "}
              {SITE_REGION}. We provide expert witness reports, forensic accounting,
              business valuations, shareholder dispute analysis, and loss and damages
              quantification. Every matter is led by a senior forensic accountant from
              the first call through deposition and trial testimony.
            </p>
          </div>
        </div>
      </Section>

      <Section alt>
        <p className="section-label">Practice Focus</p>
        <h2 className="mt-2 font-serif text-2xl font-bold text-ink sm:text-3xl">
          Expert Witness, Disputes, Valuations &amp; Damages
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-body sm:text-lg">
          We specialize in the forensic accounting matters most frequently retained
          in U.S. litigation: expert witness testimony, commercial disputes,
          business valuations, shareholder and partnership claims, and damages
          quantification.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {practiceFocusAreas.map((area, i) => (
            <article
              key={area.title}
              className={`card-accent border-l-4 border-l-copper ${i === 0 ? "sm:col-span-2 lg:col-span-1" : ""}`}
            >
              <h3 className="font-serif text-lg font-semibold text-ink">
                {area.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-body">
                {area.description}
              </p>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <p className="section-label">Core Capabilities</p>
        <h2 className="mt-2 font-serif text-2xl font-bold text-ink sm:text-3xl">
          What We Do
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group card-accent lg:col-span-2"
            >
              <h3 className="font-serif text-xl font-semibold text-ink group-hover:text-copper">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-body">
                {item.description}
              </p>
              <span className="mt-4 inline-block text-sm font-semibold text-copper">
                Learn more
              </span>
            </Link>
          ))}
          {standard.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group card-accent"
            >
              <h3 className="font-serif text-lg font-semibold text-ink group-hover:text-copper">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-body">{item.description}</p>
            </Link>
          ))}
        </div>
      </Section>

      <Section alt>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="print-frame relative mb-8 aspect-[16/10] overflow-hidden bg-mist">
              <Image src={photos.supremeColumns.src} alt={photos.supremeColumns.alt} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
            </div>
            <p className="section-label">Why Retain Us</p>
            <h2 className="mt-2 font-serif text-2xl font-bold text-ink sm:text-3xl">
              Why Law Firms Retain Lawson Forensic
            </h2>
            <p className="mt-4 text-base leading-relaxed text-body">
              We work across commercial disputes, shareholder and partnership
              claims, fraud and financial crime, marital dissolution, personal
              injury damages, bankruptcy, and regulatory investigations. Whether you
              need an expert report for federal or state court, a business valuation
              in a shareholder dispute, or damages quantification following breach
              of contract, we respond quickly and advise clearly.
            </p>
          </div>
          <div className="space-y-4">
            {pillars.map((pillar, i) => (
              <article
                key={pillar.title}
                className="flex gap-4 rounded-card border border-border bg-white p-5 shadow-card"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-copper/10 font-serif text-lg font-bold text-copper">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-ink">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-body">
                    {pillar.text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <p className="section-label">Services</p>
        <h2 className="mt-2 font-serif text-2xl font-bold text-ink sm:text-3xl">
          Forensic Accounting Services
        </h2>
        <div className="mt-10 divide-y divide-border rounded-card border border-border bg-white shadow-card">
          {services.map((service, i) => (
            <Link
              key={service.id}
              href={servicePath(service.id)}
              className="group flex flex-col gap-2 px-6 py-5 transition hover:bg-stone sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-8 sm:py-6"
            >
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-sage">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-1 font-serif text-lg font-semibold text-ink group-hover:text-copper sm:text-xl">
                  {service.title}
                </h3>
                <p className="mt-1 text-sm text-body">{service.description}</p>
              </div>
              <span className="shrink-0 text-sm font-semibold text-copper opacity-0 transition group-hover:opacity-100 sm:opacity-100">
                View
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <Section alt>
        <p className="section-label">Clients</p>
        <h2 className="mt-2 font-serif text-2xl font-bold text-ink sm:text-3xl">
          Who We Help
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Law Firms",
              text: "Trusted forensic accounting and expert witness support across commercial, family, and white-collar matters. Daubert-ready reports with senior-led delivery.",
            },
            {
              title: "Businesses",
              text: "Independent fraud investigations, dispute support, and pre-litigation assessments when financial records are contested or misconduct is suspected.",
            },
            {
              title: "Insurers",
              text: "Independent forensic analysis on claim fraud, damages disputes, and complex financial policy matters.",
            },
          ].map((client) => (
            <article
              key={client.title}
              className="border-l-4 border-l-sage bg-white p-6 shadow-card"
            >
              <h3 className="font-serif text-lg font-semibold text-ink">
                {client.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-body">
                {client.text}
              </p>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <InternalLinksSection
          title="Explore our practice"
          links={[
            ...links.services,
            ...links.practiceAreas,
            { href: "/contact", label: "Request a consultation" },
          ]}
        />
      </Section>

      <section className="relative overflow-hidden bg-ink py-16 sm:py-20">
        <Image src={photos.chicagoBoardOfTrade.src} alt="" fill sizes="100vw" className="object-cover opacity-25" />
        <blockquote className="container-page relative mx-auto max-w-3xl text-center">
          <div className="accent-bar mx-auto mb-6" />
          <p className="font-serif text-xl leading-relaxed text-white sm:text-2xl md:text-3xl">
            &ldquo;Forensic accounting is as much about communication as calculation.
            The best expert report means nothing if it cannot be understood by
            the judge or jury who reads it.&rdquo;
          </p>
          <footer className="mt-6 text-sm font-semibold uppercase tracking-[0.1em] text-copper">
            Lawson Forensic
          </footer>
        </blockquote>
      </section>

      <CTASection />
    </>
  );
}
