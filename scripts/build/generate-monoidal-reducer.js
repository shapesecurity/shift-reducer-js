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
const { makeHeader, sanitize, parameterize, isStatefulType } = require('../lib/utilities.js');


function toVal(isThunked, { name, type }) {
  switch (type.typeName) {
    case 'Maybe':
      return `${sanitize(name)} == null ? this.identity : ${sanitize(name)}${isThunked ? '()' : ''}`;
    case 'List':
      if (type.argument.typeName === 'Maybe') {
        return `this.append(...${sanitize(name)}.filter(n => n != null))`;
      }
      return `this.append(...${sanitize(name)})`;
    default:
      return sanitize(name) + (isThunked ? '()' : '');
  }
}

function toArg(isThunked, { name, type }) {
  switch (type.typeName) {
    case 'Maybe':
      return `${sanitize(name)} == null ? ${isThunked ? '() => ' : ''}this.identity : ${sanitize(name)}`;
    case 'List':
      if (type.argument.typeName === 'Maybe') {
        return `...${sanitize(name)}.filter(n => n != null)`;
      }
      return `...${sanitize(name)}`;
    default:
      return sanitize(name);
  }
}


const regularPrefix = `${makeHeader(__filename)}
const Shift = require('shift-ast');

module.exports = class MonoidalReducer {
  constructor(monoid) {
    let identity = monoid.empty();
    this.identity = identity;
    let concat;
    if (monoid.prototype && typeof monoid.prototype.concat === 'function') {
      concat = Function.prototype.call.bind(monoid.prototype.concat);
    } else if (typeof monoid.concat === 'function') {
      concat = monoid.concat;
    } else {
      throw new TypeError('Monoid must provide a \`concat\` method');
    }
    this.append = (...args) => args.reduce(concat, identity);
  }
`;

const thunkedPrefix = `${makeHeader(__filename)}
const Shift = require('shift-ast');

module.exports = class MonoidalReducer {
  constructor(monoid) {
    let identity = monoid.empty();
    this.identity = identity;

    let concatThunk;
    if (monoid.prototype && typeof monoid.prototype.concatThunk === 'function') {
      concatThunk = Function.prototype.call.bind(monoid.prototype.concatThunk);
    } else if (typeof monoid.concatThunk === 'function') {
      concatThunk = monoid.concatThunk;
    } else {
      let concat;
      if (monoid.prototype && typeof monoid.prototype.concat === 'function') {
        concat = Function.prototype.call.bind(monoid.prototype.concat);
      } else if (typeof monoid.concat === 'function') {
        concat = monoid.concat;
      } else {
        throw new TypeError('Monoid must provide a \`concatThunk\` or \`concat\` method');
      }
      if (typeof monoid.isAbsorbing === 'function') {
        let isAbsorbing = monoid.isAbsorbing;
        concatThunk = (a, b) => isAbsorbing(a) ? a : concat(a, b());
      } else {
        concatThunk = (a, b) => concat(a, b());
      }
    }
    this.append = (...args) => args.reduce(concatThunk, identity);
  }
`;


function buildContent(isThunked) {
  let content = isThunked ? thunkedPrefix : regularPrefix;
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
        content += `return ${toVal(isThunked, fields[0])};`;
      } else {
        content += `return this.append(${fields.map(f => toArg(isThunked, f)).join(', ')});`;
      }
      content += `
  }
`;
    }
  }

  content += `};
`;

  return content;
}
require('fs').writeFileSync('gen/monoidal-reducer.js', buildContent(false), 'utf-8');
require('fs').writeFileSync('gen/thunked-monoidal-reducer.js', buildContent(true), 'utf-8');
