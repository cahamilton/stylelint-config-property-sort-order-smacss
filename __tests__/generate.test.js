'use strict';

const generate = require('../generate');

describe('generate', () => {
  it('should flatten grouped properties into a single array', () => {
    const order = {
      "groupA": [
        [
          "prop1",
          "prop2",
        ],
        [
          "prop3",
        ],
      ],
      "groupB": [
        "prop4",
        "prop5",
        "prop6",
        "prop7",
      ],
      "groupC": [
        [
          "prop8",
          "prop9",
          "prop10",
        ],
      ],
    };
    const expected = [
      'prop1',
      'prop2',
      'prop3',
      'prop4',
      'prop5',
      'prop6',
      'prop7',
      'prop8',
      'prop9',
      'prop10',
    ];
    const actual = generate(order);

    expect(actual).toEqual(expected);
  });
});
