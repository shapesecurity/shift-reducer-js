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
const { sanitize, parameterize, isStatefulType } = require('../lib/utilities.js');

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

import Shift from 'shift-ast';

export default class MonoidalReducer {
  constructor(monoid) {
    this.identity = monoid.empty();
    let concat = monoid.prototype && monoid.prototype.concat || monoid.concat;
    this.append = (a, b) => concat.call(a, b);
  }

  fold(list, a) {
    return list.reduce((memo, x) => this.append(memo, x), a == null ? this.identity : a);
  }
`;

function reduce({ name, type }) {
  switch (type.typeName) {
    case 'Maybe':
      return `${sanitize(name)} === null ? this.identity : ${sanitize(name)}`;
    case 'List':
      if (type.argument.typeName === 'Maybe') {
        return `this.fold(${sanitize(name)}.filter(n => n !== null))`;
      }
      return `this.fold(${sanitize(name)})`;
    default:
      return sanitize(name);
  }
}

for (let [typeName, type] of Object.entries(spec)) {
  let fields = type.fields.filter(f => f.name !== 'type' && isStatefulType(f.type));
  if (fields.length === 0) {
    content += `
  reduce${typeName}(node) {
    return this.identity;
  }
`;
  } else {
    let param = `{ ${fields.map(f => parameterize(f.name)).join(', ')} }`;
    content += `
  reduce${typeName}(node, ${param}) {
    `;
    if (fields.length === 1) {
      content += `return ${reduce(fields[0])};`;
    } else if (fields.length === 2) {
      content += `return this.append(${reduce(fields[0])}, ${reduce(fields[1])});`;
    } else {
      content += `return this.fold([${fields.map(reduce).join(', ')}]);`;
    }
    content += `
  }
`;
  }
}

content += `}
`;

require('fs').writeFile('gen/monoidal-reducer.js', content, 'utf-8');
