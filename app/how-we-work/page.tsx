import { buildMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { CTASection } from "@/components/CTASection";
import { photoFor } from "@/lib/page-photos";

export const metadata = buildMetadata({
  title: "How We Work | The Lawson Forensic Approach",
  description:
    "How Lawson Forensic approaches each engagement, from initial instruction through to expert report and oral testimony. Senior-led, clear, and defensible.",
  path: "/how-we-work",
});

const principles = [
  {
    title: "Senior involvement throughout",
    text: "Instructions are accepted by a senior forensic accountant and remain under their direct responsibility throughout, from initial review to expert report and oral testimony. Work is not delegated to a junior team.",
  },
  {
    title: "Independence above all else",
    text: "Our expert opinions reflect our honest view of the financial issues. We will advise counsel promptly if our preliminary view is adverse to the retaining party, because early advice is always more useful than a late surprise.",
  },
  {
    title: "Clarity in every report",
    text: "We write for the judge who will read the report, not for the accountant who drafted it. Complex financial analysis must be made understandable: that is as much part of our job as the analysis itself.",
  },
  {
    title: "Responsive to proceedings",
    text: "Litigation has timetables. We agree realistic timelines at the outset and communicate proactively if anything changes. Urgent preliminary assessments are available where proceedings require it.",
  },
  {
    title: "Proportionate to the case",
    text: "Not every matter needs a comprehensive expert report. We advise on the scope of work genuinely required and produce reports proportionate to the complexity and value of the case.",
  },
];

const steps = [
  { step: "1", title: "Initial contact", text: "Discuss the matter, confirm scope and availability, check conflicts. Same day response." },
  { step: "2", title: "Conflicts check", text: "Full conflicts check against existing clients and instructions before any work begins." },
  { step: "3", title: "Letter of instruction", text: "Review the instruction letter, raise queries if scope needs clarification, and confirm acceptance in writing." },
  { step: "4", title: "Document review", text: "Receive and review all relevant financial documents. Request additional materials if needed." },
  { step: "5", title: "Analysis", text: "Conduct the forensic analysis, applying appropriate methodology, testing assumptions, identifying any matters outside our expertise." },
  { step: "6", title: "Expert report", text: "Draft, review, and finalise the expert report for applicable federal or state proceedings. Provide preliminary advice note if requested before formal report." },
  { step: "7", title: "Deposition and trial testimony", text: "Respond to discovery; attend expert conferences; testify at deposition and trial if required." },
];

export default function HowWeWorkPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "How We Work", path: "/how-we-work" },
        ])}
      />
      <PageHero
        photo={photoFor("/how-we-work")}
        title="How We Work"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "How We Work" },
        ]}
      />

      <Section>
        <h2 className="font-serif text-2xl font-semibold text-ink md:text-3xl">
          Our Approach to Every Engagement
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {principles.map((p) => (
            <article
              key={p.title}
              className="rounded-card border border-border border-t-4 border-t-copper bg-white p-6 shadow-card"
            >
              <h3 className="font-serif text-lg font-semibold text-ink">
                {p.title}
              </h3>
              <p className="mt-3 text-body leading-relaxed">{p.text}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section alt>
        <h2 className="font-serif text-2xl font-semibold text-ink md:text-3xl">
          From Instruction to Report
        </h2>
        <ol className="mt-8 space-y-4">
          {steps.map((s) => (
            <li
              key={s.step}
              className="flex gap-4 rounded-card border border-border bg-white p-6 shadow-card"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-card border-2 border-copper font-serif text-lg font-semibold text-ink">
                {s.step}
              </span>
              <div>
                <h3 className="font-serif text-lg font-semibold text-ink">
                  {s.title}
                </h3>
                <p className="mt-2 text-body leading-relaxed">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <CTASection />
    </>
  );
}
