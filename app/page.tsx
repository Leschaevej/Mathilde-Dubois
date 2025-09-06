import Image from 'next/image'
import "./page.scss";
import Carousel from './components/carousel/Carousel';
import Map from './components/map/Map';
import Contact from './components/contact/Contact';
import projectsData from './data/projects.json';

export default function Home() {
    return (
        <>
            <section className="hero">
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
                        <span className="sub">projet</span>
                    </h2>
                    <div className="grid">
                        <div className="card">
                            <h3>Qu'est ce qu'un<br/>dessinateur en bâtiment ?</h3>
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
                            <h3>A qui s'adresse<br/>mes services ?</h3>
                            <p>Mes services s'adressent aux <strong>particuliers</strong>, <strong>artisans</strong>, <strong>professionnels</strong> de l'immobilier, <strong>architectes</strong> et <strong>collectivités</strong> pour la réalisation de plans et dossiers conformes, facilitant toutes leurs démarches administratives</p>
                        </div>
                    </div>
                </div>
            </section>
            <div className='tagline'>
                <p className='quote'>"À vos côtés pour donner vie à vos projets, avec clarté, bienveillance et efficacité."</p>
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
                                    <p>Je m'occupe de l'intégralité de vos formalités administratives : dépôt de permis de construire ou déclarations préalables de travaux</p>
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
                                    <p>Je vous aide à transformer vos espaces de vie, à redonner de l’harmonie et à créer un intérieur qui vous ressemble, alliant confort, fonctionnalité et esthétique.</p>
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
                    <p className='quote'>"J'accompagne particuliers et professionnels de l'immobilier, du premier croquis<br/>jusqu'au dépôt administratif.<br/>Basée à Saint-Aygulf, j'interviens dans toute la région Var et possibilité à distance. "</p>
                </div>
            </section>
            <section id="portfolio" className="portfolio">
                <div className="content">
                    <h2>
                        <span className="main">Mes</span><br/>
                        <span className="sub">réalisations</span>
                    </h2>
                    <Carousel projects={projectsData} />
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
                            <p>Je suis Mathilde Dubois, dessinatrice projeteuse indépendante, passionnée par la conception et la mise en valeur de projets architecturaux, petits ou grands.</p>
                            <p>Basée à domicile, je me déplace facilement pour venir à votre rencontre, comprendre vos besoins et vous accompagner.</p>
                            <p>Je travaille aussi bien pour des particuliers que pour des professionnels de l’immobilier : promoteurs, constructeurs, agences, notaires…</p>
                            <p>“Mon objectif : transformer vos idées en dossiers clairs, complets et conformes, que ce soit pour une déclaration préalable, un permis de construire, ou pour créer des supports visuels comme des plans 3D ou des affiches de vente.”</p>
                        </div>
                    </div>
                    <div className='right'>
                        <Image src="/portrait.webp" alt="Portrait" width={520} height={373} />
                        <p className='quote'>"Qu' il s'agisse d' une piscine, d’une extension, d’une maison neuve ou d’un lotissement je m' adapte à chaque projet avec rigueur, écoute et réactivité."</p>
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
                        <p>Parlons-en autour d'un plan, d'un café ou même par visio.<br/>Je suis là pour vous simplifier les démarches et donner forme à vos idées, avec sérieux, douceur et bonne humeur.</p>
                        <Map />
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