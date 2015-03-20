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

for (var typeName in ShiftSpec) {
  var _ret = (function (typeName) {
    var type = ShiftSpec[typeName];

    if (type.typeName === "SourceLocation" || type.typeName === "SourceSpan") {
      return "continue";
    }

    var fields = [];

    type.fields.forEach(function (field) {
      if (field.name === "type" || field.name === "loc") return;
      var fieldName = field.name;
      switch (field.type.typeName) {
        case "Enum":
        case "String":
        case "Boolean":
        case "Number":
          return;
        case "Maybe":
          fields.push(function (t, id) {
            return t[fieldName] === null ? this.identity : t[fieldName];
          });
          break;
        case "List":
          fields.push(function (t) {
            return this.fold(t[fieldName]);
          });
          break;
        default:
          fields.push(function (t) {
            return t[fieldName];
          });
      }
    });

    methods["reduce" + typeName] = {
      value: function value(node, t) {
        var _this = this;

        return this.fold(fields.map(function (f) {
          return f.call(_this, t);
        }));
      }
    };
  })(typeName);

  if (_ret === "continue") continue;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tb25vaWRhbC1yZWR1Y2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFnQk8sU0FBUyxXQUFNLGVBQWU7O0FBRXJDLElBQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQzs7QUFFbkIsS0FBSyxJQUFJLFFBQVEsSUFBSSxTQUFTLEVBQUU7d0JBQXZCLFFBQVE7QUFDZixRQUFJLElBQUksR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7O0FBRS9CLFFBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxnQkFBZ0IsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLFlBQVksRUFBRTtBQUN4RSx3QkFBUztLQUNWOztBQUVELFFBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQzs7QUFFaEIsUUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBQSxLQUFLLEVBQUk7QUFDM0IsVUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLE1BQU0sSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLEtBQUssRUFBRSxPQUFPO0FBQzFELFVBQUksU0FBUyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUM7QUFDM0IsY0FBUSxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVE7QUFDekIsYUFBSyxNQUFNLENBQUM7QUFDWixhQUFLLFFBQVEsQ0FBQztBQUNkLGFBQUssU0FBUyxDQUFDO0FBQ2YsYUFBSyxRQUFRO0FBQ1gsaUJBQU87QUFBQSxBQUNULGFBQUssT0FBTztBQUNWLGdCQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEVBQUUsRUFBRTtBQUMzQixtQkFBTyxDQUFDLENBQUMsU0FBUyxDQUFDLEtBQUssSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1dBQzdELENBQUMsQ0FBQztBQUNILGdCQUFNO0FBQUEsQUFDUixhQUFLLE1BQU07QUFDVCxnQkFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtBQUN2QixtQkFBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1dBQ2hDLENBQUMsQ0FBQztBQUNILGdCQUFNO0FBQUEsQUFDUjtBQUNFLGdCQUFNLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQzttQkFBRSxDQUFDLENBQUMsU0FBUyxDQUFDO1dBQUEsQ0FBQyxDQUFDO0FBQUEsT0FDaEM7S0FDRixDQUFDLENBQUM7O0FBRUgsV0FBTyxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsR0FBRztBQUM3QixXQUFLLEVBQUUsZUFBVSxJQUFJLEVBQUUsQ0FBQyxFQUFFOzs7QUFDeEIsZUFBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDO2lCQUFJLENBQUMsQ0FBQyxJQUFJLFFBQU8sQ0FBQyxDQUFDO1NBQUEsQ0FBQyxDQUFDLENBQUM7T0FDcEQ7S0FDRixDQUFDO0tBckNLLFFBQVE7OzJCQUliLFNBQVM7Q0FrQ1o7O0lBRW9CLGVBQWU7QUFDdkIsV0FEUSxlQUFlLENBQ3RCLE1BQU0sRUFBRTswQkFERCxlQUFlOztBQUVoQyxRQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUMvQixRQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsU0FBUyxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUM7QUFDMUUsUUFBSSxDQUFDLE1BQU0sR0FBRyxVQUFDLENBQUMsRUFBRSxDQUFDO2FBQUssTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQUEsQ0FBQztHQUMzQzs7ZUFMa0IsZUFBZTtBQU9sQyxRQUFJO2FBQUEsY0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFOzs7QUFDWixlQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBQyxJQUFJLEVBQUUsQ0FBQztpQkFBSyxNQUFLLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1NBQUEsRUFBRSxDQUFDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUM7T0FDdEY7Ozs7U0FUa0IsZUFBZTs7O3FCQUFmLGVBQWU7O0FBWXBDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDIiwiZmlsZSI6InNyYy9tb25vaWRhbC1yZWR1Y2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNCBTaGFwZSBTZWN1cml0eSwgSW5jLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIilcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCBTaGlmdFNwZWMgZnJvbSBcInNoaWZ0LXNwZWMtanNcIjtcblxuY29uc3QgbWV0aG9kcyA9IHt9O1xuXG5mb3IgKGxldCB0eXBlTmFtZSBpbiBTaGlmdFNwZWMpIHtcbiAgbGV0IHR5cGUgPSBTaGlmdFNwZWNbdHlwZU5hbWVdO1xuXG4gIGlmICh0eXBlLnR5cGVOYW1lID09PSBcIlNvdXJjZUxvY2F0aW9uXCIgfHwgdHlwZS50eXBlTmFtZSA9PT0gXCJTb3VyY2VTcGFuXCIpIHtcbiAgICBjb250aW51ZTtcbiAgfVxuXG4gIGxldCBmaWVsZHMgPSBbXTtcblxuICB0eXBlLmZpZWxkcy5mb3JFYWNoKGZpZWxkID0+IHtcbiAgICBpZiAoZmllbGQubmFtZSA9PT0gXCJ0eXBlXCIgfHwgZmllbGQubmFtZSA9PT0gXCJsb2NcIikgcmV0dXJuO1xuICAgIGxldCBmaWVsZE5hbWUgPSBmaWVsZC5uYW1lO1xuICAgIHN3aXRjaCAoZmllbGQudHlwZS50eXBlTmFtZSkge1xuICAgICAgY2FzZSBcIkVudW1cIjpcbiAgICAgIGNhc2UgXCJTdHJpbmdcIjpcbiAgICAgIGNhc2UgXCJCb29sZWFuXCI6XG4gICAgICBjYXNlIFwiTnVtYmVyXCI6XG4gICAgICAgIHJldHVybjtcbiAgICAgIGNhc2UgXCJNYXliZVwiOlxuICAgICAgICBmaWVsZHMucHVzaChmdW5jdGlvbiAodCwgaWQpIHtcbiAgICAgICAgICByZXR1cm4gdFtmaWVsZE5hbWVdID09PSBudWxsID8gdGhpcy5pZGVudGl0eSA6IHRbZmllbGROYW1lXTtcbiAgICAgICAgfSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIkxpc3RcIjpcbiAgICAgICAgZmllbGRzLnB1c2goZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5mb2xkKHRbZmllbGROYW1lXSk7XG4gICAgICAgIH0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGZpZWxkcy5wdXNoKHQ9PnRbZmllbGROYW1lXSk7XG4gICAgfVxuICB9KTtcblxuICBtZXRob2RzW1wicmVkdWNlXCIgKyB0eXBlTmFtZV0gPSB7XG4gICAgdmFsdWU6IGZ1bmN0aW9uIChub2RlLCB0KSB7XG4gICAgICByZXR1cm4gdGhpcy5mb2xkKGZpZWxkcy5tYXAoZiA9PiBmLmNhbGwodGhpcywgdCkpKTtcbiAgICB9XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vbm9pZGFsUmVkdWNlciB7XG4gIGNvbnN0cnVjdG9yKG1vbm9pZCkge1xuICAgIHRoaXMuaWRlbnRpdHkgPSBtb25vaWQuZW1wdHkoKTtcbiAgICBsZXQgY29uY2F0ID0gbW9ub2lkLnByb3RvdHlwZSAmJiBtb25vaWQucHJvdG90eXBlLmNvbmNhdCB8fCBtb25vaWQuY29uY2F0O1xuICAgIHRoaXMuYXBwZW5kID0gKGEsIGIpID0+IGNvbmNhdC5jYWxsKGEsIGIpO1xuICB9XG5cbiAgZm9sZChsaXN0LCBhKSB7XG4gICAgcmV0dXJuIGxpc3QucmVkdWNlKChtZW1vLCB4KSA9PiB0aGlzLmFwcGVuZChtZW1vLCB4KSwgYSA9PSBudWxsID8gdGhpcy5pZGVudGl0eSA6IGEpO1xuICB9XG59XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKE1vbm9pZGFsUmVkdWNlci5wcm90b3R5cGUsIG1ldGhvZHMpO1xuIl19