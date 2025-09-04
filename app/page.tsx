import "./page.scss";

export default function Home() {
    return (
        <>
            <section className="hero">
                <div className="content">
                    <h2>Mathilde Dubois</h2>
                    <p>Dessinatrice<br/>en bâtiment</p>
                </div>
            </section>
            <section className="role">
                <div className="content">
                    <h2>
                        <span className="main">Mon rôle dans vos</span><br/>
                        <span className="sub">projet</span>
                    </h2>
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