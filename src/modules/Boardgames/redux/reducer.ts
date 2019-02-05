import { initialBoardgame, initialCategories, ListingTypes } from '../index';

import {
  AddToStoreAction,
  AddCategoriesAction,
  SelectCategoryAction,
  SelectPriceOrderAction
} from './index';

export const boardgamesReducer = (
  state = [[initialBoardgame]],
  action: AddToStoreAction
) => {
  switch (action.type) {
    case ListingTypes.STORE_GAMES:
      return [action.payload];

    default:
      return state;
  }
};

export const categoriesReducer = (
  state = initialCategories,
  action: AddCategoriesAction
) => {
  switch (action.type) {
    case ListingTypes.STORE_CATEGORIES:
      return action.payload;

    default:
      return state;
  }
};

export const selectedCategoryReducer = (
  state = '',
  action: SelectCategoryAction
) => {
  switch (action.type) {
    case ListingTypes.SELECT_CATEGORY:
      return action.payload;

    default:
      return state;
  }
};

export const priceReducer = (state = '', action: SelectPriceOrderAction) => {
  switch (action.type) {
    case ListingTypes.PRICE:
      return action.payload;

    default:
      return state;
  }
};
