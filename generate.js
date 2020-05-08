/** @format */

'use strict';

module.exports = (order) => {
  return Object.keys(order).reduce((config, key) => {
    const group = order[key];
    const props = group.reduce((array, current) => array.concat(current), []);

    return config.concat(props);
  }, []);
};
