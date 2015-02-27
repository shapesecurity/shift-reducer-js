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

import MonoidalReducer from "./monoidal-reducer"
export {MonoidalReducer};


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
  LiteralInfinityExpression: [],
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
    o[T] = function(reducer, node) {
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
