/**
 * @param {Object} objectParam
 * @param {string|Array<string>} pathParam
 * @param {*} [defaultValue]
 * @return {*}
 */

// check types of function
export default function get(objectParam, pathParam, defaultValue) {
  let paths = pathParam;

  if (typeof objectParam !== 'object' || objectParam === null) {
    return undefined;
  }

  if (typeof pathParam === 'string') {
    paths = pathParam.split('.');
  }

  const pathPrefix = paths[0];

  if (!(pathPrefix in objectParam)) { // usage of in to check if value is present in object or not
    return defaultValue
  }

  const objectParamForPathPrefix = objectParam[pathPrefix];

  if (paths.length === 1) {
    return objectParam[pathPrefix]
  }

  const slicedPaths = paths.slice(1);
  return get(objectParamForPathPrefix, typeof pathParam === 'string' ? slicedPaths.join('.') : slicedPaths, defaultValue);
}
