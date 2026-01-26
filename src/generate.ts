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
 * Options to be applied to the configuration
 * @see {@link https://github.com/hudochenkov/stylelint-order/blob/7.0.1/rules/properties-order/README.md#optional-secondary-options|Documentation}
 */
type SecondaryOptions = {
  unspecified?: 'top' | 'bottom' | 'bottomAlphabetical' | 'ignore';
  emptyLineBeforeUnspecified?: 'always' | 'never' | 'threshold';
  emptyLineMinimumPropertyThreshold?: number;
};

/**
 * Returns configuration for `stylelint-order/properties-order`
 * @see {@link https://github.com/hudochenkov/stylelint-order/blob/7.0.1/rules/properties-order/README.md|Documentation}
 */
const generateConfig = (
  options: Options & SecondaryOptions = {},
): [Array<Group>, SecondaryOptions] => {
  const {
    unspecified,
    emptyLineBeforeUnspecified,
    emptyLineMinimumPropertyThreshold,
    ...groupOptions
  } = options;

  const groups: Array<Group> = Object.entries(order).map((entry) => {
    const [groupName, groupValues] = entry;

    return { ...groupOptions, groupName, properties: groupValues.flat() };
  });

  const secondaryOptions: SecondaryOptions = Object.fromEntries(
    Object.entries({
      unspecified,
      emptyLineBeforeUnspecified,
      emptyLineMinimumPropertyThreshold,
    }).filter((entry) => {
      const [_key, value] = entry;

      return typeof value !== 'undefined';
    }),
  );

  return [groups, secondaryOptions];
};

export default generateConfig;
