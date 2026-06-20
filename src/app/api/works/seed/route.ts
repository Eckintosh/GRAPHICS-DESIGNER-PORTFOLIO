import { NextResponse } from "next/server";
import { sql, ensureSchema, rowToWork } from "@/lib/db";
import { SEED_WORKS } from "@/data";

// ── POST /api/works/seed ───────────────────────────────────────────────────
// Wipes all works and re-seeds with the default demo projects.
export async function POST() {
  try {
    await ensureSchema();
    await sql`DELETE FROM works`;

    for (const w of SEED_WORKS) {
      await sql`
        INSERT INTO works (id, title, category, image, client, year, description, tags, created_at, images)
        VALUES (
          ${w.id}, ${w.title}, ${w.category}, ${w.image},
          ${w.client ?? null}, ${w.year ?? null}, ${w.description ?? null},
          ${w.tags ?? []}, ${w.createdAt}, ${w.images ?? []}
        )
      `;
    }

    const rows = await sql`SELECT * FROM works ORDER BY created_at DESC`;
    return NextResponse.json(rows.map(rowToWork));
  } catch (err) {
    console.error("[POST /api/works/seed]", err);
    return NextResponse.json({ error: "Failed to reset works." }, { status: 500 });
  }
}
