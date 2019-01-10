import { Component } from 'react';

class LocalStorageService extends Component {
  addToLocalStorage = data => {
    //function that adds item to localStorage
    let exists = false;
    const oldStorage = JSON.parse(localStorage.getItem('cart'));
    //check if item alredy exists in localStorage
    oldStorage.forEach(item => {
      if (item.data.key === data.key) {
        //item exists, increment quantity
        exists = true;
        item.quantity++;
        localStorage.setItem('cart', JSON.stringify(oldStorage));
      }
    });
    //if item doesnt exists in localStorage, create it
    if (!exists) {
      const newStorage = [];
      if (oldStorage !== null) {
        newStorage.push(...oldStorage);
      }
      let item = {
        quantity: 1,
        data: data
      };
      newStorage.push(item);
      localStorage.setItem('cart', JSON.stringify(newStorage));
    }
  };

  removeFromLocalStorage = key => {
    const oldStorage = JSON.parse(localStorage.getItem('cart'));
    oldStorage.splice(key, 1);
    localStorage.setItem('cart', JSON.stringify(oldStorage));
    return JSON.parse(localStorage.getItem('cart'));
  };

  increaseLocalStorageQuantity = key => {
    const storage = JSON.parse(localStorage.getItem('cart'));
    storage[key].quantity++;
    localStorage.setItem('cart', JSON.stringify(storage));
    return JSON.parse(localStorage.getItem('cart'));
  };

  decreaseLocalStorageQuantity = key => {
    const storage = JSON.parse(localStorage.getItem('cart'));
    storage[key].quantity--;
    if (storage[key].quantity === 0) {
      this.removeFromLocalStorage(key);
    } else {
      localStorage.setItem('cart', JSON.stringify(storage));
    }
    return JSON.parse(localStorage.getItem('cart'));
  };
}

//exporting instance of a class LocalStorageService
export const LS = new LocalStorageService();
