import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { ephesis, satisfy, montserrat } from './font'
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Preloader from "./components/preloader/Preloader";
import Cookies from "./components/cookies/Cookies";
import "./globals.scss";

export const metadataBase = new URL("https://mathildedubois.fr/");
export const metadata: Metadata = {
    title: "Mathilde Dubois - Dessinatrice Projeteuse | Conception & Design Architectural",
    description: "Mathilde Dubois, dessinatrice projeteuse experte en conception architecturale. Services de design, plans techniques et accompagnement de projets dans le Var (83). Contactez-moi pour concrétiser vos projets.",
    keywords: "Les perspectives de Mathilde, perspectives de Mathilde, dessinatrice projeteuse, conception architecturale, plans techniques, design, architecture, Var, Saint-Aygulf, Fréjus, Mathilde Dubois, dessinateur bâtiment, dessinateur bâtiment indépendant, dessinateur bâtiment freelance, permis de construire sans architecte, déclaration préalable travaux, plans maison individuelle, plan extension maison, plan rénovation maison, permis piscine, PCMI, plan garage, plan carport, plan abri jardin, plan abri voiture, plan lotissement, plan bâtiment agricole, aide dépôt permis de construire, constitution dossier mairie travaux, dessinateur bâtiment particulier, dessinateur bâtiment investisseur, dessinateur bâtiment promoteur, plan aménagement intérieur, maison neuve sans architecte, déclaration travaux terrasse",
    authors: [{ name: "Mathilde Dubois" }],
    creator: "Skybound Studio",
    publisher: "Skybound Studio",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    alternates: {
        canonical: 'https://mathildedubois.fr/',
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
            <meta name="theme-color" content="#FFFBF5" />
            <link rel="icon" href="/favicon.ico" sizes="any" />
            <link rel="apple-touch-icon" href="/apple.png" />
            <link rel="manifest" href="/site.webmanifest" />
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
            <script src="https://cdn.jsdelivr.net/npm/css-vars-ponyfill@2" async></script>
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
            <script dangerouslySetInnerHTML={{
                __html: `cssVars();`
            }} />
        </head>
        <body className={`${montserrat.variable} ${ephesis.variable} ${satisfy.variable}`}>
            <Preloader>
                <Header />
                {children}
                <Footer />
            </Preloader>
            <Cookies />
            <Analytics />
            <SpeedInsights />
        </body>
        </html>
    )
}