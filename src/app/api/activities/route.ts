import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { readActivities, toActivitySummary, writeActivities } from "@/lib/activityStore";

// GET - Récupérer toutes les activités
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const includeFull = searchParams.get("full") === "1";
    const activities = await readActivities();
    return NextResponse.json(includeFull ? activities : activities.map(toActivitySummary));
  } catch (error) {
    console.error("Error reading activities:", error);
    return NextResponse.json({ error: "Failed to read activities" }, { status: 500 });
  }
}

// POST - Créer une nouvelle activité
export async function POST(request: NextRequest) {
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

    const body = await request.json();
    const title = body.title as string;
    const shortDescription = body.shortDescription as string;
    const fullDescription = body.fullDescription as string;
    const date = body.date as string;
    const category = body.category as string;
    const location = body.location as string;
    const imageUrls = Array.isArray(body.images) ? body.images.filter(Boolean) : [];
    const videoUrls = Array.isArray(body.videos) ? body.videos.filter(Boolean) : [];
    const id = typeof body.id === "string" && body.id ? body.id : `act${Date.now()}`;

    const activities = await readActivities();

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
    await writeActivities(activities);

    return NextResponse.json({ success: true, activity: newActivity });
  } catch (error) {
    console.error("Error creating activity:", error);
    return NextResponse.json({ error: "Failed to create activity" }, { status: 500 });
  }
}
