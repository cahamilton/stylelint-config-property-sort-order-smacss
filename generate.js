/** @format */

'use strict';

const order = require('css-property-sort-order-smacss');

/**
 * Returns an array of group objects for `stylelint-order` config
 * @param {Object} options - Optional group properties
 * @return {Array}
 */
module.exports = (options = {}) => {
  return Object.keys(order).reduce((config, key) => {
    const groupName = key;
    const groupCurrent = order[key];
    const hasNestedGroups = groupCurrent.every((item) => Array.isArray(item));

    let properties = groupCurrent;

    if (hasNestedGroups) {
      properties = groupCurrent.reduce((arr, item) => [...arr, ...item], []);
    }

    return [...config, { ...options, groupName, properties }];
  }, []);
};
