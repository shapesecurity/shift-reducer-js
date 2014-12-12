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

import * as AST from "laserbat-ast"


function recurse(branch) {
  return function(reducer, node) {
    let branchNode = node[branch];
    return DRIVER[branchNode.type](reducer, branchNode);
  };
}

function recurseMaybe(branch) {
  return function(reducer, node) {
    let branchNode = node[branch];
    if (branchNode == null) return null;
    return DRIVER[branchNode.type](reducer, branchNode);
  };
}

function recurseList(branch) {
  return function(reducer, node) {
    return [].map.call(node[branch], (n) => DRIVER[n.type](reducer, n));
  };
}

function recurseListMaybe(branch) {
  return function(reducer, node) {
    return [].map.call(node[branch], (n) => {
      if (n == null) return null;
      return DRIVER[n.type](reducer, n);
    });
  };
}

const REDUCER_SPEC = {
  ArrayExpression: [recurseListMaybe('elements')],
  AssignmentExpression: [recurse('binding'), recurse('expression')],
  BinaryExpression: [recurse('left'), recurse('right')],
  Block: [recurseList('statements')],
  BlockStatement: [recurse('block')],
  BreakStatement: [recurseMaybe('label')],
  CallExpression: [recurse('callee'), recurseList('arguments')],
  CatchClause: [recurse('binding'), recurse('body')],
  ComputedMemberExpression: [recurse('object'), recurse('expression')],
  ConditionalExpression: [recurse('test'), recurse('consequent'), recurse('alternate')],
  ContinueStatement: [recurseMaybe('label')],
  DataProperty: [recurse('name'), recurse('expression')],
  DebuggerStatement: [],
  DoWhileStatement: [recurse('body'), recurse('test')],
  EmptyStatement: [],
  ExpressionStatement: [recurse('expression')],
  ForInStatement: [recurse('left'), recurse('right'), recurse('body')],
  ForStatement: [recurseMaybe('init'), recurseMaybe('test'), recurseMaybe('update'), recurse('body')],
  FunctionBody: [recurseList('directives'), recurseList('statements')],
  FunctionDeclaration: [recurse('name'), recurseList('parameters'), recurse('body')],
  FunctionExpression: [recurseMaybe('name'), recurseList('parameters'), recurse('body')],
  Getter: [recurse('name'), recurse('body')],
  Identifier: [],
  IdentifierExpression: [recurse('identifier')],
  IfStatement: [recurse('test'), recurse('consequent'), recurseMaybe('alternate')],
  LabeledStatement: [recurse('label'), recurse('body')],
  LiteralBooleanExpression: [],
  LiteralNullExpression: [],
  LiteralNumericExpression: [],
  LiteralRegExpExpression: [],
  LiteralStringExpression: [],
  NewExpression: [recurse('callee'), recurseList('arguments')],
  ObjectExpression: [recurseList('properties')],
  PostfixExpression: [recurse('operand')],
  PrefixExpression: [recurse('operand')],
  PropertyName: [],
  ReturnStatement: [recurseMaybe('expression')],
  Script: [recurse('body')],
  Setter: [recurse('name'), recurse('parameter'), recurse('body')],
  StaticMemberExpression: [recurse('object'), recurse('property')],
  SwitchCase: [recurse('test'), recurseList('consequent')],
  SwitchDefault: [recurseList('consequent')],
  SwitchStatement: [recurse('discriminant'), recurseList('cases')],
  SwitchStatementWithDefault: [recurse('discriminant'), recurseList('preDefaultCases'), recurse('defaultCase'), recurseList('postDefaultCases')],
  ThisExpression: [],
  ThrowStatement: [recurse('expression')],
  TryCatchStatement: [recurse('body'), recurse('catchClause')],
  TryFinallyStatement: [recurse('body'), recurseMaybe('catchClause'), recurse('finalizer')],
  UnknownDirective: [],
  UseStrictDirective: [],
  VariableDeclaration: [recurseList('declarators')],
  VariableDeclarationStatement: [recurse('declaration')],
  VariableDeclarator: [recurse('binding'), recurseMaybe('init')],
  WhileStatement: [recurse('test'), recurse('body')],
  WithStatement: [recurse('object'), recurse('body')],
};

const DRIVER = (function(){
  var o = Object.create(null);
  for(let T in REDUCER_SPEC) {
    if(!{}.hasOwnProperty.call(REDUCER_SPEC, T)) continue;
    let reducingFunctionName = 'reduce' + T;
    o[AST[T].prototype.type] = function(reducer, node) {
      return reducer[reducingFunctionName].apply(reducer, [node].concat(
        REDUCER_SPEC[T].map((f) => f(reducer, node))
      ));
    };
  }
  return o;
}());


export default function reduce(reducer, reducible) {
  return DRIVER[reducible.type](reducer, reducible);
}


export class Reducer { }

export class MonoidalReducer extends Reducer {
  constructor(monoid) {
    let empty = monoid.empty();
    this.identity = () => empty;
    let concat = monoid.prototype && monoid.prototype.concat || monoid.concat;
    this.append = this.append2 = (a, b) => concat.call(a, b);
  }

  fromNull(a) {
    return a == null ? this.identity() : a;
  }
  append3(a, b, c) {
    return this.append(this.append(a, b), c);
  }
  append4(a, b, c, d) {
    return this.append(this.append3(a, b, c), d);
  }
  fold(as, a) {
    return as.reduce((memo, x) => this.append(memo, x), a == null ? this.identity() : a);
  }

  reduceArrayExpression(node, elements) {
    return this.fold(elements.filter((x) => x != null));
  }
  reduceAssignmentExpression(node, binding, expression) {
    return this.append(binding, expression);
  }
  reduceBinaryExpression(node, left, right) {
    return this.append(left, right);
  }
  reduceBlock(node, statements) {
    return this.fold(statements);
  }
  reduceBlockStatement(node, block) {
    return block;
  }
  reduceBreakStatement(node, label) {
    return this.fromNull(label);
  }
  reduceCallExpression(node, callee, args) {
    return this.fold(args, callee);
  }
  reduceCatchClause(node, binding, body) {
    return this.append(binding, body);
  }
  reduceComputedMemberExpression(node, object, expression) {
    return this.append(object, expression);
  }
  reduceConditionalExpression(node, test, consequent, alternate) {
    return this.append3(test, consequent, alternate);
  }
  reduceContinueStatement(node, label) {
    return this.fromNull(label);
  }
  reduceDataProperty(node, name, expression) {
    return this.append(name, expression);
  }
  reduceDebuggerStatement(node) {
    return this.identity();
  }
  reduceDoWhileStatement(node, body, test) {
    return this.append(body, test);
  }
  reduceEmptyStatement(node) {
    return this.identity();
  }
  reduceExpressionStatement(node, expression) {
    return expression;
  }
  reduceForInStatement(node, left, right, body) {
    return this.append3(left, right, body);
  }
  reduceForStatement(node, init, test, update, body) {
    return this.append4(this.fromNull(init), this.fromNull(test), this.fromNull(update), body);
  }
  reduceFunctionBody(node, directives, statements) {
    return this.append(this.fold(directives), this.fold(statements));
  }
  reduceFunctionDeclaration(node, name, parameters, body) {
    return this.append3(name, parameters, body);
  }
  reduceFunctionExpression(node) {
    return this.append3(this.fromNull(name), parameters, body);
  }
  reduceGetter(node, name, body) {
    return this.append(name, body);
  }
  reduceIdentifier(node) {
    return this.identity();
  }
  reduceIdentifierExpression(node, name) {
    return name;
  }
  reduceIfStatement(node, test, consequent, alternate) {
    return this.append3(test, consequent, this.fromNull(alternate));
  }
  reduceLabeledStatement(node, label, body) {
    return this.append(label, body);
  }
  reduceLiteralBooleanExpression(node) {
    return this.identity();
  }
  reduceLiteralNullExpression(node) {
    return this.identity();
  }
  reduceLiteralNumericExpression(node) {
    return this.identity();
  }
  reduceLiteralRegExpExpression(node) {
    return this.identity();
  }
  reduceLiteralStringExpression(node) {
    return this.identity();
  }
  reduceNewExpression(node, callee, args) {
    return this.fold(args, callee);
  }
  reduceObjectExpression(node, properties) {
    return this.fold(properties);
  }
  reducePostfixExpression(node, operand) {
    return operand;
  }
  reducePrefixExpression(node, operand) {
    return operand;
  }
  reducePropertyName(node) {
    return this.identity();
  }
  reduceReturnStatement(node, expression) {
    return this.fromNull(expression);
  }
  reduceScript(node, body) {
    return body;
  }
  reduceSetter(node, name, parameter, body) {
    return this.append3(name, parameter, body);
  }
  reduceStaticMemberExpression(node, object, property) {
    return this.append(object, property);
  }
  reduceSwitchCase(node, test, consequent) {
    return this.fold(consequent, test);
  }
  reduceSwitchDefault(node, consequent) {
    return this.fold(consequent);
  }
  reduceSwitchStatement(node, discriminant, cases) {
    return this.fold(cases, discriminant);
  }
  reduceSwitchStatementWithDefault(node, discriminant, preDefaultCases, defaultCase, postDefaultCases) {
    return this.append4(discriminant, this.fold(preDefaultCases), defaultCase, this.fold(postDefaultCases));
  }
  reduceThisExpression(node) {
    return this.identity();
  }
  reduceThrowStatement(node, expression) {
    return this.fromNull(expression);
  }
  reduceTryCatchStatement(node, block, catchClause) {
    return this.append(block, catchClause);
  }
  reduceTryFinallyStatement(node, block, catchClause, finalizer) {
    return this.append3(block, this.fromNull(catchClause), finalizer);
  }
  reduceUnknownDirective(node) {
    return this.identity();
  }
  reduceUseStrictDirective(node) {
    return this.identity();
  }
  reduceVariableDeclaration(node, declarators) {
    return this.fold(declarators);
  }
  reduceVariableDeclarationStatement(node, declaration) {
    return declaration;
  }
  reduceVariableDeclarator(node, binding, init) {
    return this.append(binding, this.fromNull(init));
  }
  reduceWhileStatement(node, test, body) {
    return this.append(test, body);
  }
  reduceWithStatement(node, object, body) {
    return this.append(object, body);
  }
}
