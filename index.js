/** @format */

import generateConfig from './generate.js';

export default {
  plugins: ['stylelint-order'],
  rules: {
    'order/properties-order': generateConfig(),
  },
};
