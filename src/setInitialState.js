import upperFirst from 'lodash/upperFirst';

/**
 * Set initial state
 * @param  {Onject} types
 * @param  {Object} data
 * @return {Object}
 */
export default function setInitialState(types, data = {}) {
  let name;
  let feature;
  let suffix;
  const state = Object.values(types).reduce((collection, type) => {
    name = type.split(':');
    feature = name[2];
    suffix = name[3];
    return Object.assign(collection, {
      [`${feature}Error`]: {},
      [`${feature}${upperFirst(suffix)}`]: false,
    });
  }, {});
  return Object.assign(state, data);
}
