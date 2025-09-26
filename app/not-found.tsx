import Link from 'next/link';
import { ephesis } from './font';
import './globals.scss';
import './not-found.scss';

export default function NotFound() {
    return (
        <main className="notFound">
            <h1 className={ephesis.className}>404</h1>
            <h2>Oups, cette page s&apos;est échappée !</h2>
            <p>
                Il semblerait que cette page ait pris un autre chemin.
                Retournons ensemble vers mes créations et projets.
            </p>
            <Link href="/" className="back">
                Retour à l&apos;accueil
            </Link>
        </main>
    );
}