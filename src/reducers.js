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

import MonoidalReducer from './monoidal-reducer.js';
import ThunkedMonoidalReducer from './thunked-monoidal-reducer.js';

const PlusMonoid = {
  empty() {
    return 0;
  },
  concat(other) {
    return this + other;
  },
};

const ConcatMonoid = {
  empty() {
    return [];
  },
  concat(other) {
    return this.concat(other);
  },
};

const AndMonoid = {
  empty() {
    return true;
  },
  concat(other) {
    return this && other;
  },
  concatThunk(otherThunk) {
    return this && otherThunk();
  },
};

const OrMonoid = {
  empty() {
    return false;
  },
  concat(other) {
    return this || other;
  },
  concatThunk(otherThunk) {
    return this || otherThunk();
  },
};


export class PlusReducer extends MonoidalReducer {
  constructor() {
    super(PlusMonoid);
  }
}

export class ThunkedPlusReducer extends ThunkedMonoidalReducer {
  constructor() {
    super(PlusMonoid);
  }
}

export class ConcatReducer extends MonoidalReducer {
  constructor() {
    super(ConcatMonoid);
  }
}

export class ThunkedConcatReducer extends ThunkedMonoidalReducer {
  constructor() {
    super(ConcatMonoid);
  }
}

export class AndReducer extends MonoidalReducer {
  constructor() {
    super(AndMonoid);
  }
}

export class ThunkedAndReducer extends ThunkedMonoidalReducer {
  constructor() {
    super(AndMonoid);
  }
}

export class OrReducer extends MonoidalReducer {
  constructor() {
    super(OrMonoid);
  }
}

export class ThunkedOrReducer extends ThunkedMonoidalReducer {
  constructor() {
    super(OrMonoid);
  }
}
