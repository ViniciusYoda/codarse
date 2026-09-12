import type { Metadata } from "next";
import { Nunito } from "next/font/google";

import "./globals.css";


const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CodarSe - Os melhores cursos de programação gratuitos",
  description: "Os melhores cursos de programação gratuitos com a melhor experiência de aprendizado e foco",
};

type RootLayoutProps = Readonly<{ children: React.ReactNode }>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR">
      <body className={nunito.className}>
        {children}
      </body>
    </html>
  );
}
