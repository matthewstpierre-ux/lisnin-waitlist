import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  const { name, email, inquiry, type, message, website } = await req.json();

  // Honeypot
  if (website) return NextResponse.json({ success: true });

  if (!name || !email || !inquiry || !type || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const destination = process.env.CONTACT_DESTINATION_EMAIL ?? "hello@lisnin.io";

  const from = process.env.RESEND_FROM_EMAIL ?? "Lisnin <hello@lisnin.io>";

  try {
    await Promise.all([
      // Internal notification to the Lisnin team
      resend.emails.send({
        from,
        to: destination,
        replyTo: email,
        subject: `[Lisnin Site Contact] ${inquiry} — ${name}`,
        html: `
          <div style="font-family: sans-serif; max-width: 560px;">
            <h2 style="margin: 0 0 16px;">[Lisnin Contact] ${inquiry} — ${name}</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Inquiry:</strong> ${inquiry}</p>
            <p><strong>Type:</strong> ${type}</p>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap; background: #f5f5f5; padding: 12px; border-radius: 6px;">${message}</p>
          </div>
        `,
      }),

      // Auto-reply confirmation to the sender
      resend.emails.send({
        from,
        to: email,
        subject: "Thanks for reaching out — Lisnin",
        html: `
          <div style="font-family: sans-serif; max-width: 560px; background: #0d1a12; color: #e8f5e0; padding: 40px 32px; border-radius: 8px;">
            <img src="https://lisnin.io/lisnin-logo-dark.png" alt="Lisnin" style="height: 36px; margin-bottom: 32px;" />
            <h2 style="margin: 0 0 16px; color: #4ade80; font-size: 22px;">Hey ${name},</h2>
            <p style="margin: 0 0 16px; font-size: 16px; line-height: 1.6; color: #c8e6c9;">
              Thanks for getting in touch with us at Lisnin. We'll get back to you as soon as we can — typically within 48 hours.
            </p>
            <p style="margin: 0 0 32px; font-size: 16px; line-height: 1.6; color: #c8e6c9;">
              Thanks for reaching out, and thanks for Lisnin!
            </p>
            <p style="margin: 0; font-size: 14px; color: #6b9e6b;">
              — The Lisnin Team
            </p>
            <hr style="margin: 32px 0; border: none; border-top: 1px solid #1e3a22;" />
            <p style="margin: 0; font-size: 12px; color: #4a6e4a;">
              You're receiving this because you submitted a contact form at <a href="https://lisnin.io" style="color: #4ade80;">lisnin.io</a>.
            </p>
          </div>
        `,
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact error:", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
