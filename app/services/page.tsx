import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";
import { servicesPageSchema, breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { CTASection } from "@/components/CTASection";
import { services, servicePath } from "@/lib/data/services";
import { photoFor } from "@/lib/page-photos";

export const metadata = buildMetadata({
  title: "Forensic Accounting Services | Lawson Forensic USA",
  description:
    "Lawson Forensic provides forensic accounting services across expert witness, fraud investigation, asset tracing, business valuation, loss and damages quantification, and dispute support for U.S. law firms.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={servicesPageSchema()} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
      <PageHero
        photo={photoFor("/services")}
        title="Forensic Accounting Services"
        subtitle="Senior-led forensic accounting and expert witness services for law firms, businesses, and insurers across the United States."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services" },
        ]}
      />

      <Section>
        <div className="grid gap-8 md:grid-cols-2">
          {services.map((service) => (
            <article
              key={service.id}
              id={service.id}
              className="scroll-mt-24 rounded-card border border-border bg-white p-8 shadow-card"
            >
              <h2 className="font-serif text-xl font-semibold text-ink">
                {service.title}
              </h2>
              <p className="mt-3 text-body leading-relaxed">
                {service.description}
              </p>
              <Link
                href={servicePath(service.id)}
                className="mt-4 inline-flex min-h-touch items-center text-sm font-semibold text-copper hover:underline"
              >
                Learn more
              </Link>
            </article>
          ))}
        </div>
      </Section>

      <CTASection />
    </>
  );
}
