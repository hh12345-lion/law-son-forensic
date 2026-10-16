import { SITE_EMAIL, SITE_REGION_NOTE } from "../site";

export type FAQ = { question: string; answer: string };

export const siteFaqs: FAQ[] = [
  {
    question: "What is Lawson Forensic and what do you do?",
    answer:
      "Lawson Forensic is an independent U.S. boutique forensic accounting practice. We provide expert witness reports and testimony, forensic accounting, business valuations, loss and damages quantification, shareholder dispute analysis, and litigation support for law firms, businesses, and insurers. " +
      SITE_REGION_NOTE,
  },
  {
    question: "How do I retain Lawson Forensic?",
    answer: `Contact us via the inquiry form on our website or email ${SITE_EMAIL} with details of the matter. We will assess scope, conduct a conflicts check, and confirm availability. For formal retentions, we require an engagement letter from your firm or organization.`,
  },
  {
    question: "Do your expert reports meet U.S. court standards?",
    answer:
      "Yes. Our expert reports are prepared for use in U.S. federal and state courts and follow applicable expert evidence rules, including Federal Rule of Evidence 702 and relevant state standards. We apply transparent methodology designed to meet Daubert scrutiny.",
  },
  {
    question: "Do you accept jointly retained expert appointments?",
    answer:
      "Yes. We accept jointly retained expert appointments in commercial, shareholder, and family matters where both parties agree on a single forensic accountant. We also accept party-retained and court-appointed expert roles.",
  },
  {
    question: "What practice areas does Lawson Forensic cover?",
    answer:
      "We work across commercial disputes, shareholder and partnership disputes, fraud and financial crime, marital dissolution, personal injury damages, bankruptcy and insolvency, and regulatory matters. See our Practice Areas section for detail on each.",
  },
  {
    question: "How quickly can you provide an expert report?",
    answer:
      "Timelines depend on complexity and document volume. A typical expert report takes four to eight weeks from receipt of documents, though urgent preliminary assessments are available when litigation schedules require it.",
  },
  {
    question:
      "What happens if your preliminary view is adverse to the party retaining you?",
    answer:
      "We advise retaining counsel promptly if our preliminary view may be adverse. Early advice is more useful than a late surprise. Our opinions reflect our honest independent view of the financial issues.",
  },
  {
    question: "What are your hourly rates?",
    answer:
      "Standard engagements are typically charged at $300 to $500 per hour. Complex federal litigation and arbitration matters are $500 to $750 per hour. We provide a fee estimate at the outset of every retention. Contact us to discuss pricing for your matter.",
  },
  {
    question: "How do you approach conflicts of interest?",
    answer:
      "We conduct a full conflicts check before accepting any retention, against existing clients and matters. If a conflict exists, we decline the retention and explain why. We do not accept matters where independence could reasonably be questioned.",
  },
  {
    question:
      "Can you provide a preliminary assessment before formal retention?",
    answer:
      "Yes. We offer rapid preliminary assessments where urgent litigation requires it, such as TRO or preliminary injunction applications. This allows parties to assess the strength of financial evidence before committing to a full expert report.",
  },
  {
    question: "Do you work on international matters?",
    answer: SITE_REGION_NOTE,
  },
  {
    question:
      "What types of damages and disputes do you quantify?",
    answer:
      "We quantify loss of profits, business interruption, consequential damages, shareholder oppression claims, partnership disputes, fraud losses, and professional negligence damages. We also value businesses and equity interests in contentious litigation.",
  },
];
