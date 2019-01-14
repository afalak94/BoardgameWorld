import { ListingTypes } from './types';

export function onCategoryClick(name) {
  return {
    type: ListingTypes.CATEGORY_CLICK,
    payload: name
  };
}

export function onPriceClick(price) {
  if (price === 'ASC') {
    return {
      type: ListingTypes.PRICE_ASC,
      payload: price
    };
  } else if (price === 'DESC') {
    return {
      type: ListingTypes.PRICE_DESC,
      payload: price
    };
  }
}

export function onNameFilter(name) {
  return {
    type: ListingTypes.NAME_FILTER,
    payload: name
  };
}

export function addToStore(games) {
  return { type: ListingTypes.STORE_GAMES, payload: games };
}

export function addCategories(categories) {
  return { type: ListingTypes.STORE_CATEGORIES, payload: categories };
}
