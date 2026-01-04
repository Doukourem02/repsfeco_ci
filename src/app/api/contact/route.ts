import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Vérifier que la clé API est configurée
if (!process.env.RESEND_API_KEY) {
  console.warn(
    "⚠️ RESEND_API_KEY n'est pas configurée. Les emails ne pourront pas être envoyés."
  );
}

export async function POST(request: NextRequest) {
  try {
    // Vérifier que la clé API est configurée
    if (!process.env.RESEND_API_KEY) {
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

    // Fonction pour échapper le HTML (sécurité XSS)
    const escapeHtml = (text: string) => {
      const map: Record<string, string> = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      };
      return text.replace(/[&<>"']/g, (m) => map[m]);
    };

    // Échapper les valeurs pour éviter les injections XSS
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message);

    // Expéditeur configurable (par défaut: onboarding@resend.dev pour les tests)
    const fromEmail =
      process.env.RESEND_FROM_EMAIL ||
      "Contact REPSFECO-CI <onboarding@resend.dev>";

    // Envoyer l'email à repsfecoci@yahoo.fr
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: ["repsfecoci@yahoo.fr"],
      replyTo: email,
      subject: `Nouveau message de contact de ${safeName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #8B0000; border-bottom: 2px solid #8B0000; padding-bottom: 10px;">
            Nouveau message de contact
          </h2>
          
          <div style="margin-top: 20px;">
            <p><strong>Nom:</strong> ${safeName}</p>
            <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
          </div>
          
          <div style="margin-top: 30px; padding: 20px; background-color: #f5f5f5; border-radius: 5px;">
            <h3 style="color: #333; margin-top: 0;">Message:</h3>
            <p style="white-space: pre-wrap; color: #555; line-height: 1.6;">${safeMessage}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #777; font-size: 12px;">
            <p>Ce message a été envoyé depuis le formulaire de contact du site REPSFECO-CI.</p>
          </div>
        </div>
      `,
      text: `
Nouveau message de contact

Nom: ${name}
Email: ${email}

Message:
${message}

---
Ce message a été envoyé depuis le formulaire de contact du site REPSFECO-CI.
      `,
    });

    if (error) {
      console.error("Erreur Resend:", error);
      return NextResponse.json(
        { error: "Erreur lors de l'envoi de l'email" },
        { status: 500 }
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

