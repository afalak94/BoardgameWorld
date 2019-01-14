import { STORE_USER } from './types';

export function addUser(user) {
  return {
    type: STORE_USER,
    payload: user
  };
}
