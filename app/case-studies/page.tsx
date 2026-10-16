import { buildMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { CTASection } from "@/components/CTASection";
import { caseStudies } from "@/lib/data/case-studies";
import { photoFor } from "@/lib/page-photos";

export const metadata = buildMetadata({
  title: "Example Engagements | Lawson Forensic Forensic Accounting USA",
  description:
    "Illustrative examples of how forensic accounting engagements are approached across commercial disputes, shareholder claims, fraud investigations, and marital dissolution.",
  path: "/case-studies",
});

export default function CaseStudiesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Example Engagements", path: "/case-studies" },
        ])}
      />
      <PageHero
        photo={photoFor("/case-studies")}
        title="Example Engagements"
        subtitle="Illustrative scenarios showing how typical forensic accounting instructions are scoped and approached."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Example Engagements" },
        ]}
      />

      <Section>
        <p className="max-w-3xl text-lg leading-relaxed text-body">
          The scenarios below are illustrative. They describe the kinds of matter a forensic
          accountant is asked to address and how the work is typically approached; they are
          not accounts of specific past engagements or their results.
        </p>

        <div className="mt-12 space-y-12">
          {caseStudies.map((study) => (
            <article
              key={study.title}
              className="rounded-card border border-border border-l-4 border-l-copper bg-white p-8 shadow-card"
            >
              <h2 className="font-serif text-xl font-semibold text-ink md:text-2xl">
                {study.title}
              </h2>
              <div className="mt-6 space-y-4 text-body leading-relaxed">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-copper">
                    Scenario
                  </h3>
                  <p className="mt-1">{study.background}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-copper">
                    Typical instruction
                  </h3>
                  <p className="mt-1">{study.instruction}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-copper">
                    How the work is approached
                  </h3>
                  <p className="mt-1">{study.approach}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <CTASection />
    </>
  );
}
