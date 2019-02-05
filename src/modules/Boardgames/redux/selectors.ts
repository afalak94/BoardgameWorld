import { createSelector } from 'reselect';
import _ from 'lodash';

import { ReduxState } from '../../../main';
import { Boardgame } from '../index';

const itemsSelector = (state: ReduxState) => state.boardgames[0]; // selects all boardgames
const searchTerm = (state: ReduxState) => state.searchTerm; // selects text from search bar
const categorySelector = (state: ReduxState) => state.selectedCategory; // selects chosen category
const priceOrder = (state: ReduxState) => state.price as 'asc' | 'desc'; // selects chosen price type from store

const nameSelector = createSelector(
  [itemsSelector, searchTerm],
  (games, term) => {
    if (!games) {
      return null;
    }
    return (games as any).filter((game: Boardgame) =>
      game.value.name.toUpperCase().match(term.toUpperCase())
    );
  }
);

const priceSelector = createSelector(
  [nameSelector, priceOrder],
  (games, price) => {
    if (!games) {
      return null;
    }
    if (!price) {
      return games;
    }
    const sorted: Boardgame | Boardgame[] = _.orderBy(games, 'value.price', [
      price
    ]);
    return sorted;
  }
);

// main selector that combines name, price and search term selectors
export const mainSelector = createSelector(
  [priceSelector, categorySelector],
  (games, category) => {
    if (!games) {
      return null;
    }
    if (!category) {
      return games;
    }
    return games.filter((game: Boardgame) =>
      game.value.category.some(cat => cat === category)
    );
  }
);

// selector for sale games that are displayed on Home view
export const saleGamesSelector = createSelector(
  [itemsSelector],
  games => {
    if (!games) {
      return null;
    }
    return (games as any).filter(
      (game: Boardgame) => game.value.onSale === true
    );
  }
);
