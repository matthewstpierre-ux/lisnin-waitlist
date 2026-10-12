import type { Metadata } from "next";
import { SAULT_EVENT } from "@/lib/events";
import { EventsPageClient } from "@/components/events/EventsPageClient";

const SITE_URL = "https://www.lisnin.io";
const PAGE_URL = `${SITE_URL}/events`;
const OG_IMAGE = `${SITE_URL}/events/poster.jpg`;

const TITLE = "Navigating the Modern Music Business as an Independent Artist | Lisnin";
const DESCRIPTION =
  "Free keynote in Sault Ste. Marie, Tuesday August 25, 2026. A practical breakdown of the independent music business, plus the first public demo of Lisnin. Doors 4:00 PM, program 5:00 PM. Free admission, 60 seats, RSVP required.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PAGE_URL,
    siteName: "Lisnin",
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 1200 }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: SAULT_EVENT.title,
  description: DESCRIPTION,
  startDate: SAULT_EVENT.startIso,
  endDate: SAULT_EVENT.endIso,
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  location: {
    "@type": "Place",
    name: SAULT_EVENT.venueName,
    address: {
      "@type": "PostalAddress",
      streetAddress: "504 Queen St. E.",
      addressLocality: "Sault Ste. Marie",
      addressRegion: "ON",
      postalCode: "P6A 2A1",
      addressCountry: "CA",
    },
  },
  image: [OG_IMAGE],
  organizer: {
    "@type": "Organization",
    name: "Lisnin",
    url: SITE_URL,
  },
  performer: {
    "@type": "Person",
    name: "Matthew St. Pierre",
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    url: PAGE_URL,
  },
};

export default function EventsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <EventsPageClient />
    </>
  );
}
