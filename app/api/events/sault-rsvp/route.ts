import { NextResponse } from "next/server";
import { Resend } from "resend";
import { SAULT_EVENT } from "@/lib/events";
import { buildIcsEvent, buildGoogleCalendarLink } from "@/lib/ics";

const ROLES = ["Artist", "Business", "Brand", "Investor", "Other"];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, role, other, phone, website } = body;

    // Honeypot
    if (website) {
      return NextResponse.json({ success: true });
    }

    const errors: Record<string, string> = {};
    if (!firstName || typeof firstName !== "string" || !firstName.trim()) {
      errors.firstName = "First name is required";
    }
    if (!lastName || typeof lastName !== "string" || !lastName.trim()) {
      errors.lastName = "Last name is required";
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "A valid email is required";
    }
    if (!role || !ROLES.includes(role)) {
      errors.role = "Please select a role";
    }
    if (role === "Other" && (!other || typeof other !== "string" || !other.trim())) {
      errors.other = "Please specify your role";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ error: "Validation failed", fields: errors }, { status: 400 });
    }

    const trimmed = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      role,
      other: role === "Other" ? other.trim() : "",
      phone: typeof phone === "string" ? phone.trim() : "",
    };

    const timestamp = new Date().toISOString();

    if (!process.env.GOOGLE_SHEETS_WEBHOOK_URL) {
      throw new Error("GOOGLE_SHEETS_WEBHOOK_URL is not set");
    }
    if (!process.env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not set");
    }

    // Google Sheets — Sault Event tab
    const sheetsUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    const url = new URL(sheetsUrl);
    url.searchParams.set("type", "sault-event");
    url.searchParams.set("firstName", trimmed.firstName);
    url.searchParams.set("lastName", trimmed.lastName);
    url.searchParams.set("email", trimmed.email);
    url.searchParams.set("role", trimmed.role);
    url.searchParams.set("other", trimmed.other);
    url.searchParams.set("phone", trimmed.phone);
    url.searchParams.set("timestamp", timestamp);

    const sheetsRes = await fetch(url.toString(), { redirect: "follow" });
    if (!sheetsRes.ok) {
      throw new Error(`Sheets webhook failed: ${sheetsRes.status}`);
    }

    // Build .ics attachment
    const icsContent = buildIcsEvent({
      uid: `sault-event-${trimmed.email}-${Date.now()}@lisnin.io`,
      summary: SAULT_EVENT.title,
      description: `${SAULT_EVENT.subtitle}\n\nMore info: https://lisnin.io/events`,
      location: `${SAULT_EVENT.venueName}, ${SAULT_EVENT.venueAddress}`,
      start: new Date(SAULT_EVENT.startIso),
      end: new Date(SAULT_EVENT.endIso),
    });

    const gcalLink = buildGoogleCalendarLink({
      summary: SAULT_EVENT.title,
      description: `${SAULT_EVENT.subtitle}\n\nMore info: https://lisnin.io/events`,
      location: `${SAULT_EVENT.venueName}, ${SAULT_EVENT.venueAddress}`,
      start: new Date(SAULT_EVENT.startIso),
      end: new Date(SAULT_EVENT.endIso),
    });

    const resend = new Resend(process.env.RESEND_API_KEY);
    const from = process.env.RESEND_FROM_EMAIL ?? "Lisnin <hello@lisnin.io>";

    await resend.emails.send({
      from,
      to: trimmed.email,
      subject: "You're on the list — Lisnin @ Sault Ste. Marie, Aug 25",
      html: `
        <div style="font-family: 'Outfit', Arial, sans-serif; max-width: 560px; margin: 0 auto; background: #F6F5F2; color: #111010; padding: 40px 32px; border-radius: 12px; border: 1px solid rgba(12,11,9,0.08);">
          <p style="color: #1C6E3D; font-weight: 700; font-size: 0.75rem; letter-spacing: 0.08em; text-transform: uppercase; margin: 0 0 16px;">Lisnin.io</p>
          <h1 style="font-size: 1.5rem; font-weight: 700; color: #111010; margin: 0 0 8px; line-height: 1.3;">You&rsquo;re confirmed, ${trimmed.firstName}.</h1>
          <p style="color: rgba(12,11,9,0.58); line-height: 1.6; margin: 0 0 24px;">
            Your seat is reserved for <strong>Navigating the Modern Music Business as an Independent Artist</strong>.
          </p>
          <div style="background: #ECEAE6; border-radius: 12px; padding: 20px 24px; margin: 0 0 24px;">
            <p style="margin: 0 0 6px; font-size: 0.9rem;"><strong>Tuesday, August 25, 2026</strong></p>
            <p style="margin: 0 0 6px; font-size: 0.9rem;">Doors 4:00 PM &middot; Program begins 5:00 PM</p>
            <p style="margin: 0 0 6px; font-size: 0.9rem;">The Art Hub at Spring &mdash; 504 Queen St. E., Sault Ste. Marie, ON P6A 2A1</p>
            <p style="margin: 0; font-size: 0.9rem;">Free admission &middot; Capacity capped at 60</p>
          </div>
          <a href="${gcalLink}" target="_blank" style="display: inline-block; background: #1C6E3D; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; font-size: 0.9rem; margin: 0 0 24px;">
            Add to Google Calendar
          </a>
          <p style="color: rgba(12,11,9,0.58); line-height: 1.6; margin: 0 0 8px; font-size: 0.875rem;">
            Bringing someone? They&rsquo;ll need to RSVP separately at
            <a href="https://lisnin.io/events" style="color: #1C6E3D;">lisnin.io/events</a>.
          </p>
          <hr style="border: none; border-top: 1px solid rgba(12,11,9,0.08); margin: 32px 0;" />
          <p style="color: rgba(12,11,9,0.36); font-size: 0.75rem;">&copy; 2026 Lisnin Music Ltd.</p>
        </div>
      `,
      attachments: [
        {
          filename: "lisnin-sault-event.ics",
          content: Buffer.from(icsContent).toString("base64"),
        },
      ],
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Sault RSVP route error:", err);
    return NextResponse.json({ error: "Failed to process RSVP" }, { status: 500 });
  }
}
