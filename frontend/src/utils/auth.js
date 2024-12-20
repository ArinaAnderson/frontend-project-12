// /* eslint-disable import/prefer-default-export */
import updateLocalStorage from './localStorage.js';

export const login = (updateLocalState, authData) => {
  updateLocalStorage({ type: 'setValue', value: authData, key: 'auth' });
  updateLocalState();
};

export const logout = (updateLocalState) => {
  updateLocalStorage({ type: 'removeValue', key: 'auth' });
  updateLocalState();
};
