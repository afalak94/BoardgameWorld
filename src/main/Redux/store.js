//Redux store
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { cartReducer } from '../../modules/Cart';
import reduxThunk from 'redux-thunk';
import {
  boardgamesReducer,
  categoriesReducer,
  selectedCategoryReducer,
  priceReducer
} from '../../modules/Boardgames';
import { usersReducer } from '../../modules/Firebase';
import { authReducer } from '../../modules/Authentication';
import { searchTermReducer } from '../../modules/Navigation';

const rootReducer = combineReducers({
  cart: cartReducer,
  boardgames: boardgamesReducer,
  user: authReducer,
  categories: categoriesReducer,
  allUsers: usersReducer,
  searchTerm: searchTermReducer,
  selectedCategory: selectedCategoryReducer,
  price: priceReducer
});

const initialState = {};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(reduxThunk))
);

// export const dispatch = store.dispatch;
export default store;
