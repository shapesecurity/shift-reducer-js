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

var ShiftSpec = require("shift-spec-js")["default"];

var CloneReducer = function CloneReducer() {
  _classCallCheck(this, CloneReducer);
};

exports["default"] = CloneReducer;

for (var typeName in ShiftSpec) {
  var type = ShiftSpec[typeName];
  Object.defineProperty(CloneReducer.prototype, "reduce" + typeName, { value: function value(node, state) {
      return state;
    } });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jbG9uZS1yZWR1Y2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBZ0JPLFNBQVMsV0FBTSxlQUFlOztJQUVoQixZQUFZLFlBQVosWUFBWTt3QkFBWixZQUFZOzs7cUJBQVosWUFBWTs7QUFFakMsS0FBSyxJQUFJLFFBQVEsSUFBSSxTQUFTLEVBQUU7QUFDOUIsTUFBSSxJQUFJLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQy9CLFFBQU0sQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxRQUFRLEdBQUcsUUFBUSxFQUFFLEVBQUUsS0FBSyxFQUFFLGVBQVMsSUFBSSxFQUFFLEtBQUssRUFBRTtBQUFFLGFBQU8sS0FBSyxDQUFDO0tBQUUsRUFBRSxDQUFDLENBQUM7Q0FDeEgiLCJmaWxlIjoic3JjL2Nsb25lLXJlZHVjZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAyMDE0IFNoYXBlIFNlY3VyaXR5LCBJbmMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKVxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IFNoaWZ0U3BlYyBmcm9tIFwic2hpZnQtc3BlYy1qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDbG9uZVJlZHVjZXIgeyB9XG5cbmZvciAobGV0IHR5cGVOYW1lIGluIFNoaWZ0U3BlYykge1xuICBsZXQgdHlwZSA9IFNoaWZ0U3BlY1t0eXBlTmFtZV07XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDbG9uZVJlZHVjZXIucHJvdG90eXBlLCBcInJlZHVjZVwiICsgdHlwZU5hbWUsIHsgdmFsdWU6IGZ1bmN0aW9uKG5vZGUsIHN0YXRlKSB7IHJldHVybiBzdGF0ZTsgfSB9KTtcbn1cbiJdfQ==