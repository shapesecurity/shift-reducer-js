"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

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

var ShiftSpec = require("shift-spec-js")["default"];

var methods = {};

function id(x) {
  return x;
}

function handlerForFieldOfType(_x) {
  var _again = true;

  _function: while (_again) {
    _again = false;
    var type = _x;
    _ret = _ret2 = undefined;

    switch (type.typeName) {
      case "Enum":
      case "String":
      case "Boolean":
      case "Number":
      case "SourceSpan":
        return null;
      case "Const":
        _x = type.argument;
        _again = true;
        continue _function;

      case "Maybe":
        {
          var _ret = (function () {
            var subHandler = handlerForFieldOfType(type.argument);
            if (subHandler == null) return {
                v: null
              };
            return {
              v: function (t) {
                return t == null ? this.identity : subHandler.call(this, t);
              }
            };
          })();

          if (typeof _ret === "object") {
            return _ret.v;
          }
        }
      case "List":
        {
          var _ret2 = (function () {
            var subHandler = handlerForFieldOfType(type.argument);
            if (subHandler == null) return {
                v: null
              };
            return {
              v: function (t) {
                var _this2 = this;

                return this.fold(t.map(function (x) {
                  return subHandler.call(_this2, x);
                }));
              }
            };
          })();

          if (typeof _ret2 === "object") {
            return _ret2.v;
          }
        }
      default:
        return id;
    }
  }
}

for (var typeName in ShiftSpec) {
  (function (typeName) {
    var type = ShiftSpec[typeName];

    var handlers = {};
    type.fields.forEach(function (field) {
      var handler = handlerForFieldOfType(field.type);
      if (handler != null) handlers[field.name] = handler;
    });
    var fieldNames = Object.keys(handlers);

    methods["reduce" + typeName] = {
      value: function value(node, state) {
        var _this = this;

        return this.fold(fieldNames.map(function (fieldName) {
          return handlers[fieldName].call(_this, state[fieldName]);
        }));
      }
    };
  })(typeName);
}

var MonoidalReducer = (function () {
  function MonoidalReducer(monoid) {
    _classCallCheck(this, MonoidalReducer);

    this.identity = monoid.empty();
    var concat = monoid.prototype && monoid.prototype.concat || monoid.concat;
    this.append = function (a, b) {
      return concat.call(a, b);
    };
  }

  _createClass(MonoidalReducer, {
    fold: {
      value: function fold(list, a) {
        var _this = this;

        return list.reduce(function (memo, x) {
          return _this.append(memo, x);
        }, a == null ? this.identity : a);
      }
    }
  });

  return MonoidalReducer;
})();

exports["default"] = MonoidalReducer;

Object.defineProperties(MonoidalReducer.prototype, methods);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tb25vaWRhbC1yZWR1Y2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFnQk8sU0FBUyxXQUFNLGVBQWU7O0FBRXJDLElBQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQzs7QUFFbkIsU0FBUyxFQUFFLENBQUMsQ0FBQyxFQUFFO0FBQUUsU0FBTyxDQUFDLENBQUM7Q0FBRTs7QUFFNUIsU0FBUyxxQkFBcUI7Ozs0QkFBTzs7UUFBTixJQUFJOzs7QUFDakMsWUFBUSxJQUFJLENBQUMsUUFBUTtBQUNuQixXQUFLLE1BQU0sQ0FBQztBQUNaLFdBQUssUUFBUSxDQUFDO0FBQ2QsV0FBSyxTQUFTLENBQUM7QUFDZixXQUFLLFFBQVEsQ0FBQztBQUNkLFdBQUssWUFBWTtBQUNmLGVBQU8sSUFBSSxDQUFBO0FBQUEsQUFDYixXQUFLLE9BQU87YUFDbUIsSUFBSSxDQUFDLFFBQVE7OztBQUFFO0FBQzlDLFdBQUssT0FBTztBQUFFOztBQUNaLGdCQUFJLFVBQVUsR0FBRyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDdEQsZ0JBQUksVUFBVSxJQUFJLElBQUksRUFBRTttQkFBTyxJQUFJO2dCQUFDO0FBQ3BDO2lCQUFPLFVBQVUsQ0FBQyxFQUFFO0FBQUUsdUJBQU8sQ0FBQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO2VBQUU7Y0FBQzs7Ozs7O1NBQ3RGO0FBQUEsQUFDRCxXQUFLLE1BQU07QUFBRTs7QUFDWCxnQkFBSSxVQUFVLEdBQUcscUJBQXFCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3RELGdCQUFJLFVBQVUsSUFBSSxJQUFJLEVBQUU7bUJBQU8sSUFBSTtnQkFBQztBQUNwQztpQkFBTyxVQUFVLENBQUMsRUFBRTs7O0FBQUUsdUJBQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQzt5QkFBSSxVQUFVLENBQUMsSUFBSSxTQUFPLENBQUMsQ0FBQztpQkFBQSxDQUFDLENBQUMsQ0FBQztlQUFFO2NBQUM7Ozs7OztTQUNqRjtBQUFBLEFBQ0Q7QUFDRSxlQUFPLEVBQUUsQ0FBQztBQUFBLEtBQ2I7R0FDRjtDQUFBOztBQUVELEtBQUssSUFBSSxRQUFRLElBQUksU0FBUyxFQUFFO2FBQXZCLFFBQVE7QUFDZixRQUFJLElBQUksR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7O0FBRS9CLFFBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUNsQixRQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFBLEtBQUssRUFBSTtBQUMzQixVQUFJLE9BQU8sR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDaEQsVUFBSSxPQUFPLElBQUksSUFBSSxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDO0tBQ3JELENBQUMsQ0FBQztBQUNILFFBQUksVUFBVSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7O0FBRXZDLFdBQU8sWUFBVSxRQUFRLENBQUcsR0FBRztBQUM3QixXQUFLLEVBQUUsZUFBVSxJQUFJLEVBQUUsS0FBSyxFQUFFOzs7QUFDNUIsZUFBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsVUFBQSxTQUFTO2lCQUFJLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLFFBQU8sS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQUEsQ0FBQyxDQUFDLENBQUM7T0FDakc7S0FDRixDQUFDO0tBZEssUUFBUTtDQWVoQjs7SUFFb0IsZUFBZTtBQUN2QixXQURRLGVBQWUsQ0FDdEIsTUFBTSxFQUFFOzBCQURELGVBQWU7O0FBRWhDLFFBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQy9CLFFBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxTQUFTLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQztBQUMxRSxRQUFJLENBQUMsTUFBTSxHQUFHLFVBQUMsQ0FBQyxFQUFFLENBQUM7YUFBSyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7S0FBQSxDQUFDO0dBQzNDOztlQUxrQixlQUFlO0FBT2xDLFFBQUk7YUFBQSxjQUFDLElBQUksRUFBRSxDQUFDLEVBQUU7OztBQUNaLGVBQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFDLElBQUksRUFBRSxDQUFDO2lCQUFLLE1BQUssTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7U0FBQSxFQUFFLENBQUMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQztPQUN0Rjs7OztTQVRrQixlQUFlOzs7cUJBQWYsZUFBZTs7QUFZcEMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUMiLCJmaWxlIjoic3JjL21vbm9pZGFsLXJlZHVjZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAyMDE0IFNoYXBlIFNlY3VyaXR5LCBJbmMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKVxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IFNoaWZ0U3BlYyBmcm9tIFwic2hpZnQtc3BlYy1qc1wiO1xuXG5jb25zdCBtZXRob2RzID0ge307XG5cbmZ1bmN0aW9uIGlkKHgpIHsgcmV0dXJuIHg7IH1cblxuZnVuY3Rpb24gaGFuZGxlckZvckZpZWxkT2ZUeXBlKHR5cGUpIHtcbiAgc3dpdGNoICh0eXBlLnR5cGVOYW1lKSB7XG4gICAgY2FzZSBcIkVudW1cIjpcbiAgICBjYXNlIFwiU3RyaW5nXCI6XG4gICAgY2FzZSBcIkJvb2xlYW5cIjpcbiAgICBjYXNlIFwiTnVtYmVyXCI6XG4gICAgY2FzZSBcIlNvdXJjZVNwYW5cIjpcbiAgICAgIHJldHVybiBudWxsXG4gICAgY2FzZSBcIkNvbnN0XCI6XG4gICAgICByZXR1cm4gaGFuZGxlckZvckZpZWxkT2ZUeXBlKHR5cGUuYXJndW1lbnQpO1xuICAgIGNhc2UgXCJNYXliZVwiOiB7XG4gICAgICBsZXQgc3ViSGFuZGxlciA9IGhhbmRsZXJGb3JGaWVsZE9mVHlwZSh0eXBlLmFyZ3VtZW50KTtcbiAgICAgIGlmIChzdWJIYW5kbGVyID09IG51bGwpIHJldHVybiBudWxsO1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICh0KSB7IHJldHVybiB0ID09IG51bGwgPyB0aGlzLmlkZW50aXR5IDogc3ViSGFuZGxlci5jYWxsKHRoaXMsIHQpOyB9O1xuICAgIH1cbiAgICBjYXNlIFwiTGlzdFwiOiB7XG4gICAgICBsZXQgc3ViSGFuZGxlciA9IGhhbmRsZXJGb3JGaWVsZE9mVHlwZSh0eXBlLmFyZ3VtZW50KTtcbiAgICAgIGlmIChzdWJIYW5kbGVyID09IG51bGwpIHJldHVybiBudWxsO1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICh0KSB7IHJldHVybiB0aGlzLmZvbGQodC5tYXAoeCA9PiBzdWJIYW5kbGVyLmNhbGwodGhpcywgeCkpKTsgfTtcbiAgICB9XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBpZDtcbiAgfVxufVxuXG5mb3IgKGxldCB0eXBlTmFtZSBpbiBTaGlmdFNwZWMpIHtcbiAgbGV0IHR5cGUgPSBTaGlmdFNwZWNbdHlwZU5hbWVdO1xuXG4gIGxldCBoYW5kbGVycyA9IHt9O1xuICB0eXBlLmZpZWxkcy5mb3JFYWNoKGZpZWxkID0+IHtcbiAgICBsZXQgaGFuZGxlciA9IGhhbmRsZXJGb3JGaWVsZE9mVHlwZShmaWVsZC50eXBlKTtcbiAgICBpZiAoaGFuZGxlciAhPSBudWxsKSBoYW5kbGVyc1tmaWVsZC5uYW1lXSA9IGhhbmRsZXI7XG4gIH0pO1xuICBsZXQgZmllbGROYW1lcyA9IE9iamVjdC5rZXlzKGhhbmRsZXJzKTtcblxuICBtZXRob2RzW2ByZWR1Y2Uke3R5cGVOYW1lfWBdID0ge1xuICAgIHZhbHVlOiBmdW5jdGlvbiAobm9kZSwgc3RhdGUpIHtcbiAgICAgIHJldHVybiB0aGlzLmZvbGQoZmllbGROYW1lcy5tYXAoZmllbGROYW1lID0+IGhhbmRsZXJzW2ZpZWxkTmFtZV0uY2FsbCh0aGlzLCBzdGF0ZVtmaWVsZE5hbWVdKSkpO1xuICAgIH1cbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9ub2lkYWxSZWR1Y2VyIHtcbiAgY29uc3RydWN0b3IobW9ub2lkKSB7XG4gICAgdGhpcy5pZGVudGl0eSA9IG1vbm9pZC5lbXB0eSgpO1xuICAgIGxldCBjb25jYXQgPSBtb25vaWQucHJvdG90eXBlICYmIG1vbm9pZC5wcm90b3R5cGUuY29uY2F0IHx8IG1vbm9pZC5jb25jYXQ7XG4gICAgdGhpcy5hcHBlbmQgPSAoYSwgYikgPT4gY29uY2F0LmNhbGwoYSwgYik7XG4gIH1cblxuICBmb2xkKGxpc3QsIGEpIHtcbiAgICByZXR1cm4gbGlzdC5yZWR1Y2UoKG1lbW8sIHgpID0+IHRoaXMuYXBwZW5kKG1lbW8sIHgpLCBhID09IG51bGwgPyB0aGlzLmlkZW50aXR5IDogYSk7XG4gIH1cbn1cblxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoTW9ub2lkYWxSZWR1Y2VyLnByb3RvdHlwZSwgbWV0aG9kcyk7XG4iXX0=