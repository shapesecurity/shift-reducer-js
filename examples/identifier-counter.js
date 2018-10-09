const { parseScript } = require('shift-parser');
const { reduce, MonoidalReducer } = require('..');

class IdentifierCounter extends MonoidalReducer {
  static count(program) {
    return reduce(new this, program);
  }

  constructor() {
    // The constructor can be omitted entirely by extending PlusReducer instead of MonoidalReducer
    class Sum {
      static empty() {
        return 0;
      }
      concat(a) {
        return this + a;
      }
    }
    super(Sum);
  }

  reduceIdentifierExpression(node) {
    return 1;
  }
}

let program = 'function f() { hello(world); }';
console.dir(IdentifierCounter.count(parseScript(program)));
