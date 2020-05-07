'use strict';

const stylelint = require('stylelint');

const config = require('../index');

describe('index', () => {
  it('should not report an error', async () => {
    const actual = await stylelint.lint({
      code: `
        a {
          top: 0;
          color: red;
        }
      `,
      config,
    });

    const { errored, results } = actual;
    const { warnings } = results[0];

    expect(errored).toBe(false);
    expect(warnings).toHaveLength(0);
  });

  it('should report an error, for incorrectly ordered properties', async () => {
    const actual = await stylelint.lint({
      code: `
        a {
          color: red;
          top: 0;
        }
      `,
      config,
    });

    const { errored, results } = actual;
    const { warnings } = results[0];

    expect(errored).toBe(true);
    expect(warnings).toHaveLength(1);
    expect(warnings[0].rule).toEqual('order/properties-order');
    expect(warnings[0].text).toContain('Expected "top" to come before "color"');
  });
});
