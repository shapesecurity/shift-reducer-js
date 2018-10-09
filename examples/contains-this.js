'use strict';

const { parseScript } = require('shift-parser');
const { thunkedReduce, ThunkedMonoidalReducer } = require('..');

class ContainsThisReducer extends ThunkedMonoidalReducer {
  static containsThis(fn) {
    if (fn.type !== 'FunctionExpression' && fn.type !== 'FunctionDeclaration') {
      throw new TypeError('ContainsThisReducer must be passed a function node');
    }
    return thunkedReduce(new this, fn.params) || thunkedReduce(new this, fn.body);
  }

  constructor() {
    super({
      empty: () => false,
      concatThunk: (a, b) => a || b(),
    });

    /* Equivalently:
    super({
      empty: () => false,
      isAbsorbing: a => a,
      concat: (a, b) => a || b,
    });
    */
  }

  reduceThisExpression(node) {
    return true;
  }

  reduceFunctionDeclaration() {
    return false;
  }

  reduceFunctionExpression() {
    return false;
  }

  reduceGetter(node, { name, body }) {
    return name();
  }

  reduceSetter({ name, param, body }) {
    return name();
  }

  reduceMethod(node, { name, params, body }) {
    return name();
  }
}

let functionWithoutThis = parseScript(`
  function f() {
    return function inner() {
      return this;
    }
  }
`).statements[0];
console.log(ContainsThisReducer.containsThis(functionWithoutThis));

let functionWithThis = parseScript(`
  function f() {
    return () => this;
  }
`).statements[0];
console.log(ContainsThisReducer.containsThis(functionWithThis));
