'use strict';

const spec = require('shift-spec').default;
const { isRestrictedWord, isReservedWordES6 } = require('esutils').keyword;

function sanitize(fieldName) {
  if (isRestrictedWord(fieldName) || isReservedWordES6(fieldName)) {
    return '_' + fieldName;
  }
  return fieldName;
}

function parameterize(fieldName) {
  if (isRestrictedWord(fieldName) || isReservedWordES6(fieldName)) {
    return fieldName + ': _' + fieldName;
  }
  return fieldName;
}

function isNodeOrUnionOfNodes(type) {
  return type.typeName === 'Union' && type.arguments.every(isNodeOrUnionOfNodes) || spec.hasOwnProperty(type.typeName);
}

function isStatefulType(type) {
  switch (type.typeName) {
    case 'Enum':
    case 'String':
    case 'Number':
    case 'Boolean':
      return false;
    case 'Maybe':
    case 'List':
      return isStatefulType(type.argument);
    case 'Union':
      return type.arguments.some(isStatefulType);
    default:
      if (isNodeOrUnionOfNodes(type)) {
        return true;
      }
      throw new Error('unimplemented: type ' + type);
  }
}

module.exports = {
  sanitize,
  parameterize,
  isNodeOrUnionOfNodes,
  isStatefulType,
};
