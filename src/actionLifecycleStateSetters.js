/**
 * Set failure state
 * @param {Object} state
 * @param {String} name
 * @param {Object} data
 */
export function setFailureState(state, name, error, data = {}) {
  const newState = {
    ...state,
    [`${name}Loading`]: false,
    [`${name}Success`]: false,
    [`${name}Failed`]: true,
    [`${name}Error`]: error,
  };
  return { ...newState, ...data };
}


/**
 * Set loading state
 * @param {Object} state
 * @param {String} name
 * @param {Object} data
 */
export function setLoadingState(state, name, data = {}) {
  const newState = {
    ...state,
    [`${name}Loading`]: true,
    [`${name}Success`]: false,
    [`${name}Failed`]: false,
    [`${name}Error`]: {},
  };
  return { ...newState, ...data };
}

/**
 * Set success state
 * @param {Object} state
 * @param {String} name
 * @param {Object} data
 */
export function setSuccessState(state, name, data = {}) {
  const newState = {
    ...state,
    [`${name}Loading`]: false,
    [`${name}Success`]: true,
    [`${name}Failed`]: false,
    [`${name}Error`]: {},
  };
  return { ...newState, ...data };
}

export default {
  setFailureState,
  setFailedState: setFailureState, // alias
  setLoadingState,
  setSuccessState,
};
