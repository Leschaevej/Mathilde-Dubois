import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../app/page';

describe('Home Page', () => {
  
  // Tests critiques - Ce qui DOIT marcher pour l'utilisateur
  describe('Critical User Experience', () => {
    test('displays the main landing page sections', () => {
      render(<Home />);
      
      // L'utilisateur doit voir les sections principales
      expect(document.querySelector('.hero')).toBeInTheDocument();
      expect(document.querySelector('.services')).toBeInTheDocument();
      expect(document.querySelector('.portfolio')).toBeInTheDocument();
      expect(document.querySelector('.about')).toBeInTheDocument();
      expect(document.querySelector('.contact')).toBeInTheDocument();
    });

    test('shows portfolio with projects', () => {
      render(<Home />);
      
      // L'utilisateur doit voir le portfolio avec des projets
      expect(screen.getByTestId('carousel')).toBeInTheDocument();
      expect(screen.getByText(/4 projects/)).toBeInTheDocument();
    });

    test('displays contact information', () => {
      render(<Home />);
      
      // L'utilisateur doit pouvoir contacter
      expect(screen.getByTestId('contact')).toBeInTheDocument();
      expect(screen.getByTestId('map')).toBeInTheDocument();
      
      // Infos de contact essentielles présentes
      const contactSection = document.querySelector('.contact');
      expect(contactSection).toHaveTextContent(/Saint-Aygulf/);
      expect(contactSection).toHaveTextContent(/contact@mathildedubois\.fr/);
      expect(contactSection).toHaveTextContent(/06 18 35 14 83/);
    });

    test('has proper navigation anchors', () => {
      render(<Home />);
      
      // L'utilisateur doit pouvoir naviguer avec les ancres
      expect(document.getElementById('services')).toBeInTheDocument();
      expect(document.getElementById('portfolio')).toBeInTheDocument();
      expect(document.getElementById('about')).toBeInTheDocument();
      expect(document.getElementById('contact')).toBeInTheDocument();
    });
  });

  // Tests de structure - Architecture de base
  describe('Page Structure', () => {
    test('has correct main content areas', () => {
      render(<Home />);
      
      // Structure de base respectée
      expect(document.querySelectorAll('.services .card')).toHaveLength(3);
      expect(document.querySelectorAll('.role .card')).toHaveLength(3);
      expect(document.querySelectorAll('.contact .item')).toHaveLength(3);
    });

    test('displays service images properly', () => {
      render(<Home />);
      
      // Images de services présentes avec attributs corrects
      const serviceImages = screen.getAllByRole('img');
      expect(serviceImages.length).toBeGreaterThan(0);
      
      // Au moins une image a des dimensions correctes (signe que Next/Image marche)
      const firstImg = serviceImages[0];
      expect(firstImg).toHaveAttribute('width');
      expect(firstImg).toHaveAttribute('height');
    });
  });

  // Tests de fonctionnalité - Ce qui doit marcher techniquement  
  describe('Technical Functionality', () => {
    test('initializes scroll animations', () => {
      render(<Home />);
      
      // IntersectionObserver doit être configuré pour les animations
      expect(window.IntersectionObserver).toHaveBeenCalledWith(
        expect.any(Function),
        expect.objectContaining({
          threshold: expect.any(Number),
          rootMargin: expect.any(String)
        })
      );
    });

    test('renders without crashing', () => {
      // Test le plus important : la page ne doit pas planter
      expect(() => render(<Home />)).not.toThrow();
    });

    test('cleans up properly when unmounted', () => {
      const { unmount } = render(<Home />);
      
      // Pas de memory leaks
      expect(() => unmount()).not.toThrow();
    });
  });

  // Tests d'accessibilité - Utilisabilité pour tous
  describe('Accessibility', () => {
    test('has proper heading structure', () => {
      render(<Home />);
      
      // Structure de titres pour screen readers
      const headings = screen.getAllByRole('heading');
      expect(headings.length).toBeGreaterThan(0);
    });

    test('images have alt text', () => {
      render(<Home />);
      
      // Toutes les images importantes ont un alt
      const images = screen.getAllByRole('img');
      images.forEach(img => {
        expect(img).toHaveAttribute('alt');
        expect(img.getAttribute('alt')).not.toBe('');
      });
    });
  });

  // Tests de régression - Bugs connus à ne pas reproduire
  describe('Regression Protection', () => {
    test('contact section displays all required elements', () => {
      render(<Home />);
      
      const contactSection = document.querySelector('.contact');
      expect(contactSection).toBeInTheDocument();
      
      // Vérifier que les éléments critiques sont présents
      expect(contactSection?.querySelector('.left')).toBeInTheDocument();
      expect(contactSection?.querySelector('.right')).toBeInTheDocument();
      expect(contactSection?.querySelector('.info')).toBeInTheDocument();
    });

    test('portfolio section loads correctly', () => {
      render(<Home />);
      
      const portfolioSection = document.getElementById('portfolio');
      expect(portfolioSection).toBeInTheDocument();
      
      // Le carousel doit être présent et fonctionnel
      expect(portfolioSection?.querySelector('[data-testid="carousel"]')).toBeInTheDocument();
    });
  });
});