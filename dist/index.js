"use strict";

exports["default"] = reduce;
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

var ShiftSpec = require("shift-spec-js")["default"];

function transformWithSpec(_x, _x2, _x3) {
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
      case "SourceSpan":
        return node;
      case "Const":
        _x = transformer;
        _x2 = node;
        _x3 = spec.argument;
        _again = true;
        continue _function;

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
        return node.map(function (e) {
          return transformWithSpec(transformer, e, spec.argument);
        });
      case "Union":
        _x = transformer;
        _x2 = node;
        _x3 = ShiftSpec[node.type];
        _again = true;
        continue _function;

      default:
        {
          var _ret = (function () {
            var state = {};
            spec.fields.forEach(function (field) {
              var v = transformWithSpec(transformer, node[field.name], field.type);
              state[field.name] = v == null ? null : v;
            });
            return {
              v: transformer["reduce" + node.type](node, state)
            };
          })();

          if (typeof _ret === "object") {
            return _ret.v;
          }
        }
    }
  }
}

function reduce(reducer, reducible) {
  return transformWithSpec(reducer, reducible, ShiftSpec[reducible.type]);
}

exports.CloneReducer = require("./clone-reducer")["default"];
exports.MonoidalReducer = require("./monoidal-reducer")["default"];

// TODO: checked version

// TODO: checked version
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztxQkFnRHdCLE1BQU07Ozs7Ozs7Ozs7Ozs7Ozs7O0lBaEN2QixTQUFTLFdBQU0sZUFBZTs7QUFFckMsU0FBUyxpQkFBaUI7Ozs7OzRCQUEwQjs7UUFBekIsV0FBVztRQUFFLElBQUk7UUFBRSxJQUFJOzs7QUFDaEQsWUFBUSxJQUFJLENBQUMsUUFBUTtBQUNuQixXQUFLLE1BQU0sQ0FBQztBQUNaLFdBQUssUUFBUSxDQUFDO0FBQ2QsV0FBSyxRQUFRLENBQUM7QUFDZCxXQUFLLFNBQVMsQ0FBQztBQUNmLFdBQUssWUFBWTtBQUNmLGVBQU8sSUFBSSxDQUFDO0FBQUEsQUFDZCxXQUFLLE9BQU87YUFFZSxXQUFXO2NBQUUsSUFBSTtjQUFFLElBQUksQ0FBQyxRQUFROzs7QUFBRTtBQUM3RCxXQUFLLE9BQU87c0JBQ0gsSUFBSTs7OzthQUFzQixXQUFXO2NBQUUsSUFBSTtjQUFFLElBQUksQ0FBQyxRQUFROzs7QUFBRTtBQUNyRSxXQUFLLE1BQU07QUFDVCxlQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDO2lCQUFJLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQztTQUFBLENBQUMsQ0FBQztBQUFBLEFBQ3pFLFdBQUssT0FBTzthQUVlLFdBQVc7Y0FBRSxJQUFJO2NBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7OztBQUFFO0FBQ3BFO0FBQ0E7O0FBQ0UsZ0JBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUNmLGdCQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFBLEtBQUssRUFBSTtBQUMzQixrQkFBSSxDQUFDLEdBQUcsaUJBQWlCLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3JFLG1CQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQzthQUMxQyxDQUFDLENBQUM7QUFDSDtpQkFBTyxXQUFXLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDO2NBQUM7Ozs7OztTQUN2RDtBQUFBLEtBQ0Y7R0FDRjtDQUFBOztBQUVjLFNBQVMsTUFBTSxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUU7QUFDakQsU0FBTyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztDQUN6RTs7UUFFa0IsWUFBWSxXQUFPLGlCQUFpQjtRQUNwQyxlQUFlLFdBQU8sb0JBQW9CIiwiZmlsZSI6InNyYy9pbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IDIwMTQgU2hhcGUgU2VjdXJpdHksIEluYy5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgU2hpZnRTcGVjIGZyb20gXCJzaGlmdC1zcGVjLWpzXCI7XG5cbmZ1bmN0aW9uIHRyYW5zZm9ybVdpdGhTcGVjKHRyYW5zZm9ybWVyLCBub2RlLCBzcGVjKSB7XG4gIHN3aXRjaCAoc3BlYy50eXBlTmFtZSkge1xuICAgIGNhc2UgXCJFbnVtXCI6XG4gICAgY2FzZSBcIlN0cmluZ1wiOlxuICAgIGNhc2UgXCJOdW1iZXJcIjpcbiAgICBjYXNlIFwiQm9vbGVhblwiOlxuICAgIGNhc2UgXCJTb3VyY2VTcGFuXCI6XG4gICAgICByZXR1cm4gbm9kZTtcbiAgICBjYXNlIFwiQ29uc3RcIjpcbiAgICAgIC8vIFRPRE86IGNoZWNrZWQgdmVyc2lvblxuICAgICAgcmV0dXJuIHRyYW5zZm9ybVdpdGhTcGVjKHRyYW5zZm9ybWVyLCBub2RlLCBzcGVjLmFyZ3VtZW50KTtcbiAgICBjYXNlIFwiTWF5YmVcIjpcbiAgICAgIHJldHVybiBub2RlICYmIHRyYW5zZm9ybVdpdGhTcGVjKHRyYW5zZm9ybWVyLCBub2RlLCBzcGVjLmFyZ3VtZW50KTtcbiAgICBjYXNlIFwiTGlzdFwiOlxuICAgICAgcmV0dXJuIG5vZGUubWFwKGUgPT4gdHJhbnNmb3JtV2l0aFNwZWModHJhbnNmb3JtZXIsIGUsIHNwZWMuYXJndW1lbnQpKTtcbiAgICBjYXNlIFwiVW5pb25cIjpcbiAgICAgIC8vIFRPRE86IGNoZWNrZWQgdmVyc2lvblxuICAgICAgcmV0dXJuIHRyYW5zZm9ybVdpdGhTcGVjKHRyYW5zZm9ybWVyLCBub2RlLCBTaGlmdFNwZWNbbm9kZS50eXBlXSk7XG4gICAgZGVmYXVsdDpcbiAgICB7XG4gICAgICBsZXQgc3RhdGUgPSB7fTtcbiAgICAgIHNwZWMuZmllbGRzLmZvckVhY2goZmllbGQgPT4ge1xuICAgICAgICBsZXQgdiA9IHRyYW5zZm9ybVdpdGhTcGVjKHRyYW5zZm9ybWVyLCBub2RlW2ZpZWxkLm5hbWVdLCBmaWVsZC50eXBlKTtcbiAgICAgICAgc3RhdGVbZmllbGQubmFtZV0gPSB2ID09IG51bGwgPyBudWxsIDogdjtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRyYW5zZm9ybWVyW1wicmVkdWNlXCIgKyBub2RlLnR5cGVdKG5vZGUsIHN0YXRlKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVkdWNlKHJlZHVjZXIsIHJlZHVjaWJsZSkge1xuICByZXR1cm4gdHJhbnNmb3JtV2l0aFNwZWMocmVkdWNlciwgcmVkdWNpYmxlLCBTaGlmdFNwZWNbcmVkdWNpYmxlLnR5cGVdKTtcbn1cblxuZXhwb3J0IHtkZWZhdWx0IGFzIENsb25lUmVkdWNlcn0gZnJvbSBcIi4vY2xvbmUtcmVkdWNlclwiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIE1vbm9pZGFsUmVkdWNlcn0gZnJvbSBcIi4vbW9ub2lkYWwtcmVkdWNlclwiO1xuIl19