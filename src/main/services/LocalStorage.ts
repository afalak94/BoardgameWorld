import { Component } from 'react';

import { Boardgame } from '../../modules/Boardgames';

interface LocalStorageItem {
  quantity: number;
  data: Boardgame;
}

export interface LocalStorageInterface {
  addToLocalStorage(data: Boardgame): void;
  removeFromLocalStorage(key: string): string;
  increaseLocalStorageQuantity(key: string): string;
  decreaseLocalStorageQuantity(key: string): string;
}

export class LocalStorageService extends Component {
  addToLocalStorage = (data: Boardgame) => {
    // function that adds item to localStorage
    let exists = false;
    const oldStorage: any = JSON.parse(localStorage.getItem('cart') as string);
    // check if item alredy exists in localStorage
    if (oldStorage) {
      oldStorage.forEach((item: LocalStorageItem) => {
        if (item.data.key === data.key) {
          // item exists, increment quantity
          exists = true;
          item.quantity++;
          localStorage.setItem('cart', JSON.stringify(oldStorage));
        }
      });
    }

    // if item doesnt exists in localStorage, create it
    if (!exists) {
      const newStorage: LocalStorageItem[] = [];
      if (oldStorage) {
        newStorage.push(...oldStorage);
      }
      const item: LocalStorageItem = {
        quantity: 1,
        data: data
      };
      newStorage.push(item);
      localStorage.setItem('cart', JSON.stringify(newStorage));
    }
  };

  removeFromLocalStorage = (key: string) => {
    const oldStorage = JSON.parse(localStorage.getItem('cart') as string);
    oldStorage.splice(key, 1);
    localStorage.setItem('cart', JSON.stringify(oldStorage));
    return JSON.parse(localStorage.getItem('cart') as string);
  };

  increaseLocalStorageQuantity = (key: string) => {
    const storage = JSON.parse(localStorage.getItem('cart') as string);
    storage[key].quantity++;
    localStorage.setItem('cart', JSON.stringify(storage));
    return JSON.parse(localStorage.getItem('cart') as string);
  };

  decreaseLocalStorageQuantity = (key: string) => {
    const storage = JSON.parse(localStorage.getItem('cart') as string);
    storage[key].quantity--;
    if (storage[key].quantity === 0) {
      this.removeFromLocalStorage(key);
    } else {
      localStorage.setItem('cart', JSON.stringify(storage));
    }
    return JSON.parse(localStorage.getItem('cart') as string);
  };
}
