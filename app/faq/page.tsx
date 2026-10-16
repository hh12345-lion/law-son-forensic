import { buildMetadata } from "@/lib/metadata";
import { breadcrumbSchema, faqPageSchema } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { CTASection } from "@/components/CTASection";
import { FAQAccordion } from "@/components/FAQAccordion";
import { getFaqRelatedLinks } from "@/lib/seo/internalLinks";
import { InternalLinksSection } from "@/components/seo/InternalLinksSection";
import { siteFaqs } from "@/lib/data/faq";
import { photoFor } from "@/lib/page-photos";

export const metadata = buildMetadata({
  title: "FAQ | Lawson Forensic Forensic Accounting USA",
  description:
    "Frequently asked questions about Lawson Forensic's forensic accounting and expert witness services: how to instruct us, what to expect, and our approach.",
  path: "/faq",
});

export default function FAQPage() {
  return (
    <>
      <JsonLd data={faqPageSchema(siteFaqs)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "FAQ", path: "/faq" },
        ])}
      />
      <PageHero
        photo={photoFor("/faq")}
        title="Frequently Asked Questions"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "FAQ" },
        ]}
      />

      <Section>
        <FAQAccordion faqs={siteFaqs} />
        <InternalLinksSection links={getFaqRelatedLinks()} />
      </Section>

      <CTASection />
    </>
  );
}
