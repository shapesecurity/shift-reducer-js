"use strict";

var _extends = function (child, parent) {
  child.prototype = Object.create(parent.prototype, {
    constructor: {
      value: child,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  child.__proto__ = parent;
};

var AST = require("laserbat-ast");




function recurse(branch) {
  return function (reducer, node) {
    var branchNode = node[branch];
    return REDUCERS[branchNode.type](reducer, branchNode);
  };
}

function recurseMaybe(branch) {
  return function (reducer, node) {
    var branchNode = node[branch];
    if (branchNode == null) return null;
    return REDUCERS[branchNode.type](reducer, branchNode);
  };
}

function recurseList(branch) {
  return function (reducer, node) {
    return [].map.call(node[branch], function (n) {
      return REDUCERS[n.type](reducer, n);
    });
  };
}

function recurseListMaybe(branch) {
  return function (reducer, node) {
    return [].map.call(node[branch], function (n) {
      if (n == null) return null;
      return REDUCERS[n.type](reducer, n);
    });
  };
}

var REDUCER_SPEC = {
  ArrayExpression: [recurseListMaybe("elements")],
  AssignmentExpression: [recurse("binding"), recurse("expression")],
  BinaryExpression: [recurse("left"), recurse("right")],
  Block: [recurseList("statements")],
  BlockStatement: [recurse("block")],
  BreakStatement: [recurseMaybe("label")],
  CallExpression: [recurse("callee"), recurseList("arguments")],
  CatchClause: [recurse("binding"), recurse("body")],
  ComputedMemberExpression: [recurse("object"), recurse("expression")],
  ConditionalExpression: [recurse("test"), recurse("consequent"), recurse("alternate")],
  ContinueStatement: [recurseMaybe("label")],
  DataProperty: [recurse("name"), recurse("expression")],
  DebuggerStatement: [],
  DoWhileStatement: [recurse("body"), recurse("test")],
  EmptyStatement: [],
  ExpressionStatement: [recurse("expression")],
  ForInStatement: [recurse("left"), recurse("right"), recurse("body")],
  ForStatement: [recurseMaybe("init"), recurseMaybe("test"), recurseMaybe("update"), recurse("body")],
  FunctionBody: [recurseList("directives"), recurseList("statements")],
  FunctionDeclaration: [recurse("name"), recurseList("parameters"), recurse("body")],
  FunctionExpression: [recurseMaybe("name"), recurseList("parameters"), recurse("body")],
  Getter: [recurse("name"), recurse("body")],
  Identifier: [],
  IdentifierExpression: [recurse("identifier")],
  IfStatement: [recurse("test"), recurse("consequent"), recurseMaybe("alternate")],
  LabeledStatement: [recurse("label"), recurse("body")],
  LiteralBooleanExpression: [],
  LiteralNullExpression: [],
  LiteralNumericExpression: [],
  LiteralRegExpExpression: [],
  LiteralStringExpression: [],
  NewExpression: [recurse("callee"), recurseList("arguments")],
  ObjectExpression: [recurseList("properties")],
  PostfixExpression: [recurse("operand")],
  PrefixExpression: [recurse("operand")],
  PropertyName: [],
  ReturnStatement: [recurseMaybe("expression")],
  Script: [recurse("body")],
  Setter: [recurse("name"), recurse("parameter"), recurse("body")],
  StaticMemberExpression: [recurse("object"), recurse("property")],
  SwitchCase: [recurse("test"), recurseList("consequent")],
  SwitchDefault: [recurseList("consequent")],
  SwitchStatement: [recurse("discriminant"), recurseList("cases")],
  SwitchStatementWithDefault: [recurse("discriminant"), recurseList("preDefaultCases"), recurse("defaultCase"), recurseList("postDefaultCases")],
  ThisExpression: [],
  ThrowStatement: [recurse("expression")],
  TryCatchStatement: [recurse("block"), recurse("catchClause")],
  TryFinallyStatement: [recurse("block"), recurseMaybe("catchClause"), recurse("finalizer")],
  UnknownDirective: [],
  UseStrictDirective: [],
  VariableDeclaration: [recurseList("declarators")],
  VariableDeclarationStatement: [recurse("declaration")],
  VariableDeclarator: [recurse("binding"), recurseMaybe("init")],
  WhileStatement: [recurse("test"), recurse("body")],
  WithStatement: [recurse("object"), recurse("body")] };

var REDUCERS = (function () {
  var o = Object.create(null);
  _loop: for (var T in REDUCER_SPEC) {
    var _ret = (function (T) {
      if (!{}.hasOwnProperty.call(REDUCER_SPEC, T)) return "continue";
      var reducingFunctionName = "reduce" + T;
      o[AST[T].prototype.type] = function (reducer, node) {
        return reducer[reducingFunctionName].apply(reducer, [node].concat(REDUCER_SPEC[T].map(function (f) {
          return f(reducer, node);
        })));
      };
    })(T);

    if (_ret === "continue") continue _loop;
  }
  return o;
}());


function reduce(reducible, node) {
  return REDUCERS[node.type](reducible, node);
}


exports["default"] = reduce;
var Reducible = function Reducible() {};

exports.Reducible = Reducible;
var MonoidalReducible = (function (Reducible) {
  var MonoidalReducible = function MonoidalReducible(monoid) {
    this.monoid = monoid;
  };

  _extends(MonoidalReducible, Reducible);

  MonoidalReducible.prototype.identity = function () {
    return this.monoid.empty();
  };

  MonoidalReducible.prototype.fromNull = function (a) {
    return a == null ? this.identity() : a;
  };

  MonoidalReducible.prototype.append = function (a, b) {
    return this.monoid.prototype.concat.call(a, b);
  };

  MonoidalReducible.prototype.append3 = function (a, b, c) {
    return this.append(this.append(a, b), c);
  };

  MonoidalReducible.prototype.append4 = function (a, b, c, d) {
    return this.append(this.append3(a, b, c), d);
  };

  MonoidalReducible.prototype.fold = function (as, a) {
    var _this = this;
    return as.reduce(function (memo, x) {
      return _this.append(memo, x);
    }, a == null ? this.identity() : a);
  };

  MonoidalReducible.prototype.reduceArrayExpression = function (node, elements) {
    return this.fold(elements.filter(function (x) {
      return x != null;
    }));
  };

  MonoidalReducible.prototype.reduceAssignmentExpression = function (node, binding, expression) {
    return this.append(binding, expression);
  };

  MonoidalReducible.prototype.reduceBinaryExpression = function (node, left, right) {
    return this.append(left, right);
  };

  MonoidalReducible.prototype.reduceBlock = function (node, statements) {
    return this.fold(statements);
  };

  MonoidalReducible.prototype.reduceBlockStatement = function (node, block) {
    return block;
  };

  MonoidalReducible.prototype.reduceBreakStatement = function (node, label) {
    return this.fromNull(label);
  };

  MonoidalReducible.prototype.reduceCallExpression = function (node, callee, args) {
    return this.fold(args, callee);
  };

  MonoidalReducible.prototype.reduceCatchClause = function (node, binding, body) {
    return this.append(binding, body);
  };

  MonoidalReducible.prototype.reduceComputedMemberExpression = function (node, object, expression) {
    return this.append(object, expression);
  };

  MonoidalReducible.prototype.reduceConditionalExpression = function (node, test, consequent, alternate) {
    return this.append3(test, consequent, alternate);
  };

  MonoidalReducible.prototype.reduceContinueStatement = function (node, label) {
    return this.fromNull(label);
  };

  MonoidalReducible.prototype.reduceDataProperty = function (node, name, expression) {
    return this.append(name, expression);
  };

  MonoidalReducible.prototype.reduceDebuggerStatement = function (node) {
    return this.identity();
  };

  MonoidalReducible.prototype.reduceDoWhileStatement = function (node, body, test) {
    return this.append(body, test);
  };

  MonoidalReducible.prototype.reduceEmptyStatement = function (node) {
    return this.identity();
  };

  MonoidalReducible.prototype.reduceExpressionStatement = function (node, expression) {
    return expression;
  };

  MonoidalReducible.prototype.reduceForInStatement = function (node, left, right, body) {
    return this.append3(left, right, body);
  };

  MonoidalReducible.prototype.reduceForStatement = function (node, init, test, update, body) {
    return this.append4(this.fromNull(init), this.fromNull(test), this.fromNull(update), body);
  };

  MonoidalReducible.prototype.reduceFunctionBody = function (node, directives, statements) {
    return this.append(this.fold(directives), this.fold(statements));
  };

  MonoidalReducible.prototype.reduceFunctionDeclaration = function (node, name, parameters, body) {
    return this.append3(name, parameters, body);
  };

  MonoidalReducible.prototype.reduceFunctionExpression = function (node) {
    return this.append3(this.fromNull(name), parameters, body);
  };

  MonoidalReducible.prototype.reduceGetter = function (node, name, body) {
    return this.append(name, body);
  };

  MonoidalReducible.prototype.reduceIdentifier = function (node) {
    return this.identity();
  };

  MonoidalReducible.prototype.reduceIdentifierExpression = function (node, name) {
    return name;
  };

  MonoidalReducible.prototype.reduceIfStatement = function (node, test, consequent, alternate) {
    return this.append3(test, consequent, this.fromNull(alternate));
  };

  MonoidalReducible.prototype.reduceLabeledStatement = function (node, label, body) {
    return this.append(label, body);
  };

  MonoidalReducible.prototype.reduceLiteralBooleanExpression = function (node) {
    return this.identity();
  };

  MonoidalReducible.prototype.reduceLiteralNullExpression = function (node) {
    return this.identity();
  };

  MonoidalReducible.prototype.reduceLiteralNumericExpression = function (node) {
    return this.identity();
  };

  MonoidalReducible.prototype.reduceLiteralRegExpExpression = function (node) {
    return this.identity();
  };

  MonoidalReducible.prototype.reduceLiteralStringExpression = function (node) {
    return this.identity();
  };

  MonoidalReducible.prototype.reduceNewExpression = function (node, callee, args) {
    return this.fold(args, callee);
  };

  MonoidalReducible.prototype.reduceObjectExpression = function (node, properties) {
    return this.fold(properties);
  };

  MonoidalReducible.prototype.reducePostfixExpression = function (node, operand) {
    return operand;
  };

  MonoidalReducible.prototype.reducePrefixExpression = function (node, operand) {
    return operand;
  };

  MonoidalReducible.prototype.reducePropertyName = function (node) {
    return this.identity();
  };

  MonoidalReducible.prototype.reduceReturnStatement = function (node, expression) {
    return this.fromNull(expression);
  };

  MonoidalReducible.prototype.reduceScript = function (node, body) {
    return body;
  };

  MonoidalReducible.prototype.reduceSetter = function (node, name, parameter, body) {
    return this.append3(name, parameter, body);
  };

  MonoidalReducible.prototype.reduceStaticMemberExpression = function (node, object, property) {
    return this.append(object, property);
  };

  MonoidalReducible.prototype.reduceSwitchCase = function (node, test, consequent) {
    return this.fold(consequent, test);
  };

  MonoidalReducible.prototype.reduceSwitchDefault = function (node, consequent) {
    return this.fold(consequent);
  };

  MonoidalReducible.prototype.reduceSwitchStatement = function (node, discriminant, cases) {
    return this.fold(cases, discriminant);
  };

  MonoidalReducible.prototype.reduceSwitchStatementWithDefault = function (node, discriminant, preDefaultCases, defaultCase, postDefaultCases) {
    return this.append4(discriminant, this.fold(preDefaultCases), defaultCase, this.fold(postDefaultCases));
  };

  MonoidalReducible.prototype.reduceThisExpression = function (node) {
    return this.identity();
  };

  MonoidalReducible.prototype.reduceThrowStatement = function (node, expression) {
    return this.fromNull(expression);
  };

  MonoidalReducible.prototype.reduceTryCatchStatement = function (node, block, catchClause) {
    return this.append(block, catchClause);
  };

  MonoidalReducible.prototype.reduceTryFinallyStatement = function (node, block, catchClause, finalizer) {
    return this.append3(block, this.fromNull(catchClause), finalizer);
  };

  MonoidalReducible.prototype.reduceUnknownDirective = function (node) {
    return this.identity();
  };

  MonoidalReducible.prototype.reduceUseStrictDirective = function (node) {
    return this.identity();
  };

  MonoidalReducible.prototype.reduceVariableDeclaration = function (node, declarators) {
    return this.fold(declarators);
  };

  MonoidalReducible.prototype.reduceVariableDeclarationStatement = function (node, declaration) {
    return declaration;
  };

  MonoidalReducible.prototype.reduceVariableDeclarator = function (node, binding, init) {
    return this.append(binding, this.fromNull(init));
  };

  MonoidalReducible.prototype.reduceWhileStatement = function (node, test, body) {
    return this.append(test, body);
  };

  MonoidalReducible.prototype.reduceWithStatement = function (node, object, body) {
    return this.append(object, body);
  };

  return MonoidalReducible;
})(Reducible);

exports.MonoidalReducible = MonoidalReducible;

