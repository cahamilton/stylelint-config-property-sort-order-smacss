/** @format */

'use strict';

const generate = require('../generate');

jest.mock('css-property-sort-order-smacss', () => ({
  groupA: [['prop1', 'prop2'], ['prop3']],
  groupB: ['prop4', 'prop5', 'prop6', 'prop7'],
  groupC: [['prop8', 'prop9', 'prop10']],
}));

describe('generate options', () => {
  it('should correctly group properties', () => {
    const options = generate();

    const expected = [
      {
        groupName: 'groupA',
        properties: ['prop1', 'prop2', 'prop3'],
      },
      {
        groupName: 'groupB',
        properties: ['prop4', 'prop5', 'prop6', 'prop7'],
      },
      {
        groupName: 'groupC',
        properties: ['prop8', 'prop9', 'prop10'],
      },
    ];

    expect(options).toEqual(expected);
  });

  it('should correctly group properties (with additional options)', () => {
    const options = generate({
      order: 'flexible',
      emptyLineBefore: 'always',
    });

    const expected = [
      {
        groupName: 'groupA',
        properties: ['prop1', 'prop2', 'prop3'],
        order: 'flexible',
        emptyLineBefore: 'always',
      },
      {
        groupName: 'groupB',
        properties: ['prop4', 'prop5', 'prop6', 'prop7'],
        order: 'flexible',
        emptyLineBefore: 'always',
      },
      {
        groupName: 'groupC',
        properties: ['prop8', 'prop9', 'prop10'],
        order: 'flexible',
        emptyLineBefore: 'always',
      },
    ];

    expect(options).toEqual(expected);
  });

  it('should not allow `groupName` or `properties` to be overridden', () => {
    const options = generate({
      groupName: 'someRandomGroupName',
      properties: ['some', 'random', 'props'],
    });

    const expected = [
      {
        groupName: 'groupA',
        properties: ['prop1', 'prop2', 'prop3'],
      },
      {
        groupName: 'groupB',
        properties: ['prop4', 'prop5', 'prop6', 'prop7'],
      },
      {
        groupName: 'groupC',
        properties: ['prop8', 'prop9', 'prop10'],
      },
    ];

    expect(options).toEqual(expected);
  });
});
