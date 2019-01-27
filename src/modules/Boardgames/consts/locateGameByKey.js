export const locateGameByKey = props => {
  const { match, boardgames } = props;
  for (let game of boardgames) {
    if (game.key === match.params.id) {
      return game;
    }
  }
  //if there is no matching game key yet, return null that will render "Loading..."
  return null;
};
