import { CartInterface } from '../index';

export enum CartTypes {
  FETCH_ITEMS = 'FETCH_ITEMS'
}

export interface FetchItemsAction {
  type: string;
  payload: CartInterface[];
}
