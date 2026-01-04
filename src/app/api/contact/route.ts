import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Vérifier que les clés EmailJS sont configurées
    // Note: Pour les appels serveur, on utilise la Private Key, pas la Public Key
    if (
      !process.env.EMAILJS_SERVICE_ID ||
      !process.env.EMAILJS_TEMPLATE_ID ||
      !process.env.EMAILJS_PRIVATE_KEY
    ) {
      console.warn(
        "⚠️ EmailJS n'est pas configuré. Les emails ne pourront pas être envoyés."
      );
      return NextResponse.json(
        {
          error:
            "Service d'email non configuré. Veuillez contacter l'administrateur.",
        },
        { status: 503 }
      );
    }

    const body = await request.json();
    const { name, email, message } = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Tous les champs sont requis" },
        { status: 400 }
      );
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Adresse email invalide" },
        { status: 400 }
      );
    }

    // Préparer les paramètres pour EmailJS
    const now = new Date();
    const time = now.toLocaleString("fr-FR", {
      dateStyle: "long",
      timeStyle: "short",
    });

    const templateParams = {
      from_name: name,
      from_email: email,
      to_email: "repsfecoci@yahoo.fr",
      message: message,
      reply_to: email,
      time: time,
    };

    // Envoyer l'email via EmailJS API
    // Pour les appels serveur, on utilise la Private Key comme accessToken
    const requestBody = {
      service_id: process.env.EMAILJS_SERVICE_ID,
      template_id: process.env.EMAILJS_TEMPLATE_ID,
      user_id: process.env.EMAILJS_PRIVATE_KEY, // Private Key utilisée comme user_id
      template_params: templateParams,
    };

    console.log("Envoi EmailJS avec:", {
      service_id: process.env.EMAILJS_SERVICE_ID,
      template_id: process.env.EMAILJS_TEMPLATE_ID,
      has_private_key: !!process.env.EMAILJS_PRIVATE_KEY,
    });

    const response = await fetch(
      `https://api.emailjs.com/api/v1.0/email/send`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );

    const responseText = await response.text();
    let errorData;
    
    try {
      errorData = JSON.parse(responseText);
    } catch {
      errorData = { text: responseText };
    }

    if (!response.ok) {
      console.error("Erreur EmailJS:", {
        status: response.status,
        statusText: response.statusText,
        error: errorData,
      });
      
      return NextResponse.json(
        {
          error:
            errorData.text ||
            errorData.message ||
            `Erreur ${response.status}: ${response.statusText}`,
        },
        { status: response.status }
      );
    }

    return NextResponse.json(
      { success: true, message: "Message envoyé avec succès" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur API contact:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Une erreur s'est produite lors de l'envoi du message",
      },
      { status: 500 }
    );
  }
}
