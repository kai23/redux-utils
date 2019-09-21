import { useSelector } from 'react-redux';

export function useLifecycleSelector(key, fnName) {
  return useSelector(state => ({
    loading: state[key][`${fnName}Loading`],
    success: state[key][`${fnName}Success`],
    failed: state[key][`${fnName}Failed`],
    error: state[key][`${fnName}Error`],
  }));
}
