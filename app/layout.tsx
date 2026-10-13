import type { Metadata, Viewport } from "next";
import { Epilogue, Outfit } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SOCIAL_LINKS, FAQS } from "@/lib/constants";
import "./globals.css";

const epilogue = Epilogue({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-epilogue",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-outfit",
  display: "swap",
});

const SITE_URL = "https://www.lisnin.io";

const TITLE =
  "Your Entire Music Career, One Platform | Global Music Distribution | Global Music Publishing | AI Music Management | Musician Website Builder | Music Marketing Tools | Music Rights Management | Music Funding";

/** Under 160 characters so search engines show it whole. */
const DESCRIPTION =
  "Global music distribution, publishing administration, AI music management, artist website builder and marketing tools — one platform for independent artists.";

const SOCIAL_DESCRIPTION =
  "One platform for global music distribution, publishing admin, artist websites, marketing and rights management — run by an AI Music Manager. Join the beta, first month free at launch.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: "Lisnin",
  category: "Music",
  keywords: [
    "AI music management",
    "AI music manager",
    "AI music distribution",
    "AI music marketing",
    "AI music publishing",
    "global music distribution",
    "global music publishing",
    "music distribution platform",
    "music publishing administration",
    "music rights management",
    "music marketing tools",
    "musician website builder",
    "artist website builder",
    "music funding",
    "independent artist platform",
    "playlist and curator outreach",
    "sync licensing for artists",
    "distribute music to Spotify and Apple Music",
  ],
  authors: [{ name: "Lisnin Music Inc.", url: SITE_URL }],
  creator: "Lisnin Music Inc.",
  publisher: "Lisnin Music Inc.",
  alternates: { canonical: SITE_URL },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: TITLE,
    description: SOCIAL_DESCRIPTION,
    url: SITE_URL,
    siteName: "Lisnin",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: SOCIAL_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F6F5F2" },
    { media: "(prefers-color-scheme: dark)", color: "#080808" },
  ],
};

/** The five owned rails, published so each reads as a distinct capability. */
const FEATURES = [
  "Global music distribution to 150+ stores with 0% commission",
  "Global music publishing administration and royalty collection",
  "AI Music Manager that executes releases, pitching and campaigns",
  "Musician website builder that fills itself from your catalogue",
  "Music marketing, playlist, radio and curator outreach tools",
  "Music rights management and sync licensing",
  "Listening Parties for community-led music promotion",
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Lisnin",
      legalName: "Lisnin Music Inc.",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/lisnin-logo-dark.png`,
        width: 2000,
        height: 2000,
      },
      image: `${SITE_URL}/opengraph-image`,
      description: DESCRIPTION,
      email: "matthew@lisnin.io",
      foundingDate: "2024",
      sameAs: [
        SOCIAL_LINKS.linkedin,
        SOCIAL_LINKS.twitter,
        SOCIAL_LINKS.instagram,
        SOCIAL_LINKS.facebook,
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "Lisnin",
      alternateName: "Lisnin.io",
      url: SITE_URL,
      inLanguage: "en",
      description: DESCRIPTION,
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/#software`,
      name: "Lisnin",
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "Music Distribution and Publishing",
      operatingSystem: "Web",
      url: SITE_URL,
      description: SOCIAL_DESCRIPTION,
      featureList: FEATURES,
      publisher: { "@id": `${SITE_URL}/#organization` },
      audience: {
        "@type": "Audience",
        audienceType: "Independent musicians, artists and music producers",
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
  ],
};

/**
 * Microsoft Clarity. Loaded after hydration so session recording never
 * competes with first paint; the tag itself then injects its own async script.
 */
const CLARITY_PROJECT_ID = "yx2h7yklw7";

const CLARITY_SCRIPT = `(function(c,l,a,r,i,t,y){
  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");`;

const THEME_INIT_SCRIPT = `(function(){
  var t = localStorage.getItem('biz-theme');
  if (t === 'dark') document.documentElement.setAttribute('data-theme','dark');
})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${epilogue.variable} ${outfit.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <Script
          id="ms-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: CLARITY_SCRIPT }}
        />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
