export { ListingConn as Listing } from './views/Listing.jsx';
export {
  addToStore,
  addCategories,
  selectCategory,
  selectPriceOrder,
  boardgamesReducer,
  categoriesReducer,
  selectedCategoryReducer,
  priceReducer,
  mainSelector,
  saleGamesSelector
} from './redux/index';
export { initialBoardgame, initialCategories } from './consts/initialValues';
