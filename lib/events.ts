export interface LisninEvent {
  slug: string;
  title: string;
  subtitle: string;
  dateLabel: string;
  doorsLabel: string;
  programLabel: string;
  startIso: string; // doors, ISO with offset
  endIso: string;
  venueName: string;
  venueAddress: string;
  admission: string;
  capacity: number;
  mapUrl: string;
}

export const SAULT_EVENT: LisninEvent = {
  slug: "sault-2026",
  title: "Navigating the Modern Music Business as an Independent Artist",
  subtitle: "Keynote · First public demo of Lisnin · Open Q&A",
  dateLabel: "Tuesday, August 25, 2026",
  doorsLabel: "4:00 PM",
  programLabel: "5:00 PM",
  startIso: "2026-08-25T16:00:00-04:00",
  endIso: "2026-08-25T19:00:00-04:00",
  venueName: "The Art Hub at Spring",
  venueAddress: "504 Queen St. E., Sault Ste. Marie, ON P6A 2A1",
  admission: "Free",
  capacity: 60,
  mapUrl: "https://www.google.com/maps/search/?api=1&query=504+Queen+St+E+Sault+Ste+Marie+ON+P6A+2A1",
};
