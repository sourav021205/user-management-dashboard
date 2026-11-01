
module.exports = {
  testEnvironment: "jsdom",

  setupFilesAfterEnv: [
    "<rootDir>/src/tests/setup.ts"
  ],

  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: "<rootDir>/tsconfig.test.json"
      }
    ]
  },

  moduleNameMapper: {
    "\\.(css|less|scss)$": "identity-obj-proxy"
  },

  testMatch: [
    "**/src/tests/**/*.test.ts",
    "**/src/tests/**/*.test.tsx"
  ],

  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/main.tsx",
    "!src/tests/**"
  ],

  coverageReporters: [
    "text",
    "lcov"
  ]
};
