import { User } from '../../Authentication';

import { FirebaseTypes, FetchUsersAction } from './index';

export function fetchUsers(users: User[]): FetchUsersAction {
  return {
    type: FirebaseTypes.FETCH_USERS,
    payload: users
  };
}
