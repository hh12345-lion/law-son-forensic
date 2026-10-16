import { buildMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Section, Prose } from "@/components/Section";
import { CTASection } from "@/components/CTASection";
import { photoFor } from "@/lib/page-photos";

export const metadata = buildMetadata({
  title: "Qualifications & Accreditations | Lawson Forensic USA",
  description:
    "Lawson Forensic's professional credentials: CPA, CFF, CFE, business valuation accreditation, and U.S. expert witness qualifications.",
  path: "/qualifications-accreditations",
});

export default function QualificationsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          {
            name: "Qualifications",
            path: "/qualifications-accreditations",
          },
        ])}
      />
      <PageHero
        photo={photoFor("/qualifications-accreditations")}
        title="Qualifications & Accreditations"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Qualifications" },
        ]}
      />

      <Section>
        <Prose>
          <h2>Professional Qualifications</h2>
          <h3>CPA (Certified Public Accountant)</h3>
          <p>
            The primary U.S. accounting credential and the baseline qualification
            for forensic accounting and expert witness work in federal and state
            proceedings.
          </p>
          <h3>CFF (Certified in Financial Forensics)</h3>
          <p>
            AICPA specialist credential for forensic accounting, demonstrating
            expertise in fraud investigation, litigation support, and dispute
            resolution.
          </p>
          <h3>CFE (Certified Fraud Examiner)</h3>
          <p>
            Awarded by the Association of Certified Fraud Examiners (ACFE), the
            primary global credential for fraud investigation and forensic
            accounting specialists.
          </p>
          <h3>ABV / CVA (Business Valuation)</h3>
          <p>
            Accredited in Business Valuation (ABV) or Certified Valuation Analyst
            (CVA) credentials supporting contentious and non-contentious business
            and equity valuations in litigation.
          </p>

          <h2>Professional Memberships</h2>
          <h3>AICPA</h3>
          <p>
            Member of the American Institute of Certified Public Accountants,
            adhering to professional standards for forensic and litigation
            support services.
          </p>
          <h3>ACFE</h3>
          <p>
            Member of the Association of Certified Fraud Examiners, with access
            to continuing education in fraud detection and investigation
            methodology.
          </p>
          <h3>NACVA</h3>
          <p>
            Affiliation with valuation and forensic accounting communities
            supporting court-facing business valuation work.
          </p>

          <h2>Expert Witness Standards</h2>
          <h3>Federal Rule of Evidence 702</h3>
          <p>
            Expert reports are prepared to meet FRE 702 and Daubert standards,
            with transparent methodology, reliable data, and conclusions tied to
            the facts of the case.
          </p>
          <h3>State Expert Evidence Rules</h3>
          <p>
            We comply with applicable state expert evidence rules and court
            requirements in the jurisdictions where we are retained.
          </p>

          <h2>Continuing Professional Development</h2>
          <p>
            Lawson Forensic maintains active professional development, staying
            current with accounting standards, procedural rules, relevant case
            law, and forensic methodology developments.
          </p>
        </Prose>
      </Section>

      <CTASection />
    </>
  );
}
