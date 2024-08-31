import 'bootstrap/dist/css/bootstrap.css'
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Nav from "./components/Nav";
import BootstrapClient from "@/app/components/bootstrap"
import "./globals.css";

const font = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Crypto calc",
  description: "Crypto calculator online - next app",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={font.className} data-bs-theme="dark">
        <header>
          <Nav />
        </header>
        {children}
        <BootstrapClient />
      </body>
    </html>
  );
}

export default RootLayout
