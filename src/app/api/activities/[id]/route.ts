import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { del } from "@vercel/blob";
import { readActivities, writeActivities } from "@/lib/activityStore";

function getBlobDeleteTarget(mediaUrl: string) {
  if (mediaUrl.includes("vercel-storage.com")) {
    return mediaUrl;
  }

  try {
    const url = new URL(mediaUrl, "https://repsfeco-ci.vercel.app");
    const pathname = url.searchParams.get("pathname");

    if (url.pathname === "/api/media" && pathname) {
      return pathname;
    }
  } catch {
    return null;
  }

  return null;
}

// GET - Récupérer une activité
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const id = decodeURIComponent(resolvedParams.id);
    const activities = await readActivities();
    const activity = activities.find((a) => a.id === id);

    if (!activity) {
      return NextResponse.json(
        { error: "Activité non trouvée" },
        { status: 404 }
      );
    }

    return NextResponse.json(activity);
  } catch (error) {
    console.error("Error reading activity:", error);
    return NextResponse.json(
      { error: "Failed to read activity" },
      { status: 500 }
    );
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

    const resolvedParams = await params;
    const id = decodeURIComponent(resolvedParams.id);
    console.log("Updating activity with ID:", id);

    const body = await request.json();
    const title = body.title as string;
    const shortDescription = body.shortDescription as string;
    const fullDescription = body.fullDescription as string;
    const date = body.date as string;
    const category = body.category as string;
    const location = body.location as string;
    const imageUrls = Array.isArray(body.images) ? body.images.filter(Boolean) : [];
    const videoUrls = Array.isArray(body.videos) ? body.videos.filter(Boolean) : [];

    // Lire les activités existantes
    const activities = await readActivities();
    
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
    await writeActivities(activities);

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

    const resolvedParams = await params;
    const id = decodeURIComponent(resolvedParams.id);
    console.log("Deleting activity with ID:", id);

    // Lire les activités existantes
    const activities = await readActivities();

    // Trouver l'activité à supprimer
    const activityIndex = activities.findIndex((a: any) => a.id === id);
    if (activityIndex === -1) {
      return NextResponse.json(
        { error: "Activité non trouvée" },
        { status: 404 }
      );
    }

    const activity = activities[activityIndex];
    const mediaUrls = [...(activity.images || []), ...(activity.videos || [])]
      .filter((url) => typeof url === "string")
      .map(getBlobDeleteTarget)
      .filter((url): url is string => Boolean(url));

    if (mediaUrls.length > 0 && process.env.BLOB_READ_WRITE_TOKEN) {
      await del(mediaUrls);
    }

    // Supprimer l'activité de la liste
    activities.splice(activityIndex, 1);

    // Sauvegarder
    await writeActivities(activities);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting activity:", error);
    return NextResponse.json(
      { error: "Failed to delete activity" },
      { status: 500 }
    );
  }
}
