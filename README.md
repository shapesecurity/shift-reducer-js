Shift Reducer
=============


## About

This module provides a reducer for a [Shift format](https://github.com/shapesecurity/shift-spec) AST.


## Status

[Stable](http://nodejs.org/api/documentation.html#documentation_stability_index).


## Installation

```sh
npm install shift-reducer
```


## Usage

### ES6

```js
import reduce, {MonoidalReducer} from "shift-reducer"

class IdentifierCounter extends MonoidalReducer {
  static count(program) {
    return reduce(new this, program);
  }

  constructor() {
    super(class Sum {
      static empty() { return 0; }
      concat(a) { return this + a; }
    });
  }

  reduceIdentifierExpression(node, identifier) {
    return 1;
  }
}

IdentifierCounter.count(PROGRAM);
```

### ES5

```js
var reducer = require('shift-reducer');

function IdentifierCounter() {
  reducer.MonoidalReducer.call(this, {
    empty : function () { return 0; },
    concat : function (a) { return this + a; }
  });
}

IdentifierCounter.count = function(program){
  return reducer.default(new this, program);
};

IdentifierCounter.prototype = Object.create(reducer.MonoidalReducer.prototype);

IdentifierCounter.prototype.reduceIdentifierExpression = function (node, identifier) {
  return 1;
};

IdentifierCounter.count(PROGRAM);
```

## Contributing

* Open a Github issue with a description of your desired change. If one exists already, leave a message stating that you are working on it with the date you expect it to be complete.
* Fork this repo, and clone the forked repo.
* Install dependencies with `npm install`.
* Build and test in your environment with `npm run build && npm test`.
* Create a feature branch. Make your changes. Add tests.
* Build and test in your environment with `npm run build && npm test`.
* Make a commit that includes the text "fixes #*XX*" where *XX* is the Github issue.
* Open a Pull Request on Github.


## License

    Copyright 2014 Shape Security, Inc.

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
