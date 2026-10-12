import { TableClient, odata } from "@azure/data-tables";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * Lead capture backed by Azure Table Storage.
 *
 * Replaces the Google Apps Script webhook we used to POST form submissions to.
 * Each form gets its own table so the shapes can diverge without migrations.
 */
export type LeadTable = "waitlist" | "saultrsvp" | "contact" | "bookcall";

export type LeadRecord = Record<string, string | number | boolean | null>;

function accountName(): string | undefined {
  return process.env.AZURE_STORAGE_ACCOUNT;
}

export function isLeadStoreConfigured(): boolean {
  return Boolean(process.env.AZURE_STORAGE_CONNECTION_STRING || accountName());
}

function clientFor(table: LeadTable): TableClient {
  const conn = process.env.AZURE_STORAGE_CONNECTION_STRING;
  if (conn) {
    return TableClient.fromConnectionString(conn, table);
  }
  const account = accountName();
  if (!account) {
    throw new Error(
      "Lead store is not configured: set AZURE_STORAGE_ACCOUNT or AZURE_STORAGE_CONNECTION_STRING",
    );
  }
  // Managed identity in Container Apps; falls back to the az CLI login locally.
  return new TableClient(
    `https://${account}.table.core.windows.net`,
    table,
    new DefaultAzureCredential(),
  );
}

/**
 * Partition by UTC day so the common "what came in recently" read stays cheap,
 * and key rows by a descending timestamp so newest sorts first within a day.
 */
function keysFor(now: Date): { partitionKey: string; rowKey: string } {
  const partitionKey = now.toISOString().slice(0, 10);
  const inverted = (9_999_999_999_999 - now.getTime()).toString().padStart(13, "0");
  return {
    partitionKey,
    rowKey: `${inverted}-${globalThis.crypto.randomUUID()}`,
  };
}

/**
 * Append one submission. Throws on failure — callers decide whether a lost
 * row should fail the request or just be logged.
 */
export async function saveLead(table: LeadTable, record: LeadRecord): Promise<void> {
  const client = clientFor(table);
  const now = new Date();
  await client.createEntity({
    ...keysFor(now),
    ...record,
    createdAt: now.toISOString(),
  });
}

/** Read recent submissions, newest first. Used by the internal /ataglance view. */
export async function listLeads(table: LeadTable, days = 30, limit = 500) {
  const client = clientFor(table);
  const since = new Date(Date.now() - days * 86_400_000).toISOString().slice(0, 10);
  const rows: Record<string, unknown>[] = [];
  const iter = client.listEntities({
    queryOptions: { filter: odata`PartitionKey ge ${since}` },
  });
  for await (const row of iter) {
    rows.push(row);
    if (rows.length >= limit) break;
  }
  return rows.sort((a, b) => String(b.createdAt ?? "").localeCompare(String(a.createdAt ?? "")));
}
