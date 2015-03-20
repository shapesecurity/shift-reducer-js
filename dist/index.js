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
              state[field.name] = transformWithSpec(transformer, node[field.name], field.type);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztxQkErQ3dCLE1BQU07Ozs7Ozs7Ozs7Ozs7Ozs7O0lBL0J2QixTQUFTLFdBQU0sZUFBZTs7QUFFckMsU0FBUyxpQkFBaUI7Ozs7OzRCQUEwQjs7UUFBekIsV0FBVztRQUFFLElBQUk7UUFBRSxJQUFJOzs7QUFDaEQsWUFBUSxJQUFJLENBQUMsUUFBUTtBQUNuQixXQUFLLE1BQU0sQ0FBQztBQUNaLFdBQUssUUFBUSxDQUFDO0FBQ2QsV0FBSyxRQUFRLENBQUM7QUFDZCxXQUFLLFNBQVMsQ0FBQztBQUNmLFdBQUssWUFBWTtBQUNmLGVBQU8sSUFBSSxDQUFDO0FBQUEsQUFDZCxXQUFLLE9BQU87YUFFZSxXQUFXO2NBQUUsSUFBSTtjQUFFLElBQUksQ0FBQyxRQUFROzs7QUFBRTtBQUM3RCxXQUFLLE9BQU87c0JBQ0gsSUFBSTs7OzthQUFzQixXQUFXO2NBQUUsSUFBSTtjQUFFLElBQUksQ0FBQyxRQUFROzs7QUFBRTtBQUNyRSxXQUFLLE1BQU07QUFDVCxlQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDO2lCQUFJLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQztTQUFBLENBQUMsQ0FBQztBQUFBLEFBQ3pFLFdBQUssT0FBTzthQUVlLFdBQVc7Y0FBRSxJQUFJO2NBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7OztBQUFFO0FBQ3BFO0FBQ0E7O0FBQ0UsZ0JBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUNmLGdCQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFBLEtBQUssRUFBSTtBQUMzQixtQkFBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDbEYsQ0FBQyxDQUFDO0FBQ0g7aUJBQU8sV0FBVyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQztjQUFDOzs7Ozs7U0FDdkQ7QUFBQSxLQUNGO0dBQ0Y7Q0FBQTs7QUFFYyxTQUFTLE1BQU0sQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFO0FBQ2pELFNBQU8saUJBQWlCLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Q0FDekU7O1FBRWtCLFlBQVksV0FBTyxpQkFBaUI7UUFDcEMsZUFBZSxXQUFPLG9CQUFvQiIsImZpbGUiOiJzcmMvaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAyMDE0IFNoYXBlIFNlY3VyaXR5LCBJbmMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKVxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IFNoaWZ0U3BlYyBmcm9tIFwic2hpZnQtc3BlYy1qc1wiO1xuXG5mdW5jdGlvbiB0cmFuc2Zvcm1XaXRoU3BlYyh0cmFuc2Zvcm1lciwgbm9kZSwgc3BlYykge1xuICBzd2l0Y2ggKHNwZWMudHlwZU5hbWUpIHtcbiAgICBjYXNlIFwiRW51bVwiOlxuICAgIGNhc2UgXCJTdHJpbmdcIjpcbiAgICBjYXNlIFwiTnVtYmVyXCI6XG4gICAgY2FzZSBcIkJvb2xlYW5cIjpcbiAgICBjYXNlIFwiU291cmNlU3BhblwiOlxuICAgICAgcmV0dXJuIG5vZGU7XG4gICAgY2FzZSBcIkNvbnN0XCI6XG4gICAgICAvLyBUT0RPOiBjaGVja2VkIHZlcnNpb25cbiAgICAgIHJldHVybiB0cmFuc2Zvcm1XaXRoU3BlYyh0cmFuc2Zvcm1lciwgbm9kZSwgc3BlYy5hcmd1bWVudCk7XG4gICAgY2FzZSBcIk1heWJlXCI6XG4gICAgICByZXR1cm4gbm9kZSAmJiB0cmFuc2Zvcm1XaXRoU3BlYyh0cmFuc2Zvcm1lciwgbm9kZSwgc3BlYy5hcmd1bWVudCk7XG4gICAgY2FzZSBcIkxpc3RcIjpcbiAgICAgIHJldHVybiBub2RlLm1hcChlID0+IHRyYW5zZm9ybVdpdGhTcGVjKHRyYW5zZm9ybWVyLCBlLCBzcGVjLmFyZ3VtZW50KSk7XG4gICAgY2FzZSBcIlVuaW9uXCI6XG4gICAgICAvLyBUT0RPOiBjaGVja2VkIHZlcnNpb25cbiAgICAgIHJldHVybiB0cmFuc2Zvcm1XaXRoU3BlYyh0cmFuc2Zvcm1lciwgbm9kZSwgU2hpZnRTcGVjW25vZGUudHlwZV0pO1xuICAgIGRlZmF1bHQ6XG4gICAge1xuICAgICAgbGV0IHN0YXRlID0ge307XG4gICAgICBzcGVjLmZpZWxkcy5mb3JFYWNoKGZpZWxkID0+IHtcbiAgICAgICAgc3RhdGVbZmllbGQubmFtZV0gPSB0cmFuc2Zvcm1XaXRoU3BlYyh0cmFuc2Zvcm1lciwgbm9kZVtmaWVsZC5uYW1lXSwgZmllbGQudHlwZSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0cmFuc2Zvcm1lcltcInJlZHVjZVwiICsgbm9kZS50eXBlXShub2RlLCBzdGF0ZSk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlZHVjZShyZWR1Y2VyLCByZWR1Y2libGUpIHtcbiAgcmV0dXJuIHRyYW5zZm9ybVdpdGhTcGVjKHJlZHVjZXIsIHJlZHVjaWJsZSwgU2hpZnRTcGVjW3JlZHVjaWJsZS50eXBlXSk7XG59XG5cbmV4cG9ydCB7ZGVmYXVsdCBhcyBDbG9uZVJlZHVjZXJ9IGZyb20gXCIuL2Nsb25lLXJlZHVjZXJcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBNb25vaWRhbFJlZHVjZXJ9IGZyb20gXCIuL21vbm9pZGFsLXJlZHVjZXJcIjtcbiJdfQ==