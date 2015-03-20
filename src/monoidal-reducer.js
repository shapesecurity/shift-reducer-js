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

import ShiftSpec from "shift-spec";

const methods = {};

for (let typeName in ShiftSpec) {
  let type = ShiftSpec[typeName];

  if (type.typeName === "SourceLocation" || type.typeName === "SourceSpan") {
    continue;
  }

  let fields = [];

  type.fields.forEach(field => {
    if (field.name === "type" || field.name === "loc") return;
    let fieldName = field.name;
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
        fields.push(t=>t[fieldName]);
    }
  });

  methods["reduce" + typeName] = {
    value: function (node, t) {
      return this.fold(fields.map(f => f.call(this, t)));
    }
  };
}

export default class MonoidalReducer {
  constructor(monoid) {
    this.identity = monoid.empty();
    let concat = monoid.prototype && monoid.prototype.concat || monoid.concat;
    this.append = (a, b) => concat.call(a, b);
  }

  fold(list, a) {
    return list.reduce((memo, x) => this.append(memo, x), a == null ? this.identity : a);
  }
}

Object.defineProperties(MonoidalReducer.prototype, methods);
