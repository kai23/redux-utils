import camelCase from 'lodash/camelCase';
import DEFAULT_SUFFIXES from './defaultSuffixes.js';

/**
 * Set action types
 * @param  {Array}  prefixes
 * @param  {String} containerName
 * @param  {Array}  suffixes
 * @param  {String} app
 * @return {Object}
 */
export default function setActionTypes(prefixes, containerName, appName = 'myApp', suffixes = DEFAULT_SUFFIXES) {
  let name;
  let key;
  return prefixes.reduce((collection, prefix) => (
    suffixes.reduce((prev, suffix) => {
      key = `${prefix}_${suffix.toUpperCase()}`;
      name = `${camelCase(prefix)}:${suffix.toLowerCase()}`;
      collection[key] = `${appName}:${containerName}:${name}`;
      return collection;
    }, {})
  ), {});
}
