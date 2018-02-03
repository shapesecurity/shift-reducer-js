'use strict';

const { parseScript } = require('shift-parser');
const { thunkedReduce, LazyCloneReducer, thunkify, memoize } = require('..');

class IncrementingReducer extends LazyCloneReducer {
  reduceLiteralNumericExpression(node) {
    return {
      type: 'LiteralNumericExpression',
      value: node.value + 1,
    };
  }
}
let increment = memoize(thunkify(new IncrementingReducer));

let sample = parseScript('1 + 2; x;');
let updated = thunkedReduce(increment, sample);
console.dir(updated, { depth: null });

console.log(sample.statements[1] === updated.statements[1]); // true

let updatedAgain = thunkedReduce(increment, sample);
console.log(updated === updatedAgain); // true
