import { NextResponse } from "next/server";

// ── POST /api/upload ───────────────────────────────────────────────────────
// Accepts a multipart form upload, proxies it to Cloudinary, and returns
// the secure_url. Running server-side avoids any browser CORS restrictions.
export async function POST(req: Request) {
  try {
    const body = await req.formData();
    const file = body.get("file");

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json({ error: "No file provided." }, { status: 400 });
    }

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !preset) {
      return NextResponse.json(
        { error: "Cloudinary is not configured." },
        { status: 500 }
      );
    }

    const fd = new FormData();
    fd.append("file", file);
    fd.append("upload_preset", preset);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      { method: "POST", body: fd }
    );

    const data = await res.json();

    if (!res.ok) {
      console.error("[POST /api/upload] Cloudinary error:", data);
      return NextResponse.json(
        { error: data?.error?.message ?? "Cloudinary upload failed." },
        { status: res.status }
      );
    }

    return NextResponse.json({ secure_url: data.secure_url as string });
  } catch (err) {
    console.error("[POST /api/upload]", err);
    return NextResponse.json({ error: "Upload failed." }, { status: 500 });
  }
}
