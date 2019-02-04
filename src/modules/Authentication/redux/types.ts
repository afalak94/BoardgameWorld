import { User } from '../../Authentication';

export interface AddUserAction {
  type: ActionTypes.STORE_USER;
  payload: User;
}

export enum ActionTypes {
  STORE_USER = 'STORE_USER'
}
