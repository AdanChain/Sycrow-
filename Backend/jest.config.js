/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node', // Use Node.js environment
  moduleFileExtensions: ['ts', 'js'], // Support TypeScript
  testMatch: ['**/*.test.ts'], // Look for test files ending in .test.ts
};
