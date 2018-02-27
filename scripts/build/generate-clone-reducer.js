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
const { parameterize, isStatefulType } = require('../lib/utilities.js');

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

import * as Shift from 'shift-ast';

export default class CloneReducer {`;

function cloneField(f) {
  if (!isStatefulType(f.type)) {
    return `${f.name}: node.${f.name}`;
  }
  return parameterize(f.name);
}

for (let [typeName, type] of Object.entries(spec)) {
  let fields = type.fields.filter(f => f.name !== 'type');
  if (fields.length === 0) {
    content += `
  reduce${typeName}(node) {
    return new Shift.${typeName};
  }
`;
  } else {
    let statefulFields = fields.filter(f => isStatefulType(f.type));
    let param = statefulFields.length > 0 ? `, { ${statefulFields.map(f => parameterize(f.name)).join(', ')} }` : '';
    content += `
  reduce${typeName}(node${param}) {
    return new Shift.${typeName}({ ${fields.map(cloneField).join(', ')} });
  }
`;
  }
}

content += `}
`;

require('fs').writeFile('gen/clone-reducer.js', content, 'utf-8');
