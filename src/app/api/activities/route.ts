import { NextRequest, NextResponse } from "next/server";
import { writeFile, readFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const ACTIVITIES_FILE = path.join(DATA_DIR, "activities.json");
const COMMENTS_FILE = path.join(DATA_DIR, "comments.json");

// Initialiser les fichiers si nécessaire
async function ensureDataFiles() {
  if (!existsSync(DATA_DIR)) {
    await mkdir(DATA_DIR, { recursive: true });
  }
  
  if (!existsSync(ACTIVITIES_FILE)) {
    await writeFile(ACTIVITIES_FILE, JSON.stringify([]), "utf-8");
  }
  
  if (!existsSync(COMMENTS_FILE)) {
    await writeFile(COMMENTS_FILE, JSON.stringify([]), "utf-8");
  }
}

// GET - Récupérer toutes les activités
export async function GET() {
  try {
    await ensureDataFiles();
    const data = await readFile(ACTIVITIES_FILE, "utf-8");
    const activities = JSON.parse(data);
    return NextResponse.json(activities);
  } catch (error) {
    console.error("Error reading activities:", error);
    return NextResponse.json({ error: "Failed to read activities" }, { status: 500 });
  }
}

// POST - Créer une nouvelle activité
export async function POST(request: NextRequest) {
  try {
    await ensureDataFiles();
    const formData = await request.formData();
    
    const title = formData.get("title") as string;
    const shortDescription = formData.get("shortDescription") as string;
    const fullDescription = formData.get("fullDescription") as string;
    const date = formData.get("date") as string;
    const category = formData.get("category") as string;
    const location = formData.get("location") as string;
    const images = formData.getAll("images") as File[];
    const videos = formData.getAll("videos") as File[];

    // Créer l'ID unique
    const id = `act${Date.now()}`;
    
    // Sauvegarder les images
    const imageUrls: string[] = [];
    const imageUploadDir = path.join(process.cwd(), "public", "assets", "actions", id, "img");
    
    if (images.length > 0 && !existsSync(imageUploadDir)) {
      await mkdir(imageUploadDir, { recursive: true });
    }

    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      if (image && image.size > 0) {
        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const filename = `${Date.now()}-${i}-${image.name}`;
        const filepath = path.join(imageUploadDir, filename);
        await writeFile(filepath, buffer);
        imageUrls.push(`/assets/actions/${id}/img/${filename}`);
      }
    }

    // Sauvegarder les vidéos
    const videoUrls: string[] = [];
    const videoUploadDir = path.join(process.cwd(), "public", "assets", "actions", id, "video");
    
    if (videos.length > 0 && !existsSync(videoUploadDir)) {
      await mkdir(videoUploadDir, { recursive: true });
    }

    for (let i = 0; i < videos.length; i++) {
      const video = videos[i];
      if (video && video.size > 0) {
        const bytes = await video.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const filename = `${Date.now()}-${i}-${video.name}`;
        const filepath = path.join(videoUploadDir, filename);
        await writeFile(filepath, buffer);
        videoUrls.push(`/assets/actions/${id}/video/${filename}`);
      }
    }

    // Lire les activités existantes
    const existingData = await readFile(ACTIVITIES_FILE, "utf-8");
    const activities = JSON.parse(existingData);

    // Créer la nouvelle activité
    const { parseFrenchDate } = await import("@/utils/dateParser");
    const newActivity = {
      id,
      title,
      shortDescription,
      fullDescription,
      date,
      dateTimestamp: parseFrenchDate(date),
      images: imageUrls,
      videos: videoUrls.length > 0 ? videoUrls : undefined,
      category: category || undefined,
      location: location || undefined,
      createdAt: new Date().toISOString(),
    };

    activities.push(newActivity);

    // Sauvegarder
    await writeFile(ACTIVITIES_FILE, JSON.stringify(activities, null, 2), "utf-8");

    return NextResponse.json({ success: true, activity: newActivity });
  } catch (error) {
    console.error("Error creating activity:", error);
    return NextResponse.json({ error: "Failed to create activity" }, { status: 500 });
  }
}

