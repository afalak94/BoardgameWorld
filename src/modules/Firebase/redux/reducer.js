import { FirebaseTypes } from './types';

export const usersReducer = (state = [], action) => {
  switch (action.type) {
    case FirebaseTypes.FETCH_USERS:
      return action.payload;

    default:
      return state;
  }
};
