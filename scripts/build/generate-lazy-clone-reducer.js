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

'use strict';

const spec = require('shift-spec');
const { makeHeader, sanitize, parameterize, isStatefulType, isNodeOrUnionOfNodes } = require('../lib/utilities.js');

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
          if (isNodeOrUnionOfNodes(type.argument.argument)) {
            return `(${a}.length === ${b}.length && ${a}.every((v, i) => v === ${b}[i]))`;
          }
          throw new Error('unimplemented: list of maybe of ' + type.argument.argument);
        default:
          if (isNodeOrUnionOfNodes(type.argument)) {
            return `(${a}.length === ${b}.length && ${a}.every((v, i) => v === ${b}[i]))`;
          }
          throw new Error('unimplemented: list of ' + type.argument);
      }
    case 'Maybe':
      if (isNodeOrUnionOfNodes(type.argument)) {
        return a + ' === ' + b;
      }
      throw new Error('unimplemented: maybe of ' + type.argument);
    default:
      if (isNodeOrUnionOfNodes(type)) {
        return a + ' === ' + b;
      }
      throw new Error('unimplemented: ' + type);
  }
}

let content = `${makeHeader(__filename)}
const Shift = require('shift-ast');

module.exports = class LazyCloneReducer {`;

function cloneField(f) {
  if (!isStatefulType(f.type)) {
    return `${f.name}: node.${f.name}`;
  }
  return parameterize(f.name);
}

for (let typeName of Object.keys(spec)) {
  let type = spec[typeName];
  let fields = type.fields.filter(f => f.name !== 'type');
  let statefulFields = fields.filter(f => isStatefulType(f.type));
  let param = statefulFields.length > 0 ? `, { ${statefulFields.map(f => parameterize(f.name)).join(', ')} }` : '';
  content += `
  reduce${typeName}(node${param}) {`;
  if (statefulFields.length === 0) {
    content += `
    return node;
  }
`;
  } else {
    content += `
    if (${statefulFields.map(f => generateEquals(f.type, 'node.' + f.name, sanitize(f.name))).join(' && ')}) {
      return node;
    }
    return new Shift.${typeName}({ ${fields.map(cloneField).join(', ')} });
  }
`;
  }
}

content += `};
`;

require('fs').writeFileSync('gen/lazy-clone-reducer.js', content, 'utf-8');
