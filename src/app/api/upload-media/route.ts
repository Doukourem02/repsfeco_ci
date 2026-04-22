import { put } from "@vercel/blob";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const ALLOWED_CONTENT_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/heic",
  "image/heif",
  "video/mp4",
  "video/webm",
  "video/quicktime",
  "video/3gpp",
  "video/x-matroska",
];

function sanitizeFileName(fileName: string) {
  return fileName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9._-]/g, "-")
    .replace(/-+/g, "-")
    .toLowerCase();
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");

    if (!session) {
      return NextResponse.json(
        { error: "Non autorisé. Veuillez vous connecter." },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file");
    const activityId = formData.get("activityId");
    const kind = formData.get("kind");
    const index = formData.get("index");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Aucun fichier reçu." }, { status: 400 });
    }

    if (typeof activityId !== "string" || !activityId) {
      return NextResponse.json({ error: "ID d'activité manquant." }, { status: 400 });
    }

    if (kind !== "img" && kind !== "video") {
      return NextResponse.json({ error: "Type de média invalide." }, { status: 400 });
    }

    if (!ALLOWED_CONTENT_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: `Type de fichier non autorisé: ${file.type || "inconnu"}` },
        { status: 400 }
      );
    }

    const safeIndex = typeof index === "string" && index ? index : "0";
    const pathname = `actions/${activityId}/${kind}/${Date.now()}-${safeIndex}-${sanitizeFileName(file.name)}`;
    const blob = await put(pathname, file, {
      access: "public",
      contentType: file.type,
      addRandomSuffix: true,
    });

    return NextResponse.json({ url: blob.url });
  } catch (error) {
    console.error("Server media upload error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Upload failed" },
      { status: 500 }
    );
  }
}
