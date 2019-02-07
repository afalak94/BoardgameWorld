import { CartTypes, FetchItemsAction, CartInterface } from '../index';

export function fetchItems(cart: CartInterface[]): FetchItemsAction {
  return {
    type: CartTypes.FETCH_ITEMS,
    payload: cart
  };
}
