/** @format */

import order from 'css-property-sort-order-smacss';

type Group = {
  properties: Array<string>;
  emptyLineBefore?: 'always' | 'never' | 'threshold';
  noEmptyLineBetween?: boolean;
  groupName?: string;
  order?: 'flexible';
};

/**
 * Options to be applied to each group
 * @see {@link https://github.com/hudochenkov/stylelint-order/blob/7.0.1/rules/properties-order/README.md#options|Documentation}
 */
type Options = Omit<Group, 'groupName' | 'properties'>;

/**
 * Returns configuration for `stylelint-order/properties-order`
 * @see {@link https://github.com/hudochenkov/stylelint-order/blob/7.0.1/rules/properties-order/README.md|Documentation}
 */
const generateConfig = (options?: Options): Array<Group> => {
  return Object.entries(order).map(([groupName, groupValues]) => {
    return { ...options, groupName, properties: groupValues.flat() };
  });
};

export default generateConfig;
