/**
 * Copyright 2017 Shape Security, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License')
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const assert = require('assert');

const { LazyCloneReducer, default: reduce } = require('../');
const { parseScript, parseModule } = require('shift-parser');

const fs = require('fs');

suite('lazy-clone', () => {
  describe('everything.js', () => {
    it('should clone to itself', () => {
      let tree, clonedTree;

      tree = parseModule(fs.readFileSync(require.resolve('everything.js/es2015-module'), 'utf8'));
      clonedTree = reduce(new LazyCloneReducer, tree);
      assert.strictEqual(tree, clonedTree);

      tree = parseScript(fs.readFileSync(require.resolve('everything.js/es2015-script'), 'utf8'));
      clonedTree = reduce(new LazyCloneReducer, tree);
      assert.strictEqual(tree, clonedTree);
    });
  });

  describe('simple override', () => {
    let unchangedProgram = 'let a = "b"; null;';
    let changedProgram = 'let a = 0; null;';

    class IncrementReducer extends LazyCloneReducer {
      reduceLiteralNumericExpression(node) {
        return { type: 'LiteralNumericExpression', value: node.value + 1 };
      }
    }

    it('should not mutate a program not containing an overridden type', () => {
      let tree = parseScript(unchangedProgram);
      let newTree = reduce(new IncrementReducer, tree);
      assert.strictEqual(tree, newTree);
    });

    it('should mutate a program containing an overridden type', () => {
      let tree = parseScript(changedProgram);
      let newTree = reduce(new IncrementReducer, tree);
      assert.notEqual(tree, newTree);
      assert.deepEqual(newTree, {
        type: 'Script',
        directives: [],
        statements: [{
          type: 'VariableDeclarationStatement',
          declaration: {
            type: 'VariableDeclaration',
            kind: 'let',
            declarators: [{
              type: 'VariableDeclarator',
              binding: {
                type: 'BindingIdentifier',
                name: 'a',
              },
              init: {
                type: 'LiteralNumericExpression',
                value: 1,
              },
            }],
          },
        }, {
          type: 'ExpressionStatement',
          expression: {
            type: 'LiteralNullExpression',
          },
        }],
      });

      assert.strictEqual(tree.statements[1], newTree.statements[1]);
    });
  });
});
