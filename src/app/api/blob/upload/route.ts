import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

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

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  console.log("Blob route body type:", body?.type);
  console.log("Blob route pathname:", (body as any)?.pathname);

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
    onBeforeGenerateToken: async (pathname, clientPayload, multipart) => {
            console.log("Generating token for:", pathname);
            console.log("Client payload:", clientPayload);
            console.log("Multipart:", multipart);
      
        const cookieStore = await cookies();
        const session = cookieStore.get("admin_session");

        if (!session) {
          throw new Error("Non autorisé. Veuillez vous connecter.");
        }

        return {
          allowedContentTypes: ALLOWED_CONTENT_TYPES,
          maximumSizeInBytes: 250 * 1024 * 1024,
          addRandomSuffix: true,
          tokenPayload: clientPayload || JSON.stringify({ pathname }),
        };
      },
      onUploadCompleted: async ({ blob }) => {
        console.log("Activity media upload completed:", blob.pathname);
      },
    });
    console.log("Blob route response type:", jsonResponse?.type);
    return NextResponse.json(jsonResponse);
  } catch (error) {
    console.error("Blob upload error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Upload failed" },
      { status: 400 }
    );
  }
}
