import { FirebaseDB, FirebaseAuth } from '../index';

const FbDB = new FirebaseDB();
const FbAuth = new FirebaseAuth();

export const fetchitems = user => async dispatch => {
  FbDB.fetchUsersItems(user, dispatch);
};

export const fetchUsers = () => async dispatch => {
  FbAuth.fetchAllUsers(dispatch);
};

export const deleteUser = userUid => async dispatch => {
  FbAuth.deleteUser(userUid, dispatch);
};
