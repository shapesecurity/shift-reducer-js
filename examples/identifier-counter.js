import parse from "shift-parser";
import reduce, {MonoidalReducer} from "shift-reducer";

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

  reduceIdentifierExpression(node, identifier) {
    return 1;
  }
}

let program = `function f() { hello(world); }`;
console.dir(IdentifierCounter.count(parse(program)));
