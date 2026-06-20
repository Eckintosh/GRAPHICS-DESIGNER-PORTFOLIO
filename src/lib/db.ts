import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set.");
}

export const sql = neon(process.env.DATABASE_URL);

/** Run once per cold start to ensure the table exists. */
export async function ensureSchema() {
  await sql`
    CREATE TABLE IF NOT EXISTS works (
      id          TEXT    PRIMARY KEY,
      title       TEXT    NOT NULL,
      category    TEXT    NOT NULL,
      image       TEXT    NOT NULL,
      client      TEXT,
      year        TEXT,
      description TEXT,
      tags        TEXT[],
      created_at  BIGINT  NOT NULL
    )
  `;
}

/** Map a DB row (snake_case) → Work (camelCase). */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function rowToWork(row: Record<string, any>) {
  return {
    id: String(row.id),
    title: String(row.title),
    category: String(row.category),
    image: String(row.image),
    client: row.client ?? undefined,
    year: row.year ?? undefined,
    description: row.description ?? undefined,
    tags: Array.isArray(row.tags) ? (row.tags as string[]) : [],
    createdAt: Number(row.created_at),
  };
}
