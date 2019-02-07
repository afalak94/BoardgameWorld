import { FetchItemsAction } from '../index';

import { CartTypes } from './types';

export const cartReducer = (
  state = [{ cart: 'empty' }],
  action: FetchItemsAction
) => {
  switch (action.type) {
    case CartTypes.FETCH_ITEMS:
      // save items from firebase db to redux cart
      return [...state, action.payload];

    default:
      return state;
  }
};
