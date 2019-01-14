import { STORE_USER } from './types';

export const authReducer = (state = [], action) => {
  switch (action.type) {
    case STORE_USER:
      return [action.payload];

    default:
      return state;
  }
};
