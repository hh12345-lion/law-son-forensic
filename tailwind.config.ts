import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "375px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      nav: "1200px",
    },
    extend: {
      colors: {
        ink: "#15212A",
        copper: "#D27644",
        "copper-deep": "#B35F31",
        sage: "#4F7E6B",
        stone: "#F6F3EE",
        "stone-dark": "#EEE9E1",
        mist: "#D6D6D6",
        border: "#D6D6D6",
        heading: "#15212A",
        body: "#37444D",
        "slate-muted": "#4A5862",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-source)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "0px",
        pill: "9999px",
      },
      boxShadow: {
        card: "0 1px 3px rgba(21, 32, 40, 0.06), 0 4px 16px rgba(21, 32, 40, 0.04)",
        elevated: "0 8px 32px rgba(21, 32, 40, 0.08)",
      },
      minHeight: {
        touch: "44px",
      },
      minWidth: {
        touch: "44px",
      },
      backgroundImage: {
        "hero-pattern":
          "repeating-radial-gradient(circle at 100% 50%, rgba(210, 118, 68, 0.10) 0 2px, transparent 2px 22px)",
      },
      backgroundSize: {
        pattern: "24px 24px",
      },
    },
  },
  plugins: [],
};

export default config;
