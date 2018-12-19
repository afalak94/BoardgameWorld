import { createSelector } from 'reselect';

const allBoardgames = state => state.boardgames[state.boardgames.length - 1];

const categorySelector = createSelector(
  allBoardgames,
  data => data.filter(d => d.value.category.some(cat => cat === 'Strategy'))
);

export { allBoardgames, categorySelector };
