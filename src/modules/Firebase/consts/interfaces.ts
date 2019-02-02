import { Dispatch } from 'redux';

import { User } from '../../Authentication';
import { Boardgame } from '../../Boardgames';

export interface FirebaseDBTypes {
  saveDataFromDBToStore(branch: string, dispatch: Dispatch): void;
  addItemToUsersCart(newitem: Boardgame, user: User): void;
  removeItemFromUsersCart(removeitemId: string, user: User);
  fetchUsersItems(user: User, dispatch: Dispatch): void;
  increaseItemQuantity(itemId: string, user: User): void;
  decreaseItemQuantity(itemId: string, user: User): void;
  addCategory(name: string): void;
  deleteCategory(key: string): void;
  deleteItem(key: string): void;
}
