const nextJest = require('next/jest')
const createJestConfig = nextJest({
    dir: './',
})
const customJestConfig = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js', '<rootDir>/tests/setup.ts'],
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
    },
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
    collectCoverageFrom: [
        'app/**/*.{js,jsx,ts,tsx}',
        '!app/**/*.d.ts',
        '!app/api/**',
    ],
}
module.exports = createJestConfig(customJestConfig)