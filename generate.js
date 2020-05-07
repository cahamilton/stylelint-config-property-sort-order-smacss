/** @format */

'use strict';

module.exports = function (order) {
  let config = [];

  for (const property in order) {
    if (Object.prototype.hasOwnProperty.call(order, property)) {
      for (let i = 0; i < order[property].length; i++) {
        config = config.concat(order[property][i]);
      }
    }
  }

  return config;
};
