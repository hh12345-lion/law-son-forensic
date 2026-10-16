import { services, servicePath } from "../data/services";
import { practiceAreas } from "../data/practice-areas";
import { insights } from "../data/insights";
import { getUrlsForPracticeAreaSlug } from "./keywordMap";

export type InternalLink = { href: string; label: string };

export function getHomepageInternalLinks(): {
  services: InternalLink[];
  practiceAreas: InternalLink[];
  insights: InternalLink[];
} {
  return {
    services: services.slice(0, 4).map((s) => ({
      href: servicePath(s.id),
      label: s.title,
    })),
    practiceAreas: practiceAreas.slice(0, 5).map((p) => ({
      href: `/practice-areas/${p.slug}`,
      label: p.title,
    })),
    insights: insights.slice(0, 2).map((i) => ({
      href: `/insights/${i.slug}`,
      label: i.title,
    })),
  };
}

export function getPracticeAreaRelatedLinks(slug: string): {
  services: InternalLink[];
  insights: InternalLink[];
  other: InternalLink[];
} {
  const urls = getUrlsForPracticeAreaSlug(slug);
  return {
    services: urls.services.map((href) => {
      const id = href.split("/").pop()!;
      const s = services.find((x) => x.id === id);
      return { href, label: s?.title ?? href };
    }),
    insights: urls.insights.map((href) => {
      const slugPart = href.split("/").pop()!;
      const a = insights.find((x) => x.slug === slugPart);
      return { href, label: a?.title ?? href };
    }),
    other: [
      { href: "/case-studies", label: "Example engagements" },
      { href: "/how-we-work", label: "How we work" },
      { href: "/contact", label: "Contact us" },
    ],
  };
}

export function getInsightRelatedLinks(articleSlug: string): InternalLink[] {
  const map: Record<string, InternalLink[]> = {
    "instructing-forensic-accountant-guide": [
      { href: "/services/expert-witness", label: "Expert witness reports" },
      { href: "/how-we-work", label: "How we work" },
      { href: "/practice-areas/commercial-disputes", label: "Commercial disputes" },
    ],
    "business-valuation-divorce-guide": [
      { href: "/practice-areas/family-proceedings", label: "Marital dissolution" },
      { href: "/services/family-matrimonial", label: "Family & marital accounting" },
    ],
    "poca-benefit-calculation-guide": [
      { href: "/practice-areas/fraud-financial-crime", label: "Fraud & financial crime" },
      { href: "/services/fraud-investigation", label: "Fraud investigation" },
    ],
    "choosing-single-joint-expert": [
      { href: "/services/expert-witness", label: "Expert witness reports" },
      { href: "/practice-areas/shareholder-disputes", label: "Shareholder disputes" },
      { href: "/practice-areas/commercial-disputes", label: "Commercial disputes" },
    ],
  };
  return (
    map[articleSlug] ?? [
      { href: "/services", label: "Our services" },
      { href: "/contact", label: "Contact us" },
    ]
  );
}

export function getFaqRelatedLinks(): InternalLink[] {
  return [
    { href: "/how-we-work", label: "How we work" },
    { href: "/practice-areas", label: "Practice areas" },
    { href: "/services/expert-witness", label: "Expert witness services" },
    { href: "/qualifications-accreditations", label: "Qualifications" },
  ];
}
