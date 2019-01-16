import { STORE_USER } from './types';

export const authReducer = (
  state = [{ uid: 'none', email: 'Guest' }],
  action
) => {
  switch (action.type) {
    case STORE_USER:
      return [action.payload];

    default:
      return state;
  }
};
