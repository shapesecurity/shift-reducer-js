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

import * as AST from "laserbat-ast"
import reduce, {MonoidalReducible} from "../"

suite("MonoidalReducible", () => {

  test("simple IdentifierCounter example", () => {

    class IdentifierCounter extends MonoidalReducible {
      static count(program) {
        return reduce(new this, program);
      }

      constructor() {
        super(class Sum {
          static empty() { return 0; }
          concat(a) { return this + a; }
        });
      }

      reduceIdentifierExpression(node, identifier) {
        return 1;
      }
    }

    const PROGRAM = new AST.Script(new AST.FunctionBody([], [
      new AST.ExpressionStatement(new AST.CallExpression(
        new AST.IdentifierExpression(new AST.Identifier("f")),
        [
          new AST.IdentifierExpression(new AST.Identifier("a")),
          new AST.IdentifierExpression(new AST.Identifier("b")),
        ]
      )),
    ]));

    assert.equal(IdentifierCounter.count(PROGRAM), 3);
  });

});
