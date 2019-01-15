import { STORE_USER } from './types';

export const authReducer = (
  state = [{ uid: 'guest', email: 'Guest' }],
  action
) => {
  switch (action.type) {
    case STORE_USER:
      return [action.payload];

    default:
      return state;
  }
};
