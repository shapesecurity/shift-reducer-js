/**
 * Copyright 2014 Shape Security, Inc.
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

import * as assert from "assert"

import reduce, {MonoidalReducer} from "../";
import {parseModule} from "shift-parser";

suite("MonoidalReducer", () => {

  test("simple IdentifierCounter example", () => {

    class IdentifierCounter extends MonoidalReducer {
      static count(program) {
        return reduce(new this, program);
      }

      constructor() {
        super(class Sum {
          static empty() { return 0; }
          concat(a) { return this + a; }
        });
      }

      reduceIdentifierExpression(node, state) {
        return 1;
      }
    }

    assert.equal(IdentifierCounter.count(parseModule("f(a, b, 2e308)")), 3);
    assert.equal(IdentifierCounter.count(parseModule("[a, b]=0")), 0);
    assert.equal(IdentifierCounter.count(parseModule("[a, b]")), 2);
    assert.equal(IdentifierCounter.count(parseModule("[a, b, ...c]")), 3);
    assert.equal(IdentifierCounter.count(parseModule("[,a,,] = [,b,,]")), 1);
    assert.equal(IdentifierCounter.count(parseModule("export {a as b} from 'a'; var a;")), 0);
    assert.equal(IdentifierCounter.count(parseModule("this")), 0);
  });

});
