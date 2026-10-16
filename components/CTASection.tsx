import { Button } from "./ui/Button";

type CTASectionProps = {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
};

export function CTASection({
  title = "Discuss your case",
  description = "Contact Lawson Forensic to discuss expert witness testimony, forensic accounting, valuations, or damages analysis. United States clients only.",
  buttonText = "Request Consultation",
  buttonHref = "/contact",
}: CTASectionProps) {
  return (
    <section className="relative overflow-hidden bg-ink py-14 sm:py-18 md:py-24">
      <div
        className="pointer-events-none absolute inset-0 bg-hero-pattern opacity-60"
        aria-hidden="true"
      />
      <div className="container-page relative text-center">
        <div className="accent-bar mx-auto mb-6" />
        <h2 className="font-serif text-xl font-bold text-white sm:text-2xl md:text-3xl">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
          {description}
        </p>
        <div className="mt-8 flex justify-center px-2">
          <Button
            href={buttonHref}
            variant="primary"
            className="w-full max-w-sm sm:w-auto"
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </section>
  );
}
