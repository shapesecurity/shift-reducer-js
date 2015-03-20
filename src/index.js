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

import MonoidalReducer from "./monoidal-reducer";
export {MonoidalReducer};

import SPEC from "shift-spec";

// Get the concrete spec for union type.
function getSpec(typeName, spec) {
  for (let i = 0; i < spec.arguments.length; i++) {
    if (spec.arguments[i].typeName === "Union") {
      let s = getSpec(typeName, spec.arguments[i]);
      if (s) return s;
    }
    if (typeName === spec.arguments[i].typeName) {
      return spec.arguments[i];
    }
  }
  return null;
}

function genTransformWithSpec(unionTransformer) {
  return function transformWithSpec(transformer, node, spec) {
    switch (spec.typeName) {
      case "Enum":
      case "String":
      case "Number":
      case "Boolean":
        return node;
      case "Maybe":
        return node && transformWithSpec(transformer, node, spec.argument);
      case "List":
        return node.map(r => transformWithSpec(transformer, r, spec.argument));
      case "Union":
        return unionTransformer(transformWithSpec, transformer, node, spec);
      default:
      {
        let state = {};
        spec.fields.forEach(field => {
          if (field.name === "type" || field.name === "loc") {
            state[field.name] = node[field.name];
          } else {
            state[field.name] = transformWithSpec(transformer, node[field.name], field.type);
          }
        });
        return transformer["reduce" + node.type] ? transformer["reduce" + node.type](node, state) : state;
      }
    }
  }
}

function checkedUnion(transformWithSpec, transformer, node, spec) {
  let s = getSpec(node.type, spec);
  return s && transformWithSpec(transformer, node, s);
}

function uncheckedUnion(transformWithSpec, transformer, node) {
  return transformWithSpec(transformer, node, SPEC[node.type]);
}

export const transformChecked = genTransformWithSpec(checkedUnion);
export const transformUnchecked = genTransformWithSpec(uncheckedUnion);

export default function reduce(reducer, reducible) {
  return transformChecked(reducer, reducible, SPEC[reducible.type]);
}

export function reduceUnchecked(reducer, reducible) {
  return transformChecked(reducer, reducible, SPEC[reducible.type]);
}
