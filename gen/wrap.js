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

import * as Shift from 'shift-ast';

export default (fn, reducer) => ({
  __proto__: reducer,

  reduceArrayAssignmentTarget(node, data) {
    return fn(super.reduceArrayAssignmentTarget(node, data), node);
  },

  reduceArrayBinding(node, data) {
    return fn(super.reduceArrayBinding(node, data), node);
  },

  reduceArrayExpression(node, data) {
    return fn(super.reduceArrayExpression(node, data), node);
  },

  reduceArrowExpression(node, data) {
    return fn(super.reduceArrowExpression(node, data), node);
  },

  reduceAssignmentExpression(node, data) {
    return fn(super.reduceAssignmentExpression(node, data), node);
  },

  reduceAssignmentTargetIdentifier(node, data) {
    return fn(super.reduceAssignmentTargetIdentifier(node, data), node);
  },

  reduceAssignmentTargetPropertyIdentifier(node, data) {
    return fn(super.reduceAssignmentTargetPropertyIdentifier(node, data), node);
  },

  reduceAssignmentTargetPropertyProperty(node, data) {
    return fn(super.reduceAssignmentTargetPropertyProperty(node, data), node);
  },

  reduceAssignmentTargetWithDefault(node, data) {
    return fn(super.reduceAssignmentTargetWithDefault(node, data), node);
  },

  reduceBinaryExpression(node, data) {
    return fn(super.reduceBinaryExpression(node, data), node);
  },

  reduceBindingIdentifier(node, data) {
    return fn(super.reduceBindingIdentifier(node, data), node);
  },

  reduceBindingPropertyIdentifier(node, data) {
    return fn(super.reduceBindingPropertyIdentifier(node, data), node);
  },

  reduceBindingPropertyProperty(node, data) {
    return fn(super.reduceBindingPropertyProperty(node, data), node);
  },

  reduceBindingWithDefault(node, data) {
    return fn(super.reduceBindingWithDefault(node, data), node);
  },

  reduceBlock(node, data) {
    return fn(super.reduceBlock(node, data), node);
  },

  reduceBlockStatement(node, data) {
    return fn(super.reduceBlockStatement(node, data), node);
  },

  reduceBreakStatement(node, data) {
    return fn(super.reduceBreakStatement(node, data), node);
  },

  reduceCallExpression(node, data) {
    return fn(super.reduceCallExpression(node, data), node);
  },

  reduceCatchClause(node, data) {
    return fn(super.reduceCatchClause(node, data), node);
  },

  reduceClassDeclaration(node, data) {
    return fn(super.reduceClassDeclaration(node, data), node);
  },

  reduceClassElement(node, data) {
    return fn(super.reduceClassElement(node, data), node);
  },

  reduceClassExpression(node, data) {
    return fn(super.reduceClassExpression(node, data), node);
  },

  reduceCompoundAssignmentExpression(node, data) {
    return fn(super.reduceCompoundAssignmentExpression(node, data), node);
  },

  reduceComputedMemberAssignmentTarget(node, data) {
    return fn(super.reduceComputedMemberAssignmentTarget(node, data), node);
  },

  reduceComputedMemberExpression(node, data) {
    return fn(super.reduceComputedMemberExpression(node, data), node);
  },

  reduceComputedPropertyName(node, data) {
    return fn(super.reduceComputedPropertyName(node, data), node);
  },

  reduceConditionalExpression(node, data) {
    return fn(super.reduceConditionalExpression(node, data), node);
  },

  reduceContinueStatement(node, data) {
    return fn(super.reduceContinueStatement(node, data), node);
  },

  reduceDataProperty(node, data) {
    return fn(super.reduceDataProperty(node, data), node);
  },

  reduceDebuggerStatement(node, data) {
    return fn(super.reduceDebuggerStatement(node, data), node);
  },

  reduceDirective(node, data) {
    return fn(super.reduceDirective(node, data), node);
  },

  reduceDoWhileStatement(node, data) {
    return fn(super.reduceDoWhileStatement(node, data), node);
  },

  reduceEmptyStatement(node, data) {
    return fn(super.reduceEmptyStatement(node, data), node);
  },

  reduceExport(node, data) {
    return fn(super.reduceExport(node, data), node);
  },

  reduceExportAllFrom(node, data) {
    return fn(super.reduceExportAllFrom(node, data), node);
  },

  reduceExportDefault(node, data) {
    return fn(super.reduceExportDefault(node, data), node);
  },

  reduceExportFrom(node, data) {
    return fn(super.reduceExportFrom(node, data), node);
  },

  reduceExportFromSpecifier(node, data) {
    return fn(super.reduceExportFromSpecifier(node, data), node);
  },

  reduceExportLocalSpecifier(node, data) {
    return fn(super.reduceExportLocalSpecifier(node, data), node);
  },

  reduceExportLocals(node, data) {
    return fn(super.reduceExportLocals(node, data), node);
  },

  reduceExpressionStatement(node, data) {
    return fn(super.reduceExpressionStatement(node, data), node);
  },

  reduceForInStatement(node, data) {
    return fn(super.reduceForInStatement(node, data), node);
  },

  reduceForOfStatement(node, data) {
    return fn(super.reduceForOfStatement(node, data), node);
  },

  reduceForStatement(node, data) {
    return fn(super.reduceForStatement(node, data), node);
  },

  reduceFormalParameters(node, data) {
    return fn(super.reduceFormalParameters(node, data), node);
  },

  reduceFunctionBody(node, data) {
    return fn(super.reduceFunctionBody(node, data), node);
  },

  reduceFunctionDeclaration(node, data) {
    return fn(super.reduceFunctionDeclaration(node, data), node);
  },

  reduceFunctionExpression(node, data) {
    return fn(super.reduceFunctionExpression(node, data), node);
  },

  reduceGetter(node, data) {
    return fn(super.reduceGetter(node, data), node);
  },

  reduceIdentifierExpression(node, data) {
    return fn(super.reduceIdentifierExpression(node, data), node);
  },

  reduceIfStatement(node, data) {
    return fn(super.reduceIfStatement(node, data), node);
  },

  reduceImport(node, data) {
    return fn(super.reduceImport(node, data), node);
  },

  reduceImportNamespace(node, data) {
    return fn(super.reduceImportNamespace(node, data), node);
  },

  reduceImportSpecifier(node, data) {
    return fn(super.reduceImportSpecifier(node, data), node);
  },

  reduceLabeledStatement(node, data) {
    return fn(super.reduceLabeledStatement(node, data), node);
  },

  reduceLiteralBooleanExpression(node, data) {
    return fn(super.reduceLiteralBooleanExpression(node, data), node);
  },

  reduceLiteralInfinityExpression(node, data) {
    return fn(super.reduceLiteralInfinityExpression(node, data), node);
  },

  reduceLiteralNullExpression(node, data) {
    return fn(super.reduceLiteralNullExpression(node, data), node);
  },

  reduceLiteralNumericExpression(node, data) {
    return fn(super.reduceLiteralNumericExpression(node, data), node);
  },

  reduceLiteralRegExpExpression(node, data) {
    return fn(super.reduceLiteralRegExpExpression(node, data), node);
  },

  reduceLiteralStringExpression(node, data) {
    return fn(super.reduceLiteralStringExpression(node, data), node);
  },

  reduceMethod(node, data) {
    return fn(super.reduceMethod(node, data), node);
  },

  reduceModule(node, data) {
    return fn(super.reduceModule(node, data), node);
  },

  reduceNewExpression(node, data) {
    return fn(super.reduceNewExpression(node, data), node);
  },

  reduceNewTargetExpression(node, data) {
    return fn(super.reduceNewTargetExpression(node, data), node);
  },

  reduceObjectAssignmentTarget(node, data) {
    return fn(super.reduceObjectAssignmentTarget(node, data), node);
  },

  reduceObjectBinding(node, data) {
    return fn(super.reduceObjectBinding(node, data), node);
  },

  reduceObjectExpression(node, data) {
    return fn(super.reduceObjectExpression(node, data), node);
  },

  reduceReturnStatement(node, data) {
    return fn(super.reduceReturnStatement(node, data), node);
  },

  reduceScript(node, data) {
    return fn(super.reduceScript(node, data), node);
  },

  reduceSetter(node, data) {
    return fn(super.reduceSetter(node, data), node);
  },

  reduceShorthandProperty(node, data) {
    return fn(super.reduceShorthandProperty(node, data), node);
  },

  reduceSpreadElement(node, data) {
    return fn(super.reduceSpreadElement(node, data), node);
  },

  reduceStaticMemberAssignmentTarget(node, data) {
    return fn(super.reduceStaticMemberAssignmentTarget(node, data), node);
  },

  reduceStaticMemberExpression(node, data) {
    return fn(super.reduceStaticMemberExpression(node, data), node);
  },

  reduceStaticPropertyName(node, data) {
    return fn(super.reduceStaticPropertyName(node, data), node);
  },

  reduceSuper(node, data) {
    return fn(super.reduceSuper(node, data), node);
  },

  reduceSwitchCase(node, data) {
    return fn(super.reduceSwitchCase(node, data), node);
  },

  reduceSwitchDefault(node, data) {
    return fn(super.reduceSwitchDefault(node, data), node);
  },

  reduceSwitchStatement(node, data) {
    return fn(super.reduceSwitchStatement(node, data), node);
  },

  reduceSwitchStatementWithDefault(node, data) {
    return fn(super.reduceSwitchStatementWithDefault(node, data), node);
  },

  reduceTemplateElement(node, data) {
    return fn(super.reduceTemplateElement(node, data), node);
  },

  reduceTemplateExpression(node, data) {
    return fn(super.reduceTemplateExpression(node, data), node);
  },

  reduceThisExpression(node, data) {
    return fn(super.reduceThisExpression(node, data), node);
  },

  reduceThrowStatement(node, data) {
    return fn(super.reduceThrowStatement(node, data), node);
  },

  reduceTryCatchStatement(node, data) {
    return fn(super.reduceTryCatchStatement(node, data), node);
  },

  reduceTryFinallyStatement(node, data) {
    return fn(super.reduceTryFinallyStatement(node, data), node);
  },

  reduceUnaryExpression(node, data) {
    return fn(super.reduceUnaryExpression(node, data), node);
  },

  reduceUpdateExpression(node, data) {
    return fn(super.reduceUpdateExpression(node, data), node);
  },

  reduceVariableDeclaration(node, data) {
    return fn(super.reduceVariableDeclaration(node, data), node);
  },

  reduceVariableDeclarationStatement(node, data) {
    return fn(super.reduceVariableDeclarationStatement(node, data), node);
  },

  reduceVariableDeclarator(node, data) {
    return fn(super.reduceVariableDeclarator(node, data), node);
  },

  reduceWhileStatement(node, data) {
    return fn(super.reduceWhileStatement(node, data), node);
  },

  reduceWithStatement(node, data) {
    return fn(super.reduceWithStatement(node, data), node);
  },

  reduceYieldExpression(node, data) {
    return fn(super.reduceYieldExpression(node, data), node);
  },

  reduceYieldGeneratorExpression(node, data) {
    return fn(super.reduceYieldGeneratorExpression(node, data), node);
  },
});
