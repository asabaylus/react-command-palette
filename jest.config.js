module.exports = {
    "snapshotSerializers": [
        "./node_modules/enzyme-to-json/serializer"
    ],
    "moduleNameMapper": {
        "\\.(css|less|sass|scss)$": "<rootDir>/src/__mocks__/styleMock.js",
    },
    "collectCoverage": true,
    "coverageDirectory": "<rootDir>/coverage",
    "collectCoverageFrom": [
        "**/src/*.{js}",
        "!**/node_modules/**",
        "!src/main.js"
    ],
    "coverageReporters": [
        "lcov",
        "text"
    ]
}