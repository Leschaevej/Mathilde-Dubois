import Image from 'next/image'
import "./page.scss";
import Contact from './components/contact/Contact';
import projectsData from './data/projects.json';
import { lazy, Suspense } from 'react';

const Carousel = lazy(() => import('./components/carousel/Carousel'));
const Map = lazy(() => import('./components/map/Map'));

import fondImage from '../public/fond.webp';

export default function Home() {
    return (
        <>
            <section className="hero">
                <Image
                    src={fondImage}
                    alt=""
                    fill
                    priority
                    fetchPriority="high"
                    placeholder="blur"
                    sizes="100vw"
                    className="hero-bg"
                />
                <div className="content">
                    <h2>
                        <span className="main">Mathilde Dubois</span><br/>
                        <span className="sub">Dessinatrice<br/>en bâtiment</span>
                    </h2>
                </div>
            </section>
            <section className="role">
                <div className="content">
                    <h2>
                        <span className="main">Mon rôle dans vos</span><br/>
                        <span className="sub">projets</span>
                    </h2>
                    <div className="grid">
                        <div className="card">
                            <h3>Qu&apos;est ce qu&apos;un<br/>dessinateur en bâtiment ?</h3>
                            <p>Il réalise les <strong>plans</strong> techniques et les <strong>documents</strong> administratifs</p>
                            <p>Il vous guide dans la partie technique de votre projet, en respectant les règles d’urbanisme en vigueur</p>
                            <p>II peut aussi proposer des <strong>modélisations 3D réalistes</strong> pour vous aider à visualiser votre projet</p>
                            <p><strong>Objectifs</strong> : traduire vos idées en plans concrets, conformes et prêts à être déposés en mairie</p>
                        </div>
                        <div className="card">
                            <h3>Quand faire appel<br/>à un dessinateur ?</h3>
                            <p>Pour un <strong>permis de construire</strong> (moins de 150m2)</p>
                            <p>Pour une <strong>déclaration préalable de travaux</strong> (piscine, clôture, extension)</p>
                            <p>Pour des <strong>plans clairs et conformes</strong> au PLU</p>
                            <p>Pour une <strong>modélisation 3D</strong> et une meilleure visualisation</p>
                            <p>Pour un <strong>accompagnement simple et fiable</strong>, sans passer par un architecte</p>
                        </div>
                        <div className="card">
                            <h3>A qui s&apos;adresse<br/>mes services ?</h3>
                            <p>Mes services s&apos;adressent aux <strong>particuliers</strong>, <strong>artisans</strong>, <strong>professionnels</strong> de l&apos;immobilier, <strong>architectes</strong> et <strong>collectivités</strong> pour la réalisation de plans et dossiers conformes, facilitant toutes leurs démarches administratives</p>
                        </div>
                    </div>
                </div>
            </section>
            <div className='tagline'>
                <p className='quote'>&ldquo;À vos côtés pour donner vie à vos projets, avec clarté, bienveillance et efficacité.&rdquo;</p>
            </div>
            <section id="services" className="services">
                <div className="content">
                    <h2>
                        <span className="main">Mes</span><br/>
                        <span className="sub">services</span>
                    </h2>
                    <div className="grid">
                        <div className="card">
                            <Image src="/new.webp" alt="Construction, Rénovation & Extention" width={386} height={217} />
                            <div className='text'>
                                <div className='main'>
                                    <h3>Construction, Rénovation & Extention</h3>
                                </div>
                                <div className='sub'>
                                    <p>Je m&apos;occupe de l&apos;intégralité de vos formalités administratives : dépôt de permis de construire ou déclarations préalables de travaux</p>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <Image src="/rebuild.webp" alt="Décoration, Rénovation intérieure" width={386} height={217} />
                            <div className='text'>
                                <div className='main'>
                                    <h3>Décoration, Rénovation intérieure</h3>
                                </div>
                                <div className='sub'>
                                    <p>Je vous aide à transformer vos espaces de vie, à redonner de l’harmonie et à créer un intérieur qui vous ressemble, alliant confort, fonctionnalité et esthétique</p>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <Image src="/plan.webp" alt="Plans & visuels 3D" width={386} height={217} />
                            <div className='text'>
                                <div className='main'>
                                    <h3>Plans & visuels 3D</h3>
                                </div>
                                <div className='sub'>
                                    <p>Des plans précis et des visuels 3D réalistes pour vous aider à comprendre, imaginer et valider votre projet avant sa réalisation</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className='quote'>&ldquo;J&apos;accompagne particuliers et professionnels de l&apos;immobilier, du premier croquis<br/>jusqu&apos;au dépôt administratif.<br/>Installée à Saint-Aygulf, j&apos;interviens dans toute la région Var et peux répondre à vos demandes à distance. &rdquo;</p>
                </div>
            </section>
            <section id="portfolio" className="portfolio">
                <div className="content">
                    <h2>
                        <span className="main">Mes</span><br/>
                        <span className="sub">réalisations</span>
                    </h2>
                    <Suspense fallback={<div className="carousel loading">Chargement...</div>}>
                        <Carousel projects={projectsData} />
                    </Suspense>
                </div>
            </section>
            <section id="about" className="about">
                <div className="content">
                    <div className='left'>
                        <h2>
                            <span className="main">Qui</span><br/>
                            <span className="sub">suis-je</span>
                        </h2>
                        <div className='box'>
                            <p>Mathilde Dubois, dessinatrice projeteuse indépendante, passionnée par la conception et la mise en valeur de projets architecturaux, petits ou grands.</p>
                            <p>Je me déplace facilement pour venir à votre rencontre, comprendre vos besoins et vous accompagner. Particuliers ou professionnels de l&apos;immobilier (promoteurs, constructeurs, agences, notaires… ) : chaque projet bénéficie du même engagement.</p>
                            <p>&ldquo;Mon objectif : transformer vos idées en dossiers clairs, complets et conformes, que ce soit pour une déclaration préalable, un permis de construire, ou pour créer des supports visuels comme des plans 3D ou des affiches de vente.&rdquo;</p>
                        </div>
                    </div>
                    <div className='right'>
                        <Image src="/portrait.webp" alt="Portrait" width={520} height={373} />
                        <p className='quote'>&ldquo;Qu&apos; il s&apos;agisse d&apos; une piscine, d&apos;une extension, d&apos;une maison neuve ou d&apos;un lotissement je m&apos; adapte à chaque projet avec rigueur, écoute et réactivité.&rdquo;</p>
                    </div>
                </div>
            </section>
            <section id="contact" className="contact">
                <div className="content">
                    <div className="left">
                        <h2>
                            <span className="main">Mon</span><br/>
                            <span className="sub">contact</span>
                        </h2>
                        <p>Un projet en tête ?</p>
                        <p>Parlons-en autour d&apos;un plan, d&apos;un café ou même par visio.<br/>Je suis là pour vous simplifier les démarches et donner forme à vos idées, avec sérieux, douceur et bonne humeur.</p>
                        <Suspense fallback={<div className="wrapper loading">Chargement de la carte...</div>}>
                            <Map />
                        </Suspense>
                    </div>
                    <div className='right'>
                        <Contact />
                        <div className="info">
                            <div className="item">
                                <div className="circle">
                                    <span className="icons">location_on</span>
                                </div>
                                <p>Saint-Aygulf</p>
                            </div>
                            <div className="item">
                                <div className="circle">
                                    <span className="icons">email</span>
                                </div>
                                <p>contact@mathildedubois.fr</p>
                            </div>
                            <div className="item">
                                <div className="circle">
                                    <span className="icons">phone</span>
                                </div>
                                <p>06 18 35 14 83</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}