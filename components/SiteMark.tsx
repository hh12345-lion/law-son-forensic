import Link from "next/link";
import { SITE_NAME } from "@/lib/site";

type SiteMarkProps = {
  size?: "sm" | "md";
  showText?: boolean;
  inverted?: boolean;
};

/** The supplied horizontal logo: light artwork on dark surfaces, the original on light ones. */
export function SiteMark({ size = "md", inverted = false }: SiteMarkProps) {
  const height = size === "sm" ? "h-8 sm:h-9" : "h-10 sm:h-11 lg:h-12";
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={inverted ? "/brand/logo-light.svg" : "/brand/logo.svg"}
      alt={SITE_NAME}
      width={830}
      height={167}
      className={`${height} w-auto`}
    />
  );
}

export function SiteMarkLink({
  size = "md",
  className = "",
  inverted = true,
  current = false,
}: {
  size?: "sm" | "md";
  className?: string;
  inverted?: boolean;
  current?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label={`${SITE_NAME}, home`}
      aria-current={current ? "page" : undefined}
      className={`group flex min-h-touch shrink-0 items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-2 focus-visible:ring-offset-ink ${className}`}
    >
      <SiteMark size={size} inverted={inverted} />
    </Link>
  );
}

/** The column and fingerprint monogram, drawn from the supplied artwork. */
export function Monogram({ className = "" }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/brand/monogram.svg" alt="" aria-hidden="true" width={366} height={370} className={className} />
  );
}
