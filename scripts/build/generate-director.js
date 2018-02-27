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

const spec = require('shift-spec').default;
const { isStatefulType } = require('../lib/utilities.js');

let content = `/**
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

const director = {`;

function reduce(name, type) {
  switch (type.typeName) {
    case 'Maybe':
      return `${name} && ${reduce(name, type.argument)}`;
    case 'List':
      return `${name}.map(v => ${reduce('v', type.argument)})`;
    case 'Union':
      return `this[${name}.type](reducer, ${name})`;
    default:
      return `this.${type.typeName}(reducer, ${name})`;
  }
}

for (let [typeName, type] of Object.entries(spec)) {
  let fields = type.fields.filter(f => f.name !== 'type' && isStatefulType(f.type));
  if (fields.length === 0) {
    content += `
  ${typeName}(reducer, node) {
    return reducer.reduce${typeName}(node);
  },
`;

  } else {
    content += `
  ${typeName}(reducer, node) {
    return reducer.reduce${typeName}(node, { ${fields.map(f => `${f.name}: ${reduce(`node.${f.name}`, f.type)}`).join(', ')} });
  },
`;

  }
}

content += `};

export function reduce(reducer, node) {
  return director[node.type](reducer, node);
}
`;

require('fs').writeFile('gen/director.js', content, 'utf-8');
