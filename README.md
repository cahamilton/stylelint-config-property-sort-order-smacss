<!-- omit from toc -->
# stylelint-config-property-sort-order-smacss

[![SMACSS Logo](https://user-images.githubusercontent.com/4007311/81406794-25fdbe00-9132-11ea-8e5d-dba7d3f3915e.png)](http://smacss.com)
[![Stylelint Logo](https://user-images.githubusercontent.com/4007311/81406797-272eeb00-9132-11ea-8b7d-cf84bece72a6.png)](https://github.com/stylelint/stylelint)

[![Build](https://github.com/cahamilton/stylelint-config-property-sort-order-smacss/actions/workflows/build.yml/badge.svg)](https://github.com/cahamilton/stylelint-config-property-sort-order-smacss/actions/workflows/build.yml)
[![CodeQL](https://github.com/cahamilton/stylelint-config-property-sort-order-smacss/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/cahamilton/stylelint-config-property-sort-order-smacss/actions/workflows/codeql-analysis.yml)
[![NPM version](https://img.shields.io/npm/v/stylelint-config-property-sort-order-smacss.svg)](https://www.npmjs.org/package/stylelint-config-property-sort-order-smacss)
[![NPM Downloads](https://img.shields.io/npm/dm/stylelint-config-property-sort-order-smacss.svg)](https://www.npmjs.org/package/stylelint-config-property-sort-order-smacss)

[Stylelint](https://github.com/stylelint/stylelint) config for Property Sort Ordering based on the [SMACSS](http://smacss.com) methodology.

<!-- omit from toc -->
## Table of Contents

- [Installation](#installation)
- [Basic Configuration](#basic-configuration)
- [Advanced Configuration](#advanced-configuration)
  - [Options](#options)
  - [Examples](#examples)
    - [Flexible Ordering](#flexible-ordering)
    - [Empty Line After Property Group](#empty-line-after-property-group)

## Installation

```bash
npm install stylelint-config-property-sort-order-smacss --save-dev
```

## Basic Configuration

To start using this configuration, simply extend this package in your Stylelint configuration.

```js
// stylelint.config.js

/**
 * @type {import('stylelint').Config}
 */
export default {
  extends: ['stylelint-config-property-sort-order-smacss'],
  rules: {
    // Add additional rules here
  },
};
```

Given the above, the following patterns are considered violations:

```css
a {
  color: red;
  top: 0;
}
```

```css
a {
  top: 0;
  color: black;
  position: absolute;
  display: block;
}
```

The following patterns are _not_ considered violations:

```css
a {
  top: 0;
  color: red;
}
```

```css
a {
  display: block;
  position: absolute;
  top: 0;
  color: black;
}
```

Refer to [css-property-sort-order-smacss](https://github.com/cahamilton/css-property-sort-order-smacss/blob/v3.0.0/src/index.ts) for the comprehensive list of property orders.

For more information on configuring Stylelint, check out the [configuration](https://github.com/stylelint/stylelint/blob/17.0.0/docs/user-guide/configure.md) guide.

## Advanced Configuration

<!-- eslint-disable-next-line markdown/no-missing-label-refs -->
> [!NOTE]
> This requires a JavaScript configuration file (eg. `stylelint.config.js`, `stylelint.config.mjs`) and is not supported by JSON, YAML or other file formats.

The basic configuration outlined above, will enforce that properties are **strictly** sorted within their groups (box, border, background etc). Given this configuration makes use of [stylelint-order](https://github.com/hudochenkov/stylelint-order/tree/7.0.1), there's a couple extra bits of functionality that can be configured. This will require manually generating the configuration - but passing in extra options as required. These will be applied to **each** property group.

### Options

```ts
type Options = {
  emptyLineBefore?: 'always' | 'never' | 'threshold';
  noEmptyLineBetween?: boolean;
  order?: 'flexible';
};
```

Refer to the [properties-order](https://github.com/hudochenkov/stylelint-order/blob/7.0.1/rules/properties-order/README.md#options) documentation for more information on available options.

All options except `properties` and `groupName` can be modified.

### Examples

#### Flexible Ordering

This will allow properties within the same group to be in any order.

Given:

```js
// stylelint.config.js

import generateConfig from 'stylelint-config-property-sort-order-smacss/generate';

export default {
  plugins: ['stylelint-order'],
  rules: {
    'order/properties-order': generateConfig(),
  },
};
```

The following patterns are considered violations:

```css
a {
  top: 0;
  position: absolute;
  display: block;
  color: black;
}
```

Given:

```js
// stylelint.config.js

import generateConfig from 'stylelint-config-property-sort-order-smacss/generate';

export default {
  plugins: ['stylelint-order'],
  rules: {
    'order/properties-order': generateConfig({
      order: 'flexible',
    }),
  },
};
```

The following patterns are _not_ considered violations:

```css
a {
  top: 0;
  position: absolute;
  display: block;
  color: black;
}
```

#### Empty Line After Property Group

This will allow an empty line after each property group:

Given:

```js
// stylelint.config.js

import generateConfig from 'stylelint-config-property-sort-order-smacss/generate';

export default {
  plugins: ['stylelint-order'],
  rules: {
    'order/properties-order': generateConfig({
      emptyLineBefore: 'never',
    }),
  },
};
```

The following patterns are considered violations:

```css
a {
  display: block;
  position: absolute;
  top: 0;

  color: black;
}
```

Given:

```js
// stylelint.config.js

import generateConfig from 'stylelint-config-property-sort-order-smacss/generate';

export default {
  plugins: ['stylelint-order'],
  rules: {
    'order/properties-order': generateConfig({
      emptyLineBefore: 'always',
    }),
  },
};
```

The following patterns are _not_ considered violations:

```css
a {
  display: block;
  position: absolute;
  top: 0;

  color: black;
}
```
