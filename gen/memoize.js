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

export default function memoize(reducer) {
  const cache = new WeakMap;
  return {
    reduceArrayAssignmentTarget(node, arg) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceArrayAssignmentTarget(node, arg);
      cache.set(node, res);
      return res;
    },

    reduceArrayBinding(node, arg) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceArrayBinding(node, arg);
      cache.set(node, res);
      return res;
    },

    reduceArrayExpression(node, arg) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceArrayExpression(node, arg);
      cache.set(node, res);
      return res;
    },

    reduceArrowExpression(node, arg) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceArrowExpression(node, arg);
      cache.set(node, res);
      return res;
    },

    reduceAssignmentExpression(node, arg) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceAssignmentExpression(node, arg);
      cache.set(node, res);
      return res;
    },

    reduceAssignmentTargetIdentifier(node) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceAssignmentTargetIdentifier(node);
      cache.set(node, res);
      return res;
    },

    reduceAssignmentTargetPropertyIdentifier(node, arg) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceAssignmentTargetPropertyIdentifier(node, arg);
      cache.set(node, res);
      return res;
    },

    reduceAssignmentTargetPropertyProperty(node, arg) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceAssignmentTargetPropertyProperty(node, arg);
      cache.set(node, res);
      return res;
    },

    reduceAssignmentTargetWithDefault(node, arg) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceAssignmentTargetWithDefault(node, arg);
      cache.set(node, res);
      return res;
    },

    reduceBinaryExpression(node, arg) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceBinaryExpression(node, arg);
      cache.set(node, res);
      return res;
    },

    reduceBindingIdentifier(node) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceBindingIdentifier(node);
      cache.set(node, res);
      return res;
    },

    reduceBindingPropertyIdentifier(node, arg) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceBindingPropertyIdentifier(node, arg);
      cache.set(node, res);
      return res;
    },

    reduceBindingPropertyProperty(node, arg) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceBindingPropertyProperty(node, arg);
      cache.set(node, res);
      return res;
    },

    reduceBindingWithDefault(node, arg) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceBindingWithDefault(node, arg);
      cache.set(node, res);
      return res;
    },

    reduceBlock(node, arg) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceBlock(node, arg);
      cache.set(node, res);
      return res;
    },

    reduceBlockStatement(node, arg) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceBlockStatement(node, arg);
      cache.set(node, res);
      return res;
    },

    reduceBreakStatement(node) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceBreakStatement(node);
      cache.set(node, res);
      return res;
    },

    reduceCallExpression(node, arg) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceCallExpression(node, arg);
      cache.set(node, res);
      return res;
    },

    reduceCatchClause(node, arg) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceCatchClause(node, arg);
      cache.set(node, res);
      return res;
    },

    reduceClassDeclaration(node, arg) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceClassDeclaration(node, arg);
      cache.set(node, res);
      return res;
    },

    reduceClassElement(node, arg) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceClassElement(node, arg);
      cache.set(node, res);
      return res;
    },

    reduceClassExpression(node, arg) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceClassExpression(node, arg);
      cache.set(node, res);
      return res;
    },

    reduceCompoundAssignmentExpression(node, arg) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceCompoundAssignmentExpression(node, arg);
      cache.set(node, res);
      return res;
    },

    reduceComputedMemberAssignmentTarget(node, arg) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceComputedMemberAssignmentTarget(node, arg);
      cache.set(node, res);
      return res;
    },

    reduceComputedMemberExpression(node, arg) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceComputedMemberExpression(node, arg);
      cache.set(node, res);
      return res;
    },

    reduceComputedPropertyName(node, arg) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceComputedPropertyName(node, arg);
      cache.set(node, res);
      return res;
    },

    reduceConditionalExpression(node, arg) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceConditionalExpression(node, arg);
      cache.set(node, res);
      return res;
    },

    reduceContinueStatement(node) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceContinueStatement(node);
      cache.set(node, res);
      return res;
    },

    reduceDataProperty(node, arg) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceDataProperty(node, arg);
      cache.set(node, res);
      return res;
    },

    reduceDebuggerStatement(node) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceDebuggerStatement(node);
      cache.set(node, res);
      return res;
    },

    reduceDirective(node) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceDirective(node);
      cache.set(node, res);
      return res;
    },

    reduceDoWhileStatement(node, arg) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceDoWhileStatement(node, arg);
      cache.set(node, res);
      return res;
    },

    reduceEmptyStatement(node) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceEmptyStatement(node);
      cache.set(node, res);
      return res;
    },

    reduceExport(node, arg) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceExport(node, arg);
      cache.set(node, res);
      return res;
    },

    reduceExportAllFrom(node) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceExportAllFrom(node);
      cache.set(node, res);
      return res;
    },

    reduceExportDefault(node, arg) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceExportDefault(node, arg);
      cache.set(node, res);
      return res;
    },

    reduceExportFrom(node, arg) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceExportFrom(node, arg);
      cache.set(node, res);
      return res;
    },

    reduceExportFromSpecifier(node) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceExportFromSpecifier(node);
      cache.set(node, res);
      return res;
    },

    reduceExportLocalSpecifier(node, arg) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceExportLocalSpecifier(node, arg);
      cache.set(node, res);
      return res;
    },

    reduceExportLocals(node, arg) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceExportLocals(node, arg);
      cache.set(node, res);
      return res;
    },

    reduceExpressionStatement(node, arg) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceExpressionStatement(node, arg);
      cache.set(node, res);
      return res;
    },

    reduceForInStatement(node, arg) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceForInStatement(node, arg);
      cache.set(node, res);
      return res;
    },

    reduceForOfStatement(node, arg) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceForOfStatement(node, arg);
      cache.set(node, res);
      return res;
    },

    reduceForStatement(node, arg) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceForStatement(node, arg);
      cache.set(node, res);
      return res;
    },

    reduceFormalParameters(node, arg) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceFormalParameters(node, arg);
      cache.set(node, res);
      return res;
    },

    reduceFunctionBody(node, arg) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceFunctionBody(node, arg);
      cache.set(node, res);
      return res;
    },

    reduceFunctionDeclaration(node, arg) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceFunctionDeclaration(node, arg);
      cache.set(node, res);
      return res;
    },

    reduceFunctionExpression(node, arg) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceFunctionExpression(node, arg);
      cache.set(node, res);
      return res;
    },

    reduceGetter(node, arg) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceGetter(node, arg);
      cache.set(node, res);
      return res;
    },

    reduceIdentifierExpression(node) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceIdentifierExpression(node);
      cache.set(node, res);
      return res;
    },

    reduceIfStatement(node, arg) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceIfStatement(node, arg);
      cache.set(node, res);
      return res;
    },

    reduceImport(node, arg) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceImport(node, arg);
      cache.set(node, res);
      return res;
    },

    reduceImportNamespace(node, arg) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceImportNamespace(node, arg);
      cache.set(node, res);
      return res;
    },

    reduceImportSpecifier(node, arg) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceImportSpecifier(node, arg);
      cache.set(node, res);
      return res;
    },

    reduceLabeledStatement(node, arg) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceLabeledStatement(node, arg);
      cache.set(node, res);
      return res;
    },

    reduceLiteralBooleanExpression(node) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceLiteralBooleanExpression(node);
      cache.set(node, res);
      return res;
    },

    reduceLiteralInfinityExpression(node) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceLiteralInfinityExpression(node);
      cache.set(node, res);
      return res;
    },

    reduceLiteralNullExpression(node) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceLiteralNullExpression(node);
      cache.set(node, res);
      return res;
    },

    reduceLiteralNumericExpression(node) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceLiteralNumericExpression(node);
      cache.set(node, res);
      return res;
    },

    reduceLiteralRegExpExpression(node) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceLiteralRegExpExpression(node);
      cache.set(node, res);
      return res;
    },

    reduceLiteralStringExpression(node) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceLiteralStringExpression(node);
      cache.set(node, res);
      return res;
    },

    reduceMethod(node, arg) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceMethod(node, arg);
      cache.set(node, res);
      return res;
    },

    reduceModule(node, arg) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceModule(node, arg);
      cache.set(node, res);
      return res;
    },

    reduceNewExpression(node, arg) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceNewExpression(node, arg);
      cache.set(node, res);
      return res;
    },

    reduceNewTargetExpression(node) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceNewTargetExpression(node);
      cache.set(node, res);
      return res;
    },

    reduceObjectAssignmentTarget(node, arg) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceObjectAssignmentTarget(node, arg);
      cache.set(node, res);
      return res;
    },

    reduceObjectBinding(node, arg) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceObjectBinding(node, arg);
      cache.set(node, res);
      return res;
    },

    reduceObjectExpression(node, arg) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceObjectExpression(node, arg);
      cache.set(node, res);
      return res;
    },

    reduceReturnStatement(node, arg) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceReturnStatement(node, arg);
      cache.set(node, res);
      return res;
    },

    reduceScript(node, arg) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceScript(node, arg);
      cache.set(node, res);
      return res;
    },

    reduceSetter(node, arg) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceSetter(node, arg);
      cache.set(node, res);
      return res;
    },

    reduceShorthandProperty(node, arg) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceShorthandProperty(node, arg);
      cache.set(node, res);
      return res;
    },

    reduceSpreadElement(node, arg) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceSpreadElement(node, arg);
      cache.set(node, res);
      return res;
    },

    reduceStaticMemberAssignmentTarget(node, arg) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceStaticMemberAssignmentTarget(node, arg);
      cache.set(node, res);
      return res;
    },

    reduceStaticMemberExpression(node, arg) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceStaticMemberExpression(node, arg);
      cache.set(node, res);
      return res;
    },

    reduceStaticPropertyName(node) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceStaticPropertyName(node);
      cache.set(node, res);
      return res;
    },

    reduceSuper(node) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceSuper(node);
      cache.set(node, res);
      return res;
    },

    reduceSwitchCase(node, arg) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceSwitchCase(node, arg);
      cache.set(node, res);
      return res;
    },

    reduceSwitchDefault(node, arg) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceSwitchDefault(node, arg);
      cache.set(node, res);
      return res;
    },

    reduceSwitchStatement(node, arg) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceSwitchStatement(node, arg);
      cache.set(node, res);
      return res;
    },

    reduceSwitchStatementWithDefault(node, arg) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceSwitchStatementWithDefault(node, arg);
      cache.set(node, res);
      return res;
    },

    reduceTemplateElement(node) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceTemplateElement(node);
      cache.set(node, res);
      return res;
    },

    reduceTemplateExpression(node, arg) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceTemplateExpression(node, arg);
      cache.set(node, res);
      return res;
    },

    reduceThisExpression(node) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceThisExpression(node);
      cache.set(node, res);
      return res;
    },

    reduceThrowStatement(node, arg) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceThrowStatement(node, arg);
      cache.set(node, res);
      return res;
    },

    reduceTryCatchStatement(node, arg) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceTryCatchStatement(node, arg);
      cache.set(node, res);
      return res;
    },

    reduceTryFinallyStatement(node, arg) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceTryFinallyStatement(node, arg);
      cache.set(node, res);
      return res;
    },

    reduceUnaryExpression(node, arg) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceUnaryExpression(node, arg);
      cache.set(node, res);
      return res;
    },

    reduceUpdateExpression(node, arg) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceUpdateExpression(node, arg);
      cache.set(node, res);
      return res;
    },

    reduceVariableDeclaration(node, arg) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceVariableDeclaration(node, arg);
      cache.set(node, res);
      return res;
    },

    reduceVariableDeclarationStatement(node, arg) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceVariableDeclarationStatement(node, arg);
      cache.set(node, res);
      return res;
    },

    reduceVariableDeclarator(node, arg) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceVariableDeclarator(node, arg);
      cache.set(node, res);
      return res;
    },

    reduceWhileStatement(node, arg) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceWhileStatement(node, arg);
      cache.set(node, res);
      return res;
    },

    reduceWithStatement(node, arg) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceWithStatement(node, arg);
      cache.set(node, res);
      return res;
    },

    reduceYieldExpression(node, arg) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceYieldExpression(node, arg);
      cache.set(node, res);
      return res;
    },

    reduceYieldGeneratorExpression(node, arg) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduceYieldGeneratorExpression(node, arg);
      cache.set(node, res);
      return res;
    },
  };
}
