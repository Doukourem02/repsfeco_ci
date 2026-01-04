import { NextRequest, NextResponse } from "next/server";
import { writeFile, readFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const COMMENTS_FILE = path.join(DATA_DIR, "comments.json");

async function ensureDataFiles() {
  if (!existsSync(DATA_DIR)) {
    await mkdir(DATA_DIR, { recursive: true });
  }
  
  if (!existsSync(COMMENTS_FILE)) {
    await writeFile(COMMENTS_FILE, JSON.stringify([]), "utf-8");
  }
}

// GET - Récupérer les commentaires d'une activité
export async function GET(request: NextRequest) {
  try {
    await ensureDataFiles();
    const { searchParams } = new URL(request.url);
    const activityId = searchParams.get("activityId");

    const data = await readFile(COMMENTS_FILE, "utf-8");
    const comments = JSON.parse(data);

    if (activityId) {
      const filteredComments = comments.filter((c: any) => c.activityId === activityId);
      return NextResponse.json(filteredComments);
    }

    return NextResponse.json(comments);
  } catch (error) {
    console.error("Error reading comments:", error);
    return NextResponse.json({ error: "Failed to read comments" }, { status: 500 });
  }
}

// POST - Ajouter un commentaire
export async function POST(request: NextRequest) {
  try {
    await ensureDataFiles();
    const body = await request.json();
    const { activityId, author, content, date } = body;

    if (!activityId || !author || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const data = await readFile(COMMENTS_FILE, "utf-8");
    const comments = JSON.parse(data);

    const { parseFrenchDate } = await import("@/utils/dateParser");
    const newComment = {
      id: `comment-${Date.now()}`,
      activityId,
      author,
      content,
      date,
      dateTimestamp: parseFrenchDate(date),
      createdAt: new Date().toISOString(),
    };

    comments.push(newComment);
    await writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 2), "utf-8");

    return NextResponse.json({ success: true, comment: newComment });
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json({ error: "Failed to create comment" }, { status: 500 });
  }
}

