import { ListingTypes } from './types';

export const boardgamesReducer = (state = [], action) => {
  switch (action.type) {
    case ListingTypes.STORE_GAMES:
      return [action.payload];

    default:
      return state;
  }
};

export const categoriesReducer = (state = [], action) => {
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
