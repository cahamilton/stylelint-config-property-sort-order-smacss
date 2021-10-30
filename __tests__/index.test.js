/** @format */

const stylelint = require('stylelint');

const generate = require('../generate');
const index = require('../index');

/**
 * @param {String} code - String of CSS to lint
 * @param {Object} config - Stylelint configuration
 * @return {Promise<{errored, invalidOptionWarnings, warnings}>}
 */
const lintCode = async ({ code, config }) => {
  const actual = await stylelint.lint({ code, config });

  const { errored, results } = actual;
  const { invalidOptionWarnings, warnings } = results[0];

  return { errored, invalidOptionWarnings, warnings };
};

describe('basic configuration', () => {
  it('should report an error (single property, multiple groups)', async () => {
    const code = `
      a {
        color: red;
        top: 0;
      }
    `;

    const { errored, warnings } = await lintCode({ code, config: index });

    expect(errored).toBe(true);
    expect(warnings).toHaveLength(1);
    expect(warnings[0].rule).toEqual('order/properties-order');
    expect(warnings[0].text).toContain('Expected "top" to come before "color"');
  });

  it('should report multiple errors (multiple properties, multiple groups)', async () => {
    const code = `
      a {
        top: 0;
        color: black;
        position: absolute;
        display: block;
      }
    `;

    const { errored, warnings } = await lintCode({ code, config: index });

    expect(errored).toBe(true);
    expect(warnings.length).toBeGreaterThan(1);
  });

  it('should not report an error (single property, multiple groups)', async () => {
    const code = `
      a {
        top: 0;
        color: red;
      }
    `;

    const { errored, warnings } = await lintCode({ code, config: index });

    expect(errored).toBe(false);
    expect(warnings).toHaveLength(0);
  });

  it('should not report an error (multiple properties, multiple groups)', async () => {
    const code = `
      a {
        display: block;
        position: absolute;
        top: 0;
        color: black;
      }
    `;

    const { errored, warnings } = await lintCode({ code, config: index });

    expect(errored).toBe(false);
    expect(warnings).toHaveLength(0);
  });
});

describe('advanced configuration', () => {
  describe('flexible ordering', () => {
    const code = `
      a {
        top: 0;
        position: absolute;
        display: block;
        color: black;
      }
    `;

    it('should report multiple errors (default)', async () => {
      const config = {
        plugins: ['stylelint-order'],
        rules: {
          'order/properties-order': [
            generate(), //
          ],
        },
      };

      const { errored, warnings } = await lintCode({ code, config });

      expect(errored).toBe(true);
      expect(warnings.length).toBeGreaterThan(1);
    });

    it('should not report an error (order: "flexible")', async () => {
      const config = {
        plugins: ['stylelint-order'],
        rules: {
          'order/properties-order': [
            generate({ order: 'flexible' }), //
          ],
        },
      };

      const { errored, warnings } = await lintCode({ code, config });

      expect(errored).toBe(false);
      expect(warnings).toHaveLength(0);
    });
  });

  describe('empty line after property group', () => {
    const code = `
      a {
        display: block;
        position: absolute;
        top: 0;

        color: black;
      }
    `;

    it('should report an error (emptyLineBefore: "never")', async () => {
      const config = {
        plugins: ['stylelint-order'],
        rules: {
          'order/properties-order': [
            generate({ emptyLineBefore: 'never' }), //
          ],
        },
      };

      const { errored, warnings } = await lintCode({ code, config });

      expect(errored).toBe(true);
      expect(warnings).toHaveLength(1);
      expect(warnings[0].rule).toEqual('order/properties-order');
      expect(warnings[0].text).toContain(
        'Unexpected empty line before property "color"',
      );
    });

    it('should not report an error (default)', async () => {
      const config = {
        plugins: ['stylelint-order'],
        rules: {
          'order/properties-order': [
            generate(), //
          ],
        },
      };

      const { errored, warnings } = await lintCode({ code, config });

      expect(errored).toBe(false);
      expect(warnings).toHaveLength(0);
    });

    it('should not report an error (emptyLineBefore: "always")', async () => {
      const config = {
        plugins: ['stylelint-order'],
        rules: {
          'order/properties-order': [
            generate({ emptyLineBefore: 'always' }), //
          ],
        },
      };

      const { errored, warnings } = await lintCode({ code, config });

      expect(errored).toBe(false);
      expect(warnings).toHaveLength(0);
    });
  });

  describe('invalid options', () => {
    it('should report error (emptyLineBefore: "invalidOption")', async () => {
      const code = `
        a {
          color: red;
          top: 0;
        }
      `;

      const config = {
        plugins: ['stylelint-order'],
        rules: {
          'order/properties-order': [
            generate({ emptyLineBefore: 'invalidOption' }), //
          ],
        },
      };

      const { errored, invalidOptionWarnings } = await lintCode({
        code,
        config,
      });

      expect(errored).toBe(true);
      expect(invalidOptionWarnings).toHaveLength(1);
      expect(invalidOptionWarnings[0].text).toContain('order/properties-order');
      expect(invalidOptionWarnings[0].text).toContain('Invalid option');
    });
  });
});
