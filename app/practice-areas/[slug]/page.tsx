import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbSchema, faqPageSchema } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Section, Prose } from "@/components/Section";
import { CTASection } from "@/components/CTASection";
import { FAQAccordion } from "@/components/FAQAccordion";
import { getPracticeAreaRelatedLinks } from "@/lib/seo/internalLinks";
import { InternalLinksSection } from "@/components/seo/InternalLinksSection";
import {
  getPracticeArea,
} from "@/lib/data/practice-areas";
import { photoFor } from "@/lib/page-photos";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const area = getPracticeArea(slug);
  if (!area) return {};
  return buildMetadata({
    title: `${area.title} | Lawson Forensic USA`,
    description: area.shortDescription,
    path: `/practice-areas/${slug}`,
  });
}

export default async function PracticeAreaPage({ params }: Props) {
  const { slug } = await params;
  const area = getPracticeArea(slug);
  if (!area) notFound();

  const related = getPracticeAreaRelatedLinks(slug);

  return (
    <>
      <JsonLd data={faqPageSchema(area.faqs)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Practice Areas", path: "/practice-areas" },
          { name: area.title, path: `/practice-areas/${slug}` },
        ])}
      />
      <PageHero
        photo={photoFor(`/practice-areas/${slug}`)}
        title={`${area.h1}`}
        subtitle={area.shortDescription}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Practice Areas", href: "/practice-areas" },
          { label: area.title },
        ]}
      />

      <Section>
        <Prose>
          {area.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </Prose>
        <h2 className="mt-12 font-serif text-2xl font-semibold text-ink">
          Frequently asked questions
        </h2>
        <div className="mt-6">
          <FAQAccordion faqs={area.faqs} />
        </div>
        <InternalLinksSection
          title="Related services and resources"
          links={[...related.services, ...related.insights, ...related.other]}
        />
      </Section>

      <CTASection />
    </>
  );
}
