import { Dispatch } from 'redux';

import { User } from '../../Authentication';
import { Boardgame } from '../../Boardgames';

export interface FirebaseDBTypes {
  saveDataFromDBToStore(branch: string, dispatch: Dispatch): void;
  addItemToUsersCart(newitem: Boardgame, user: User): void;
  removeItemFromUsersCart(removeitemId: string, user: string): void;
  fetchUsersItems(user: string, dispatch: Dispatch): void;
  increaseItemQuantity(itemId: string, user: string): void;
  decreaseItemQuantity(itemId: string, user: string): void;
  addCategory(name: string): void;
  deleteCategory(key: string): void;
  deleteItem(key: string): void;
  addNewItem(...args: Array<string | boolean | undefined | string[]>): void;
}

export interface FirebaseAuthTypes {
  userListener(dispatch: Dispatch, history?: {}): any;
  fetchUserCart(dispatch: Dispatch<any>): any;
  fetchAllUsers(dispatch: Dispatch): void;
  deleteUser(userUid: string, dispatch: Dispatch<any>): void;
  register(email: string, password: string, history: {}): void;
  loginUser(email: string, password: string): void;
  logoutUser(dispatch: Dispatch<any>, history: {}): void;
  resetPW(email: string): void;
}
