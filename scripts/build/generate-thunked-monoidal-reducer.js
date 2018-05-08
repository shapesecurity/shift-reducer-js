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

function toVal({ name, type }) {
  switch (type.typeName) {
    case 'Maybe':
      return `${sanitize(name)} == null ? this.identity : ${sanitize(name)}()`;
    case 'List':
      if (type.argument.typeName === 'Maybe') {
        return `this.append(...${sanitize(name)}.filter(n => n != null))`;
      }
      return `this.append(...${sanitize(name)})`;
    default:
      return sanitize(name) + '()';
  }
}

function toArg({ name, type }) {
  switch (type.typeName) {
    case 'Maybe':
      return `${sanitize(name)} == null ? () => this.identity : ${sanitize(name)}`;
    case 'List':
      if (type.argument.typeName === 'Maybe') {
        return `...${sanitize(name)}.filter(n => n != null)`;
      }
      return `...${sanitize(name)}`;
    default:
      return sanitize(name);
  }
}


function buildContent() {
  let content = `${makeHeader(__filename)}
import Shift from 'shift-ast';

export default class MonoidalReducer {
  constructor(monoid) {
    let identity = monoid.empty();
    this.identity = identity;

    let combine;
    let combineThunked = monoid.prototype && monoid.prototype.concatThunk || monoid.concatThunk;
    if (typeof combineThunked === 'function') {
      combine = (a, b) => combineThunked.call(a, b);
    } else {
      let concat = monoid.prototype && monoid.prototype.concat || monoid.concat;
      if (!(typeof concat === 'function')) {
        throw new TypeError('Monoid must provide a \`concat\` method');
      }
      if (monoid.isAbsorbing) {
        let isAbsorbing = monoid.isAbsorbing;
        combine = (a, b) => isAbsorbing(a) ? a : concat.call(a, b());
      } else {
        combine = (a, b) => concat.call(a, b());
      }
    }
    this.append = (...args) => args.reduce(combine, identity);
  }
`;

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
        content += `return ${toVal(fields[0])};`;
      } else {
        content += `return this.append(${fields.map(toArg).join(', ')});`;
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
require('fs').writeFile('gen/thunked-monoidal-reducer.js', buildContent(), 'utf-8');
