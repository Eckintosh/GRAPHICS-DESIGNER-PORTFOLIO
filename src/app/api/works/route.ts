import { NextResponse } from "next/server";
import { sql, ensureSchema, rowToWork } from "@/lib/db";
import { SEED_WORKS } from "@/data";

// ── GET /api/works ─────────────────────────────────────────────────────────
// Returns all works ordered newest-first.
// Auto-seeds with demo data if the table is empty.
export async function GET() {
  try {
    await ensureSchema();

    const rows = await sql`SELECT * FROM works ORDER BY created_at DESC`;

    // Auto-seed on first run
    if (rows.length === 0) {
      for (const w of SEED_WORKS) {
        await sql`
          INSERT INTO works (id, title, category, image, client, year, description, tags, created_at, images)
          VALUES (
            ${w.id}, ${w.title}, ${w.category}, ${w.image},
            ${w.client ?? null}, ${w.year ?? null}, ${w.description ?? null},
            ${w.tags ?? []}, ${w.createdAt}, ${w.images ?? []}
          )
          ON CONFLICT (id) DO NOTHING
        `;
      }
      const seeded = await sql`SELECT * FROM works ORDER BY created_at DESC`;
      return NextResponse.json(seeded.map(rowToWork));
    }

    return NextResponse.json(rows.map(rowToWork));
  } catch (err) {
    console.error("[GET /api/works]", err);
    return NextResponse.json({ error: "Failed to load works." }, { status: 500 });
  }
}

// ── POST /api/works ────────────────────────────────────────────────────────
// Inserts a new work. Body: Omit<Work, "id" | "createdAt">
export async function POST(req: Request) {
  try {
    await ensureSchema();

    const body = await req.json();
    const { title, category, image, client, year, description, tags, images } = body;

    if (!title || !category || !image) {
      return NextResponse.json({ error: "title, category, and image are required." }, { status: 400 });
    }

    const id = `w-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
    const createdAt = Date.now();

    await sql`
      INSERT INTO works (id, title, category, image, client, year, description, tags, created_at, images)
      VALUES (
        ${id}, ${title}, ${category}, ${image},
        ${client ?? null}, ${year ?? null}, ${description ?? null},
        ${tags ?? []}, ${createdAt}, ${images ?? []}
      )
    `;

    return NextResponse.json(
      rowToWork({ id, title, category, image, client, year, description, tags, created_at: createdAt, images }),
      { status: 201 }
    );
  } catch (err) {
    console.error("[POST /api/works]", err);
    return NextResponse.json({ error: "Failed to create work." }, { status: 500 });
  }
}
