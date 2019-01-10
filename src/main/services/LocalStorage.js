import React, { Component } from 'react';

export class LocalStorageService extends Component {
  constructor(props) {
    super(props);
    this.removeFromLocalStorage = this.removeFromLocalStorage.bind(this);
    this.increaseLocalStorageQuantity = this.increaseLocalStorageQuantity.bind(
      this
    );
    this.decreaseLocalStorageQuantity = this.decreaseLocalStorageQuantity.bind(
      this
    );
  }

  removeFromLocalStorage = key => {
    const oldStorage = JSON.parse(localStorage.getItem('cart'));
    oldStorage.splice(key, 1);
    localStorage.setItem('cart', JSON.stringify(oldStorage));
    this.setState({ localCart: JSON.parse(localStorage.getItem('cart')) });
  };

  increaseLocalStorageQuantity = key => {
    const storage = JSON.parse(localStorage.getItem('cart'));
    storage[key].quantity++;
    localStorage.setItem('cart', JSON.stringify(storage));
    this.setState({ localCart: JSON.parse(localStorage.getItem('cart')) });
  };

  decreaseLocalStorageQuantity(key) {
    const storage = JSON.parse(localStorage.getItem('cart'));
    storage[key].quantity--;
    if (storage[key].quantity === 0) {
      this.removeFromLocalStorage(key);
    } else {
      localStorage.setItem('cart', JSON.stringify(storage));
    }
    this.setState({ localCart: JSON.parse(localStorage.getItem('cart')) });
  }
}
