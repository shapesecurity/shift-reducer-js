/**
 * Copyright 2016 Shape Security, Inc.
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

// const assert = require('assert');

// const { CloneReducer, default: reduce } = require('../');
// const { parseScript, parseModule } = require('shift-parser');

// const fs = require('fs');

// suite('clone', () => {
//   describe('everything.js', () => {
//     it('should clone to a thing which is equal to itself, but not itself', () => {
//       let tree, clonedTree;

//       tree = parseModule(fs.readFileSync(require.resolve('everything.js/es2015-module'), 'utf8'));
//       clonedTree = reduce(new CloneReducer, tree);
//       assert.deepEqual(tree, clonedTree);
//       assert.notEqual(tree, clonedTree);

//       tree = parseScript(fs.readFileSync(require.resolve('everything.js/es2015-script'), 'utf8'));
//       clonedTree = reduce(new CloneReducer, tree);
//       assert.deepEqual(tree, clonedTree);
//       assert.notEqual(tree, clonedTree);
//     });
//   });
// });
