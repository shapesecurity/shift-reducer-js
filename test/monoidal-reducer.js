/**
 * Copyright 2016 Shape Security, Inc.
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

const assert = require("assert");

const {MonoidalReducer, default: reduce} = require("../");
const {parseModule} = require("shift-parser");

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

  test("simple IdentifierCollector example", () => {

    let EMPTY;
    class Collector {
      constructor(x) { this.value = x; }
      static empty() { return EMPTY; }
      concat(a) { return new Collector(this.value.concat(a.value)); }
    }
    EMPTY = new Collector([]);

    class IdentifierCollector extends MonoidalReducer {
      static collect(program) {
        return reduce(new this, program).value;
      }

      constructor() {
        super(Collector);
      }

      reduceIdentifierExpression(node, state) {
        return new Collector([node.name]);
      }
    }

    assert.deepEqual(IdentifierCollector.collect(parseModule("f(a, b, 2e308)")).sort(), ["a", "b", "f"]);
    assert.deepEqual(IdentifierCollector.collect(parseModule("[a, b]=0")), []);
    assert.deepEqual(IdentifierCollector.collect(parseModule("[a, b]")).sort(), ["a", "b"]);
    assert.deepEqual(IdentifierCollector.collect(parseModule("[a, b, ...c]")).sort(), ["a", "b", "c"]);
    assert.deepEqual(IdentifierCollector.collect(parseModule("[,a,,] = [,b,,]")), ["b"]);
    assert.deepEqual(IdentifierCollector.collect(parseModule("export {a as b} from 'a'; var a;")), []);
    assert.deepEqual(IdentifierCollector.collect(parseModule("this")), []);
  });

});
