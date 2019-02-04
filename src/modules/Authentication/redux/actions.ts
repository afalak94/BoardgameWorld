import { User } from '../../Authentication';

import { ActionTypes, AddUserAction } from './index';

export function addUser(user: User): AddUserAction {
  return {
    type: ActionTypes.STORE_USER,
    payload: user
  };
}
