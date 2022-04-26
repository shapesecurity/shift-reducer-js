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

'use strict';

const MonoidalReducer = require('../gen/monoidal-reducer.js');
const ThunkedMonoidalReducer = require('../gen/thunked-monoidal-reducer.js');

const PlusMonoid = {
  empty: () => 0,
  concat: (a, b) => a + b,
};

const ConcatMonoid = {
  empty: () => [],
  concat: (a, b) => a.concat(b),
};

const AndMonoid = {
  empty: () => true,
  concat: (a, b) => a && b,
  concatThunk: (a, b) => a && b(),
};

const OrMonoid = {
  empty: () => false,
  concat: (a, b) => a || b,
  concatThunk: (a, b) => a || b(),
};


exports.PlusReducer = class PlusReducer extends MonoidalReducer {
  constructor() {
    super(PlusMonoid);
  }
};

exports.ThunkedPlusReducer = class ThunkedPlusReducer extends ThunkedMonoidalReducer {
  constructor() {
    super(PlusMonoid);
  }
};

exports.ConcatReducer = class ConcatReducer extends MonoidalReducer {
  constructor() {
    super(ConcatMonoid);
  }
};

exports.ThunkedConcatReducer = class ThunkedConcatReducer extends ThunkedMonoidalReducer {
  constructor() {
    super(ConcatMonoid);
  }
};

exports.AndReducer = class AndReducer extends MonoidalReducer {
  constructor() {
    super(AndMonoid);
  }
};

exports.ThunkedAndReducer = class ThunkedAndReducer extends ThunkedMonoidalReducer {
  constructor() {
    super(AndMonoid);
  }
};

exports.OrReducer = class OrReducer extends MonoidalReducer {
  constructor() {
    super(OrMonoid);
  }
};

exports.ThunkedOrReducer = class ThunkedOrReducer extends ThunkedMonoidalReducer {
  constructor() {
    super(OrMonoid);
  }
};
