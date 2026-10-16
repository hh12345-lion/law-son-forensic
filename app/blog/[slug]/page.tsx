import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CTASection } from "@/components/CTASection";
import { JsonLd } from "@/components/JsonLd";
import { Section, Prose } from "@/components/Section";
import { getBlogBySlug } from "@/lib/blog";
import { markdownToHtml } from "@/lib/markdown";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import { SITE_NAME, SITE_URL } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) return {};

  const base = buildMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
  });

  const imageUrl = post.image ? `${SITE_URL}${post.image}` : undefined;

  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated || post.date,
      images: imageUrl
        ? [{ url: imageUrl, alt: post.imageAlt || post.title }]
        : base.openGraph && "images" in base.openGraph
          ? base.openGraph.images
          : undefined,
    },
    twitter: {
      ...base.twitter,
      card: "summary_large_image",
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) notFound();

  const html = markdownToHtml(post.content);
  const url = `${SITE_URL}/blog/${post.slug}`;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            dateModified: post.updated || post.date,
            image: post.image ? `${SITE_URL}${post.image}` : undefined,
            inLanguage: "en-US",
            author: { "@type": "Organization", name: SITE_NAME },
            publisher: {
              "@type": "Organization",
              name: SITE_NAME,
              url: SITE_URL,
            },
            mainEntityOfPage: url,
            url,
          },
        ]}
      />

      {post.image ? (
        <div className="relative mx-auto h-[min(28rem,55vw)] w-full max-w-7xl border-b border-border">
          <Image
            src={post.image}
            alt={post.imageAlt || post.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ) : null}

      <Section>
        <article className="mx-auto max-w-3xl">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-muted">
            <Link href="/" className="hover:text-copper">
              Home
            </Link>
            {" / "}
            <Link href="/blog" className="hover:text-copper">
              Blog
            </Link>
            {" / "}
            <span className="text-ink">{post.title}</span>
          </nav>

          <p className="text-xs font-semibold uppercase tracking-wide text-copper">
            <time dateTime={post.updated || post.date}>
              {new Date(post.updated || post.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
            <span className="mx-2 text-slate-muted">·</span>
            <span className="normal-case tracking-normal text-slate-muted">
              {post.readingTime}
            </span>
          </p>
          <h1 className="mt-3 font-serif text-3xl font-semibold leading-tight text-ink sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 text-lg text-body">{post.description}</p>

          <Prose>
            <div className="mt-8" dangerouslySetInnerHTML={{ __html: html }} />
          </Prose>

          <p className="mt-12 border-t border-border pt-8 text-sm">
            <Link href="/blog" className="font-semibold text-copper hover:underline">
              Back to the blog
            </Link>
            <span className="mx-3 text-slate-muted/50">·</span>
            <Link href="/contact" className="font-semibold text-copper hover:underline">
              Contact the firm
            </Link>
          </p>
        </article>
      </Section>

      <CTASection />
    </>
  );
}
