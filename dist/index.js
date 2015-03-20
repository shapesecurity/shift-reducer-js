"use strict";

exports["default"] = reduce;
exports.reduceUnchecked = reduceUnchecked;
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

var MonoidalReducer = require("./monoidal-reducer")["default"];

exports.MonoidalReducer = MonoidalReducer;

var SPEC = require("shift-spec")["default"];

// Get the concrete spec for union type.
function getSpec(typeName, spec) {
  for (var i = 0; i < spec.arguments.length; i++) {
    if (spec.arguments[i].typeName === "Union") {
      var s = getSpec(typeName, spec.arguments[i]);
      if (s) {
        return s;
      }
    }
    if (typeName === spec.arguments[i].typeName) {
      return spec.arguments[i];
    }
  }
  return null;
}

function genTransformWithSpec(unionTransformer) {
  return function transformWithSpec(_x, _x2, _x3) {
    var _left;

    var _again = true;

    _function: while (_again) {
      _again = false;
      var transformer = _x,
          node = _x2,
          spec = _x3;
      _ret = undefined;

      switch (spec.typeName) {
        case "Enum":
        case "String":
        case "Number":
        case "Boolean":
          return node;
        case "Maybe":
          if (!(_left = node)) {
            return _left;
          }

          _x = transformer;
          _x2 = node;
          _x3 = spec.argument;
          _again = true;
          continue _function;

        case "List":
          return node.map(function (r) {
            return transformWithSpec(transformer, r, spec.argument);
          });
        case "Union":
          return unionTransformer(transformWithSpec, transformer, node, spec);
        default:
          {
            var _ret = (function () {
              var state = {};
              spec.fields.forEach(function (field) {
                if (field.name === "type" || field.name === "loc") {
                  state[field.name] = node[field.name];
                } else {
                  state[field.name] = transformWithSpec(transformer, node[field.name], field.type);
                }
              });
              return {
                v: transformer["reduce" + node.type] ? transformer["reduce" + node.type](node, state) : state
              };
            })();

            if (typeof _ret === "object") {
              return _ret.v;
            }
          }
      }
    }
  };
}

function checkedUnion(transformWithSpec, transformer, node, spec) {
  var s = getSpec(node.type, spec);
  return s && transformWithSpec(transformer, node, s);
}

function uncheckedUnion(transformWithSpec, transformer, node) {
  return transformWithSpec(transformer, node, SPEC[node.type]);
}

var transformChecked = genTransformWithSpec(checkedUnion);
exports.transformChecked = transformChecked;
var transformUnchecked = genTransformWithSpec(uncheckedUnion);

exports.transformUnchecked = transformUnchecked;

function reduce(reducer, reducible) {
  return transformChecked(reducer, reducible, SPEC[reducible.type]);
}

function reduceUnchecked(reducer, reducible) {
  return transformChecked(reducer, reducible, SPEC[reducible.type]);
}
//# sourceMappingURL=data:application/json;base64,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QixFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFO0FBQ2hFLE1BQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ2pDLFNBQU8sQ0FBQyxJQUFJLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7Q0FDckQ7O0FBRUQsU0FBUyxjQUFjLENBQUMsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRTtBQUM1RCxTQUFPLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0NBQzlEOztBQUVNLElBQU0sZ0JBQWdCLEdBQUcsb0JBQW9CLENBQUMsWUFBWSxDQUFDLENBQUM7UUFBdEQsZ0JBQWdCLEdBQWhCLGdCQUFnQjtBQUN0QixJQUFNLGtCQUFrQixHQUFHLG9CQUFvQixDQUFDLGNBQWMsQ0FBQyxDQUFDOztRQUExRCxrQkFBa0IsR0FBbEIsa0JBQWtCOztBQUVoQixTQUFTLE1BQU0sQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFO0FBQ2pELFNBQU8sZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Q0FDbkU7O0FBRU0sU0FBUyxlQUFlLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRTtBQUNsRCxTQUFPLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0NBQ25FIiwiZmlsZSI6InNyYy9pbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IDIwMTQgU2hhcGUgU2VjdXJpdHksIEluYy5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgTW9ub2lkYWxSZWR1Y2VyIGZyb20gXCIuL21vbm9pZGFsLXJlZHVjZXJcIjtcbmV4cG9ydCB7TW9ub2lkYWxSZWR1Y2VyfTtcblxuaW1wb3J0IFNQRUMgZnJvbSBcInNoaWZ0LXNwZWNcIjtcblxuLy8gR2V0IHRoZSBjb25jcmV0ZSBzcGVjIGZvciB1bmlvbiB0eXBlLlxuZnVuY3Rpb24gZ2V0U3BlYyh0eXBlTmFtZSwgc3BlYykge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHNwZWMuYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHNwZWMuYXJndW1lbnRzW2ldLnR5cGVOYW1lID09PSBcIlVuaW9uXCIpIHtcbiAgICAgIGxldCBzID0gZ2V0U3BlYyh0eXBlTmFtZSwgc3BlYy5hcmd1bWVudHNbaV0pO1xuICAgICAgaWYgKHMpIHJldHVybiBzO1xuICAgIH1cbiAgICBpZiAodHlwZU5hbWUgPT09IHNwZWMuYXJndW1lbnRzW2ldLnR5cGVOYW1lKSB7XG4gICAgICByZXR1cm4gc3BlYy5hcmd1bWVudHNbaV07XG4gICAgfVxuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiBnZW5UcmFuc2Zvcm1XaXRoU3BlYyh1bmlvblRyYW5zZm9ybWVyKSB7XG4gIHJldHVybiBmdW5jdGlvbiB0cmFuc2Zvcm1XaXRoU3BlYyh0cmFuc2Zvcm1lciwgbm9kZSwgc3BlYykge1xuICAgIHN3aXRjaCAoc3BlYy50eXBlTmFtZSkge1xuICAgICAgY2FzZSBcIkVudW1cIjpcbiAgICAgIGNhc2UgXCJTdHJpbmdcIjpcbiAgICAgIGNhc2UgXCJOdW1iZXJcIjpcbiAgICAgIGNhc2UgXCJCb29sZWFuXCI6XG4gICAgICAgIHJldHVybiBub2RlO1xuICAgICAgY2FzZSBcIk1heWJlXCI6XG4gICAgICAgIHJldHVybiBub2RlICYmIHRyYW5zZm9ybVdpdGhTcGVjKHRyYW5zZm9ybWVyLCBub2RlLCBzcGVjLmFyZ3VtZW50KTtcbiAgICAgIGNhc2UgXCJMaXN0XCI6XG4gICAgICAgIHJldHVybiBub2RlLm1hcChyID0+IHRyYW5zZm9ybVdpdGhTcGVjKHRyYW5zZm9ybWVyLCByLCBzcGVjLmFyZ3VtZW50KSk7XG4gICAgICBjYXNlIFwiVW5pb25cIjpcbiAgICAgICAgcmV0dXJuIHVuaW9uVHJhbnNmb3JtZXIodHJhbnNmb3JtV2l0aFNwZWMsIHRyYW5zZm9ybWVyLCBub2RlLCBzcGVjKTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICB7XG4gICAgICAgIGxldCBzdGF0ZSA9IHt9O1xuICAgICAgICBzcGVjLmZpZWxkcy5mb3JFYWNoKGZpZWxkID0+IHtcbiAgICAgICAgICBpZiAoZmllbGQubmFtZSA9PT0gXCJ0eXBlXCIgfHwgZmllbGQubmFtZSA9PT0gXCJsb2NcIikge1xuICAgICAgICAgICAgc3RhdGVbZmllbGQubmFtZV0gPSBub2RlW2ZpZWxkLm5hbWVdO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdGF0ZVtmaWVsZC5uYW1lXSA9IHRyYW5zZm9ybVdpdGhTcGVjKHRyYW5zZm9ybWVyLCBub2RlW2ZpZWxkLm5hbWVdLCBmaWVsZC50eXBlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdHJhbnNmb3JtZXJbXCJyZWR1Y2VcIiArIG5vZGUudHlwZV0gPyB0cmFuc2Zvcm1lcltcInJlZHVjZVwiICsgbm9kZS50eXBlXShub2RlLCBzdGF0ZSkgOiBzdGF0ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gY2hlY2tlZFVuaW9uKHRyYW5zZm9ybVdpdGhTcGVjLCB0cmFuc2Zvcm1lciwgbm9kZSwgc3BlYykge1xuICBsZXQgcyA9IGdldFNwZWMobm9kZS50eXBlLCBzcGVjKTtcbiAgcmV0dXJuIHMgJiYgdHJhbnNmb3JtV2l0aFNwZWModHJhbnNmb3JtZXIsIG5vZGUsIHMpO1xufVxuXG5mdW5jdGlvbiB1bmNoZWNrZWRVbmlvbih0cmFuc2Zvcm1XaXRoU3BlYywgdHJhbnNmb3JtZXIsIG5vZGUpIHtcbiAgcmV0dXJuIHRyYW5zZm9ybVdpdGhTcGVjKHRyYW5zZm9ybWVyLCBub2RlLCBTUEVDW25vZGUudHlwZV0pO1xufVxuXG5leHBvcnQgY29uc3QgdHJhbnNmb3JtQ2hlY2tlZCA9IGdlblRyYW5zZm9ybVdpdGhTcGVjKGNoZWNrZWRVbmlvbik7XG5leHBvcnQgY29uc3QgdHJhbnNmb3JtVW5jaGVja2VkID0gZ2VuVHJhbnNmb3JtV2l0aFNwZWModW5jaGVja2VkVW5pb24pO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZWR1Y2UocmVkdWNlciwgcmVkdWNpYmxlKSB7XG4gIHJldHVybiB0cmFuc2Zvcm1DaGVja2VkKHJlZHVjZXIsIHJlZHVjaWJsZSwgU1BFQ1tyZWR1Y2libGUudHlwZV0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVkdWNlVW5jaGVja2VkKHJlZHVjZXIsIHJlZHVjaWJsZSkge1xuICByZXR1cm4gdHJhbnNmb3JtQ2hlY2tlZChyZWR1Y2VyLCByZWR1Y2libGUsIFNQRUNbcmVkdWNpYmxlLnR5cGVdKTtcbn1cbiJdfQ==