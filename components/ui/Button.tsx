import Link from "next/link";
import { type ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline";

const variants: Record<Variant, string> = {
  primary:
    "border-2 border-copper bg-copper text-white hover:bg-ink hover:border-ink focus-visible:ring-copper",
  secondary:
    "border-2 border-ink/25 bg-transparent text-ink hover:border-copper hover:text-copper focus-visible:ring-copper",
  outline:
    "border-2 border-copper bg-transparent text-ink hover:bg-copper hover:text-white focus-visible:ring-copper",
};

type ButtonProps = {
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  children: ReactNode;
  className?: string;
  type?: "button" | "submit";
};

export function Button({
  href,
  onClick,
  variant = "primary",
  children,
  className = "",
  type = "button",
}: ButtonProps) {
  const base =
    "inline-flex min-h-touch min-w-touch items-center justify-center rounded-tr-2xl px-5 py-3 text-center text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 sm:px-6";

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
