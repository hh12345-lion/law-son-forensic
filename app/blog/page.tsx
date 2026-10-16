import Image from "next/image";
import Link from "next/link";
import { CTASection } from "@/components/CTASection";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { getAllBlogPosts } from "@/lib/blog";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { photoFor } from "@/lib/page-photos";

export const metadata = buildMetadata({
  title: "Blog | Lawson Forensic Valuation & Forensic Accounting Insights",
  description:
    "Articles on business valuation assumptions, shareholder and partnership disputes, and forensic accounting issues for U.S. counsel.",
  path: "/blog",
});

export default function BlogIndexPage() {
  const posts = getAllBlogPosts();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Blog",
            name: `${SITE_NAME} Blog`,
            url: `${SITE_URL}/blog`,
            inLanguage: "en-US",
            blogPost: posts.map((post) => ({
              "@type": "BlogPosting",
              headline: post.title,
              description: post.description,
              datePublished: post.date,
              dateModified: post.updated || post.date,
              url: `${SITE_URL}/blog/${post.slug}`,
              image: post.image ? `${SITE_URL}${post.image}` : undefined,
            })),
          },
        ]}
      />
      <PageHero
        photo={photoFor("/blog")}
        title="Blog"
        subtitle="Practitioner-facing articles on business valuation, shareholder disputes, and forensic accounting evidence."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Blog" },
        ]}
      />

      <Section>
        <div className="mb-10 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="inline-flex min-h-touch items-center justify-center rounded-card bg-copper px-6 py-3 text-sm font-semibold text-white transition hover:bg-ink"
          >
            Contact the firm
          </Link>
          <Link
            href="/insights"
            className="inline-flex min-h-touch items-center justify-center rounded-card border border-border px-6 py-3 text-sm font-semibold text-ink transition hover:border-copper hover:text-copper"
          >
            Browse insights
          </Link>
        </div>

        {posts.length === 0 ? (
          <p className="text-body">Articles will appear here shortly.</p>
        ) : (
          <ul className="grid gap-8 md:grid-cols-2">
            {posts.map((post) => (
              <li
                key={post.slug}
                className="overflow-hidden rounded-card border border-border bg-white shadow-card"
              >
                {post.image ? (
                  <Link href={`/blog/${post.slug}`} className="relative block h-52 w-full">
                    <Image
                      src={post.image}
                      alt={post.imageAlt || post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </Link>
                ) : null}
                <div className="p-8">
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
                  <h2 className="mt-3 font-serif text-xl font-semibold text-ink">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-copper focus:outline-none focus-visible:underline"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mt-3 text-body leading-relaxed">{post.description}</p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-4 inline-flex min-h-touch items-center text-sm font-semibold text-copper hover:underline"
                  >
                    Read article
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Section>

      <CTASection />
    </>
  );
}
