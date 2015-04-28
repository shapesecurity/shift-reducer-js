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

function id(x) { return x; }

function handlerForFieldOfType(type) {
  switch (type.typeName) {
    case "Enum":
    case "String":
    case "Boolean":
    case "Number":
    case "SourceSpan":
      return null
    case "Const":
      return handlerForFieldOfType(type.argument);
    case "Maybe": {
      let subHandler = handlerForFieldOfType(type.argument);
      if (subHandler == null) return null;
      return function (t) { return t == null ? this.identity : subHandler.call(this, t); };
    }
    case "List": {
      let subHandler = handlerForFieldOfType(type.argument);
      if (subHandler == null) return null;
      return function (t) { return this.fold(t.map(x => subHandler.call(this, x))); };
    }
    default:
      return id;
  }
}

for (let typeName in ShiftSpec) {
  let type = ShiftSpec[typeName];

  let handlers = {};
  type.fields.forEach(field => {
    let handler = handlerForFieldOfType(field.type);
    if (handler != null) handlers[field.name] = handler;
  });
  let fieldNames = Object.keys(handlers);

  methods[`reduce${typeName}`] = {
    value: function (node, state) {
      return this.fold(fieldNames.map(fieldName => handlers[fieldName].call(this, state[fieldName])));
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
