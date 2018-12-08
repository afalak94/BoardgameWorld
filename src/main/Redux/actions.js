//adding boardgames to store
export function addToStore(games) {
  return { type: 'STORE_GAMES', payload: games };
}
