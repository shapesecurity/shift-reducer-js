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

export default function thunkify(reducer) {
  return {
    reduceArrayAssignmentTarget(node, { elements, rest }) {
      return reducer.reduceArrayAssignmentTarget(node, { elements: elements.map(n => n == null ? null : n()), rest: rest == null ? null : rest() });
    },

    reduceArrayBinding(node, { elements, rest }) {
      return reducer.reduceArrayBinding(node, { elements: elements.map(n => n == null ? null : n()), rest: rest == null ? null : rest() });
    },

    reduceArrayExpression(node, { elements }) {
      return reducer.reduceArrayExpression(node, { elements: elements.map(n => n == null ? null : n()) });
    },

    reduceArrowExpression(node, { params, body }) {
      return reducer.reduceArrowExpression(node, { params: params(), body: body() });
    },

    reduceAssignmentExpression(node, { binding, expression }) {
      return reducer.reduceAssignmentExpression(node, { binding: binding(), expression: expression() });
    },

    reduceAssignmentTargetIdentifier(node) {
      return reducer.reduceAssignmentTargetIdentifier(node);
    },

    reduceAssignmentTargetPropertyIdentifier(node, { binding, init }) {
      return reducer.reduceAssignmentTargetPropertyIdentifier(node, { binding: binding(), init: init == null ? null : init() });
    },

    reduceAssignmentTargetPropertyProperty(node, { name, binding }) {
      return reducer.reduceAssignmentTargetPropertyProperty(node, { name: name(), binding: binding() });
    },

    reduceAssignmentTargetWithDefault(node, { binding, init }) {
      return reducer.reduceAssignmentTargetWithDefault(node, { binding: binding(), init: init() });
    },

    reduceBinaryExpression(node, { left, right }) {
      return reducer.reduceBinaryExpression(node, { left: left(), right: right() });
    },

    reduceBindingIdentifier(node) {
      return reducer.reduceBindingIdentifier(node);
    },

    reduceBindingPropertyIdentifier(node, { binding, init }) {
      return reducer.reduceBindingPropertyIdentifier(node, { binding: binding(), init: init == null ? null : init() });
    },

    reduceBindingPropertyProperty(node, { name, binding }) {
      return reducer.reduceBindingPropertyProperty(node, { name: name(), binding: binding() });
    },

    reduceBindingWithDefault(node, { binding, init }) {
      return reducer.reduceBindingWithDefault(node, { binding: binding(), init: init() });
    },

    reduceBlock(node, { statements }) {
      return reducer.reduceBlock(node, { statements: statements.map(n => n()) });
    },

    reduceBlockStatement(node, { block }) {
      return reducer.reduceBlockStatement(node, { block: block() });
    },

    reduceBreakStatement(node) {
      return reducer.reduceBreakStatement(node);
    },

    reduceCallExpression(node, { callee, arguments: _arguments }) {
      return reducer.reduceCallExpression(node, { callee: callee(), _arguments: _arguments.map(n => n()) });
    },

    reduceCatchClause(node, { binding, body }) {
      return reducer.reduceCatchClause(node, { binding: binding(), body: body() });
    },

    reduceClassDeclaration(node, { name, super: _super, elements }) {
      return reducer.reduceClassDeclaration(node, { name: name(), _super: _super == null ? null : _super(), elements: elements.map(n => n()) });
    },

    reduceClassElement(node, { method }) {
      return reducer.reduceClassElement(node, { method: method() });
    },

    reduceClassExpression(node, { name, super: _super, elements }) {
      return reducer.reduceClassExpression(node, { name: name == null ? null : name(), _super: _super == null ? null : _super(), elements: elements.map(n => n()) });
    },

    reduceCompoundAssignmentExpression(node, { binding, expression }) {
      return reducer.reduceCompoundAssignmentExpression(node, { binding: binding(), expression: expression() });
    },

    reduceComputedMemberAssignmentTarget(node, { object, expression }) {
      return reducer.reduceComputedMemberAssignmentTarget(node, { object: object(), expression: expression() });
    },

    reduceComputedMemberExpression(node, { object, expression }) {
      return reducer.reduceComputedMemberExpression(node, { object: object(), expression: expression() });
    },

    reduceComputedPropertyName(node, { expression }) {
      return reducer.reduceComputedPropertyName(node, { expression: expression() });
    },

    reduceConditionalExpression(node, { test, consequent, alternate }) {
      return reducer.reduceConditionalExpression(node, { test: test(), consequent: consequent(), alternate: alternate() });
    },

    reduceContinueStatement(node) {
      return reducer.reduceContinueStatement(node);
    },

    reduceDataProperty(node, { name, expression }) {
      return reducer.reduceDataProperty(node, { name: name(), expression: expression() });
    },

    reduceDebuggerStatement(node) {
      return reducer.reduceDebuggerStatement(node);
    },

    reduceDirective(node) {
      return reducer.reduceDirective(node);
    },

    reduceDoWhileStatement(node, { body, test }) {
      return reducer.reduceDoWhileStatement(node, { body: body(), test: test() });
    },

    reduceEmptyStatement(node) {
      return reducer.reduceEmptyStatement(node);
    },

    reduceExport(node, { declaration }) {
      return reducer.reduceExport(node, { declaration: declaration() });
    },

    reduceExportAllFrom(node) {
      return reducer.reduceExportAllFrom(node);
    },

    reduceExportDefault(node, { body }) {
      return reducer.reduceExportDefault(node, { body: body() });
    },

    reduceExportFrom(node, { namedExports }) {
      return reducer.reduceExportFrom(node, { namedExports: namedExports.map(n => n()) });
    },

    reduceExportFromSpecifier(node) {
      return reducer.reduceExportFromSpecifier(node);
    },

    reduceExportLocalSpecifier(node, { name }) {
      return reducer.reduceExportLocalSpecifier(node, { name: name() });
    },

    reduceExportLocals(node, { namedExports }) {
      return reducer.reduceExportLocals(node, { namedExports: namedExports.map(n => n()) });
    },

    reduceExpressionStatement(node, { expression }) {
      return reducer.reduceExpressionStatement(node, { expression: expression() });
    },

    reduceForInStatement(node, { left, right, body }) {
      return reducer.reduceForInStatement(node, { left: left(), right: right(), body: body() });
    },

    reduceForOfStatement(node, { left, right, body }) {
      return reducer.reduceForOfStatement(node, { left: left(), right: right(), body: body() });
    },

    reduceForStatement(node, { init, test, update, body }) {
      return reducer.reduceForStatement(node, { init: init == null ? null : init(), test: test == null ? null : test(), update: update == null ? null : update(), body: body() });
    },

    reduceFormalParameters(node, { items, rest }) {
      return reducer.reduceFormalParameters(node, { items: items.map(n => n()), rest: rest == null ? null : rest() });
    },

    reduceFunctionBody(node, { directives, statements }) {
      return reducer.reduceFunctionBody(node, { directives: directives.map(n => n()), statements: statements.map(n => n()) });
    },

    reduceFunctionDeclaration(node, { name, params, body }) {
      return reducer.reduceFunctionDeclaration(node, { name: name(), params: params(), body: body() });
    },

    reduceFunctionExpression(node, { name, params, body }) {
      return reducer.reduceFunctionExpression(node, { name: name == null ? null : name(), params: params(), body: body() });
    },

    reduceGetter(node, { name, body }) {
      return reducer.reduceGetter(node, { name: name(), body: body() });
    },

    reduceIdentifierExpression(node) {
      return reducer.reduceIdentifierExpression(node);
    },

    reduceIfStatement(node, { test, consequent, alternate }) {
      return reducer.reduceIfStatement(node, { test: test(), consequent: consequent(), alternate: alternate == null ? null : alternate() });
    },

    reduceImport(node, { defaultBinding, namedImports }) {
      return reducer.reduceImport(node, { defaultBinding: defaultBinding == null ? null : defaultBinding(), namedImports: namedImports.map(n => n()) });
    },

    reduceImportNamespace(node, { defaultBinding, namespaceBinding }) {
      return reducer.reduceImportNamespace(node, { defaultBinding: defaultBinding == null ? null : defaultBinding(), namespaceBinding: namespaceBinding() });
    },

    reduceImportSpecifier(node, { binding }) {
      return reducer.reduceImportSpecifier(node, { binding: binding() });
    },

    reduceLabeledStatement(node, { body }) {
      return reducer.reduceLabeledStatement(node, { body: body() });
    },

    reduceLiteralBooleanExpression(node) {
      return reducer.reduceLiteralBooleanExpression(node);
    },

    reduceLiteralInfinityExpression(node) {
      return reducer.reduceLiteralInfinityExpression(node);
    },

    reduceLiteralNullExpression(node) {
      return reducer.reduceLiteralNullExpression(node);
    },

    reduceLiteralNumericExpression(node) {
      return reducer.reduceLiteralNumericExpression(node);
    },

    reduceLiteralRegExpExpression(node) {
      return reducer.reduceLiteralRegExpExpression(node);
    },

    reduceLiteralStringExpression(node) {
      return reducer.reduceLiteralStringExpression(node);
    },

    reduceMethod(node, { name, params, body }) {
      return reducer.reduceMethod(node, { name: name(), params: params(), body: body() });
    },

    reduceModule(node, { directives, items }) {
      return reducer.reduceModule(node, { directives: directives.map(n => n()), items: items.map(n => n()) });
    },

    reduceNewExpression(node, { callee, arguments: _arguments }) {
      return reducer.reduceNewExpression(node, { callee: callee(), _arguments: _arguments.map(n => n()) });
    },

    reduceNewTargetExpression(node) {
      return reducer.reduceNewTargetExpression(node);
    },

    reduceObjectAssignmentTarget(node, { properties }) {
      return reducer.reduceObjectAssignmentTarget(node, { properties: properties.map(n => n()) });
    },

    reduceObjectBinding(node, { properties }) {
      return reducer.reduceObjectBinding(node, { properties: properties.map(n => n()) });
    },

    reduceObjectExpression(node, { properties }) {
      return reducer.reduceObjectExpression(node, { properties: properties.map(n => n()) });
    },

    reduceReturnStatement(node, { expression }) {
      return reducer.reduceReturnStatement(node, { expression: expression == null ? null : expression() });
    },

    reduceScript(node, { directives, statements }) {
      return reducer.reduceScript(node, { directives: directives.map(n => n()), statements: statements.map(n => n()) });
    },

    reduceSetter(node, { name, param, body }) {
      return reducer.reduceSetter(node, { name: name(), param: param(), body: body() });
    },

    reduceShorthandProperty(node, { name }) {
      return reducer.reduceShorthandProperty(node, { name: name() });
    },

    reduceSpreadElement(node, { expression }) {
      return reducer.reduceSpreadElement(node, { expression: expression() });
    },

    reduceStaticMemberAssignmentTarget(node, { object }) {
      return reducer.reduceStaticMemberAssignmentTarget(node, { object: object() });
    },

    reduceStaticMemberExpression(node, { object }) {
      return reducer.reduceStaticMemberExpression(node, { object: object() });
    },

    reduceStaticPropertyName(node) {
      return reducer.reduceStaticPropertyName(node);
    },

    reduceSuper(node) {
      return reducer.reduceSuper(node);
    },

    reduceSwitchCase(node, { test, consequent }) {
      return reducer.reduceSwitchCase(node, { test: test(), consequent: consequent.map(n => n()) });
    },

    reduceSwitchDefault(node, { consequent }) {
      return reducer.reduceSwitchDefault(node, { consequent: consequent.map(n => n()) });
    },

    reduceSwitchStatement(node, { discriminant, cases }) {
      return reducer.reduceSwitchStatement(node, { discriminant: discriminant(), cases: cases.map(n => n()) });
    },

    reduceSwitchStatementWithDefault(node, { discriminant, preDefaultCases, defaultCase, postDefaultCases }) {
      return reducer.reduceSwitchStatementWithDefault(node, { discriminant: discriminant(), preDefaultCases: preDefaultCases.map(n => n()), defaultCase: defaultCase(), postDefaultCases: postDefaultCases.map(n => n()) });
    },

    reduceTemplateElement(node) {
      return reducer.reduceTemplateElement(node);
    },

    reduceTemplateExpression(node, { tag, elements }) {
      return reducer.reduceTemplateExpression(node, { tag: tag == null ? null : tag(), elements: elements.map(n => n()) });
    },

    reduceThisExpression(node) {
      return reducer.reduceThisExpression(node);
    },

    reduceThrowStatement(node, { expression }) {
      return reducer.reduceThrowStatement(node, { expression: expression() });
    },

    reduceTryCatchStatement(node, { body, catchClause }) {
      return reducer.reduceTryCatchStatement(node, { body: body(), catchClause: catchClause() });
    },

    reduceTryFinallyStatement(node, { body, catchClause, finalizer }) {
      return reducer.reduceTryFinallyStatement(node, { body: body(), catchClause: catchClause == null ? null : catchClause(), finalizer: finalizer() });
    },

    reduceUnaryExpression(node, { operand }) {
      return reducer.reduceUnaryExpression(node, { operand: operand() });
    },

    reduceUpdateExpression(node, { operand }) {
      return reducer.reduceUpdateExpression(node, { operand: operand() });
    },

    reduceVariableDeclaration(node, { declarators }) {
      return reducer.reduceVariableDeclaration(node, { declarators: declarators.map(n => n()) });
    },

    reduceVariableDeclarationStatement(node, { declaration }) {
      return reducer.reduceVariableDeclarationStatement(node, { declaration: declaration() });
    },

    reduceVariableDeclarator(node, { binding, init }) {
      return reducer.reduceVariableDeclarator(node, { binding: binding(), init: init == null ? null : init() });
    },

    reduceWhileStatement(node, { test, body }) {
      return reducer.reduceWhileStatement(node, { test: test(), body: body() });
    },

    reduceWithStatement(node, { object, body }) {
      return reducer.reduceWithStatement(node, { object: object(), body: body() });
    },

    reduceYieldExpression(node, { expression }) {
      return reducer.reduceYieldExpression(node, { expression: expression == null ? null : expression() });
    },

    reduceYieldGeneratorExpression(node, { expression }) {
      return reducer.reduceYieldGeneratorExpression(node, { expression: expression() });
    },
  };
}
