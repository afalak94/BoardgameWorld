//Redux store
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { cartReducer } from '../../modules/Cart';
import reduxThunk from 'redux-thunk';
import { boardgamesReducer, categoriesReducer } from '../../modules/Listing';
import authReducer from '../../modules/Authentication/redux/reducer';

const rootReducer = combineReducers({
  cart: cartReducer,
  boardgames: boardgamesReducer,
  user: authReducer,
  categories: categoriesReducer
});

const initialState = {};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(reduxThunk))
);

export default store;
