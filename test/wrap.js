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

'use strict';

const assert = require('assert');

const { reduce, MonoidalReducer, wrap } = require('../');
const { parseModule } = require('shift-parser');

suite('wrap', () => {
  test('wrap wraps', () => {
    const plusReducer = new MonoidalReducer({
      empty() {
        return 0;
      },
      concat(other) {
        return this + other;
      },
    });
    const countNodes = wrap(plusReducer, d => d + 1);

    assert.equal(reduce(countNodes, parseModule('a + b')), 5);
  });

  test('wrap has node available to it', () => {
    const concatReducer = new MonoidalReducer({
      empty() {
        return [];
      },
      concat(other) {
        return this.concat(other);
      },
    });
    const listNodes = wrap(concatReducer, (d, node) => d.concat([node.type]));

    assert.deepStrictEqual(reduce(listNodes, parseModule('a + b')), [
      'IdentifierExpression',
      'IdentifierExpression',
      'BinaryExpression',
      'ExpressionStatement',
      'Module',
    ]);
  });
});
