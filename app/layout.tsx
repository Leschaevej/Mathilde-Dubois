import type { Metadata } from "next";
import { ephesis, satisfy, montserrat } from './font'
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Preloader from "./components/preloader/Preloader";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Mathilde Dubois",
  description: "Mathilde Dubois Dessinatrice projeteuse",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet" />
      </head>
      <body className={`${montserrat.variable} ${ephesis.variable} ${satisfy.variable}`}>
        <Preloader />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}