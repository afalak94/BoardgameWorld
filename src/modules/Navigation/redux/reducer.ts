import { Reducer } from 'redux';

import { SearchTermAction, NavigationTypes } from './index';

export const searchTermReducer: Reducer<string, SearchTermAction> = (
  state = '',
  action
) => {
  switch (action.type) {
    case NavigationTypes.SEARCH_TERM:
      return action.payload;

    default:
      return state;
  }
};
