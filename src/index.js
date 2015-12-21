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

function transformWithSpec(transformer, node, spec) {
  switch (spec.typeName) {
    case "Enum":
    case "String":
    case "Number":
    case "Boolean":
    case "SourceSpan":
      return node;
    case "Const":
      // TODO: checked version
      return transformWithSpec(transformer, node, spec.argument);
    case "Maybe":
      return node && transformWithSpec(transformer, node, spec.argument);
    case "List":
      return node.map(e => transformWithSpec(transformer, e, spec.argument));
    case "Union":
      // TODO: checked version
      return transformWithSpec(transformer, node, ShiftSpec[node.type]);
    default:
      let state = {};
      spec.fields.forEach(field => {
        let v = transformWithSpec(transformer, node[field.name], field.type);
        state[field.name] = v == null ? null : v;
      });
      if (typeof transformer["reduce" + node.type] !== "function") {
        throw new Error(`Encountered ${node.type}, which the provided reducer does not handle.`);
      }
      return transformer["reduce" + node.type](node, state);
  }
}

export default function reduce(reducer, reducible) {
  return transformWithSpec(reducer, reducible, ShiftSpec[reducible.type]);
}

export {default as CloneReducer} from "./clone-reducer";
export {default as MonoidalReducer} from "./monoidal-reducer";
