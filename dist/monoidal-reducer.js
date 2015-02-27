"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

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

var MonoidalReducer = (function () {
  function MonoidalReducer(monoid) {
    _classCallCheck(this, MonoidalReducer);

    this.identity = monoid.empty();
    var concat = monoid.prototype && monoid.prototype.concat || monoid.concat;
    this.append = this.append2 = function (a, b) {
      return concat.call(a, b);
    };
  }

  _prototypeProperties(MonoidalReducer, null, {
    fromNull: {
      value: function fromNull(a) {
        return a == null ? this.identity : a;
      },
      writable: true,
      configurable: true
    },
    append3: {
      value: function append3(a, b, c) {
        return this.append(this.append(a, b), c);
      },
      writable: true,
      configurable: true
    },
    append4: {
      value: function append4(a, b, c, d) {
        return this.append(this.append3(a, b, c), d);
      },
      writable: true,
      configurable: true
    },
    fold: {
      value: function fold(as, a) {
        var _this = this;
        return as.reduce(function (memo, x) {
          return _this.append(memo, x);
        }, a == null ? this.identity : a);
      },
      writable: true,
      configurable: true
    },
    reduceArrayExpression: {
      value: function reduceArrayExpression(node, elements) {
        return this.fold(elements.filter(function (x) {
          return x != null;
        }));
      },
      writable: true,
      configurable: true
    },
    reduceAssignmentExpression: {
      value: function reduceAssignmentExpression(node, binding, expression) {
        return this.append(binding, expression);
      },
      writable: true,
      configurable: true
    },
    reduceBinaryExpression: {
      value: function reduceBinaryExpression(node, left, right) {
        return this.append(left, right);
      },
      writable: true,
      configurable: true
    },
    reduceBlock: {
      value: function reduceBlock(node, statements) {
        return this.fold(statements);
      },
      writable: true,
      configurable: true
    },
    reduceBlockStatement: {
      value: function reduceBlockStatement(node, block) {
        return block;
      },
      writable: true,
      configurable: true
    },
    reduceBreakStatement: {
      value: function reduceBreakStatement(node, label) {
        return this.fromNull(label);
      },
      writable: true,
      configurable: true
    },
    reduceCallExpression: {
      value: function reduceCallExpression(node, callee, args) {
        return this.fold(args, callee);
      },
      writable: true,
      configurable: true
    },
    reduceCatchClause: {
      value: function reduceCatchClause(node, binding, body) {
        return this.append(binding, body);
      },
      writable: true,
      configurable: true
    },
    reduceComputedMemberExpression: {
      value: function reduceComputedMemberExpression(node, object, expression) {
        return this.append(object, expression);
      },
      writable: true,
      configurable: true
    },
    reduceConditionalExpression: {
      value: function reduceConditionalExpression(node, test, consequent, alternate) {
        return this.append3(test, consequent, alternate);
      },
      writable: true,
      configurable: true
    },
    reduceContinueStatement: {
      value: function reduceContinueStatement(node, label) {
        return this.fromNull(label);
      },
      writable: true,
      configurable: true
    },
    reduceDataProperty: {
      value: function reduceDataProperty(node, name, expression) {
        return this.append(name, expression);
      },
      writable: true,
      configurable: true
    },
    reduceDebuggerStatement: {
      value: function reduceDebuggerStatement(node) {
        return this.identity;
      },
      writable: true,
      configurable: true
    },
    reduceDoWhileStatement: {
      value: function reduceDoWhileStatement(node, body, test) {
        return this.append(body, test);
      },
      writable: true,
      configurable: true
    },
    reduceEmptyStatement: {
      value: function reduceEmptyStatement(node) {
        return this.identity;
      },
      writable: true,
      configurable: true
    },
    reduceExpressionStatement: {
      value: function reduceExpressionStatement(node, expression) {
        return expression;
      },
      writable: true,
      configurable: true
    },
    reduceForInStatement: {
      value: function reduceForInStatement(node, left, right, body) {
        return this.append3(left, right, body);
      },
      writable: true,
      configurable: true
    },
    reduceForStatement: {
      value: function reduceForStatement(node, init, test, update, body) {
        return this.append4(this.fromNull(init), this.fromNull(test), this.fromNull(update), body);
      },
      writable: true,
      configurable: true
    },
    reduceFunctionBody: {
      value: function reduceFunctionBody(node, directives, statements) {
        return this.append(this.fold(directives), this.fold(statements));
      },
      writable: true,
      configurable: true
    },
    reduceFunctionDeclaration: {
      value: function reduceFunctionDeclaration(node, name, parameters, body) {
        return this.append(this.fold(parameters, name), body);
      },
      writable: true,
      configurable: true
    },
    reduceFunctionExpression: {
      value: function reduceFunctionExpression(node, name, parameters, body) {
        return this.append(this.fold(parameters, this.fromNull(name)), body);
      },
      writable: true,
      configurable: true
    },
    reduceGetter: {
      value: function reduceGetter(node, name, body) {
        return this.append(name, body);
      },
      writable: true,
      configurable: true
    },
    reduceIdentifier: {
      value: function reduceIdentifier(node) {
        return this.identity;
      },
      writable: true,
      configurable: true
    },
    reduceIdentifierExpression: {
      value: function reduceIdentifierExpression(node, name) {
        return name;
      },
      writable: true,
      configurable: true
    },
    reduceIfStatement: {
      value: function reduceIfStatement(node, test, consequent, alternate) {
        return this.append3(test, consequent, this.fromNull(alternate));
      },
      writable: true,
      configurable: true
    },
    reduceLabeledStatement: {
      value: function reduceLabeledStatement(node, label, body) {
        return this.append(label, body);
      },
      writable: true,
      configurable: true
    },
    reduceLiteralBooleanExpression: {
      value: function reduceLiteralBooleanExpression(node) {
        return this.identity;
      },
      writable: true,
      configurable: true
    },
    reduceLiteralNullExpression: {
      value: function reduceLiteralNullExpression(node) {
        return this.identity;
      },
      writable: true,
      configurable: true
    },
    reduceLiteralInfinityExpression: {
      value: function reduceLiteralInfinityExpression(node) {
        return this.identity;
      },
      writable: true,
      configurable: true
    },
    reduceLiteralNumericExpression: {
      value: function reduceLiteralNumericExpression(node) {
        return this.identity;
      },
      writable: true,
      configurable: true
    },
    reduceLiteralRegExpExpression: {
      value: function reduceLiteralRegExpExpression(node) {
        return this.identity;
      },
      writable: true,
      configurable: true
    },
    reduceLiteralStringExpression: {
      value: function reduceLiteralStringExpression(node) {
        return this.identity;
      },
      writable: true,
      configurable: true
    },
    reduceNewExpression: {
      value: function reduceNewExpression(node, callee, args) {
        return this.fold(args, callee);
      },
      writable: true,
      configurable: true
    },
    reduceObjectExpression: {
      value: function reduceObjectExpression(node, properties) {
        return this.fold(properties);
      },
      writable: true,
      configurable: true
    },
    reducePostfixExpression: {
      value: function reducePostfixExpression(node, operand) {
        return operand;
      },
      writable: true,
      configurable: true
    },
    reducePrefixExpression: {
      value: function reducePrefixExpression(node, operand) {
        return operand;
      },
      writable: true,
      configurable: true
    },
    reducePropertyName: {
      value: function reducePropertyName(node) {
        return this.identity;
      },
      writable: true,
      configurable: true
    },
    reduceReturnStatement: {
      value: function reduceReturnStatement(node, expression) {
        return this.fromNull(expression);
      },
      writable: true,
      configurable: true
    },
    reduceScript: {
      value: function reduceScript(node, body) {
        return body;
      },
      writable: true,
      configurable: true
    },
    reduceSetter: {
      value: function reduceSetter(node, name, parameter, body) {
        return this.append3(name, parameter, body);
      },
      writable: true,
      configurable: true
    },
    reduceStaticMemberExpression: {
      value: function reduceStaticMemberExpression(node, object, property) {
        return this.append(object, property);
      },
      writable: true,
      configurable: true
    },
    reduceSwitchCase: {
      value: function reduceSwitchCase(node, test, consequent) {
        return this.fold(consequent, test);
      },
      writable: true,
      configurable: true
    },
    reduceSwitchDefault: {
      value: function reduceSwitchDefault(node, consequent) {
        return this.fold(consequent);
      },
      writable: true,
      configurable: true
    },
    reduceSwitchStatement: {
      value: function reduceSwitchStatement(node, discriminant, cases) {
        return this.fold(cases, discriminant);
      },
      writable: true,
      configurable: true
    },
    reduceSwitchStatementWithDefault: {
      value: function reduceSwitchStatementWithDefault(node, discriminant, preDefaultCases, defaultCase, postDefaultCases) {
        return this.append4(discriminant, this.fold(preDefaultCases), defaultCase, this.fold(postDefaultCases));
      },
      writable: true,
      configurable: true
    },
    reduceThisExpression: {
      value: function reduceThisExpression(node) {
        return this.identity;
      },
      writable: true,
      configurable: true
    },
    reduceThrowStatement: {
      value: function reduceThrowStatement(node, expression) {
        return this.fromNull(expression);
      },
      writable: true,
      configurable: true
    },
    reduceTryCatchStatement: {
      value: function reduceTryCatchStatement(node, block, catchClause) {
        return this.append(block, catchClause);
      },
      writable: true,
      configurable: true
    },
    reduceTryFinallyStatement: {
      value: function reduceTryFinallyStatement(node, block, catchClause, finalizer) {
        return this.append3(block, this.fromNull(catchClause), finalizer);
      },
      writable: true,
      configurable: true
    },
    reduceUnknownDirective: {
      value: function reduceUnknownDirective(node) {
        return this.identity;
      },
      writable: true,
      configurable: true
    },
    reduceUseStrictDirective: {
      value: function reduceUseStrictDirective(node) {
        return this.identity;
      },
      writable: true,
      configurable: true
    },
    reduceVariableDeclaration: {
      value: function reduceVariableDeclaration(node, declarators) {
        return this.fold(declarators);
      },
      writable: true,
      configurable: true
    },
    reduceVariableDeclarationStatement: {
      value: function reduceVariableDeclarationStatement(node, declaration) {
        return declaration;
      },
      writable: true,
      configurable: true
    },
    reduceVariableDeclarator: {
      value: function reduceVariableDeclarator(node, binding, init) {
        return this.append(binding, this.fromNull(init));
      },
      writable: true,
      configurable: true
    },
    reduceWhileStatement: {
      value: function reduceWhileStatement(node, test, body) {
        return this.append(test, body);
      },
      writable: true,
      configurable: true
    },
    reduceWithStatement: {
      value: function reduceWithStatement(node, object, body) {
        return this.append(object, body);
      },
      writable: true,
      configurable: true
    }
  });

  return MonoidalReducer;
})();

exports["default"] = MonoidalReducer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tb25vaWRhbC1yZWR1Y2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFnQnFCLGVBQWU7QUFDdkIsV0FEUSxlQUFlLENBQ3RCLE1BQU07MEJBREMsZUFBZTs7QUFFaEMsUUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDL0IsUUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLFNBQVMsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDO0FBQzFFLFFBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxVQUFDLENBQUMsRUFBRSxDQUFDO2FBQUssTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQUEsQ0FBQztHQUMxRDs7dUJBTGtCLGVBQWU7QUFPbEMsWUFBUTthQUFBLGtCQUFDLENBQUMsRUFBRTtBQUNWLGVBQU8sQ0FBQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztPQUN0Qzs7OztBQUNELFdBQU87YUFBQSxpQkFBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNmLGVBQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztPQUMxQzs7OztBQUNELFdBQU87YUFBQSxpQkFBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDbEIsZUFBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztPQUM5Qzs7OztBQUNELFFBQUk7YUFBQSxjQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUU7O0FBQ1Ys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O3FCQUFmLGVBQWUiLCJmaWxlIjoic3JjL21vbm9pZGFsLXJlZHVjZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAyMDE0IFNoYXBlIFNlY3VyaXR5LCBJbmMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKVxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9ub2lkYWxSZWR1Y2VyIHtcbiAgY29uc3RydWN0b3IobW9ub2lkKSB7XG4gICAgdGhpcy5pZGVudGl0eSA9IG1vbm9pZC5lbXB0eSgpO1xuICAgIGxldCBjb25jYXQgPSBtb25vaWQucHJvdG90eXBlICYmIG1vbm9pZC5wcm90b3R5cGUuY29uY2F0IHx8IG1vbm9pZC5jb25jYXQ7XG4gICAgdGhpcy5hcHBlbmQgPSB0aGlzLmFwcGVuZDIgPSAoYSwgYikgPT4gY29uY2F0LmNhbGwoYSwgYik7XG4gIH1cblxuICBmcm9tTnVsbChhKSB7XG4gICAgcmV0dXJuIGEgPT0gbnVsbCA/IHRoaXMuaWRlbnRpdHkgOiBhO1xuICB9XG4gIGFwcGVuZDMoYSwgYiwgYykge1xuICAgIHJldHVybiB0aGlzLmFwcGVuZCh0aGlzLmFwcGVuZChhLCBiKSwgYyk7XG4gIH1cbiAgYXBwZW5kNChhLCBiLCBjLCBkKSB7XG4gICAgcmV0dXJuIHRoaXMuYXBwZW5kKHRoaXMuYXBwZW5kMyhhLCBiLCBjKSwgZCk7XG4gIH1cbiAgZm9sZChhcywgYSkge1xuICAgIHJldHVybiBhcy5yZWR1Y2UoKG1lbW8sIHgpID0+IHRoaXMuYXBwZW5kKG1lbW8sIHgpLCBhID09IG51bGwgPyB0aGlzLmlkZW50aXR5IDogYSk7XG4gIH1cblxuICByZWR1Y2VBcnJheUV4cHJlc3Npb24obm9kZSwgZWxlbWVudHMpIHtcbiAgICByZXR1cm4gdGhpcy5mb2xkKGVsZW1lbnRzLmZpbHRlcigoeCkgPT4geCAhPSBudWxsKSk7XG4gIH1cbiAgcmVkdWNlQXNzaWdubWVudEV4cHJlc3Npb24obm9kZSwgYmluZGluZywgZXhwcmVzc2lvbikge1xuICAgIHJldHVybiB0aGlzLmFwcGVuZChiaW5kaW5nLCBleHByZXNzaW9uKTtcbiAgfVxuICByZWR1Y2VCaW5hcnlFeHByZXNzaW9uKG5vZGUsIGxlZnQsIHJpZ2h0KSB7XG4gICAgcmV0dXJuIHRoaXMuYXBwZW5kKGxlZnQsIHJpZ2h0KTtcbiAgfVxuICByZWR1Y2VCbG9jayhub2RlLCBzdGF0ZW1lbnRzKSB7XG4gICAgcmV0dXJuIHRoaXMuZm9sZChzdGF0ZW1lbnRzKTtcbiAgfVxuICByZWR1Y2VCbG9ja1N0YXRlbWVudChub2RlLCBibG9jaykge1xuICAgIHJldHVybiBibG9jaztcbiAgfVxuICByZWR1Y2VCcmVha1N0YXRlbWVudChub2RlLCBsYWJlbCkge1xuICAgIHJldHVybiB0aGlzLmZyb21OdWxsKGxhYmVsKTtcbiAgfVxuICByZWR1Y2VDYWxsRXhwcmVzc2lvbihub2RlLCBjYWxsZWUsIGFyZ3MpIHtcbiAgICByZXR1cm4gdGhpcy5mb2xkKGFyZ3MsIGNhbGxlZSk7XG4gIH1cbiAgcmVkdWNlQ2F0Y2hDbGF1c2Uobm9kZSwgYmluZGluZywgYm9keSkge1xuICAgIHJldHVybiB0aGlzLmFwcGVuZChiaW5kaW5nLCBib2R5KTtcbiAgfVxuICByZWR1Y2VDb21wdXRlZE1lbWJlckV4cHJlc3Npb24obm9kZSwgb2JqZWN0LCBleHByZXNzaW9uKSB7XG4gICAgcmV0dXJuIHRoaXMuYXBwZW5kKG9iamVjdCwgZXhwcmVzc2lvbik7XG4gIH1cbiAgcmVkdWNlQ29uZGl0aW9uYWxFeHByZXNzaW9uKG5vZGUsIHRlc3QsIGNvbnNlcXVlbnQsIGFsdGVybmF0ZSkge1xuICAgIHJldHVybiB0aGlzLmFwcGVuZDModGVzdCwgY29uc2VxdWVudCwgYWx0ZXJuYXRlKTtcbiAgfVxuICByZWR1Y2VDb250aW51ZVN0YXRlbWVudChub2RlLCBsYWJlbCkge1xuICAgIHJldHVybiB0aGlzLmZyb21OdWxsKGxhYmVsKTtcbiAgfVxuICByZWR1Y2VEYXRhUHJvcGVydHkobm9kZSwgbmFtZSwgZXhwcmVzc2lvbikge1xuICAgIHJldHVybiB0aGlzLmFwcGVuZChuYW1lLCBleHByZXNzaW9uKTtcbiAgfVxuICByZWR1Y2VEZWJ1Z2dlclN0YXRlbWVudChub2RlKSB7XG4gICAgcmV0dXJuIHRoaXMuaWRlbnRpdHk7XG4gIH1cbiAgcmVkdWNlRG9XaGlsZVN0YXRlbWVudChub2RlLCBib2R5LCB0ZXN0KSB7XG4gICAgcmV0dXJuIHRoaXMuYXBwZW5kKGJvZHksIHRlc3QpO1xuICB9XG4gIHJlZHVjZUVtcHR5U3RhdGVtZW50KG5vZGUpIHtcbiAgICByZXR1cm4gdGhpcy5pZGVudGl0eTtcbiAgfVxuICByZWR1Y2VFeHByZXNzaW9uU3RhdGVtZW50KG5vZGUsIGV4cHJlc3Npb24pIHtcbiAgICByZXR1cm4gZXhwcmVzc2lvbjtcbiAgfVxuICByZWR1Y2VGb3JJblN0YXRlbWVudChub2RlLCBsZWZ0LCByaWdodCwgYm9keSkge1xuICAgIHJldHVybiB0aGlzLmFwcGVuZDMobGVmdCwgcmlnaHQsIGJvZHkpO1xuICB9XG4gIHJlZHVjZUZvclN0YXRlbWVudChub2RlLCBpbml0LCB0ZXN0LCB1cGRhdGUsIGJvZHkpIHtcbiAgICByZXR1cm4gdGhpcy5hcHBlbmQ0KHRoaXMuZnJvbU51bGwoaW5pdCksIHRoaXMuZnJvbU51bGwodGVzdCksIHRoaXMuZnJvbU51bGwodXBkYXRlKSwgYm9keSk7XG4gIH1cbiAgcmVkdWNlRnVuY3Rpb25Cb2R5KG5vZGUsIGRpcmVjdGl2ZXMsIHN0YXRlbWVudHMpIHtcbiAgICByZXR1cm4gdGhpcy5hcHBlbmQodGhpcy5mb2xkKGRpcmVjdGl2ZXMpLCB0aGlzLmZvbGQoc3RhdGVtZW50cykpO1xuICB9XG4gIHJlZHVjZUZ1bmN0aW9uRGVjbGFyYXRpb24obm9kZSwgbmFtZSwgcGFyYW1ldGVycywgYm9keSkge1xuICAgIHJldHVybiB0aGlzLmFwcGVuZCh0aGlzLmZvbGQocGFyYW1ldGVycywgbmFtZSksIGJvZHkpO1xuICB9XG4gIHJlZHVjZUZ1bmN0aW9uRXhwcmVzc2lvbihub2RlLCBuYW1lLCBwYXJhbWV0ZXJzLCBib2R5KSB7XG4gICAgcmV0dXJuIHRoaXMuYXBwZW5kKHRoaXMuZm9sZChwYXJhbWV0ZXJzLCB0aGlzLmZyb21OdWxsKG5hbWUpKSwgYm9keSk7XG4gIH1cbiAgcmVkdWNlR2V0dGVyKG5vZGUsIG5hbWUsIGJvZHkpIHtcbiAgICByZXR1cm4gdGhpcy5hcHBlbmQobmFtZSwgYm9keSk7XG4gIH1cbiAgcmVkdWNlSWRlbnRpZmllcihub2RlKSB7XG4gICAgcmV0dXJuIHRoaXMuaWRlbnRpdHk7XG4gIH1cbiAgcmVkdWNlSWRlbnRpZmllckV4cHJlc3Npb24obm9kZSwgbmFtZSkge1xuICAgIHJldHVybiBuYW1lO1xuICB9XG4gIHJlZHVjZUlmU3RhdGVtZW50KG5vZGUsIHRlc3QsIGNvbnNlcXVlbnQsIGFsdGVybmF0ZSkge1xuICAgIHJldHVybiB0aGlzLmFwcGVuZDModGVzdCwgY29uc2VxdWVudCwgdGhpcy5mcm9tTnVsbChhbHRlcm5hdGUpKTtcbiAgfVxuICByZWR1Y2VMYWJlbGVkU3RhdGVtZW50KG5vZGUsIGxhYmVsLCBib2R5KSB7XG4gICAgcmV0dXJuIHRoaXMuYXBwZW5kKGxhYmVsLCBib2R5KTtcbiAgfVxuICByZWR1Y2VMaXRlcmFsQm9vbGVhbkV4cHJlc3Npb24obm9kZSkge1xuICAgIHJldHVybiB0aGlzLmlkZW50aXR5O1xuICB9XG4gIHJlZHVjZUxpdGVyYWxOdWxsRXhwcmVzc2lvbihub2RlKSB7XG4gICAgcmV0dXJuIHRoaXMuaWRlbnRpdHk7XG4gIH1cbiAgcmVkdWNlTGl0ZXJhbEluZmluaXR5RXhwcmVzc2lvbihub2RlKSB7XG4gICAgcmV0dXJuIHRoaXMuaWRlbnRpdHk7XG4gIH1cbiAgcmVkdWNlTGl0ZXJhbE51bWVyaWNFeHByZXNzaW9uKG5vZGUpIHtcbiAgICByZXR1cm4gdGhpcy5pZGVudGl0eTtcbiAgfVxuICByZWR1Y2VMaXRlcmFsUmVnRXhwRXhwcmVzc2lvbihub2RlKSB7XG4gICAgcmV0dXJuIHRoaXMuaWRlbnRpdHk7XG4gIH1cbiAgcmVkdWNlTGl0ZXJhbFN0cmluZ0V4cHJlc3Npb24obm9kZSkge1xuICAgIHJldHVybiB0aGlzLmlkZW50aXR5O1xuICB9XG4gIHJlZHVjZU5ld0V4cHJlc3Npb24obm9kZSwgY2FsbGVlLCBhcmdzKSB7XG4gICAgcmV0dXJuIHRoaXMuZm9sZChhcmdzLCBjYWxsZWUpO1xuICB9XG4gIHJlZHVjZU9iamVjdEV4cHJlc3Npb24obm9kZSwgcHJvcGVydGllcykge1xuICAgIHJldHVybiB0aGlzLmZvbGQocHJvcGVydGllcyk7XG4gIH1cbiAgcmVkdWNlUG9zdGZpeEV4cHJlc3Npb24obm9kZSwgb3BlcmFuZCkge1xuICAgIHJldHVybiBvcGVyYW5kO1xuICB9XG4gIHJlZHVjZVByZWZpeEV4cHJlc3Npb24obm9kZSwgb3BlcmFuZCkge1xuICAgIHJldHVybiBvcGVyYW5kO1xuICB9XG4gIHJlZHVjZVByb3BlcnR5TmFtZShub2RlKSB7XG4gICAgcmV0dXJuIHRoaXMuaWRlbnRpdHk7XG4gIH1cbiAgcmVkdWNlUmV0dXJuU3RhdGVtZW50KG5vZGUsIGV4cHJlc3Npb24pIHtcbiAgICByZXR1cm4gdGhpcy5mcm9tTnVsbChleHByZXNzaW9uKTtcbiAgfVxuICByZWR1Y2VTY3JpcHQobm9kZSwgYm9keSkge1xuICAgIHJldHVybiBib2R5O1xuICB9XG4gIHJlZHVjZVNldHRlcihub2RlLCBuYW1lLCBwYXJhbWV0ZXIsIGJvZHkpIHtcbiAgICByZXR1cm4gdGhpcy5hcHBlbmQzKG5hbWUsIHBhcmFtZXRlciwgYm9keSk7XG4gIH1cbiAgcmVkdWNlU3RhdGljTWVtYmVyRXhwcmVzc2lvbihub2RlLCBvYmplY3QsIHByb3BlcnR5KSB7XG4gICAgcmV0dXJuIHRoaXMuYXBwZW5kKG9iamVjdCwgcHJvcGVydHkpO1xuICB9XG4gIHJlZHVjZVN3aXRjaENhc2Uobm9kZSwgdGVzdCwgY29uc2VxdWVudCkge1xuICAgIHJldHVybiB0aGlzLmZvbGQoY29uc2VxdWVudCwgdGVzdCk7XG4gIH1cbiAgcmVkdWNlU3dpdGNoRGVmYXVsdChub2RlLCBjb25zZXF1ZW50KSB7XG4gICAgcmV0dXJuIHRoaXMuZm9sZChjb25zZXF1ZW50KTtcbiAgfVxuICByZWR1Y2VTd2l0Y2hTdGF0ZW1lbnQobm9kZSwgZGlzY3JpbWluYW50LCBjYXNlcykge1xuICAgIHJldHVybiB0aGlzLmZvbGQoY2FzZXMsIGRpc2NyaW1pbmFudCk7XG4gIH1cbiAgcmVkdWNlU3dpdGNoU3RhdGVtZW50V2l0aERlZmF1bHQobm9kZSwgZGlzY3JpbWluYW50LCBwcmVEZWZhdWx0Q2FzZXMsIGRlZmF1bHRDYXNlLCBwb3N0RGVmYXVsdENhc2VzKSB7XG4gICAgcmV0dXJuIHRoaXMuYXBwZW5kNChkaXNjcmltaW5hbnQsIHRoaXMuZm9sZChwcmVEZWZhdWx0Q2FzZXMpLCBkZWZhdWx0Q2FzZSwgdGhpcy5mb2xkKHBvc3REZWZhdWx0Q2FzZXMpKTtcbiAgfVxuICByZWR1Y2VUaGlzRXhwcmVzc2lvbihub2RlKSB7XG4gICAgcmV0dXJuIHRoaXMuaWRlbnRpdHk7XG4gIH1cbiAgcmVkdWNlVGhyb3dTdGF0ZW1lbnQobm9kZSwgZXhwcmVzc2lvbikge1xuICAgIHJldHVybiB0aGlzLmZyb21OdWxsKGV4cHJlc3Npb24pO1xuICB9XG4gIHJlZHVjZVRyeUNhdGNoU3RhdGVtZW50KG5vZGUsIGJsb2NrLCBjYXRjaENsYXVzZSkge1xuICAgIHJldHVybiB0aGlzLmFwcGVuZChibG9jaywgY2F0Y2hDbGF1c2UpO1xuICB9XG4gIHJlZHVjZVRyeUZpbmFsbHlTdGF0ZW1lbnQobm9kZSwgYmxvY2ssIGNhdGNoQ2xhdXNlLCBmaW5hbGl6ZXIpIHtcbiAgICByZXR1cm4gdGhpcy5hcHBlbmQzKGJsb2NrLCB0aGlzLmZyb21OdWxsKGNhdGNoQ2xhdXNlKSwgZmluYWxpemVyKTtcbiAgfVxuICByZWR1Y2VVbmtub3duRGlyZWN0aXZlKG5vZGUpIHtcbiAgICByZXR1cm4gdGhpcy5pZGVudGl0eTtcbiAgfVxuICByZWR1Y2VVc2VTdHJpY3REaXJlY3RpdmUobm9kZSkge1xuICAgIHJldHVybiB0aGlzLmlkZW50aXR5O1xuICB9XG4gIHJlZHVjZVZhcmlhYmxlRGVjbGFyYXRpb24obm9kZSwgZGVjbGFyYXRvcnMpIHtcbiAgICByZXR1cm4gdGhpcy5mb2xkKGRlY2xhcmF0b3JzKTtcbiAgfVxuICByZWR1Y2VWYXJpYWJsZURlY2xhcmF0aW9uU3RhdGVtZW50KG5vZGUsIGRlY2xhcmF0aW9uKSB7XG4gICAgcmV0dXJuIGRlY2xhcmF0aW9uO1xuICB9XG4gIHJlZHVjZVZhcmlhYmxlRGVjbGFyYXRvcihub2RlLCBiaW5kaW5nLCBpbml0KSB7XG4gICAgcmV0dXJuIHRoaXMuYXBwZW5kKGJpbmRpbmcsIHRoaXMuZnJvbU51bGwoaW5pdCkpO1xuICB9XG4gIHJlZHVjZVdoaWxlU3RhdGVtZW50KG5vZGUsIHRlc3QsIGJvZHkpIHtcbiAgICByZXR1cm4gdGhpcy5hcHBlbmQodGVzdCwgYm9keSk7XG4gIH1cbiAgcmVkdWNlV2l0aFN0YXRlbWVudChub2RlLCBvYmplY3QsIGJvZHkpIHtcbiAgICByZXR1cm4gdGhpcy5hcHBlbmQob2JqZWN0LCBib2R5KTtcbiAgfVxufVxuIl19