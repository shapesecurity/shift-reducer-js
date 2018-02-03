import { parseScript } from 'shift-parser';
import reduce, { MonoidalReducer } from '../';

class IdentifierCounter extends MonoidalReducer {
  static count(program) {
    return reduce(new this, program);
  }

  constructor() {
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
