import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  const { email, source } = await req.json();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const beehiivKey = process.env.BEEHIIV_API_KEY;
  const beehiivPubId = process.env.BEEHIIV_PUBLICATION_ID;

  try {
    // Add to Beehiiv
    if (beehiivKey && beehiivPubId) {
      await fetch(`https://api.beehiiv.com/v2/publications/${beehiivPubId}/subscriptions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${beehiivKey}`,
        },
        body: JSON.stringify({
          email,
          reactivate_existing: false,
          send_welcome_email: false,
          utm_source: source ?? "lisnin-site",
        }),
      });
    }

    // Send confirmation email
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? "Lisnin <onboarding@resend.dev>",
      to: email,
      subject: "You're on the list — your first month is on us at launch.",
      html: `
        <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; background: #0B1120; color: #F9FAFB; padding: 40px 32px; border-radius: 12px;">
          <img src="https://lisnin.io/lisnin-logo.png" alt="Lisnin" height="32" style="margin-bottom: 32px;" />
          <h1 style="font-size: 1.75rem; font-weight: 700; color: #F9FAFB; margin: 0 0 8px;">You're on the list.</h1>
          <p style="color: #9CA3AF; line-height: 1.6; margin: 0 0 24px;">
            When Lisnin launches this summer, you'll get your first month free — distribution, the Earkitz press kit, Listening Party Bot access, all included.
          </p>
          <p style="color: #9CA3AF; line-height: 1.6; margin: 0 0 24px;">
            We're building this because the indie artist toolkit is broken — five subscriptions, three logins, and royalties slipping through the cracks. Lisnin puts it all in one place.
          </p>
          <p style="color: #9CA3AF; line-height: 1.6; margin: 0 0 32px;">
            We'll be in touch as launch gets closer.
          </p>
          <p style="color: #6B7280; font-size: 0.875rem;">— Matt &amp; the Lisnin team</p>
          <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.08); margin: 32px 0;" />
          <p style="color: #6B7280; font-size: 0.75rem;">© 2026 Lisnin Music Ltd. · <a href="mailto:hello@lisnin.io" style="color: #22C55E;">Unsubscribe</a></p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Waitlist error:", err);
    return NextResponse.json({ error: "Failed to process" }, { status: 500 });
  }
}
