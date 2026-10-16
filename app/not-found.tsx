import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { services, servicePath } from "@/lib/data/services";

export default function NotFound() {
  return (
    <>
      <section className="bg-ink py-12 sm:py-16 md:py-24">
        <div className="container-page text-center">
          <h1 className="font-serif text-xl font-semibold text-white xs:text-2xl md:text-3xl">
            Page not found
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-white/80 sm:text-lg">
            The page you are looking for does not exist or may have moved.
          </p>
          <div className="mt-8 flex justify-center px-2">
            <Button
              href="/"
              variant="primary"
              className="w-full max-w-sm sm:w-auto"
            >
              Return to Homepage
            </Button>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-stone-dark py-10 sm:py-14">
        <div className="container-page">
          <h2 className="text-center font-serif text-lg font-semibold text-ink sm:text-xl">
            Popular pages
          </h2>
          <nav
            aria-label="Helpful links"
            className="mt-8 flex flex-wrap justify-center gap-x-4 gap-y-3 text-sm font-semibold"
          >
            <Link
              href="/services"
              className="inline-flex min-h-touch items-center text-copper hover:underline"
            >
              Services
            </Link>
            <Link
              href="/practice-areas"
              className="inline-flex min-h-touch items-center text-copper hover:underline"
            >
              Practice Areas
            </Link>
            <Link
              href="/how-we-work"
              className="inline-flex min-h-touch items-center text-copper hover:underline"
            >
              How We Work
            </Link>
            <Link
              href="/contact"
              className="inline-flex min-h-touch items-center text-copper hover:underline"
            >
              Contact
            </Link>
          </nav>
          <ul className="mx-auto mt-8 grid max-w-3xl gap-2 sm:grid-cols-2">
            {services.slice(0, 4).map((s) => (
              <li key={s.id}>
                <Link
                  href={servicePath(s.id)}
                  className="flex min-h-touch items-center rounded-card border border-border bg-white px-4 py-3 text-sm text-body shadow-card hover:border-copper"
                >
                  <span className="break-words">{s.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
