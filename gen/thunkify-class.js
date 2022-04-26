// Generated by generate-thunkify.js
/**
 * Copyright 2018 Shape Security, Inc.
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

module.exports = function thunkifyClass(reducerClass) {
  return class extends reducerClass {
    reduceArrayAssignmentTarget(node, { elements, rest }) {
      return super.reduceArrayAssignmentTarget(node, { elements: elements.map(n => n == null ? null : n()), rest: rest == null ? null : rest() });
    }

    reduceArrayBinding(node, { elements, rest }) {
      return super.reduceArrayBinding(node, { elements: elements.map(n => n == null ? null : n()), rest: rest == null ? null : rest() });
    }

    reduceArrayExpression(node, { elements }) {
      return super.reduceArrayExpression(node, { elements: elements.map(n => n == null ? null : n()) });
    }

    reduceArrowExpression(node, { params, body }) {
      return super.reduceArrowExpression(node, { params: params(), body: body() });
    }

    reduceAssignmentExpression(node, { binding, expression }) {
      return super.reduceAssignmentExpression(node, { binding: binding(), expression: expression() });
    }

    reduceAssignmentTargetIdentifier(node) {
      return super.reduceAssignmentTargetIdentifier(node);
    }

    reduceAssignmentTargetPropertyIdentifier(node, { binding, init }) {
      return super.reduceAssignmentTargetPropertyIdentifier(node, { binding: binding(), init: init == null ? null : init() });
    }

    reduceAssignmentTargetPropertyProperty(node, { name, binding }) {
      return super.reduceAssignmentTargetPropertyProperty(node, { name: name(), binding: binding() });
    }

    reduceAssignmentTargetWithDefault(node, { binding, init }) {
      return super.reduceAssignmentTargetWithDefault(node, { binding: binding(), init: init() });
    }

    reduceAwaitExpression(node, { expression }) {
      return super.reduceAwaitExpression(node, { expression: expression() });
    }

    reduceBinaryExpression(node, { left, right }) {
      return super.reduceBinaryExpression(node, { left: left(), right: right() });
    }

    reduceBindingIdentifier(node) {
      return super.reduceBindingIdentifier(node);
    }

    reduceBindingPropertyIdentifier(node, { binding, init }) {
      return super.reduceBindingPropertyIdentifier(node, { binding: binding(), init: init == null ? null : init() });
    }

    reduceBindingPropertyProperty(node, { name, binding }) {
      return super.reduceBindingPropertyProperty(node, { name: name(), binding: binding() });
    }

    reduceBindingWithDefault(node, { binding, init }) {
      return super.reduceBindingWithDefault(node, { binding: binding(), init: init() });
    }

    reduceBlock(node, { statements }) {
      return super.reduceBlock(node, { statements: statements.map(n => n()) });
    }

    reduceBlockStatement(node, { block }) {
      return super.reduceBlockStatement(node, { block: block() });
    }

    reduceBreakStatement(node) {
      return super.reduceBreakStatement(node);
    }

    reduceCallExpression(node, { callee, arguments: _arguments }) {
      return super.reduceCallExpression(node, { callee: callee(), arguments: _arguments.map(n => n()) });
    }

    reduceCatchClause(node, { binding, body }) {
      return super.reduceCatchClause(node, { binding: binding(), body: body() });
    }

    reduceClassDeclaration(node, { name, super: _super, elements }) {
      return super.reduceClassDeclaration(node, { name: name(), super: _super == null ? null : _super(), elements: elements.map(n => n()) });
    }

    reduceClassElement(node, { method }) {
      return super.reduceClassElement(node, { method: method() });
    }

    reduceClassExpression(node, { name, super: _super, elements }) {
      return super.reduceClassExpression(node, { name: name == null ? null : name(), super: _super == null ? null : _super(), elements: elements.map(n => n()) });
    }

    reduceCompoundAssignmentExpression(node, { binding, expression }) {
      return super.reduceCompoundAssignmentExpression(node, { binding: binding(), expression: expression() });
    }

    reduceComputedMemberAssignmentTarget(node, { object, expression }) {
      return super.reduceComputedMemberAssignmentTarget(node, { object: object(), expression: expression() });
    }

    reduceComputedMemberExpression(node, { object, expression }) {
      return super.reduceComputedMemberExpression(node, { object: object(), expression: expression() });
    }

    reduceComputedPropertyName(node, { expression }) {
      return super.reduceComputedPropertyName(node, { expression: expression() });
    }

    reduceConditionalExpression(node, { test, consequent, alternate }) {
      return super.reduceConditionalExpression(node, { test: test(), consequent: consequent(), alternate: alternate() });
    }

    reduceContinueStatement(node) {
      return super.reduceContinueStatement(node);
    }

    reduceDataProperty(node, { name, expression }) {
      return super.reduceDataProperty(node, { name: name(), expression: expression() });
    }

    reduceDebuggerStatement(node) {
      return super.reduceDebuggerStatement(node);
    }

    reduceDirective(node) {
      return super.reduceDirective(node);
    }

    reduceDoWhileStatement(node, { body, test }) {
      return super.reduceDoWhileStatement(node, { body: body(), test: test() });
    }

    reduceEmptyStatement(node) {
      return super.reduceEmptyStatement(node);
    }

    reduceExport(node, { declaration }) {
      return super.reduceExport(node, { declaration: declaration() });
    }

    reduceExportAllFrom(node) {
      return super.reduceExportAllFrom(node);
    }

    reduceExportDefault(node, { body }) {
      return super.reduceExportDefault(node, { body: body() });
    }

    reduceExportFrom(node, { namedExports }) {
      return super.reduceExportFrom(node, { namedExports: namedExports.map(n => n()) });
    }

    reduceExportFromSpecifier(node) {
      return super.reduceExportFromSpecifier(node);
    }

    reduceExportLocalSpecifier(node, { name }) {
      return super.reduceExportLocalSpecifier(node, { name: name() });
    }

    reduceExportLocals(node, { namedExports }) {
      return super.reduceExportLocals(node, { namedExports: namedExports.map(n => n()) });
    }

    reduceExpressionStatement(node, { expression }) {
      return super.reduceExpressionStatement(node, { expression: expression() });
    }

    reduceForAwaitStatement(node, { left, right, body }) {
      return super.reduceForAwaitStatement(node, { left: left(), right: right(), body: body() });
    }

    reduceForInStatement(node, { left, right, body }) {
      return super.reduceForInStatement(node, { left: left(), right: right(), body: body() });
    }

    reduceForOfStatement(node, { left, right, body }) {
      return super.reduceForOfStatement(node, { left: left(), right: right(), body: body() });
    }

    reduceForStatement(node, { init, test, update, body }) {
      return super.reduceForStatement(node, { init: init == null ? null : init(), test: test == null ? null : test(), update: update == null ? null : update(), body: body() });
    }

    reduceFormalParameters(node, { items, rest }) {
      return super.reduceFormalParameters(node, { items: items.map(n => n()), rest: rest == null ? null : rest() });
    }

    reduceFunctionBody(node, { directives, statements }) {
      return super.reduceFunctionBody(node, { directives: directives.map(n => n()), statements: statements.map(n => n()) });
    }

    reduceFunctionDeclaration(node, { name, params, body }) {
      return super.reduceFunctionDeclaration(node, { name: name(), params: params(), body: body() });
    }

    reduceFunctionExpression(node, { name, params, body }) {
      return super.reduceFunctionExpression(node, { name: name == null ? null : name(), params: params(), body: body() });
    }

    reduceGetter(node, { name, body }) {
      return super.reduceGetter(node, { name: name(), body: body() });
    }

    reduceIdentifierExpression(node) {
      return super.reduceIdentifierExpression(node);
    }

    reduceIfStatement(node, { test, consequent, alternate }) {
      return super.reduceIfStatement(node, { test: test(), consequent: consequent(), alternate: alternate == null ? null : alternate() });
    }

    reduceImport(node, { defaultBinding, namedImports }) {
      return super.reduceImport(node, { defaultBinding: defaultBinding == null ? null : defaultBinding(), namedImports: namedImports.map(n => n()) });
    }

    reduceImportNamespace(node, { defaultBinding, namespaceBinding }) {
      return super.reduceImportNamespace(node, { defaultBinding: defaultBinding == null ? null : defaultBinding(), namespaceBinding: namespaceBinding() });
    }

    reduceImportSpecifier(node, { binding }) {
      return super.reduceImportSpecifier(node, { binding: binding() });
    }

    reduceLabeledStatement(node, { body }) {
      return super.reduceLabeledStatement(node, { body: body() });
    }

    reduceLiteralBooleanExpression(node) {
      return super.reduceLiteralBooleanExpression(node);
    }

    reduceLiteralInfinityExpression(node) {
      return super.reduceLiteralInfinityExpression(node);
    }

    reduceLiteralNullExpression(node) {
      return super.reduceLiteralNullExpression(node);
    }

    reduceLiteralNumericExpression(node) {
      return super.reduceLiteralNumericExpression(node);
    }

    reduceLiteralRegExpExpression(node) {
      return super.reduceLiteralRegExpExpression(node);
    }

    reduceLiteralStringExpression(node) {
      return super.reduceLiteralStringExpression(node);
    }

    reduceMethod(node, { name, params, body }) {
      return super.reduceMethod(node, { name: name(), params: params(), body: body() });
    }

    reduceModule(node, { directives, items }) {
      return super.reduceModule(node, { directives: directives.map(n => n()), items: items.map(n => n()) });
    }

    reduceNewExpression(node, { callee, arguments: _arguments }) {
      return super.reduceNewExpression(node, { callee: callee(), arguments: _arguments.map(n => n()) });
    }

    reduceNewTargetExpression(node) {
      return super.reduceNewTargetExpression(node);
    }

    reduceObjectAssignmentTarget(node, { properties, rest }) {
      return super.reduceObjectAssignmentTarget(node, { properties: properties.map(n => n()), rest: rest == null ? null : rest() });
    }

    reduceObjectBinding(node, { properties, rest }) {
      return super.reduceObjectBinding(node, { properties: properties.map(n => n()), rest: rest == null ? null : rest() });
    }

    reduceObjectExpression(node, { properties }) {
      return super.reduceObjectExpression(node, { properties: properties.map(n => n()) });
    }

    reduceReturnStatement(node, { expression }) {
      return super.reduceReturnStatement(node, { expression: expression == null ? null : expression() });
    }

    reduceScript(node, { directives, statements }) {
      return super.reduceScript(node, { directives: directives.map(n => n()), statements: statements.map(n => n()) });
    }

    reduceSetter(node, { name, param, body }) {
      return super.reduceSetter(node, { name: name(), param: param(), body: body() });
    }

    reduceShorthandProperty(node, { name }) {
      return super.reduceShorthandProperty(node, { name: name() });
    }

    reduceSpreadElement(node, { expression }) {
      return super.reduceSpreadElement(node, { expression: expression() });
    }

    reduceSpreadProperty(node, { expression }) {
      return super.reduceSpreadProperty(node, { expression: expression() });
    }

    reduceStaticMemberAssignmentTarget(node, { object }) {
      return super.reduceStaticMemberAssignmentTarget(node, { object: object() });
    }

    reduceStaticMemberExpression(node, { object }) {
      return super.reduceStaticMemberExpression(node, { object: object() });
    }

    reduceStaticPropertyName(node) {
      return super.reduceStaticPropertyName(node);
    }

    reduceSuper(node) {
      return super.reduceSuper(node);
    }

    reduceSwitchCase(node, { test, consequent }) {
      return super.reduceSwitchCase(node, { test: test(), consequent: consequent.map(n => n()) });
    }

    reduceSwitchDefault(node, { consequent }) {
      return super.reduceSwitchDefault(node, { consequent: consequent.map(n => n()) });
    }

    reduceSwitchStatement(node, { discriminant, cases }) {
      return super.reduceSwitchStatement(node, { discriminant: discriminant(), cases: cases.map(n => n()) });
    }

    reduceSwitchStatementWithDefault(node, { discriminant, preDefaultCases, defaultCase, postDefaultCases }) {
      return super.reduceSwitchStatementWithDefault(node, { discriminant: discriminant(), preDefaultCases: preDefaultCases.map(n => n()), defaultCase: defaultCase(), postDefaultCases: postDefaultCases.map(n => n()) });
    }

    reduceTemplateElement(node) {
      return super.reduceTemplateElement(node);
    }

    reduceTemplateExpression(node, { tag, elements }) {
      return super.reduceTemplateExpression(node, { tag: tag == null ? null : tag(), elements: elements.map(n => n()) });
    }

    reduceThisExpression(node) {
      return super.reduceThisExpression(node);
    }

    reduceThrowStatement(node, { expression }) {
      return super.reduceThrowStatement(node, { expression: expression() });
    }

    reduceTryCatchStatement(node, { body, catchClause }) {
      return super.reduceTryCatchStatement(node, { body: body(), catchClause: catchClause() });
    }

    reduceTryFinallyStatement(node, { body, catchClause, finalizer }) {
      return super.reduceTryFinallyStatement(node, { body: body(), catchClause: catchClause == null ? null : catchClause(), finalizer: finalizer() });
    }

    reduceUnaryExpression(node, { operand }) {
      return super.reduceUnaryExpression(node, { operand: operand() });
    }

    reduceUpdateExpression(node, { operand }) {
      return super.reduceUpdateExpression(node, { operand: operand() });
    }

    reduceVariableDeclaration(node, { declarators }) {
      return super.reduceVariableDeclaration(node, { declarators: declarators.map(n => n()) });
    }

    reduceVariableDeclarationStatement(node, { declaration }) {
      return super.reduceVariableDeclarationStatement(node, { declaration: declaration() });
    }

    reduceVariableDeclarator(node, { binding, init }) {
      return super.reduceVariableDeclarator(node, { binding: binding(), init: init == null ? null : init() });
    }

    reduceWhileStatement(node, { test, body }) {
      return super.reduceWhileStatement(node, { test: test(), body: body() });
    }

    reduceWithStatement(node, { object, body }) {
      return super.reduceWithStatement(node, { object: object(), body: body() });
    }

    reduceYieldExpression(node, { expression }) {
      return super.reduceYieldExpression(node, { expression: expression == null ? null : expression() });
    }

    reduceYieldGeneratorExpression(node, { expression }) {
      return super.reduceYieldGeneratorExpression(node, { expression: expression() });
    }
  };
};
