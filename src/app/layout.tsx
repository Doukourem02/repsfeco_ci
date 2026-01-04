import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata: Metadata = {
  title: "REPSFECO-CI – Paix & Sécurité pour les Femmes en Côte d'Ivoire",
  description:
    "REPSFECO-CI sert d'organe de coordination des initiatives des organisations de la société civile Ivoirienne dans le cadre du Plan d'Action de la CEDEAO pour la mise en œuvre des résolutions 1325/2000 et suivantes du Conseil de Sécurité des Nations Unies.",
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
      "REPSFECO-CI sert d'organe de coordination des initiatives des organisations de la société civile Ivoirienne dans le cadre du Plan d'Action de la CEDEAO pour la mise en œuvre des résolutions 1325/2000 et suivantes du Conseil de Sécurité des Nations Unies.",
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
