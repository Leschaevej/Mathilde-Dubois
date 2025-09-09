import type { Metadata } from "next";
import { ephesis, satisfy, montserrat } from './font'
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Preloader from "./components/preloader/Preloader";
import "./globals.scss";

export const metadataBase = new URL("https://mathildedubois.fr/");
export const metadata: Metadata = {
    title: "Mathilde Dubois - Dessinatrice Projeteuse | Conception & Design Architectural",
    description: "Mathilde Dubois, dessinatrice projeteuse experte en conception architecturale. Services de design, plans techniques et accompagnement de projets dans le Var (83). Contactez-moi pour concrétiser vos projets.",
    keywords: "Les perspectives de Mathilde, perspectives de Mathilde, dessinatrice projeteuse, conception architecturale, plans techniques, design, architecture, Var, Saint-Aygulf, Fréjus, Mathilde Dubois",
    authors: [{ name: "Mathilde Dubois" }],
    creator: "Mathilde Dubois",
    publisher: "Mathilde Dubois",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    alternates: {
        canonical: '/',
    },
    openGraph: {
        title: "Mathilde Dubois - Dessinatrice Projeteuse",
        description: "Dessinatrice projeteuse experte en conception architecturale dans le Var. Concrétisez vos projets avec une professionnelle expérimentée.",
        url: 'https://mathildedubois.fr',
        siteName: 'Mathilde Dubois',
        images: [{
            url: "https://mathildedubois.fr/social.png",
            width: 1200,
            height: 630,
            alt: "Mathilde Dubois - Dessinatrice Projeteuse",
        }],
        locale: 'fr_FR',
        type: 'website',
    },
    twitter: {
        card: "summary_large_image",
        title: "Mathilde Dubois - Dessinatrice Projeteuse",
        description: "Dessinatrice projeteuse experte en conception architecturale dans le Var.",
        images: ["https://mathildedubois.fr/social.png"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
        },
    },
    verification: {
        google: 'YOUR_GOOGLE_VERIFICATION_CODE',
    },
};
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr">
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ProfessionalService",
                        "name": "Mathilde Dubois - Dessinatrice Projeteuse",
                        "description": "Services de dessin technique et conception architecturale dans le Var.",
                        "url": "https://mathildedubois.fr",
                        "telephone": "06 18 35 14 83",
                        "email": "contact@mathildedubois.fr",
                        "address": {
                            "@type": "PostalAddress",
                            "addressLocality": "Saint-Aygulf",
                            "postalCode": "83370",
                            "addressRegion": "Var",
                            "addressCountry": "FR"
                        },
                        "geo": {
                            "@type": "GeoCoordinates",
                            "latitude": 43.381,
                            "longitude": 6.721
                        },
                        "serviceArea": {
                            "@type": "State",
                            "name": "Var"
                        }
                    })
                }}
            />
        </head>
        <body className={`${montserrat.variable} ${ephesis.variable} ${satisfy.variable}`}>
            <Preloader>
                <Header />
                {children}
                <Footer />
            </Preloader>
        </body>
        </html>
    )
}