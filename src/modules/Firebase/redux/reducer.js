import { FirebaseTypes } from './types';

const initialUsers = {
  uid: '6qXBbupnZsQkpp5vj5ZmteGF1qs1',
  email: 'admin@gmail.com',
  emailVerified: false,
  disabled: false,
  metadata: {
    lastSignInTime: 'Thu, 17 Jan 2019 19:11:36 GMT',
    creationTime: 'Mon, 17 Dec 2018 23:36:28 GMT'
  }
};

export const usersReducer = (state = [initialUsers], action) => {
  switch (action.type) {
    case FirebaseTypes.FETCH_USERS:
      return action.payload;

    default:
      return state;
  }
};
