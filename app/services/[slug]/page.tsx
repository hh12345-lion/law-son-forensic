import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/metadata";
import {
  breadcrumbSchema,
  faqPageSchema,
  servicePageSchema,
} from "@/lib/schema";
import { JsonLdGraph } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { CTASection } from "@/components/CTASection";
import { FAQAccordion } from "@/components/FAQAccordion";
import { ServiceContent } from "@/components/ServiceContent";
import { getService, servicePath } from "@/lib/data/services";
import { siteFaqs } from "@/lib/data/faq";
import { photoFor } from "@/lib/page-photos";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return buildMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: servicePath(slug),
  });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const path = servicePath(slug);
  const serviceSchema = servicePageSchema(slug);

  return (
    <>
      <JsonLdGraph
        graphs={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.title, path },
          ]),
          ...(serviceSchema ? [serviceSchema] : []),
          faqPageSchema(siteFaqs),
        ]}
      />
      <PageHero
        photo={photoFor(`/services/${slug}`)}
        title={service.title}
        subtitle={service.description}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.title },
        ]}
      />

      <Section>
        <ServiceContent blocks={service.blocks} />
      </Section>

      <Section alt>
        <h2 className="font-serif text-2xl font-semibold text-ink md:text-3xl">
          Frequently asked questions
        </h2>
        <p className="mt-2 max-w-2xl text-body">
          Common questions about instructing Lawson Forensic and our forensic
          accounting services.
        </p>
        <div className="mt-8">
          <FAQAccordion faqs={siteFaqs} />
        </div>
      </Section>

      <CTASection buttonText="Contact Us" />
    </>
  );
}
