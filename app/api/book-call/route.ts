import { NextResponse } from "next/server";
import { Resend } from "resend";

function formatPreferredTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export async function POST(req: Request) {
  const { name, email, preferredTime, website, source, sourcePath } = await req.json();

  // Honeypot
  if (website) return NextResponse.json({ success: true });

  if (!name || !email || !preferredTime) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const destination = process.env.CONTACT_DESTINATION_EMAIL ?? "hello@lisnin.io";
  const from = process.env.RESEND_FROM_EMAIL ?? "Lisnin <hello@lisnin.io>";
  const formattedTime = formatPreferredTime(preferredTime);
  const sourceLabel = typeof source === "string" && source ? source : "Investor One-Pager";
  const sourceUrl = typeof sourcePath === "string" && sourcePath ? sourcePath : "lisnin.io/i/bizintro";

  try {
    await Promise.all([
      // Internal notification to Matt
      resend.emails.send({
        from,
        to: destination,
        replyTo: email,
        subject: `[Lisnin ${sourceLabel}] Book a Call — ${name}`,
        html: `
          <div style="font-family: sans-serif; max-width: 560px;">
            <h2 style="margin: 0 0 16px;">${sourceLabel} call request — ${name}</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Preferred date &amp; time (visitor's local time):</strong> ${formattedTime}</p>
            <p><strong>Submitted from:</strong> ${sourceLabel} (${sourceUrl})</p>
          </div>
        `,
      }),

      // Auto-reply confirmation to the requester
      resend.emails.send({
        from,
        to: email,
        subject: "Thanks for reaching out — Lisnin",
        html: `
          <div style="font-family: sans-serif; max-width: 560px; background: #0d1a12; color: #e8f5e0; padding: 40px 32px; border-radius: 8px;">
            <img src="https://lisnin.io/lisnin-logo-dark.png" alt="Lisnin" style="height: 36px; margin-bottom: 32px;" />
            <h2 style="margin: 0 0 16px; color: #4ade80; font-size: 22px;">Hey ${name},</h2>
            <p style="margin: 0 0 16px; font-size: 16px; line-height: 1.6; color: #c8e6c9;">
              Thanks for getting in touch! Matthew will reach out to confirm your meeting within 24 hours.
            </p>
            <p style="margin: 0 0 32px; font-size: 16px; line-height: 1.6; color: #c8e6c9;">
              Thanks for Lisnin!
            </p>
            <p style="margin: 0; font-size: 14px; color: #6b9e6b;">
              — The Lisnin Team
            </p>
            <hr style="margin: 32px 0; border: none; border-top: 1px solid #1e3a22;" />
            <p style="margin: 0; font-size: 12px; color: #4a6e4a;">
              You're receiving this because you requested a call via the Lisnin ${sourceLabel.toLowerCase()}.
            </p>
          </div>
        `,
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Book-call error:", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
