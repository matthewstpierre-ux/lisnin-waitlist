import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email } = body;

    console.log("Waitlist POST received:", { name, email });

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }
    if (!name || typeof name !== "string" || name.trim().length < 1) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const sheetsUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    console.log("Sheets URL present:", !!sheetsUrl);

    // Save to Google Sheets
    if (sheetsUrl) {
      try {
        const sheetsRes = await fetch(sheetsUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: name.trim(), email, timestamp: new Date().toISOString() }),
        });
        console.log("Sheets response status:", sheetsRes.status);
      } catch (sheetsErr) {
        console.error("Sheets error (non-fatal):", sheetsErr);
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Waitlist route error:", err);
    return NextResponse.json({ error: "Failed to process" }, { status: 500 });
  }
}
