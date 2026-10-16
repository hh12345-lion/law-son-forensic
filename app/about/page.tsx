import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Section, Prose } from "@/components/Section";
import { CTASection } from "@/components/CTASection";
import { SITE_REGION, SITE_REGION_NOTE } from "@/lib/site";
import { photoFor } from "@/lib/page-photos";

export const metadata = buildMetadata({
  title: "About Lawson Forensic | U.S. Forensic Accounting Practice",
  description:
    "Lawson Forensic is a specialist U.S. forensic accounting practice. Senior-led engagements, Daubert-ready expert reports, and a track record across commercial, family, and white-collar matters.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <PageHero
        photo={photoFor("/about")}
        title="About Lawson Forensic"
        subtitle={SITE_REGION_NOTE}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About" },
        ]}
      />

      <Section>
        <Prose>
          <h2>The Practice</h2>
          <p>
            Lawson Forensic is an independent boutique forensic accounting
            practice founded on a single principle: that every client deserves
            direct access to senior expertise, not a relationship partner who
            passes work to a junior team.
          </p>
          <p>
            We work with law firms across the {SITE_REGION} on expert witness
            instructions in commercial, family, and white-collar matters. We also
            work directly with businesses and insurers who need independent
            forensic accounting support without the overhead of a large firm.
          </p>

          <h2>Our Approach</h2>
          <p>
            We do not take instructions we cannot serve well. Before accepting
            any engagement, we assess whether we have the specific expertise the
            case requires, and if not, we say so.
          </p>
          <p>
            Every expert report produced by Lawson Forensic reflects our honest,
            independent view of the financial issues, with transparent methodology
            designed to meet Federal Rule of Evidence 702 and applicable state
            expert evidence standards.
          </p>

          <h2>Qualifications &amp; Accreditations</h2>
          <ul>
            <li>CPA (Certified Public Accountant)</li>
            <li>CFF (Certified in Financial Forensics)</li>
            <li>CFE (Certified Fraud Examiner)</li>
            <li>ABV / CVA (Business Valuation credentials)</li>
          </ul>
          <p>
            <Link href="/qualifications-accreditations" className="text-copper hover:underline">
              View full qualifications and accreditations
            </Link>
          </p>

          <h2>Scope of Practice</h2>
          <p>We accept instructions across:</p>
          <ul>
            <li>Commercial litigation (federal and state courts)</li>
            <li>Shareholder and partnership disputes</li>
            <li>Marital dissolution and family court matters</li>
            <li>White-collar defence and civil forfeiture</li>
            <li>Arbitration (AAA, JAMS, ICC)</li>
            <li>SEC, DOJ, and IRS-related matters</li>
            <li>Private and pre-litigation investigations</li>
          </ul>
        </Prose>
      </Section>

      <CTASection
        title="Discuss Your Instruction"
        buttonText="Discuss Your Instruction"
      />
    </>
  );
}
