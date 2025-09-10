import React from 'react';

// Mock du composant Carousel
export const MockCarousel = ({ projects }: { projects: any[] }) => {
  return React.createElement('div', { 'data-testid': 'carousel' }, `Mock Carousel with ${projects.length} projects`);
};

// Mock du composant Map
export const MockMap = () => {
  return React.createElement('div', { 'data-testid': 'map' }, 'Mock Map');
};

// Mock du composant Contact
export const MockContact = () => {
  return React.createElement('div', { 'data-testid': 'contact' }, 'Mock Contact');
};

// Mock du composant Header
export const MockHeader = () => {
  return React.createElement('header', { 'data-testid': 'header' }, 'Mock Header');
};

// Mock du composant Footer
export const MockFooter = () => {
  return React.createElement('footer', { 'data-testid': 'footer' }, 'Mock Footer');
};

// Mock du composant Preloader
export const MockPreloader = () => {
  return React.createElement('div', { 'data-testid': 'preloader' }, 'Mock Preloader');
};