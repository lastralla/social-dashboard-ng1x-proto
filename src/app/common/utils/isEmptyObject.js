'use strict';

module.exports = {isEmptyObject};

function isEmptyObject(obj) {

  let isEmpty = Object.keys(obj).length === 0 &&
                JSON.stringify(obj) === JSON.stringify({});

  return isEmpty;
}
