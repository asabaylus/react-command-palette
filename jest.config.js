module.exports = {
  testURL: "http://localhost/",
  transform: {
    "^.+\\.js$": "babel-jest"
  },
  snapshotSerializers: ["./node_modules/enzyme-to-json/serializer"],
  moduleFileExtensions: ["js", "jsx"],
  moduleDirectories: ["node_modules"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif)$": "<rootDir>/src/__mocks__/fileMock.js",
    "\\.(css|less|sass|scss)$": "identity-obj-proxy"
  },
  collectCoverage: true,
  coverageDirectory: "coverage",
  collectCoverageFrom: ["src/*.js"],
  coveragePathIgnorePatterns: [
    "<rootDir>/node_modules",
    "<rootDir>/src/main.js"
  ],
  coverageReporters: ["json", "lcov", "text"]
};
