import Link from "next/link";

export type NavDropdownItem = { href: string; label: string };

export function within(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(href + "/");
}

type NavDropdownProps = {
  label: string;
  href: string;
  items: NavDropdownItem[];
  pathname: string;
  align?: "left" | "right";
  variant?: "light" | "dark";
};

/** Opens on hover or keyboard focus through CSS, so it works with no client script. */
export function NavDropdown({ label, href, items, pathname, align = "left" }: NavDropdownProps) {
  const active = within(pathname, href) || items.some((i) => within(pathname, i.href));

  return (
    <div className="nav-item relative">
      <Link
        href={href}
        aria-haspopup="true"
        aria-current={active ? "page" : undefined}
        className={`relative inline-flex h-[4.75rem] items-center gap-1.5 px-3 text-sm font-medium transition ${
          active ? "text-copper" : "text-white/80 hover:text-white"
        }`}
      >
        {label}
        <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M2 4 L6 8 L10 4" stroke="currentColor" strokeWidth="1.8" />
        </svg>
        {active && <span aria-hidden="true" className="absolute inset-x-3 bottom-0 h-[3px] bg-copper" />}
      </Link>
      <div className={`nav-panel absolute top-full z-50 w-[min(92vw,22rem)] ${align === "right" ? "right-0" : "left-0"}`}>
        <div className="overflow-hidden rounded-tr-[2.5rem] border border-white/10 bg-white shadow-elevated">
          <div className="flex items-center justify-between border-b-4 border-copper bg-stone-dark px-5 py-3">
            <p className="font-serif text-base font-bold text-ink">{label}</p>
            <Link href={href} className="text-xs font-semibold text-sage hover:text-copper">
              View all
            </Link>
          </div>
          <ul className="max-h-[min(62vh,26rem)] overflow-y-auto py-2">
            {items.map((item) => {
              const current = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={current ? "page" : undefined}
                    className={`block border-l-4 px-5 py-2.5 text-[0.95rem] ${
                      current
                        ? "border-copper bg-stone font-semibold text-ink"
                        : "border-transparent text-body hover:border-sage hover:bg-stone hover:text-ink"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
