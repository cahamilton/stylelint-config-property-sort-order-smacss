/** @format */

import type { Config } from 'stylelint';

import generateConfig from './generate.js';

const config: Config = {
  plugins: ['stylelint-order'],
  rules: {
    'order/properties-order': generateConfig(),
  },
};

export default config;
