/**
 * Copyright 2018 Shape Security, Inc.
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
const { sanitize, parameterize, isStatefulType } = require('../lib/utilities.js');

function force({ name, type }) {
  switch (type.typeName) {
    case 'Maybe':
      return `${sanitize(name)} == null ? null : ${sanitize(name)}()`;
    case 'List':
      if (type.argument.typeName === 'Maybe') {
        return `${sanitize(name)}.map(n => n == null ? null : n())`;
      }
      return `${sanitize(name)}.map(n => n())`;
    default:
      return sanitize(name) + '()';
  }
}


let content = `/**
 * Copyright 2018 Shape Security, Inc.
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

export default function thunkify(reducer) {
  return {`;

for (let [typeName, type] of Object.entries(spec)) {
  let fields = type.fields.filter(f => f.name !== 'type');
  let statefulFields = fields.filter(f => isStatefulType(f.type));
  let param = statefulFields.length > 0 ? `, { ${statefulFields.map(f => parameterize(f.name)).join(', ')} }` : '';
  content += `
    reduce${typeName}(node${param}) {`;
  if (statefulFields.length === 0) {
    content += `
      return reducer.reduce${typeName}(node);`;
  } else {
    content += `
      return reducer.reduce${typeName}(node, { ${statefulFields.map(f => sanitize(f.name) + ': ' + force(f)).join(', ')} });`;
  }
  content += `
    },
`;
}

content += `  };
}
`;

require('fs').writeFile('gen/thunkify.js', content, 'utf-8', ()=>{});
