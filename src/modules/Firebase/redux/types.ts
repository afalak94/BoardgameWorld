import { User } from '../../Authentication';

export enum FirebaseTypes {
  FETCH_ITEMS = 'FETCH_ITEMS',
  FETCH_USERS = 'FETCH_USERS'
}

export interface FetchUsersAction {
  type: FirebaseTypes.FETCH_USERS;
  payload: User[];
}
