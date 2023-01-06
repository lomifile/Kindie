// eslint-disable-next-line no-undef
module.exports = {
  testEnvironment: "jsdom",
  moduleNameMapper: {
    ".(css|less|scss)$": "identity-obj-proxy",
  },
  verbose: true,
  setupFilesAfterEnv: [
    "@testing-library/jest-dom/extend-expect",
    "<rootDir>/packages/setupTests.ts",
  ],
  snapshotSerializers: ["enzyme-to-json/serializer"],
};
