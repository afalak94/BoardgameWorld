import { createSelector } from 'reselect';

const itemsSelector = state => state.boardgames[0];
const searchTerm = state => state.searchTerm;

export const nameSelector = createSelector(
  [itemsSelector, searchTerm],
  (games, term) => {
    //console.log('Games: ' + games);
    console.log('term: ' + term);
    if (!games) {
      return null;
    }
    return games.filter(game =>
      game.value.name.toUpperCase().match(term.toUpperCase())
    );
  }
);
