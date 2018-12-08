//Redux store
import { createStore, combineReducers } from 'redux';
import cartReducer from '../modules/Cart/reducer';
import boardgamesReducer from './Redux/reducer';

const rootReducer = combineReducers({
  cart: cartReducer,
  boardgames: boardgamesReducer
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
