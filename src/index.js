/*
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

const reduce = require('../gen/director.js');
const thunkedReduce = require('../gen/thunked-director.js');
const thunkify = require('../gen/thunkify.js');
const thunkifyClass = require('../gen/thunkify-class.js');
const memoize = require('../gen/memoize.js');
const CloneReducer = require('../gen/clone-reducer.js');
const LazyCloneReducer = require('../gen/lazy-clone-reducer.js');
const MonoidalReducer = require('../gen/monoidal-reducer.js');
const ThunkedMonoidalReducer = require('../gen/thunked-monoidal-reducer.js');
const adapt = require('../gen/adapt.js');
const { PlusReducer, ThunkedPlusReducer, ConcatReducer, ThunkedConcatReducer, AndReducer, ThunkedAndReducer, OrReducer, ThunkedOrReducer } = require('./reducers.js');

module.exports = {
  default: reduce,
  reduce,
  thunkedReduce,
  thunkify,
  thunkifyClass,
  memoize,
  CloneReducer,
  LazyCloneReducer,
  MonoidalReducer,
  ThunkedMonoidalReducer,
  adapt,
  PlusReducer,
  ThunkedPlusReducer,
  ConcatReducer,
  ThunkedConcatReducer,
  AndReducer,
  ThunkedAndReducer,
  OrReducer,
  ThunkedOrReducer,
};
