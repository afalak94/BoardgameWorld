import { createSelector } from 'reselect';
import _ from 'lodash';

const itemsSelector = state => state.boardgames[0]; //selects all boardgames
const searchTerm = state => state.searchTerm; //selects text from search bar
const categorySelector = state => state.selectedCategory; //selects chosen category
const price = state => state.price; //selects chosen price type from store

const nameSelector = createSelector(
  [itemsSelector, searchTerm],
  (games, term) => {
    if (!games) {
      return null;
    }
    return games.filter(game =>
      game.value.name.toUpperCase().match(term.toUpperCase())
    );
  }
);

const priceSelector = createSelector(
  [nameSelector, price],
  (games, price) => {
    if (!games) {
      return null;
    }
    if (!price) {
      return games;
    }
    let sorted = _.orderBy(games, 'value.price', [price]);
    return sorted;
  }
);

//main selector that combines name, price and search term selectors
export const mainSelector = state => {
  return createSelector(
    [priceSelector, categorySelector],
    (games, category) => {
      //console.log(category);
      if (!games) {
        return null;
      }
      if (!category) {
        return games;
      }
      return games.filter(game =>
        game.value.category.some(cat => cat === category)
      );
    }
  )(state);
};

//selector for sale games that are displayed on Home view
export const saleGamesSelector = createSelector(
  [itemsSelector],
  games => {
    if (!games) {
      return null;
    }
    return games.filter(game => game.value.onSale === true);
  }
);
