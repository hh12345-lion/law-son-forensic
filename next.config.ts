import type { NextConfig } from "next";

import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  // Blog posts are read from disk at request time, so ship the markdown with the server bundle.
  outputFileTracingIncludes: {
    "/blog": ["./content/blog/**/*"],
    "/blog/[slug]": ["./content/blog/**/*"],
    "/sitemap.xml": ["./content/blog/**/*"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/expert-witness",
        destination: "/services/expert-witness",
        permanent: true,
      },
      {
        source: "/investigations",
        destination: "/services/fraud-investigation",
        permanent: true,
      },
      { source: "/fees", destination: "/contact", permanent: true },
    ];
  },
};

export default nextConfig;
