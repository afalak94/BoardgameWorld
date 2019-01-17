import { FETCH_ITEMS } from './types';

export const cartReducer = (state = [{ cart: 'empty' }], action) => {
  switch (action.type) {
    case FETCH_ITEMS:
      //save items from firebase db to redux cart
      return [...state, action.payload];

    default:
      return state;
  }
};
