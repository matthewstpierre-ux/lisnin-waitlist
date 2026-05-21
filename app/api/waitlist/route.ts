import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email } = body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }
    if (!name || typeof name !== "string" || name.trim().length < 1) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const trimmedName = name.trim();
    const timestamp = new Date().toISOString();

    // Google Sheets
    const sheetsUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (sheetsUrl) {
      try {
        const url = new URL(sheetsUrl);
        url.searchParams.set("name", trimmedName);
        url.searchParams.set("email", email);
        url.searchParams.set("timestamp", timestamp);
        await fetch(url.toString());
      } catch (sheetsErr) {
        console.error("Sheets error:", sheetsErr);
      }
    }

    // Resend emails
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const from = process.env.RESEND_FROM_EMAIL ?? "Lisnin <hello@lisnin.io>";

      await Promise.allSettled([
        resend.emails.send({
          from,
          to: "hello@lisnin.io",
          subject: `New Lisnin signup: ${trimmedName}`,
          html: `<p><strong>Name:</strong> ${trimmedName}<br/><strong>Email:</strong> ${email}<br/><strong>Time:</strong> ${timestamp}</p>`,
        }),
        resend.emails.send({
          from,
          to: email,
          subject: "You're on the list — your first month is on us at launch.",
          html: `
            <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; background: #0B1120; color: #F9FAFB; padding: 40px 32px; border-radius: 12px;">
              <img src="https://lisnin.io/lisnin-logo.png" alt="Lisnin" height="32" style="margin-bottom: 32px;" />
              <h1 style="font-size: 1.75rem; font-weight: 700; color: #F9FAFB; margin: 0 0 8px;">Hey ${trimmedName}, you're on the list.</h1>
              <p style="color: #9CA3AF; line-height: 1.6; margin: 0 0 24px;">
                When Lisnin launches this summer, you'll get your first month free — distribution, the Earkitz press kit, Listening Party Bot access, all included.
              </p>
              <p style="color: #9CA3AF; line-height: 1.6; margin: 0 0 32px;">
                We'll be in touch as launch gets closer.
              </p>
              <p style="color: #6B7280; font-size: 0.875rem;">— Matt &amp; the Lisnin team</p>
              <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.08); margin: 32px 0;" />
              <p style="color: #6B7280; font-size: 0.75rem;">© 2026 Lisnin Music Ltd.</p>
            </div>
          `,
        }),
      ]);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Waitlist route error:", err);
    return NextResponse.json({ error: "Failed to process" }, { status: 500 });
  }
}
