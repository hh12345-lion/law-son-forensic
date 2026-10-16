import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/metadata";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Section, Prose } from "@/components/Section";
import { CTASection } from "@/components/CTASection";
import { getInsightRelatedLinks } from "@/lib/seo/internalLinks";
import { InternalLinksSection } from "@/components/seo/InternalLinksSection";
import { getInsight } from "@/lib/data/insights";
import { photoFor } from "@/lib/page-photos";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = getInsight(slug);
  if (!article) return {};
  return buildMetadata({
    title: article.title,
    description: article.description,
    path: `/insights/${slug}`,
  });
}

export default async function InsightArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getInsight(slug);
  if (!article) notFound();

  return (
    <>
      <JsonLd data={articleSchema(article)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Insights", path: "/insights" },
          { name: article.title, path: `/insights/${slug}` },
        ])}
      />
      <PageHero
        photo={photoFor(`/insights/${slug}`)}
        title={article.title}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Insights", href: "/insights" },
          { label: "Article" },
        ]}
      />

      <Section>
        <p className="text-sm text-slate-muted">
          By <span className="font-semibold">Lawson Forensic</span>
          {" · "}
          <time dateTime={article.datePublished}>
            {new Date(article.datePublished).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
        </p>
        <Prose>
          {article.sections.map((section, i) => (
            <div key={i}>
              {section.heading && <h2>{section.heading}</h2>}
              {section.paragraphs.map((p, j) => (
                <p key={j}>{p}</p>
              ))}
            </div>
          ))}
        </Prose>
        <InternalLinksSection
          title="Related services and practice areas"
          links={getInsightRelatedLinks(slug)}
        />
        <p className="mt-10 text-body">
          To discuss an instruction,{" "}
          <Link href="/contact" className="font-semibold text-copper hover:underline">
            contact Lawson Forensic
          </Link>
          .
        </p>
      </Section>

      <CTASection />
    </>
  );
}
