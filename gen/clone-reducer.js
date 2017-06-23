/**
 * Copyright 2016 Shape Security, Inc.
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

export default class CloneReducer {
  reduceArrayAssignmentTarget(node, {elements, rest}) {
    return new Shift.ArrayAssignmentTarget({elements, rest});
  }

  reduceArrayBinding(node, {elements, rest}) {
    return new Shift.ArrayBinding({elements, rest});
  }

  reduceArrayExpression(node, {elements}) {
    return new Shift.ArrayExpression({elements});
  }

  reduceArrowExpression(node, {params, body}) {
    return new Shift.ArrowExpression({params, body});
  }

  reduceAssignmentExpression(node, {binding, expression}) {
    return new Shift.AssignmentExpression({binding, expression});
  }

  reduceAssignmentTargetIdentifier(node) {
    return new Shift.AssignmentTargetIdentifier({name: node.name});
  }

  reduceAssignmentTargetPropertyIdentifier(node, {binding, init}) {
    return new Shift.AssignmentTargetPropertyIdentifier({binding, init});
  }

  reduceAssignmentTargetPropertyProperty(node, {name, binding}) {
    return new Shift.AssignmentTargetPropertyProperty({name, binding});
  }

  reduceAssignmentTargetWithDefault(node, {binding, init}) {
    return new Shift.AssignmentTargetWithDefault({binding, init});
  }

  reduceBinaryExpression(node, {left, right}) {
    return new Shift.BinaryExpression({left, operator: node.operator, right});
  }

  reduceBindingIdentifier(node) {
    return new Shift.BindingIdentifier({name: node.name});
  }

  reduceBindingPropertyIdentifier(node, {binding, init}) {
    return new Shift.BindingPropertyIdentifier({binding, init});
  }

  reduceBindingPropertyProperty(node, {name, binding}) {
    return new Shift.BindingPropertyProperty({name, binding});
  }

  reduceBindingWithDefault(node, {binding, init}) {
    return new Shift.BindingWithDefault({binding, init});
  }

  reduceBlock(node, {statements}) {
    return new Shift.Block({statements});
  }

  reduceBlockStatement(node, {block}) {
    return new Shift.BlockStatement({block});
  }

  reduceBreakStatement(node) {
    return new Shift.BreakStatement({label: node.label});
  }

  reduceCallExpression(node, {callee, arguments: _arguments}) {
    return new Shift.CallExpression({callee, arguments: _arguments});
  }

  reduceCatchClause(node, {binding, body}) {
    return new Shift.CatchClause({binding, body});
  }

  reduceClassDeclaration(node, {name, super: _super, elements}) {
    return new Shift.ClassDeclaration({name, super: _super, elements});
  }

  reduceClassElement(node, {method}) {
    return new Shift.ClassElement({isStatic: node.isStatic, method});
  }

  reduceClassExpression(node, {name, super: _super, elements}) {
    return new Shift.ClassExpression({name, super: _super, elements});
  }

  reduceCompoundAssignmentExpression(node, {binding, expression}) {
    return new Shift.CompoundAssignmentExpression({binding, operator: node.operator, expression});
  }

  reduceComputedMemberAssignmentTarget(node, {object, expression}) {
    return new Shift.ComputedMemberAssignmentTarget({object, expression});
  }

  reduceComputedMemberExpression(node, {object, expression}) {
    return new Shift.ComputedMemberExpression({object, expression});
  }

  reduceComputedPropertyName(node, {expression}) {
    return new Shift.ComputedPropertyName({expression});
  }

  reduceConditionalExpression(node, {test, consequent, alternate}) {
    return new Shift.ConditionalExpression({test, consequent, alternate});
  }

  reduceContinueStatement(node) {
    return new Shift.ContinueStatement({label: node.label});
  }

  reduceDataProperty(node, {name, expression}) {
    return new Shift.DataProperty({name, expression});
  }

  reduceDebuggerStatement(node) {
    return new Shift.DebuggerStatement;
  }

  reduceDirective(node) {
    return new Shift.Directive({rawValue: node.rawValue});
  }

  reduceDoWhileStatement(node, {body, test}) {
    return new Shift.DoWhileStatement({body, test});
  }

  reduceEmptyStatement(node) {
    return new Shift.EmptyStatement;
  }

  reduceExport(node, {declaration}) {
    return new Shift.Export({declaration});
  }

  reduceExportAllFrom(node) {
    return new Shift.ExportAllFrom({moduleSpecifier: node.moduleSpecifier});
  }

  reduceExportDefault(node, {body}) {
    return new Shift.ExportDefault({body});
  }

  reduceExportFrom(node, {namedExports}) {
    return new Shift.ExportFrom({namedExports, moduleSpecifier: node.moduleSpecifier});
  }

  reduceExportFromSpecifier(node) {
    return new Shift.ExportFromSpecifier({name: node.name, exportedName: node.exportedName});
  }

  reduceExportLocalSpecifier(node, {name}) {
    return new Shift.ExportLocalSpecifier({name, exportedName: node.exportedName});
  }

  reduceExportLocals(node, {namedExports}) {
    return new Shift.ExportLocals({namedExports});
  }

  reduceExpressionStatement(node, {expression}) {
    return new Shift.ExpressionStatement({expression});
  }

  reduceForInStatement(node, {left, right, body}) {
    return new Shift.ForInStatement({left, right, body});
  }

  reduceForOfStatement(node, {left, right, body}) {
    return new Shift.ForOfStatement({left, right, body});
  }

  reduceForStatement(node, {init, test, update, body}) {
    return new Shift.ForStatement({init, test, update, body});
  }

  reduceFormalParameters(node, {items, rest}) {
    return new Shift.FormalParameters({items, rest});
  }

  reduceFunctionBody(node, {directives, statements}) {
    return new Shift.FunctionBody({directives, statements});
  }

  reduceFunctionDeclaration(node, {name, params, body}) {
    return new Shift.FunctionDeclaration({isGenerator: node.isGenerator, name, params, body});
  }

  reduceFunctionExpression(node, {name, params, body}) {
    return new Shift.FunctionExpression({isGenerator: node.isGenerator, name, params, body});
  }

  reduceGetter(node, {name, body}) {
    return new Shift.Getter({name, body});
  }

  reduceIdentifierExpression(node) {
    return new Shift.IdentifierExpression({name: node.name});
  }

  reduceIfStatement(node, {test, consequent, alternate}) {
    return new Shift.IfStatement({test, consequent, alternate});
  }

  reduceImport(node, {defaultBinding, namedImports}) {
    return new Shift.Import({defaultBinding, namedImports, moduleSpecifier: node.moduleSpecifier});
  }

  reduceImportNamespace(node, {defaultBinding, namespaceBinding}) {
    return new Shift.ImportNamespace({defaultBinding, namespaceBinding, moduleSpecifier: node.moduleSpecifier});
  }

  reduceImportSpecifier(node, {binding}) {
    return new Shift.ImportSpecifier({name: node.name, binding});
  }

  reduceLabeledStatement(node, {body}) {
    return new Shift.LabeledStatement({label: node.label, body});
  }

  reduceLiteralBooleanExpression(node) {
    return new Shift.LiteralBooleanExpression({value: node.value});
  }

  reduceLiteralInfinityExpression(node) {
    return new Shift.LiteralInfinityExpression;
  }

  reduceLiteralNullExpression(node) {
    return new Shift.LiteralNullExpression;
  }

  reduceLiteralNumericExpression(node) {
    return new Shift.LiteralNumericExpression({value: node.value});
  }

  reduceLiteralRegExpExpression(node) {
    return new Shift.LiteralRegExpExpression({pattern: node.pattern, global: node.global, ignoreCase: node.ignoreCase, multiLine: node.multiLine, sticky: node.sticky, unicode: node.unicode});
  }

  reduceLiteralStringExpression(node) {
    return new Shift.LiteralStringExpression({value: node.value});
  }

  reduceMethod(node, {name, params, body}) {
    return new Shift.Method({isGenerator: node.isGenerator, name, params, body});
  }

  reduceModule(node, {directives, items}) {
    return new Shift.Module({directives, items});
  }

  reduceNewExpression(node, {callee, arguments: _arguments}) {
    return new Shift.NewExpression({callee, arguments: _arguments});
  }

  reduceNewTargetExpression(node) {
    return new Shift.NewTargetExpression;
  }

  reduceObjectAssignmentTarget(node, {properties}) {
    return new Shift.ObjectAssignmentTarget({properties});
  }

  reduceObjectBinding(node, {properties}) {
    return new Shift.ObjectBinding({properties});
  }

  reduceObjectExpression(node, {properties}) {
    return new Shift.ObjectExpression({properties});
  }

  reduceReturnStatement(node, {expression}) {
    return new Shift.ReturnStatement({expression});
  }

  reduceScript(node, {directives, statements}) {
    return new Shift.Script({directives, statements});
  }

  reduceSetter(node, {name, param, body}) {
    return new Shift.Setter({name, param, body});
  }

  reduceShorthandProperty(node, {name}) {
    return new Shift.ShorthandProperty({name});
  }

  reduceSpreadElement(node, {expression}) {
    return new Shift.SpreadElement({expression});
  }

  reduceStaticMemberAssignmentTarget(node, {object}) {
    return new Shift.StaticMemberAssignmentTarget({object, property: node.property});
  }

  reduceStaticMemberExpression(node, {object}) {
    return new Shift.StaticMemberExpression({object, property: node.property});
  }

  reduceStaticPropertyName(node) {
    return new Shift.StaticPropertyName({value: node.value});
  }

  reduceSuper(node) {
    return new Shift.Super;
  }

  reduceSwitchCase(node, {test, consequent}) {
    return new Shift.SwitchCase({test, consequent});
  }

  reduceSwitchDefault(node, {consequent}) {
    return new Shift.SwitchDefault({consequent});
  }

  reduceSwitchStatement(node, {discriminant, cases}) {
    return new Shift.SwitchStatement({discriminant, cases});
  }

  reduceSwitchStatementWithDefault(node, {discriminant, preDefaultCases, defaultCase, postDefaultCases}) {
    return new Shift.SwitchStatementWithDefault({discriminant, preDefaultCases, defaultCase, postDefaultCases});
  }

  reduceTemplateElement(node) {
    return new Shift.TemplateElement({rawValue: node.rawValue});
  }

  reduceTemplateExpression(node, {tag, elements}) {
    return new Shift.TemplateExpression({tag, elements});
  }

  reduceThisExpression(node) {
    return new Shift.ThisExpression;
  }

  reduceThrowStatement(node, {expression}) {
    return new Shift.ThrowStatement({expression});
  }

  reduceTryCatchStatement(node, {body, catchClause}) {
    return new Shift.TryCatchStatement({body, catchClause});
  }

  reduceTryFinallyStatement(node, {body, catchClause, finalizer}) {
    return new Shift.TryFinallyStatement({body, catchClause, finalizer});
  }

  reduceUnaryExpression(node, {operand}) {
    return new Shift.UnaryExpression({operator: node.operator, operand});
  }

  reduceUpdateExpression(node, {operand}) {
    return new Shift.UpdateExpression({isPrefix: node.isPrefix, operator: node.operator, operand});
  }

  reduceVariableDeclaration(node, {declarators}) {
    return new Shift.VariableDeclaration({kind: node.kind, declarators});
  }

  reduceVariableDeclarationStatement(node, {declaration}) {
    return new Shift.VariableDeclarationStatement({declaration});
  }

  reduceVariableDeclarator(node, {binding, init}) {
    return new Shift.VariableDeclarator({binding, init});
  }

  reduceWhileStatement(node, {test, body}) {
    return new Shift.WhileStatement({test, body});
  }

  reduceWithStatement(node, {object, body}) {
    return new Shift.WithStatement({object, body});
  }

  reduceYieldExpression(node, {expression}) {
    return new Shift.YieldExpression({expression});
  }

  reduceYieldGeneratorExpression(node, {expression}) {
    return new Shift.YieldGeneratorExpression({expression});
  }
}
