import { ActionTypes, AddUserAction } from './index';

const initialState = [{ uid: 'none', email: 'Guest' }];

export const authReducer = (state = initialState, action: AddUserAction) => {
  switch (action.type) {
    case ActionTypes.STORE_USER:
      return [action.payload];

    default:
      return state;
  }
};
