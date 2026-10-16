import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieConsentProvider } from "@/components/cookies/CookieConsentProvider";
import { CookieBanner } from "@/components/cookies/CookieBanner";
import { CookiePreferencesModal } from "@/components/cookies/CookiePreferencesModal";
import { SITE_URL, SITE_NAME } from "@/lib/site";
import { HOME_TITLE } from "@/lib/metadata";

// Self-hosted latin subsets of the brand typefaces: Cormorant Unicase for headings, Noto Sans for body text.
const notoSans = localFont({
  src: [
    { path: "./fonts/noto-sans.woff2", weight: "100 900", style: "normal" },
    { path: "./fonts/noto-sans-italic.woff2", weight: "100 900", style: "italic" },
  ],
  variable: "--font-source",
  display: "swap",
});

const cormorant = localFont({
  src: [
    { path: "./fonts/cormorant-unicase.woff2", weight: "500", style: "normal" },
    { path: "./fonts/cormorant-unicase-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-cormorant",
  display: "swap",
});

// Every page is rendered on the server for each request.
export const dynamic = "force-dynamic";

export const viewport: Viewport = {
  themeColor: "#15212A",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: HOME_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  alternates: {
    canonical: SITE_URL,
    languages: { "x-default": SITE_URL },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    other: process.env.BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION }
      : undefined,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-US" className={`${notoSans.variable} ${cormorant.variable}`}>
      <body className="flex min-h-screen min-h-[100dvh] flex-col">
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];window.dataLayer.push(['consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',functionality_storage:'denied',personalization_storage:'denied',security_storage:'granted',wait_for_update:500}]);`,
          }}
        />
        <CookieConsentProvider>
          <Header />
          <main className="min-w-0 flex-1">{children}</main>
          <Footer />
          <CookieBanner />
          <CookiePreferencesModal />
        </CookieConsentProvider>
      </body>
    </html>
  );
}
