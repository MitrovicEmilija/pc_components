module.exports = {
    collectCoverage: true,
    coverageDirectory: 'coverage',
    testEnvironment: 'jsdom',
    "moduleNameMapper": {
        "^axios$": require.resolve("axios")
    },
    "transformIgnorePatterns": [
        "/node_modules/(?!axios)/"
    ],
    transform: {
        '^.+\\.[t|j]sx?$': 'babel-jest', // Tells Jest to use Babel for JavaScript and JSX files
    },
    "moduleFileExtensions": ["web.js", "js", "web.ts", "ts", "web.tsx", "tsx", "json", "web.jsx", "jsx", "node"]
};
