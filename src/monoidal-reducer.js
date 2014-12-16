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

export default class MonoidalReducer {
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
    return this.append(this.fold(parameters, name), body);
  }
  reduceFunctionExpression(node, name, parameters, body) {
    return this.append(this.fold(parameters, this.fromNull(name)), body);
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
