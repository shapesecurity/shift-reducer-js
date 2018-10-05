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
const { makeHeader, sanitize, parameterize, isStatefulType } = require('../lib/utilities.js');

function reduce({ name, type }) {
  switch (type.typeName) {
    case 'Maybe':
      return `${sanitize(name)} == null ? this.identity : ${sanitize(name)}`;
    case 'List':
      if (type.argument.typeName === 'Maybe') {
        return `this.fold(${sanitize(name)}.filter(n => n != null))`;
      }
      return `this.fold(${sanitize(name)})`;
    default:
      return sanitize(name);
  }
}


function buildContent() {
  let content = `${makeHeader(__filename)}
import Shift from 'shift-ast';

export default class MonoidalReducer {
  constructor(monoid) {
    this.identity = monoid.empty();
    if (monoid.prototype && typeof monoid.prototype.concat === 'function') {
      this.append = Function.prototype.call.bind(monoid.prototype.concat);
    } else if (typeof monoid.concat === 'function') {
      this.append = monoid.concat;
    } else {
      throw new TypeError('Monoid must provide a \`concat\` method');
    }
  }

  fold(list, a) {
    return list.reduce((memo, x) => this.append(memo, x), a == null ? this.identity : a);
  }
`;

  for (let typeName of Object.keys(spec)) {
    let type = spec[typeName];
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

  return content;
}
require('fs').writeFileSync('gen/monoidal-reducer.js', buildContent(), 'utf-8');
