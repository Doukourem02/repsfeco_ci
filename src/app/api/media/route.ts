import { get } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const pathname = request.nextUrl.searchParams.get("pathname");

    if (!pathname || !pathname.startsWith("actions/")) {
      return NextResponse.json({ error: "Média invalide." }, { status: 400 });
    }

    const range = request.headers.get("range");
    const result = await get(pathname, {
      access: "private",
      headers: range ? { range } : undefined,
    });

    if (!result || result.statusCode === 304 || !result.stream) {
      return NextResponse.json({ error: "Média introuvable." }, { status: 404 });
    }

    const responseHeaders = new Headers();
    responseHeaders.set("Content-Type", result.blob.contentType || "application/octet-stream");
    responseHeaders.set("Cache-Control", "public, max-age=3600");

    const contentLength = result.headers.get("content-length");
    const contentRange = result.headers.get("content-range");
    const acceptRanges = result.headers.get("accept-ranges");

    if (contentLength) {
      responseHeaders.set("Content-Length", contentLength);
    }

    if (contentRange) {
      responseHeaders.set("Content-Range", contentRange);
    }

    if (acceptRanges) {
      responseHeaders.set("Accept-Ranges", acceptRanges);
    }

    return new NextResponse(result.stream, {
      status: range ? 206 : 200,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error("Private media read error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Media read failed" },
      { status: 500 }
    );
  }
}
