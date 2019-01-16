import { ListingTypes } from './types';

export function addToStore(games) {
  return { type: ListingTypes.STORE_GAMES, payload: games };
}

export function addCategories(categories) {
  return { type: ListingTypes.STORE_CATEGORIES, payload: categories };
}

export function selectCategory(category) {
  return { type: ListingTypes.SELECT_CATEGORY, payload: category };
}

export function selectPriceOrder(price) {
  return { type: ListingTypes.PRICE, payload: price };
}
