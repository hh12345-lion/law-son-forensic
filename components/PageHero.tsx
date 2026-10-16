import Image from "next/image";
import Link from "next/link";
import type { Photo } from "@/lib/photos";

type Breadcrumb = { label: string; href?: string };

type PageHeroProps = {
  title: string;
  subtitle?: string;
  breadcrumbs?: Breadcrumb[];
  children?: React.ReactNode;
  compact?: boolean;
  photo?: Photo;
};

/** Title first; breadcrumbs follow the intro. The photo carries the fingerprint curve of the monogram. */
export function PageHero({ title, subtitle, breadcrumbs, children, compact = false, photo }: PageHeroProps) {
  return (
    <section className={`relative overflow-hidden bg-stone-dark ${compact ? "py-10 sm:py-12" : "py-12 sm:py-16"}`}>
      <span aria-hidden="true" className="absolute inset-y-0 left-0 hidden w-3 bg-ink lg:block" />
      <span aria-hidden="true" className="absolute inset-y-0 left-3 hidden w-1 bg-copper lg:block" />
      <div className="container-page relative">
        <div className={`grid items-center gap-12 ${photo ? "lg:grid-cols-12 lg:gap-16" : ""}`}>
          <div className={photo ? "min-w-0 lg:col-span-7" : "max-w-3xl"}>
            <h1 className="break-words font-serif text-[2rem] font-bold leading-[1.08] text-ink sm:text-4xl lg:text-[3.25rem]">
              {title}
            </h1>
            {subtitle && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-body">{subtitle}</p>}
            {children && <div className="hero-cta-group">{children}</div>}
            {breadcrumbs && breadcrumbs.length > 0 && (
              <nav aria-label="Breadcrumb" className="mt-8 border-t border-border pt-4">
                <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-muted sm:text-sm">
                  {breadcrumbs.map((crumb, i) => (
                    <li key={`${crumb.label}-${i}`} className="flex max-w-full items-center gap-2">
                      {i > 0 && <span aria-hidden="true" className="h-1 w-1 shrink-0 bg-copper" />}
                      {crumb.href ? (
                        <Link href={crumb.href} className="break-words hover:text-copper focus:outline-none focus-visible:underline">
                          {crumb.label}
                        </Link>
                      ) : (
                        <span className="break-words font-semibold text-ink" aria-current="page">
                          {crumb.label}
                        </span>
                      )}
                    </li>
                  ))}
                </ol>
              </nav>
            )}
          </div>
          {photo && (
            <figure className="relative lg:col-span-5">
              <span aria-hidden="true" className="print-frame absolute -right-3 -top-3 bottom-6 left-6 border-2 border-copper/60" />
              <div className="print-frame relative aspect-[5/4] overflow-hidden bg-mist lg:aspect-[4/5]">
                <Image src={photo.src} alt={photo.alt} fill priority sizes="(min-width: 1024px) 38vw, 100vw" className="object-cover" />
              </div>
            </figure>
          )}
        </div>
      </div>
    </section>
  );
}
