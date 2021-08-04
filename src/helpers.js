
function toCamelCase(str) {
  return str
    .toLowerCase()
    .replace(/[-_]+/g, ' ')
    .replace(/[^\w\s]/g, '')
    .replace(/ (.)/g, function($1) {
      return $1.toUpperCase();
    })
    .replace(/ /g, '');
}

export function objectToCamelCase(origObj) {
  return Object.keys(origObj).reduce(function(newObj, key) {
    let val = origObj[key];
    let newVal = typeof val === 'object' ? objectToCamelCase(val) : val;
    newObj[toCamelCase(key)] = newVal;
    return newObj;
  }, {});
}
