import "./Header.scss";

export default function Header() {
    return (
        <header>
            <div className="brand">
                <h1>
                    <span className="logo">MD</span>
                    <span className="name">Mathilde Dubois</span>
                </h1>
                <p>Dessinatrice<br/>projeteuse</p>
            </div>
            <nav>
                <ul>
                    <li><a href="#services">Services</a></li>
                    <li><a href="#realisations">Réalisations</a></li>
                    <li><a href="#a-propos">À propos</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </nav>
        </header>
    )
}