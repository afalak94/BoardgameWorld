// Redux store
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import {
  boardgamesReducer,
  categoriesReducer,
  selectedCategoryReducer,
  priceReducer,
  Boardgame,
  CategoryInterface
} from '../../modules/Boardgames';
import { cartReducer, CartInterface } from '../../modules/Cart';
import { usersReducer } from '../../modules/Firebase';
import { authReducer, User } from '../../modules/Authentication';
import { searchTermReducer } from '../../modules/Navigation';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}

const rootReducer = combineReducers({
  cart: cartReducer,
  boardgames: boardgamesReducer,
  user: authReducer,
  categories: categoriesReducer,
  allUsers: usersReducer,
  searchTerm: searchTermReducer,
  selectedCategory: selectedCategoryReducer,
  price: priceReducer
} as any);

const initialState = {};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(reduxThunk))
);

export interface ReduxState {
  cart: CartInterface;
  boardgames: Boardgame[];
  user: User[];
  categories: CategoryInterface[];
  allUsers: User[];
  searchTerm: string;
  selectedCategory: string;
  price: string;
}

export default store;
