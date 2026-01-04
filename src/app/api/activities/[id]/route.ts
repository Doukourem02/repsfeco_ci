import { NextRequest, NextResponse } from "next/server";
import { writeFile, readFile, mkdir, unlink } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { cookies } from "next/headers";

const DATA_DIR = path.join(process.cwd(), "data");
const ACTIVITIES_FILE = path.join(DATA_DIR, "activities.json");

// Initialiser les fichiers si nécessaire
async function ensureDataFiles() {
  if (!existsSync(DATA_DIR)) {
    await mkdir(DATA_DIR, { recursive: true });
  }
  
  if (!existsSync(ACTIVITIES_FILE)) {
    await writeFile(ACTIVITIES_FILE, JSON.stringify([]), "utf-8");
  }
}

// PUT - Modifier une activité
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Vérifier l'authentification
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");
    
    if (!session) {
      return NextResponse.json(
        { error: "Non autorisé. Veuillez vous connecter." },
        { status: 401 }
      );
    }

    await ensureDataFiles();
    const formData = await request.formData();
    
    const resolvedParams = await params;
    const id = decodeURIComponent(resolvedParams.id);
    console.log("Updating activity with ID:", id);
    
    const title = formData.get("title") as string;
    const shortDescription = formData.get("shortDescription") as string;
    const fullDescription = formData.get("fullDescription") as string;
    const date = formData.get("date") as string;
    const category = formData.get("category") as string;
    const location = formData.get("location") as string;
    const images = formData.getAll("images") as File[];
    const videos = formData.getAll("videos") as File[];
    const existingImages = formData.get("existingImages") as string;
    const existingVideos = formData.get("existingVideos") as string;

    // Lire les activités existantes
    const existingData = await readFile(ACTIVITIES_FILE, "utf-8");
    const activities = JSON.parse(existingData);
    
    console.log("Total activities in file:", activities.length);
    console.log("Looking for ID:", id);
    console.log("Available IDs:", activities.map((a: any) => a.id));

    // Trouver l'activité à modifier
    const activityIndex = activities.findIndex((a: any) => a.id === id);
    if (activityIndex === -1) {
      console.error(`Activity not found: ${id}. Available IDs:`, activities.map((a: any) => a.id));
      return NextResponse.json(
        { error: `Activité non trouvée. ID recherché: ${id}. Vérifiez que l'activité a bien été créée via le formulaire.` },
        { status: 404 }
      );
    }

    const existingActivity = activities[activityIndex];
    let imageUrls: string[] = existingImages ? JSON.parse(existingImages) : existingActivity.images || [];
    let videoUrls: string[] = existingVideos ? JSON.parse(existingVideos) : existingActivity.videos || [];

    // Gérer les nouvelles images
    if (images.length > 0) {
      const imageUploadDir = path.join(process.cwd(), "public", "assets", "actions", id, "img");
      if (!existsSync(imageUploadDir)) {
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
    }

    // Gérer les nouvelles vidéos
    if (videos.length > 0) {
      const videoUploadDir = path.join(process.cwd(), "public", "assets", "actions", id, "video");
      if (!existsSync(videoUploadDir)) {
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
    }

    // Mettre à jour l'activité
    const { parseFrenchDate } = await import("@/utils/dateParser");
    const updatedActivity = {
      ...existingActivity,
      title,
      shortDescription,
      fullDescription,
      date,
      dateTimestamp: parseFrenchDate(date),
      images: imageUrls,
      videos: videoUrls.length > 0 ? videoUrls : undefined,
      category: category || undefined,
      location: location || undefined,
      updatedAt: new Date().toISOString(),
    };

    activities[activityIndex] = updatedActivity;

    // Sauvegarder
    await writeFile(ACTIVITIES_FILE, JSON.stringify(activities, null, 2), "utf-8");

    return NextResponse.json({ success: true, activity: updatedActivity });
  } catch (error) {
    console.error("Error updating activity:", error);
    return NextResponse.json(
      { error: "Failed to update activity" },
      { status: 500 }
    );
  }
}

// DELETE - Supprimer une activité
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Vérifier l'authentification
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");
    
    if (!session) {
      return NextResponse.json(
        { error: "Non autorisé. Veuillez vous connecter." },
        { status: 401 }
      );
    }

    await ensureDataFiles();
    const resolvedParams = await params;
    const id = decodeURIComponent(resolvedParams.id);
    console.log("Deleting activity with ID:", id);

    // Lire les activités existantes
    const existingData = await readFile(ACTIVITIES_FILE, "utf-8");
    const activities = JSON.parse(existingData);

    // Trouver l'activité à supprimer
    const activityIndex = activities.findIndex((a: any) => a.id === id);
    if (activityIndex === -1) {
      return NextResponse.json(
        { error: "Activité non trouvée" },
        { status: 404 }
      );
    }

    // Supprimer les fichiers associés
    const activityDir = path.join(process.cwd(), "public", "assets", "actions", id);
    if (existsSync(activityDir)) {
      // Supprimer récursivement le dossier
      const { rm } = await import("fs/promises");
      await rm(activityDir, { recursive: true, force: true });
    }

    // Supprimer l'activité de la liste
    activities.splice(activityIndex, 1);

    // Sauvegarder
    await writeFile(ACTIVITIES_FILE, JSON.stringify(activities, null, 2), "utf-8");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting activity:", error);
    return NextResponse.json(
      { error: "Failed to delete activity" },
      { status: 500 }
    );
  }
}

