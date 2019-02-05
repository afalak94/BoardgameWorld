import { Boardgame } from '../index';

interface Props {
  match: { params: { id: string } };
  boardgames: Boardgame[];
}

export const locateGameByKey = (props: Props) => {
  const { match, boardgames } = props;
  for (const game of boardgames) {
    if (game.key === match.params.id) {
      return game;
    }
  }
  // if there is no matching game key yet, return null that will render "Loading..."
  return null;
};
