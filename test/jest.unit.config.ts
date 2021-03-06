import type {Config} from '@jest/types';
import base from './jest.base.config';

const config: Config.InitialOptions = {
  ...base,
  collectCoverage: true,
  testMatch: ['<rootDir>/**/test/unit/*.test.ts'],
  testPathIgnorePatterns: ['test/medium/'],
};
export default config;
