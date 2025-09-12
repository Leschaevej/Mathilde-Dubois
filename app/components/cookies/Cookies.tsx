"use client";

import { useState, useEffect } from 'react';
import './Cookies.scss';

interface CookiePreferences {
    essential: boolean;
    analytics: boolean;
}

export default function Cookies() {
    const [showModal, setShowModal] = useState(false);
    const [showContent, setShowContent] = useState(false);
    const [preferences, setPreferences] = useState<CookiePreferences>({
        essential: true,
        analytics: true
    });

    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');
        const hasVisited = sessionStorage.getItem('hasVisited');
        
        // Vérifier l'expiration et mettre à jour les preferences selon localStorage
        if (consent) {
            try {
                const savedPreferences = JSON.parse(consent);
                const currentTime = Date.now();
                const thirteenMonthsInMs = 13 * 30 * 24 * 60 * 60 * 1000; // 13 mois en millisecondes
                
                // Vérifier si le consentement a expiré (13 mois)
                if (savedPreferences.timestamp && (currentTime - savedPreferences.timestamp) > thirteenMonthsInMs) {
                    // Consentement expiré, supprimer et redemander
                    localStorage.removeItem('cookieConsent');
                    // Traiter comme si pas de consentement
                    if (!hasVisited) {
                        setTimeout(() => setShowModal(true), 2800);
                    } else {
                        setTimeout(() => setShowModal(true), 100);
                    }
                } else {
                    // Consentement encore valide, mettre à jour les preferences
                    setPreferences({
                        essential: savedPreferences.essential || true,
                        analytics: savedPreferences.analytics || false
                    });
                }
            } catch (error) {
                console.error('Erreur parsing localStorage:', error);
                // En cas d'erreur, supprimer et redemander
                localStorage.removeItem('cookieConsent');
                if (!hasVisited) {
                    setTimeout(() => setShowModal(true), 2800);
                } else {
                    setTimeout(() => setShowModal(true), 100);
                }
            }
        }
        
        if (!consent) {
            if (!hasVisited) {
                // Première visite = attendre la fin du preloader
                setTimeout(() => {
                    setShowModal(true);
                }, 2800);
            } else {
                // Pas première visite = modal directe
                setTimeout(() => {
                    setShowModal(true);
                }, 100);
            }
        }

        // Écouter l'événement pour ouvrir la modal depuis la page legals
        const handleOpenModal = (event: any) => {
            setShowModal(true);
            if (event.detail?.mode === 'manage') {
                setShowContent(true); // Ouvrir directement en mode gérer
            } else {
                setShowContent(false); // Reset à l'état initial
            }
        };
        
        window.addEventListener('openCookieModal', handleOpenModal);
        
        return () => {
            window.removeEventListener('openCookieModal', handleOpenModal);
        };
    }, []);

    const handleAcceptAll = () => {
        const consentData = {
            essential: true,
            analytics: true,
            timestamp: Date.now()
        };
        localStorage.setItem('cookieConsent', JSON.stringify(consentData));
        setShowModal(false);
    };

    const handleAcceptMinimum = () => {
        const consentData = {
            essential: true,
            analytics: false,
            timestamp: Date.now()
        };
        localStorage.setItem('cookieConsent', JSON.stringify(consentData));
        setShowModal(false);
    };

    const handleManage = () => {
        setShowContent(true);
    };

    const handleSavePreferences = () => {
        const consentData = {
            ...preferences,
            timestamp: Date.now()
        };
        localStorage.setItem('cookieConsent', JSON.stringify(consentData));
        setShowModal(false);
        setShowContent(false);
    };

    return (
        <>
            {/* Modal de gestion des cookies */}
            {showModal && (
                <div className="overlay">
                    <div className="modal">
                        <div className="header">
                            <h2>Gestion des cookies</h2>
                            <p>Nous utilisons des cookies pour améliorer votre expérience et mesurer l'audience.</p>
                        </div>
                        {showContent && (
                            <div className="content">
                            <div className="cookie">
                                <div className="top">
                                    <h3>Fonctionnel</h3>
                                    <div className="switch">
                                        <span className="text">Toujours actifs</span>
                                    </div>
                                </div>
                                <p>Cookies nécessaires au fonctionnement du site.</p>
                            </div>
                            <div className="cookie">
                                <div className="top">
                                    <h3>Statistiques</h3>
                                    <div className="switch">
                                        <span className="text">{preferences.analytics ? 'Activé' : 'Désactivé'}</span>
                                        <div 
                                            className={`toggle ${preferences.analytics ? 'enabled' : ''}`}
                                            onClick={() => setPreferences(prev => ({ ...prev, analytics: !prev.analytics }))}
                                        >
                                            <div className="dot"></div>
                                        </div>
                                    </div>
                                </div>
                                <p>Cookies pour analyser l'audience du site.</p>
                            </div>
                            </div>
                        )}
                        <div className="actions">
                            {!showContent ? (
                                <>
                                    <button onClick={handleAcceptAll} className="accept">
                                        Accepter tout
                                    </button>
                                    <button onClick={handleAcceptMinimum} className="minimum">
                                        Accepter minimum
                                    </button>
                                    <button onClick={handleManage} className="manage">
                                        Gérer
                                    </button>
                                </>
                            ) : (
                                <button onClick={handleSavePreferences} className="save">
                                    Sauvegarder mes préférences
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}