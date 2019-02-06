import { Dispatch } from 'redux';

import { FirebaseDB, FirebaseDBTypes } from '../index';

const FbDB = new FirebaseDB({} as FirebaseDBTypes);

export const fetchitems = (userUid: string) => async (dispatch: Dispatch) => {
  FbDB.fetchUsersItems(userUid, dispatch);
};
