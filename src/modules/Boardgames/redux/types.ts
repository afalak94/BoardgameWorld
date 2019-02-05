import { Boardgame, CategoryInterface } from '../index';

export enum ListingTypes {
  CATEGORY_CLICK = 'CATEGORY_CLICK',
  PRICE_ASC = 'PRICE_ASC',
  PRICE_DESC = 'PRICE_DESC',
  STORE_GAMES = 'STORE_GAMES',
  NAME_FILTER = 'NAME_FILTER',
  STORE_CATEGORIES = 'STORE_CATEGORIES',
  SELECT_CATEGORY = 'SELECT_CATEGORY',
  PRICE = 'PRICE'
}

export interface AddToStoreAction {
  type: ListingTypes.STORE_GAMES;
  payload: Boardgame[];
}

export interface AddCategoriesAction {
  type: ListingTypes.STORE_CATEGORIES;
  payload: CategoryInterface[];
}

export interface SelectCategoryAction {
  type: ListingTypes.SELECT_CATEGORY;
  payload: string;
}

export interface SelectPriceOrderAction {
  type: ListingTypes.PRICE;
  payload: string;
}
