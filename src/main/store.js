//Redux store
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import cartReducer from '../modules/Cart/reducer';
import reduxThunk from 'redux-thunk';
import boardgamesReducer from './Redux/reducer';

const rootReducer = combineReducers({
  cart: cartReducer,
  boardgames: boardgamesReducer
});

const initialState = {};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(reduxThunk))
);

export default store;
