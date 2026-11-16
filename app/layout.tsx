import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VNR IA Solutions - Resuelve Cualquier Problema con IA",
  description: "Describe tu problema y obtén una solución personalizada creada por un agente IA especializado. Gratis para empezar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
