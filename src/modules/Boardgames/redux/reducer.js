import { ListingTypes } from './types';
import { initialBoardgame, initialCategories } from '../index';

export const boardgamesReducer = (state = [[initialBoardgame]], action) => {
  switch (action.type) {
    case ListingTypes.STORE_GAMES:
      return [action.payload];

    default:
      return state;
  }
};

export const categoriesReducer = (state = initialCategories, action) => {
  switch (action.type) {
    case ListingTypes.STORE_CATEGORIES:
      return action.payload;

    default:
      return state;
  }
};

export const selectedCategoryReducer = (state = '', action) => {
  switch (action.type) {
    case ListingTypes.SELECT_CATEGORY:
      return action.payload;

    default:
      return state;
  }
};

export const priceReducer = (state = '', action) => {
  switch (action.type) {
    case ListingTypes.PRICE:
      return action.payload;

    default:
      return state;
  }
};
