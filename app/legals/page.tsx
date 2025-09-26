"use client";

import "./page.scss";

export default function Legals() {
    const handleCookieSettings = () => {
        window.dispatchEvent(new CustomEvent('openCookieModal', { detail: { mode: 'manage' } }));
    };
    return (
        <>
        <section className="legals">
            <h2>Mentions légales</h2>
            <h3>1- Présentation du site</h3>
            <p>En vertu de l&apos;article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l&apos;économie numérique, il est précisé aux utilisateurs du site mathildedubois.fr l&apos;identité des différents intervenants dans le cadre de sa réalisation et de son suivi :</p>
            <p><strong>Propriétaire :</strong> Mathilde Dubois – Auto entreprise – Siret : 512 383 217 0035 – 505 Avenue Imer 83370 Fréjus – Tél : 06 18 35 14 83 – Email : contact@mathildedubois.fr</p>
            <p><strong>Créateur :</strong> Skybound Studio – 1 Bis Cour D&apos;orbitelle 13100 Aix en Provence – Tél : 07 81 07 63 89 – Email : contact@skyboundstudio.fr</p>
            <p><strong>Hébergeur :</strong> Vercel Inc. – 340 S Lemon Ave, Suite 4133, Walnut, CA 91789, USA – Email : support@vercel.com</p>
            <h3>2- Conditions générales d&apos;utilisation du site et des services proposés</h3>
            <p>L&apos;utilisation du site mathildedubois.fr implique l&apos;acceptation pleine et entière des conditions générales d&apos;utilisation ci-après décrites. Ces conditions d&apos;utilisation sont susceptibles d&apos;être modifiées ou complétées à tout moment, les utilisateurs sont donc invités à les consulter régulièrement.</p>
            <p>Le site est normalement accessible à tout moment aux utilisateurs. Une interruption pour raison de maintenance technique peut être décidée par Mathilde Dubois qui s&apos;efforcera de communiquer préalablement aux utilisateurs les dates et heures d&apos;intervention. Le site est mis à jour régulièrement par Skybound Studio.</p>
            <h3>3- Description des services fournis</h3>
            <p>Le site mathildedubois.fr a pour objet de fournir une information concernant Les perspectives de Mathilde.</p>
            <p>Mathilde Dubois s&apos;efforce de fournir sur le site des informations aussi précises que possible. Toutefois, il ne pourra être tenu responsable des omissions, des inexactitudes et des carences dans la mise à jour, qu&apos;elles soient de son fait ou du fait des tiers partenaires qui lui fournissent ces informations.</p>
            <p>Toutes les informations indiquées sur le site sont données à titre indicatif et sont susceptibles d&apos;évoluer. Elles sont données sous réserve de modifications depuis leur mise en ligne.</p>
            <h3>4- Limitations contractuelles sur les données techniques</h3>
            <p>Le site utilise la technologie JavaScript. Le site Internet ne pourra être tenu responsable de dommages matériels liés à l&apos;utilisation du site. L&apos;utilisateur s&apos;engage à accéder au site avec un matériel récent, ne contenant pas de virus et avec un navigateur de dernière génération mis à jour.</p>
            <h3>5- Propriété intellectuelle et contrefaçons</h3>
            <p>Sauf mention contraire, Mathilde Dubois est propriétaire des droits de propriété intellectuelle ou détient les droits d&apos;usage sur tous les éléments accessibles sur le site, notamment textes, images, graphismes, logos et icônes.</p>
            <p>Toute exploitation non autorisée du site ou des éléments qu&apos;il contient sera considérée comme constitutive d&apos;une contrefaçon et poursuivie conformément aux articles L.335-2 et suivants du Code de Propriété Intellectuelle.</p>
            <h3>6- Limitations de responsabilité</h3>
            <p>Mathilde Dubois ne pourra être tenu responsable des dommages directs et indirects causés au matériel de l&apos;utilisateur lors de l&apos;accès au site. Les espaces interactifs (formulaire de contact, commentaires) sont à disposition des utilisateurs. Tout contenu contraire à la législation française pourra être supprimé sans préavis.</p>
            <h3>7- Liens hypertextes et cookies</h3>
            <p>Le site peut contenir des liens vers d&apos;autres sites. Mathilde Dubois n&apos;a pas la possibilité de vérifier le contenu de ces sites et n&apos;assume aucune responsabilité.</p>
            <p>La navigation peut provoquer l&apos;installation de cookies. Vous pouvez configurer votre navigateur pour refuser les cookies :</p>
            <ul>
                <li><strong>Internet Explorer :</strong> Onglet Outils (pictogramme en forme de rouage en haut à droite) → Options Internet → Confidentialité → choisir Bloquer tous les cookies → Valider par OK.</li>
                <li><strong>Microsoft Edge :</strong> Menu (trois points en haut à droite) → Paramètres → Cookies et autorisations de site → Gérer et supprimer les cookies et données du site → Bloquer tous les cookies.</li>
                <li><strong>Firefox :</strong> Menu Firefox → Paramètres → Vie privée et sécurité → Historique → Utiliser les paramètres personnalisés pour l&apos;historique → cocher Bloquer les cookies.</li>
                <li><strong>Safari :</strong> Menu Safari → Préférences → Confidentialité → Cookies et données de sites → Bloquer tous les cookies.</li>
                <li><strong>Chrome :</strong> Menu Chrome (trois points en haut à droite) → Paramètres → Confidentialité et sécurité → Cookies et autres données de site → Bloquer tous les cookies.</li>
            </ul>
            <h3>8- Droit applicable et attribution de juridiction</h3>
            <p>Tout litige en relation avec l&apos;utilisation du site est soumis au droit français. Attribution exclusive de juridiction aux tribunaux compétents.</p>
            <h3>9- Les principales lois concernées</h3>
            <ul>
                <li>Loi n° 78-17 du 6 janvier 1978, modifiée par la loi n° 2004-801 du 6 août 2004 relative à l&apos;informatique et aux libertés.</li>
                <li>Loi n° 2004-575 du 21 juin 2004 pour la confiance dans l&apos;économie numérique.</li>
                <li>Règlement européen n° 2016/679 (RGPD).</li>
            </ul>
            <h3>10- Lexique</h3>
            <p><strong>Utilisateur :</strong> Internaute se connectant, utilisant le site.</p>
            <p><strong>Informations personnelles :</strong> &laquo; Les informations qui permettent, directement ou indirectement, l&apos;identification des personnes physiques auxquelles elles s&apos;appliquent &raquo; (article 4 de la loi n° 78-17 du 6 janvier 1978).</p>
        </section>
        <section className="confidentiality">
            <h2>Politique de confidentialité</h2>
            <h3>1- Collecte des renseignements personnels</h3>
            <p>Les informations collectées sont celles que vous saisissez dans le formulaire de contact (nom, email, message).</p>
            <h3>2- Formulaires et interactivité</h3>
            <p>Vos renseignements sont collectés via le formulaire de contact dans le but de répondre à vos demandes. Aucun autre formulaire ou collecte n&apos;est effectué sur le site.</p>
            <h4>2.1- Droit d&apos;opposition et de retrait</h4>
            <p>Vous pouvez vous opposer ou demander le retrait de vos informations en contactant : Mathilde Dubois – Tél : 06 18 35 14 83 – Email : contact@mathildedubois.fr</p>
            <h4>2.2- Droit d&apos;accès et de rectification</h4>
            <p>Vous pouvez accéder à vos informations personnelles, les modifier ou demander leur suppression en contactant : Mathilde Dubois – Tél : 06 18 35 14 83 – Email : contact@mathildedubois.fr</p>
            <h4>2.3- Sécurité</h4>
            <p>Les informations sont conservées dans un environnement sécurisé, et les employés ou partenaires respectent la confidentialité. Pour garantir cette sécurité, le site utilise un protocole SSL et effectue des sauvegardes régulières. Aucune information personnelle n&apos;est cédée ou vendue à des tiers.</p>
            <h3>3- Législation</h3>
            <p>Le site respecte les dispositions législatives du RGPD et des lois françaises relatives aux données personnelles.</p>
        </section>
        <section className="cookies">
            <h2>Information concernant les cookies</h2>
            <h3>Qu&apos;est-ce qu&apos;un cookie ?</h3>
            <p>La Commission Nationale de l&apos;Informatique et des Libertés (CNIL) définit un cookie comme &laquo; une information déposée sur votre disque dur par le serveur du site que vous visitez &raquo;. Il contient le nom du serveur qui l&apos;a déposée, un identifiant unique et éventuellement une date d&apos;expiration. Ces informations sont stockées sur votre ordinateur dans un simple fichier texte auquel le serveur peut accéder pour lire ou enregistrer des informations.</p>
            <h3>À quoi servent les cookies ?</h3>
            <p>Les cookies permettent de reconnaître un internaute d&apos;une visite à l&apos;autre grâce à un identifiant unique. Ils peuvent également être utilisés pour stocker le contenu d&apos;un panier d&apos;achat, enregistrer les paramètres de langue d&apos;un site, faire de la publicité ciblée ou mesurer l&apos;audience du site.</p>
            <h3>Quels cookies utilise le site mathildedubois.fr et comment les gérer ?</h3>
            <p>Le site utilise uniquement des cookies liés aux statistiques de visites fournies par Vercel. Ces cookies ne permettent pas d&apos;identifier personnellement les visiteurs et ne sont utilisés ni pour de la publicité, ni pour le suivi comportemental.</p>
            <p>Vous pouvez accepter ou refuser les cookies en configurant votre navigateur. Il est possible de choisir d&apos;accepter ou de rejeter les cookies systématiquement ou selon leur émetteur, et de recevoir une notification avant qu&apos;un cookie soit enregistré. Les instructions pour configurer ces choix sont disponibles dans le menu d&apos;aide de votre navigateur.</p>
            <h3>Durée de validité de votre accord</h3>
            <p>Votre accord concernant le dépôt des cookies de mesure d&apos;audience est valable 13 mois. Passé ce délai, un bandeau vous informant de l&apos;utilisation de ces cookies et vous permettant de vous y opposer réapparaîtra sur la page d&apos;accueil. Vous pouvez également vous opposer au dépôt de ces cookies à tout moment via le lien prévu à cet effet dans la section « mentions légales » du site.</p>
            <p>Concernant les cookies générés par les réseaux sociaux lors du partage de contenus, la durée de validité est fixée par ces réseaux. Nous vous invitons à consulter leurs politiques de protection de la vie privée pour connaître la durée et les informations recueillies grâce à leurs boutons de partage.</p>
            <div className="cookie-settings">
                <button onClick={handleCookieSettings} className="cookie-settings-btn">
                    <span className="material-icons">cookie</span>
                    <span>Gérer mes cookies</span>
                </button>
            </div>
        </section>
        </>
    );
}