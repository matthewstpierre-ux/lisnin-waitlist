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

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? "Lisnin <hello@lisnin.io>",
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
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact error:", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
