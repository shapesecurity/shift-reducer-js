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
    return new Shift.ArrayAssignmentTarget(node, {elements, rest});
  }

  reduceArrayBinding(node, {elements, rest}) {
    return new Shift.ArrayBinding(node, {elements, rest});
  }

  reduceArrayExpression(node, {elements}) {
    return new Shift.ArrayExpression(node, {elements});
  }

  reduceArrowExpression(node, {params, body}) {
    return new Shift.ArrowExpression(node, {params, body});
  }

  reduceAssignmentExpression(node, {binding, expression}) {
    return new Shift.AssignmentExpression(node, {binding, expression});
  }

  reduceAssignmentTargetIdentifier(node) {
    return new Shift.AssignmentTargetIdentifier(node, {name: node.name});
  }

  reduceAssignmentTargetPropertyIdentifier(node, {binding, init}) {
    return new Shift.AssignmentTargetPropertyIdentifier(node, {binding, init});
  }

  reduceAssignmentTargetPropertyProperty(node, {name, binding}) {
    return new Shift.AssignmentTargetPropertyProperty(node, {name, binding});
  }

  reduceAssignmentTargetWithDefault(node, {binding, init}) {
    return new Shift.AssignmentTargetWithDefault(node, {binding, init});
  }

  reduceBinaryExpression(node, {left, right}) {
    return new Shift.BinaryExpression(node, {left, operator: node.operator, right});
  }

  reduceBindingIdentifier(node) {
    return new Shift.BindingIdentifier(node, {name: node.name});
  }

  reduceBindingPropertyIdentifier(node, {binding, init}) {
    return new Shift.BindingPropertyIdentifier(node, {binding, init});
  }

  reduceBindingPropertyProperty(node, {name, binding}) {
    return new Shift.BindingPropertyProperty(node, {name, binding});
  }

  reduceBindingWithDefault(node, {binding, init}) {
    return new Shift.BindingWithDefault(node, {binding, init});
  }

  reduceBlock(node, {statements}) {
    return new Shift.Block(node, {statements});
  }

  reduceBlockStatement(node, {block}) {
    return new Shift.BlockStatement(node, {block});
  }

  reduceBreakStatement(node) {
    return new Shift.BreakStatement(node, {label: node.label});
  }

  reduceCallExpression(node, {callee, arguments: _arguments}) {
    return new Shift.CallExpression(node, {callee, arguments: _arguments});
  }

  reduceCatchClause(node, {binding, body}) {
    return new Shift.CatchClause(node, {binding, body});
  }

  reduceClassDeclaration(node, {name, super: _super, elements}) {
    return new Shift.ClassDeclaration(node, {name, super: _super, elements});
  }

  reduceClassElement(node, {method}) {
    return new Shift.ClassElement(node, {isStatic: node.isStatic, method});
  }

  reduceClassExpression(node, {name, super: _super, elements}) {
    return new Shift.ClassExpression(node, {name, super: _super, elements});
  }

  reduceCompoundAssignmentExpression(node, {binding, expression}) {
    return new Shift.CompoundAssignmentExpression(node, {binding, operator: node.operator, expression});
  }

  reduceComputedMemberAssignmentTarget(node, {object, expression}) {
    return new Shift.ComputedMemberAssignmentTarget(node, {object, expression});
  }

  reduceComputedMemberExpression(node, {object, expression}) {
    return new Shift.ComputedMemberExpression(node, {object, expression});
  }

  reduceComputedPropertyName(node, {expression}) {
    return new Shift.ComputedPropertyName(node, {expression});
  }

  reduceConditionalExpression(node, {test, consequent, alternate}) {
    return new Shift.ConditionalExpression(node, {test, consequent, alternate});
  }

  reduceContinueStatement(node) {
    return new Shift.ContinueStatement(node, {label: node.label});
  }

  reduceDataProperty(node, {name, expression}) {
    return new Shift.DataProperty(node, {name, expression});
  }

  reduceDebuggerStatement(node) {
    return new Shift.DebuggerStatement;
  }

  reduceDirective(node) {
    return new Shift.Directive(node, {rawValue: node.rawValue});
  }

  reduceDoWhileStatement(node, {body, test}) {
    return new Shift.DoWhileStatement(node, {body, test});
  }

  reduceEmptyStatement(node) {
    return new Shift.EmptyStatement;
  }

  reduceExport(node, {declaration}) {
    return new Shift.Export(node, {declaration});
  }

  reduceExportAllFrom(node) {
    return new Shift.ExportAllFrom(node, {moduleSpecifier: node.moduleSpecifier});
  }

  reduceExportDefault(node, {body}) {
    return new Shift.ExportDefault(node, {body});
  }

  reduceExportFrom(node, {namedExports}) {
    return new Shift.ExportFrom(node, {namedExports, moduleSpecifier: node.moduleSpecifier});
  }

  reduceExportFromSpecifier(node) {
    return new Shift.ExportFromSpecifier(node, {name: node.name, exportedName: node.exportedName});
  }

  reduceExportLocalSpecifier(node, {name}) {
    return new Shift.ExportLocalSpecifier(node, {name, exportedName: node.exportedName});
  }

  reduceExportLocals(node, {namedExports}) {
    return new Shift.ExportLocals(node, {namedExports});
  }

  reduceExpressionStatement(node, {expression}) {
    return new Shift.ExpressionStatement(node, {expression});
  }

  reduceForInStatement(node, {left, right, body}) {
    return new Shift.ForInStatement(node, {left, right, body});
  }

  reduceForOfStatement(node, {left, right, body}) {
    return new Shift.ForOfStatement(node, {left, right, body});
  }

  reduceForStatement(node, {init, test, update, body}) {
    return new Shift.ForStatement(node, {init, test, update, body});
  }

  reduceFormalParameters(node, {items, rest}) {
    return new Shift.FormalParameters(node, {items, rest});
  }

  reduceFunctionBody(node, {directives, statements}) {
    return new Shift.FunctionBody(node, {directives, statements});
  }

  reduceFunctionDeclaration(node, {name, params, body}) {
    return new Shift.FunctionDeclaration(node, {isGenerator: node.isGenerator, name, params, body});
  }

  reduceFunctionExpression(node, {name, params, body}) {
    return new Shift.FunctionExpression(node, {isGenerator: node.isGenerator, name, params, body});
  }

  reduceGetter(node, {name, body}) {
    return new Shift.Getter(node, {name, body});
  }

  reduceIdentifierExpression(node) {
    return new Shift.IdentifierExpression(node, {name: node.name});
  }

  reduceIfStatement(node, {test, consequent, alternate}) {
    return new Shift.IfStatement(node, {test, consequent, alternate});
  }

  reduceImport(node, {defaultBinding, namedImports}) {
    return new Shift.Import(node, {defaultBinding, namedImports, moduleSpecifier: node.moduleSpecifier});
  }

  reduceImportNamespace(node, {defaultBinding, namespaceBinding}) {
    return new Shift.ImportNamespace(node, {defaultBinding, namespaceBinding, moduleSpecifier: node.moduleSpecifier});
  }

  reduceImportSpecifier(node, {binding}) {
    return new Shift.ImportSpecifier(node, {name: node.name, binding});
  }

  reduceLabeledStatement(node, {body}) {
    return new Shift.LabeledStatement(node, {label: node.label, body});
  }

  reduceLiteralBooleanExpression(node) {
    return new Shift.LiteralBooleanExpression(node, {value: node.value});
  }

  reduceLiteralInfinityExpression(node) {
    return new Shift.LiteralInfinityExpression;
  }

  reduceLiteralNullExpression(node) {
    return new Shift.LiteralNullExpression;
  }

  reduceLiteralNumericExpression(node) {
    return new Shift.LiteralNumericExpression(node, {value: node.value});
  }

  reduceLiteralRegExpExpression(node) {
    return new Shift.LiteralRegExpExpression(node, {pattern: node.pattern, global: node.global, ignoreCase: node.ignoreCase, multiLine: node.multiLine, sticky: node.sticky, unicode: node.unicode});
  }

  reduceLiteralStringExpression(node) {
    return new Shift.LiteralStringExpression(node, {value: node.value});
  }

  reduceMethod(node, {name, params, body}) {
    return new Shift.Method(node, {isGenerator: node.isGenerator, name, params, body});
  }

  reduceModule(node, {directives, items}) {
    return new Shift.Module(node, {directives, items});
  }

  reduceNewExpression(node, {callee, arguments: _arguments}) {
    return new Shift.NewExpression(node, {callee, arguments: _arguments});
  }

  reduceNewTargetExpression(node) {
    return new Shift.NewTargetExpression;
  }

  reduceObjectAssignmentTarget(node, {properties}) {
    return new Shift.ObjectAssignmentTarget(node, {properties});
  }

  reduceObjectBinding(node, {properties}) {
    return new Shift.ObjectBinding(node, {properties});
  }

  reduceObjectExpression(node, {properties}) {
    return new Shift.ObjectExpression(node, {properties});
  }

  reduceReturnStatement(node, {expression}) {
    return new Shift.ReturnStatement(node, {expression});
  }

  reduceScript(node, {directives, statements}) {
    return new Shift.Script(node, {directives, statements});
  }

  reduceSetter(node, {name, param, body}) {
    return new Shift.Setter(node, {name, param, body});
  }

  reduceShorthandProperty(node, {name}) {
    return new Shift.ShorthandProperty(node, {name});
  }

  reduceSpreadElement(node, {expression}) {
    return new Shift.SpreadElement(node, {expression});
  }

  reduceStaticMemberAssignmentTarget(node, {object}) {
    return new Shift.StaticMemberAssignmentTarget(node, {object, property: node.property});
  }

  reduceStaticMemberExpression(node, {object}) {
    return new Shift.StaticMemberExpression(node, {object, property: node.property});
  }

  reduceStaticPropertyName(node) {
    return new Shift.StaticPropertyName(node, {value: node.value});
  }

  reduceSuper(node) {
    return new Shift.Super;
  }

  reduceSwitchCase(node, {test, consequent}) {
    return new Shift.SwitchCase(node, {test, consequent});
  }

  reduceSwitchDefault(node, {consequent}) {
    return new Shift.SwitchDefault(node, {consequent});
  }

  reduceSwitchStatement(node, {discriminant, cases}) {
    return new Shift.SwitchStatement(node, {discriminant, cases});
  }

  reduceSwitchStatementWithDefault(node, {discriminant, preDefaultCases, defaultCase, postDefaultCases}) {
    return new Shift.SwitchStatementWithDefault(node, {discriminant, preDefaultCases, defaultCase, postDefaultCases});
  }

  reduceTemplateElement(node) {
    return new Shift.TemplateElement(node, {rawValue: node.rawValue});
  }

  reduceTemplateExpression(node, {tag, elements}) {
    return new Shift.TemplateExpression(node, {tag, elements});
  }

  reduceThisExpression(node) {
    return new Shift.ThisExpression;
  }

  reduceThrowStatement(node, {expression}) {
    return new Shift.ThrowStatement(node, {expression});
  }

  reduceTryCatchStatement(node, {body, catchClause}) {
    return new Shift.TryCatchStatement(node, {body, catchClause});
  }

  reduceTryFinallyStatement(node, {body, catchClause, finalizer}) {
    return new Shift.TryFinallyStatement(node, {body, catchClause, finalizer});
  }

  reduceUnaryExpression(node, {operand}) {
    return new Shift.UnaryExpression(node, {operator: node.operator, operand});
  }

  reduceUpdateExpression(node, {operand}) {
    return new Shift.UpdateExpression(node, {isPrefix: node.isPrefix, operator: node.operator, operand});
  }

  reduceVariableDeclaration(node, {declarators}) {
    return new Shift.VariableDeclaration(node, {kind: node.kind, declarators});
  }

  reduceVariableDeclarationStatement(node, {declaration}) {
    return new Shift.VariableDeclarationStatement(node, {declaration});
  }

  reduceVariableDeclarator(node, {binding, init}) {
    return new Shift.VariableDeclarator(node, {binding, init});
  }

  reduceWhileStatement(node, {test, body}) {
    return new Shift.WhileStatement(node, {test, body});
  }

  reduceWithStatement(node, {object, body}) {
    return new Shift.WithStatement(node, {object, body});
  }

  reduceYieldExpression(node, {expression}) {
    return new Shift.YieldExpression(node, {expression});
  }

  reduceYieldGeneratorExpression(node, {expression}) {
    return new Shift.YieldGeneratorExpression(node, {expression});
  }
}
