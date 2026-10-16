import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { CTASection } from "@/components/CTASection";
import { practiceAreas } from "@/lib/data/practice-areas";
import { photoFor } from "@/lib/page-photos";

export const metadata = buildMetadata({
  title: "Practice Areas | Lawson Forensic U.S. Forensic Accounting",
  description:
    "Lawson Forensic practice areas: commercial disputes, shareholder claims, fraud, marital dissolution, personal injury damages, bankruptcy, and regulatory matters.",
  path: "/practice-areas",
});

export default function PracticeAreasPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Practice Areas", path: "/practice-areas" },
        ])}
      />
      <PageHero
        photo={photoFor("/practice-areas")}
        title="Practice Areas"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Practice Areas" },
        ]}
      />

      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          {practiceAreas.map((area) => (
            <Link
              key={area.slug}
              href={`/practice-areas/${area.slug}`}
              className="group rounded-card border border-border bg-white p-8 shadow-card transition hover:border-copper focus:outline-none focus-visible:ring-2 focus-visible:ring-copper"
            >
              <h2 className="font-serif text-xl font-semibold text-ink group-hover:text-copper">
                {area.title}
              </h2>
              <p className="mt-3 text-body leading-relaxed">
                {area.shortDescription}
              </p>
              <span className="mt-4 inline-block text-sm font-semibold text-copper">
                View practice area
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <CTASection />
    </>
  );
}
