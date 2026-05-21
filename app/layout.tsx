import type { Metadata } from "next";
import { Epilogue, Outfit } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Lisnin — Your Entire Music Career, One Platform",
  description:
    "Lisnin is the all-in-one career platform for independent artists. Distribution, publishing admin, press kits, sync access, and a music rights marketplace — all in one subscription. Join the beta and get your first month free at launch.",
  openGraph: {
    title: "Lisnin — Your Entire Music Career, One Platform",
    description:
      "Distribution, publishing admin, press kits, sync access, and a music rights marketplace — all in one subscription.",
    url: "https://lisnin.io",
    siteName: "Lisnin",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lisnin — Your Entire Music Career, One Platform",
    description:
      "Distribution, publishing admin, press kits, sync access, and a music rights marketplace — all in one subscription.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${epilogue.variable} ${outfit.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
