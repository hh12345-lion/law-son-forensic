import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";
import { SITE_EMAIL } from "@/lib/site";
import { Button } from "@/components/ui/Button";

export const metadata = buildMetadata({
  title: "Thank You | Lawson Forensic",
  description: "Your enquiry has been received. Lawson Forensic will be in touch about the next steps.",
  path: "/thank-you",
  noindex: true,
  nofollow: true,
});

export default function ThankYouPage() {
  return (
    <>
      <section className="bg-ink py-12 sm:py-16 md:py-24">
        <div className="container-page text-center">
          <h1 className="font-serif text-2xl font-semibold text-white xs:text-3xl md:text-4xl">
            Thank you
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
            We have received your message and will be in touch about the next steps.
          </p>
        </div>
      </section>

      <section className="py-10 sm:py-14 md:py-20">
        <div className="container-page mx-auto max-w-2xl text-center">
          <p className="text-base leading-relaxed text-body sm:text-lg">
            If your matter is urgent, please email us directly at{" "}
            <a
              href={`mailto:${SITE_EMAIL}`}
              className="break-all font-semibold text-copper hover:underline"
            >
              {SITE_EMAIL}
            </a>
            .
          </p>
          <div className="hero-cta-group mt-10 justify-center">
            <Button href="/" className="w-full sm:w-auto">
              Return to Homepage
            </Button>
            <Button
              href="/services"
              variant="outline"
              className="w-full border-copper text-ink sm:w-auto"
            >
              View Services
            </Button>
          </div>
          <p className="mt-10 text-sm text-slate-muted">
            <Link href="/how-we-work" className="text-copper hover:underline">
              How we work
            </Link>
            {" · "}
            <Link href="/faq" className="text-copper hover:underline">
              FAQ
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
