/** @format */

'use strict';

const generate = require('./generate');

const options = generate();

module.exports = {
  plugins: ['stylelint-order'],
  rules: {
    'order/properties-order': [options],
  },
};
