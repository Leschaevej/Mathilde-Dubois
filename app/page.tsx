import "./page.scss";

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
            <section className="services">
                <div className="content">
                    <h2>
                        <span className="main">Mes</span><br/>
                        <span className="sub">services</span>
                    </h2>
                </div>
            </section>
            <section className="portfolio">
                <div className="content">
                    <h2>
                        <span className="main">Mes</span><br/>
                        <span className="sub">réalisations</span>
                    </h2>
                </div>
            </section>
            <section className="about">
                <div className="content">
                    <h2>
                        <span className="main">Qui</span><br/>
                        <span className="sub">suis-je</span>
                    </h2>
                </div>
            </section>
            <section className="contact">
                <div className="content">
                    <h2>
                        <span className="main">Mon</span><br/>
                        <span className="sub">contact</span>
                    </h2>
                </div>
            </section>
        </>
    )
}