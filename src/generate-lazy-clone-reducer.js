/**
 * Copyright 2016 Shape Security, Inc.
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

"use strict";

let spec = require('shift-spec').default;
const {isRestrictedWord, isReservedWordES6} = require('esutils').keyword;

function sanitize(fieldName) {
  if (isRestrictedWord(fieldName) || isReservedWordES6(fieldName)) {
    return '_' + fieldName;
  }
  return fieldName;
}

function parameterize(fieldName) {
  if (isRestrictedWord(fieldName) || isReservedWordES6(fieldName)) {
    return '_' + fieldName;
  }
  return fieldName;
}

function asParameter(fieldName) {
  if (isRestrictedWord(fieldName) || isReservedWordES6(fieldName)) {
    return fieldName + ': _' + fieldName;
  }
  return fieldName;
}

function isStatefulType(type) {
  switch (type.typeName) {
    case 'Enum':
    case 'String':
    case 'Number':
    case 'Boolean':
      return false;
    case 'Maybe':
    case 'List':
      return isStatefulType(type.argument);
    default:
      return true;
  } 
}

function generateEquals(type, a, b) {
  switch (type.typeName) {
    case 'Enum':
    case 'String':
    case 'Number':
    case 'Boolean':
      throw new Error('not reached');
    case 'List':
      switch (type.argument.typeName) {
        case 'Enum':
        case 'String':
        case 'Number':
        case 'Boolean':
          throw new Error('not reached');
        case 'List':
          throw new Error('unimplemented: lists of lists');
        case 'Maybe':
        default:
          return `(${a}.length === ${b}.length && ${a}.every((v, i) => v === ${b}[i]))`;
      }
    case 'Maybe':
    default:
      return a + ' === ' + b;
  } 
}

let content = `/**
 * Copyright 2017 Shape Security, Inc.
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

import * as Shift from 'shift-ast';

export default class LazyCloneReducer {`;

function cloneField(f) {
  if (!isStatefulType(f.type)) {
    return `${f.name}: node.${f.name}`;
  } else {
    return asParameter(f.name);
  }
}

for (let typeName in spec) {
  let type = spec[typeName];
  let fields = type.fields.filter(f => f.name !== 'type');
  let statefulFields = fields.filter(f => isStatefulType(f.type));
  let param = statefulFields.length > 0 ? `, {${statefulFields.map(f => asParameter(f.name)).join(', ')}}` : '';
  content += `
  reduce${typeName}(node${param}) {`;
  if (statefulFields.length === 0) {
    content += `
    return node;
  }
`;
  } else {
    content += `
    if (${statefulFields.map(f => generateEquals(f.type, 'node.' + f.name, parameterize(f.name))).join(' && ')}) {
      return node;
    }
    return new Shift.${typeName}({${fields.map(cloneField).join(', ')}});
  }
`;
  }
}

content += `}
`;

require('fs').writeFile('gen/lazy-clone-reducer.js', content, 'utf-8', ()=>{});
