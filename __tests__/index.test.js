/** @format */

'use strict';

const stylelint = require('stylelint');

const config = require('../index');
const generate = require('../generate');

describe('basic configuration', () => {
  it('should not report an error', async () => {
    const code = `
      a {
        top: 0;
        color: red;
      }
    `;

    const actual = await stylelint.lint({ code, config });
    const { errored, results } = actual;
    const { warnings } = results[0];

    expect(errored).toBe(false);
    expect(warnings).toHaveLength(0);
  });

  it('should report an error, for incorrectly ordered properties', async () => {
    const code = `
      a {
        color: red;
        top: 0;
      }
    `;

    const actual = await stylelint.lint({ code, config });
    const { errored, results } = actual;
    const { warnings } = results[0];

    expect(errored).toBe(true);
    expect(warnings).toHaveLength(1);
    expect(warnings[0].rule).toEqual('order/properties-order');
    expect(warnings[0].text).toContain('Expected "top" to come before "color"');
  });
});

describe('advanced configuration', () => {
  const code = `
    a {
      top: 0;
      color: red;
    }
  `;

  it('should not report an error', async () => {
    const options = generate();
    const config = {
      plugins: ['stylelint-order'],
      rules: {
        'order/properties-order': [options],
      },
    };

    const actual = await stylelint.lint({ code, config });
    const { errored, results } = actual;
    const { warnings } = results[0];

    expect(errored).toBe(false);
    expect(warnings).toHaveLength(0);
  });

  it('should report an error, given additional options', async () => {
    const options = generate({ emptyLineBefore: 'always' });
    const config = {
      plugins: ['stylelint-order'],
      rules: {
        'order/properties-order': [options],
      },
    };

    const actual = await stylelint.lint({ code, config });
    const { errored, results } = actual;
    const { warnings } = results[0];

    expect(errored).toBe(true);
    expect(warnings).toHaveLength(1);
    expect(warnings[0].rule).toEqual('order/properties-order');
    expect(warnings[0].text).toContain(
      'Expected an empty line before property "color"',
    );
  });

  it('should report an error, given invalid option value', async () => {
    const options = generate({ emptyLineBefore: 'invalidOption' });
    const config = {
      plugins: ['stylelint-order'],
      rules: {
        'order/properties-order': [options],
      },
    };

    const actual = await stylelint.lint({ code, config });
    const { errored, results } = actual;
    const { invalidOptionWarnings } = results[0];

    expect(errored).toBe(true);
    expect(results).toHaveLength(1);
    expect(invalidOptionWarnings[0].text).toContain('order/properties-order');
    expect(invalidOptionWarnings[0].text).toContain('Invalid option');
  });
});
