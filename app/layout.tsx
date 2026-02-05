import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { ephesis, satisfy, montserrat } from './font'
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Preloader from "./components/preloader/Preloader";
import Cookies from "./components/cookies/Cookies";
import Animations from "./Animations";
import "./globals.scss";

interface BusinessInfo {
    name: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    phone: string;
    email: string;
}

interface SiteConfig {
    url: string;
    name: string;
    title: string;
    description: string;
}

const SITE_CONFIG: SiteConfig = {
    url: 'https://mathildedubois.fr',
    name: 'Mathilde Dubois',
    title: 'Mathilde Dubois - Dessinatrice Projeteuse | Conception & Design Architectural',
    description: 'Mathilde Dubois, dessinatrice projeteuse experte en conception architecturale. Services de design, plans techniques et accompagnement de projets dans le Var (83). Contactez-moi pour concrétiser vos projets.',
};

const BUSINESS_INFO: BusinessInfo = {
    name: SITE_CONFIG.name,
    address: 'Saint-Aygulf',
    city: 'Fréjus',
    postalCode: '83370',
    country: 'FR',
    phone: '06 18 35 14 83',
    email: 'contact@mathildedubois.fr',
};

export const metadataBase = new URL(SITE_CONFIG.url);
export const metadata: Metadata = {
    title: {
        default: SITE_CONFIG.title,
        template: `%s | ${SITE_CONFIG.name}`,
    },
    description: SITE_CONFIG.description,
    keywords: [
        'Les perspectives de Mathilde',
        'perspectives de Mathilde',
        'dessinatrice projeteuse',
        'conception architecturale',
        'plans techniques',
        'design architectural',
        'Var',
        'Saint-Aygulf',
        'Fréjus',
        'Mathilde Dubois',
        'dessinateur bâtiment',
        'dessinateur bâtiment indépendant',
        'dessinateur bâtiment freelance',
        'permis de construire sans architecte',
        'déclaration préalable travaux',
        'plans maison individuelle',
        'plan extension maison',
        'plan rénovation maison',
        'permis piscine',
        'PCMI',
        'plan garage',
        'plan carport',
        'plan abri jardin',
        'plan abri voiture',
        'plan lotissement',
        'plan bâtiment agricole',
        'aide dépôt permis de construire',
        'constitution dossier mairie travaux',
        'dessinateur bâtiment particulier',
        'dessinateur bâtiment investisseur',
        'dessinateur bâtiment promoteur',
        'plan aménagement intérieur',
        'maison neuve sans architecte',
        'déclaration travaux terrasse'
    ],
    authors: [{ name: SITE_CONFIG.name, url: SITE_CONFIG.url }],
    creator: "Skybound Studio",
    publisher: "Skybound Studio",
    robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    openGraph: {
        type: 'website',
        locale: 'fr_FR',
        url: SITE_CONFIG.url,
        siteName: SITE_CONFIG.name,
        title: SITE_CONFIG.title,
        description: SITE_CONFIG.description,
        images: [{
            url: `${SITE_CONFIG.url}/social.png`,
            width: 1200,
            height: 630,
            alt: SITE_CONFIG.name,
        }],
    },
    twitter: {
        card: "summary_large_image",
        title: SITE_CONFIG.title,
        description: SITE_CONFIG.description,
        images: [`${SITE_CONFIG.url}/social.png`],
    },
    alternates: {
        canonical: SITE_CONFIG.url,
        languages: { 'fr-FR': SITE_CONFIG.url },
    },
};

export const viewport = {
    width: 'device-width',
    initialScale: 1,
};

const businessSchema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ProfessionalService'],
    '@id': `${SITE_CONFIG.url}#business`,
    name: BUSINESS_INFO.name,
    image: `${SITE_CONFIG.url}/social.png`,
    description: SITE_CONFIG.description,
    address: {
        '@type': 'PostalAddress',
        addressLocality: BUSINESS_INFO.city,
        postalCode: BUSINESS_INFO.postalCode,
        addressRegion: 'Var',
        addressCountry: BUSINESS_INFO.country,
    },
    geo: {
        '@type': 'GeoCoordinates',
        latitude: 43.381,
        longitude: 6.721,
    },
    telephone: BUSINESS_INFO.phone,
    email: BUSINESS_INFO.email,
    url: SITE_CONFIG.url,
    serviceArea: {
        '@type': 'GeoCircle',
        geoMidpoint: {
            '@type': 'GeoCoordinates',
            latitude: 43.381,
            longitude: 6.721,
        },
        geoRadius: '50000',
    },
    priceRange: '€€',
    openingHours: ['Mo-Fr 09:00-18:00'],
    hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Services de dessin technique et conception architecturale',
        itemListElement: [
            {
                '@type': 'Offer',
                itemOffered: {
                    '@type': 'Service',
                    name: 'Plans de construction',
                    description: 'Création de plans techniques pour construction neuve',
                },
            },
            {
                '@type': 'Offer',
                itemOffered: {
                    '@type': 'Service',
                    name: 'Plans de rénovation',
                    description: 'Plans pour rénovation et extension de bâtiments existants',
                },
            },
            {
                '@type': 'Offer',
                itemOffered: {
                    '@type': 'Service',
                    name: 'Visualisation 3D',
                    description: 'Modélisation 3D et perspectives de projets architecturaux',
                },
            },
        ],
    },
};

const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_CONFIG.url}#website`,
    url: SITE_CONFIG.url,
    name: BUSINESS_INFO.name,
    description: SITE_CONFIG.description,
    publisher: {
        '@type': 'Person',
        name: BUSINESS_INFO.name,
    },
};

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITE_CONFIG.url}#faq`,
    mainEntity: [
        {
            '@type': 'Question',
            name: 'Quels services propose Mathilde Dubois ?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Mathilde Dubois propose des services de dessin technique et conception architecturale : plans de construction, rénovation, extensions, visualisation 3D et accompagnement pour les démarches administratives.',
            },
        },
        {
            '@type': 'Question',
            name: 'Dans quelle zone géographique intervenez-vous ?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Basée à Saint-Aygulf dans le Var (83), j\'interviens principalement dans le Var et les Alpes-Maritimes, mais je peux également travailler à distance pour des projets partout en France.',
            },
        },
    ],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr">
        <head>
            <meta name="theme-color" content="#FFFBF5" />
            <meta name="format-detection" content="telephone=no" />
            <meta name="geo.region" content="FR-83" />
            <meta name="geo.placename" content="Saint-Aygulf" />
            <meta name="geo.position" content="43.381;6.721" />
            <link rel="icon" href="/favicon.ico" sizes="any" />
            <link rel="apple-touch-icon" href="/apple.png" />
            <link rel="manifest" href="/site.webmanifest" />
            <link rel="dns-prefetch" href="https://vercel.live" />
            <link rel="dns-prefetch" href="https://vitals.vercel-analytics.com" />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        </head>
        <body className={`${montserrat.variable} ${ephesis.variable} ${satisfy.variable}`}>
            <Preloader />
            <Header />
            {children}
            <Footer />
            <Cookies />
            <Animations />
            <Analytics />
            <SpeedInsights />
        </body>
        </html>
    )
}