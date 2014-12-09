import * as assert from "assert"

import * as AST from "laserbat-ast"
import reduce, {MonoidalReducible} from "."

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
