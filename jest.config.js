/** @format */

module.exports = {
  runner: 'jest-light-runner',
  cacheDirectory: '/tmp/jest/',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov', 'text-summary'],
};
