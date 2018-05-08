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
const { makeHeader, isStatefulType } = require('../lib/utilities.js');

let content = `${makeHeader(__filename)}
import * as Shift from 'shift-ast';

export default function memoize(reducer) {
  const cache = new WeakMap;
  return {`;

for (let [typeName, type] of Object.entries(spec)) {
  let fields = type.fields.filter(f => f.name !== 'type');
  const hasArg = fields.some(f => isStatefulType(f.type));
  const parameters = `node${hasArg ? ', arg' : ''}`;
  content += `
    reduce${typeName}(${parameters}) {
      if (cache.has(node)) {
        return cache.get(node);
      }
      const res = reducer.reduce${typeName}(${parameters});
      cache.set(node, res);
      return res;
    },
`;
}

content += `  };
}
`;

require('fs').writeFile('gen/memoize.js', content, 'utf-8', ()=>{});
