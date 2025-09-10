import '@testing-library/jest-dom';
import React from 'react';
import { MockCarousel, MockMap, MockContact, MockHeader, MockFooter, MockPreloader } from './__mocks__/components';
import { mockProjectsData } from './__mocks__/data';

// Mock des composants
jest.mock('../app/components/carousel/Carousel', () => ({
  __esModule: true,
  default: MockCarousel
}));

jest.mock('../app/components/map/Map', () => ({
  __esModule: true,
  default: MockMap
}));

jest.mock('../app/components/contact/Contact', () => ({
  __esModule: true,
  default: MockContact
}));

jest.mock('../app/components/header/Header', () => ({
  __esModule: true,
  default: MockHeader
}));

jest.mock('../app/components/footer/Footer', () => ({
  __esModule: true,
  default: MockFooter
}));

jest.mock('../app/components/preloader/Preloader', () => ({
  __esModule: true,
  default: MockPreloader
}));

// Mock des données
jest.mock('../app/data/projects.json', () => mockProjectsData);

// Mock IntersectionObserver
const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
});

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: mockIntersectionObserver,
});

// Mock de next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return React.createElement('img', props);
  },
}));