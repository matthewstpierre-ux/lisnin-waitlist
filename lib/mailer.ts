// Single place every outbound email goes through.
//
// The routes used to construct `new Resend(...)` themselves, which meant the
// provider was named in four files and eight call sites. Swapping providers
// (Resend -> Azure Communication Services) is now a change to sendMail alone.
//
// Behaviour here is deliberately identical to what the routes did inline:
// sendMail throws on failure, and callers decide whether that is fatal.

import { Resend } from "resend";

export type MailAttachment = {
  filename: string;
  /** base64-encoded file contents */
  content: string;
  contentType?: string;
};

export type MailMessage = {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
  attachments?: MailAttachment[];
};

/** The From header. RESEND_FROM_EMAIL is the historical name; MAIL_FROM is
 *  provider-neutral and wins when both are set. */
export function mailFrom(): string {
  return (
    process.env.MAIL_FROM ??
    process.env.RESEND_FROM_EMAIL ??
    "Lisnin <hello@lisnin.io>"
  );
}

/** Whether outbound mail is configured at all. The waitlist route treats mail
 *  as optional and must not fail a signup when it is missing. */
export function isMailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}

/** Send one message. Throws if the provider rejects it. */
export async function sendMail(msg: MailMessage): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY is not set");

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: mailFrom(),
    to: msg.to,
    subject: msg.subject,
    html: msg.html,
    ...(msg.replyTo ? { replyTo: msg.replyTo } : {}),
    ...(msg.attachments
      ? {
          attachments: msg.attachments.map((a) => ({
            filename: a.filename,
            content: a.content,
            ...(a.contentType ? { contentType: a.contentType } : {}),
          })),
        }
      : {}),
  });

  // The SDK reports delivery failures in `error` rather than by throwing.
  if (error) throw new Error(`${error.name}: ${error.message}`);
}

/** Send several messages, never rejecting. Mirrors the Promise.allSettled the
 *  waitlist route used, so one failed message cannot lose the other. */
export async function sendMailSettled(
  messages: MailMessage[],
): Promise<PromiseSettledResult<void>[]> {
  return Promise.allSettled(messages.map(sendMail));
}
