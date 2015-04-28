"use strict";

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

var ShiftSpec = require("shift-spec")["default"];

var CloneReducer = function CloneReducer() {
  _classCallCheck(this, CloneReducer);
};

exports["default"] = CloneReducer;

for (var typeName in ShiftSpec) {
  var type = ShiftSpec[typeName];
  Object.defineProperty(CloneReducer.prototype, "reduce" + typeName, {
    value: function value(node, state) {
      return state;
    }
  });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jbG9uZS1yZWR1Y2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBZ0JPLFNBQVMsV0FBTSxZQUFZOztJQUViLFlBQVksWUFBWixZQUFZO3dCQUFaLFlBQVk7OztxQkFBWixZQUFZOztBQUVqQyxLQUFLLElBQUksUUFBUSxJQUFJLFNBQVMsRUFBRTtBQUM5QixNQUFJLElBQUksR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDL0IsUUFBTSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsU0FBUyxhQUFXLFFBQVEsRUFBSTtBQUNqRSxTQUFLLEVBQUUsZUFBUyxJQUFJLEVBQUUsS0FBSyxFQUFFO0FBQUUsYUFBTyxLQUFLLENBQUM7S0FBRTtHQUMvQyxDQUFDLENBQUM7Q0FDSiIsImZpbGUiOiJzcmMvY2xvbmUtcmVkdWNlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IDIwMTQgU2hhcGUgU2VjdXJpdHksIEluYy5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgU2hpZnRTcGVjIGZyb20gXCJzaGlmdC1zcGVjXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENsb25lUmVkdWNlciB7IH1cblxuZm9yIChsZXQgdHlwZU5hbWUgaW4gU2hpZnRTcGVjKSB7XG4gIGxldCB0eXBlID0gU2hpZnRTcGVjW3R5cGVOYW1lXTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENsb25lUmVkdWNlci5wcm90b3R5cGUsIGByZWR1Y2Uke3R5cGVOYW1lfWAsIHtcbiAgICB2YWx1ZTogZnVuY3Rpb24obm9kZSwgc3RhdGUpIHsgcmV0dXJuIHN0YXRlOyB9XG4gIH0pO1xufVxuIl19