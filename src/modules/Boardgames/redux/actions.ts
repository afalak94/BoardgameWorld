import { Boardgame, CategoryInterface, ListingTypes } from '../index';

import {
  AddToStoreAction,
  AddCategoriesAction,
  SelectCategoryAction,
  SelectPriceOrderAction
} from './index';

export function addToStore(games: Boardgame[]): AddToStoreAction {
  return { type: ListingTypes.STORE_GAMES, payload: games };
}

export function addCategories(
  categories: CategoryInterface[]
): AddCategoriesAction {
  return { type: ListingTypes.STORE_CATEGORIES, payload: categories };
}

export function selectCategory(category: string): SelectCategoryAction {
  return { type: ListingTypes.SELECT_CATEGORY, payload: category };
}

export function selectPriceOrder(price: string): SelectPriceOrderAction {
  return { type: ListingTypes.PRICE, payload: price };
}
