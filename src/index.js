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

import generateSpec from "shift-spec";

import MonoidalReducer from "./monoidal-reducer"
export {MonoidalReducer};


function recurse(branch) {
  return function(reducer, node) {
    let branchNode = node[branch];
    return DRIVER[branchNode.type](reducer, branchNode);
  };
}

function recurseMaybe(branch) {
  return function(reducer, node) {
    let branchNode = node[branch];
    if (branchNode == null) return null;
    return DRIVER[branchNode.type](reducer, branchNode);
  };
}

function recurseList(branch) {
  return function(reducer, node) {
    return [].map.call(node[branch], (n) => DRIVER[n.type](reducer, n));
  };
}

function recurseListMaybe(branch) {
  return function(reducer, node) {
    return [].map.call(node[branch], (n) => {
      if (n == null) return null;
      return DRIVER[n.type](reducer, n);
    });
  };
}

const PRIMITIVE = {};

function noop(branch) {
  return function(reducer, node) {
    return PRIMITIVE;
  }
}

const REDUCER_SPEC = generateSpec(noop, recurse, recurseList, recurseMaybe, recurseListMaybe);

const DRIVER = (function(){
  var o = Object.create(null);
  for(let T in REDUCER_SPEC) {
    let reducingFunctionName = "reduce" + T;
    o[T] = function(reducer, node) {
      return reducer[reducingFunctionName].apply(reducer, [node].concat(
        REDUCER_SPEC[T].map((f) => f(reducer, node)).filter(v => v !== PRIMITIVE)
      ));
    };
  }
  return o;
}());


export default function reduce(reducer, reducible) {
  return DRIVER[reducible.type](reducer, reducible);
}
