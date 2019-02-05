export {
  addToStore,
  addCategories,
  selectCategory,
  selectPriceOrder
} from './actions';
export {
  boardgamesReducer,
  categoriesReducer,
  selectedCategoryReducer,
  priceReducer
} from './reducer';
export { mainSelector, saleGamesSelector } from './selectors';
export * from './types';
