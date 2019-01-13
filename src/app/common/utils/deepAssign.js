/* jshint maxcomplexity: 8 */

'use strict';

// Based on https://github.com/sindresorhus/deep-assign

let ownProperty = Object.prototype.hasOwnProperty;
let propIsEnumerable = Object.prototype.propertyIsEnumerable;

module.exports = {deepAssign};

function deepAssign(target, ...extenders) {
  target = toObject(target);

  extenders.forEach((ext) => {
    ext = toObject(ext);
    assign(target, ext);
  });

  return target;
}

function toObject(value) {
  if (value === null || value === undefined) {
    throw new TypeError('Sources cannot be null or undefined');
  }

  return Object(value);
}

function assign(to, from) {
  if (to === from) {
    return to;
  }

  from = Object(from);

  for (let key in from) {
    if (ownProperty.call(from, key)) {
      assignKey(to, from, key);
    }
  }

  if (Object.getOwnPropertySymbols) {
    let symbols = Object.getOwnPropertySymbols(from);

    for (let i = 0; i < symbols.length; i++) {
      if (propIsEnumerable.call(from, symbols[i])) {
        assignKey(to, from, symbols[i]);
      }
    }
  }

  return to;
}

function assignKey(to, from, key) {
  let val = from[key];

  if (val === undefined || val === null) {
    return;
  }

  if (ownProperty.call(to, key)) {
    if (to[key] === undefined || to[key] === null) {
      throw new TypeError('Cannot convert undefined or null to object (' + key + ')');
    }
  }

  if (!ownProperty.call(to, key) || !isObj(val)) {
    to[key] = val;
  } else {
    to[key] = assign(Object(to[key]), from[key]);
  }
}

function isObj(x) {
  let type = typeof x;

  return x !== null && (type === 'object' || type === 'function');
}
