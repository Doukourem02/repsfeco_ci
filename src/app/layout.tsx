import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata: Metadata = {
  title: "REPSFECO-CI – Paix & Sécurité pour les Femmes en Côte d'Ivoire",
  description:
    "Organisation engagée dans la paix, la sécurité, la prévention des conflits et l'autonomisation des femmes en Côte d'Ivoire. REPSFECO-CI œuvre depuis 2010 pour renforcer la participation des femmes dans les processus de paix et de sécurité.",
  keywords: [
    "REPSFECO-CI",
    "Paix et sécurité",
    "Femmes Côte d'Ivoire",
    "Résolution 1325",
    "Autonomisation des femmes",
    "Prévention des conflits",
    "CEDEAO",
    "Gouvernance",
    "Société civile",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
  },
  openGraph: {
    title: "REPSFECO-CI – Paix & Sécurité pour les Femmes en Côte d'Ivoire",
    description:
      "Organisation engagée dans la paix, la sécurité, la prévention des conflits et l'autonomisation des femmes en Côte d'Ivoire.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          storageKey="theme"
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
