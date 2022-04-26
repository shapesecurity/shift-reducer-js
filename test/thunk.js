/**
 * Copyright 2018 Shape Security, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const assert = require('assert');

const { default: reduce, thunkedReduce, MonoidalReducer, ThunkedMonoidalReducer, LazyCloneReducer, thunkify, thunkifyClass, memoize } = require('../');
const { parseScript } = require('shift-parser');
const spec = require('shift-spec');


function instrument(reducer, effects) {
  const out = {};
  for (const type in spec) {
    if (!{}.hasOwnProperty.call(spec, type)) continue;
    const name = 'reduce' + type;
    out[name] = (...args) => {
      effects.push(type);
      return reducer[name](...args);
    };
  }
  return out;
}

const sampleTree = parseScript(`
  'a directive';
  null;
  {
    debugger;
  }
  0;
  f(1);
`);

const postorder = [
  'Directive',
  'LiteralNullExpression',
  'ExpressionStatement',
  'DebuggerStatement',
  'Block',
  'BlockStatement',
  'LiteralNumericExpression',
  'ExpressionStatement',
  'IdentifierExpression',
  'LiteralNumericExpression',
  'CallExpression',
  'ExpressionStatement',
  'Script',
];

const preorder = [
  'Script',
  'Directive',
  'ExpressionStatement',
  'LiteralNullExpression',
  'BlockStatement',
  'Block',
  'DebuggerStatement',
  'ExpressionStatement',
  'LiteralNumericExpression',
  'ExpressionStatement',
  'CallExpression',
  'IdentifierExpression',
  'LiteralNumericExpression',
];

suite('thunk', () => {
  test('regular monoidal reducer visits in postorder', () => {
    const reducer = new MonoidalReducer({
      empty: () => false,
      concat: (a, b) => a || b,
    });

    const effects = [];
    const reduced = reduce(instrument(reducer, effects), sampleTree);
    assert.strictEqual(reduced, false);
    assert.deepStrictEqual(effects, postorder);
  });

  test('thunked monoidal reducer visits in preorder', () => {
    const reducer = new ThunkedMonoidalReducer({
      empty: () => false,
      concatThunk: (a, b) => a || b(),
    });

    const effects = [];
    const reduced = thunkedReduce(instrument(reducer, effects), sampleTree);
    assert.strictEqual(reduced, false);
    assert.deepStrictEqual(effects, preorder);
  });

  test('thunked monoidal reducer short-circuits given concatThunk and does not use concat', () => {
    class HasNullReducer extends ThunkedMonoidalReducer {
      constructor() {
        super({
          empty: () => false,
          concatThunk: (a, b) => a || b(),
          concat() {
            throw new Error('not reached');
          },
        });
      }

      reduceLiteralNullExpression() {
        return true;
      }
    }
    const reducer = new HasNullReducer;

    const effects = [];
    const reduced = thunkedReduce(instrument(reducer, effects), sampleTree);
    assert.strictEqual(reduced, true);
    assert.deepStrictEqual(effects, preorder.slice(0, preorder.indexOf('LiteralNullExpression') + 1));
  });

  test('thunked monoidal reducer short-circuits given isAbsorbing', () => {
    class HasNullReducer extends ThunkedMonoidalReducer {
      constructor() {
        super({
          empty: () => false,
          isAbsorbing: a => a,
          concat: (a, b) => a || b,
        });
      }

      reduceLiteralNullExpression() {
        return true;
      }
    }
    const reducer = new HasNullReducer;

    const effects = [];
    const reduced = thunkedReduce(instrument(reducer, effects), sampleTree);
    assert.strictEqual(reduced, true);
    assert.deepStrictEqual(effects, preorder.slice(0, preorder.indexOf('LiteralNullExpression') + 1));
  });

  test('thunked monoidal reducer works with regular monoid', () => {
    class HasNullReducer extends ThunkedMonoidalReducer {
      constructor() {
        super({
          empty: () => false,
          concat: (a, b) => a || b,
        });
      }

      reduceLiteralNullExpression() {
        return true;
      }
    }
    const reducer = new HasNullReducer;

    const effects = [];
    const reduced = thunkedReduce(instrument(reducer, effects), sampleTree);
    assert.strictEqual(reduced, true);
    assert.deepStrictEqual(effects, preorder);
  });

  test('thunked monoidal reducer avoids descending unnecessarily', () => {
    class ReducerAvoidingBlocks extends ThunkedMonoidalReducer {
      constructor() {
        super({
          empty: () => false,
          concatThunk: (a, b) => a || b(),
        });
      }

      reduceBlockStatement() {
        return false;
      }
    }
    const reducer = new ReducerAvoidingBlocks;

    const effects = [];
    const reduced = thunkedReduce(instrument(reducer, effects), sampleTree);
    assert.strictEqual(reduced, false);
    assert.deepStrictEqual(effects, [
      'Script',
      'Directive',
      'ExpressionStatement',
      'LiteralNullExpression',
      'BlockStatement', // Note: no 'Block' or 'DebuggerStatement'
      'ExpressionStatement',
      'LiteralNumericExpression',
      'ExpressionStatement',
      'CallExpression',
      'IdentifierExpression',
      'LiteralNumericExpression',
    ]);
  });
});

suite('memoize', () => {
  test('memoized thunkified LazyCloneReducer bails as early as possible with cached value on subsequent runs', () => {
    class IncrementingReducer extends LazyCloneReducer {
      reduceLiteralNumericExpression(node) {
        return {
          type: 'LiteralNumericExpression',
          value: node.value + 1,
        };
      }
    }
    const thunkifiedFromObject = memoize(thunkify(new IncrementingReducer));


    class ThunkedIncrementingReducer extends thunkifyClass(LazyCloneReducer) {
      reduceLiteralNumericExpression(node) {
        return {
          type: 'LiteralNumericExpression',
          value: node.value + 1,
        };
      }
    }
    const thunkifiedFromClass = memoize(new ThunkedIncrementingReducer);

    [thunkifiedFromObject, thunkifiedFromClass].forEach(reducer => {
      const effects = [];
      const reduced = thunkedReduce(instrument(reducer, effects), sampleTree);
      assert.strictEqual(reduced.statements[2].expression.value, sampleTree.statements[2].expression.value + 1);
      assert.deepStrictEqual(effects, preorder);

      const effects2 = [];
      const reduced2 = thunkedReduce(instrument(reducer, effects2), sampleTree);
      assert.strictEqual(reduced2, reduced); // Note: ===, not just equivalent
      assert.deepStrictEqual(effects2, [
        'Script',
      ]);

      const effects3 = [];
      const reduced3 = thunkedReduce(instrument(reducer, effects3), reduced);
      assert.strictEqual(reduced3.statements[2].expression.value, sampleTree.statements[2].expression.value + 2);
      assert.deepStrictEqual(effects3, [
        'Script',
        'Directive',
        'ExpressionStatement', // Note: the LiteralNullExpression and the Block are not revisited
        'BlockStatement',
        'ExpressionStatement',
        'LiteralNumericExpression',
        'ExpressionStatement',
        'CallExpression',
        'IdentifierExpression',
        'LiteralNumericExpression',
      ]);
    });
  });
});
