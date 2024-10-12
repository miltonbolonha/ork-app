import "./globals.css";
import NavBar from "@/components/NavBar";
import { Providers } from "@/context/Providers";
export const metadata = {
  title: "Sistema OKR",
  description: "Aplicativo de gerenciamento de OKRs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        <Providers>
          <NavBar />
          <main className="container mx-auto p-4">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
