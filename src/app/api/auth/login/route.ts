import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// Le mot de passe devrait être dans les variables d'environnement
// Pour l'instant, on utilise une valeur par défaut (à changer en production)
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "REPSFECO2024";

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (!password) {
      return NextResponse.json(
        { success: false, error: "Mot de passe requis" },
        { status: 400 }
      );
    }

    if (password === ADMIN_PASSWORD) {
      // Créer un token de session simple
      const sessionToken = Buffer.from(
        `${Date.now()}-${Math.random()}`
      ).toString("base64");

      // Définir le cookie de session
      const cookieStore = await cookies();
      cookieStore.set("admin_session", sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 jours
        path: "/",
      });

      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { success: false, error: "Mot de passe incorrect" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, error: "Erreur lors de la connexion" },
      { status: 500 }
    );
  }
}

