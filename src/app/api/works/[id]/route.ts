import { NextResponse } from "next/server";
import { sql, rowToWork } from "@/lib/db";

// ── PATCH /api/works/[id] ──────────────────────────────────────────────────
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { title, category, image, client, year, description, tags, images } = body;

    const rows = await sql`
      UPDATE works SET
        title       = COALESCE(${title       ?? null}, title),
        category    = COALESCE(${category    ?? null}, category),
        image       = COALESCE(${image       ?? null}, image),
        client      = ${client      ?? null},
        year        = ${year        ?? null},
        description = ${description ?? null},
        tags        = ${tags        ?? null},
        images      = COALESCE(${images      ?? null}, images)
      WHERE id = ${id}
      RETURNING *
    `;

    if (rows.length === 0) {
      return NextResponse.json({ error: "Work not found." }, { status: 404 });
    }

    return NextResponse.json(rowToWork(rows[0]));
  } catch (err) {
    console.error("[PATCH /api/works/[id]]", err);
    return NextResponse.json({ error: "Failed to update work." }, { status: 500 });
  }
}

// ── DELETE /api/works/[id] ─────────────────────────────────────────────────
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await sql`DELETE FROM works WHERE id = ${id}`;
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[DELETE /api/works/[id]]", err);
    return NextResponse.json({ error: "Failed to delete work." }, { status: 500 });
  }
}
