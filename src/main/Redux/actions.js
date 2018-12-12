//adding boardgames to store
export function addToStore(games) {
  return { type: 'STORE_GAMES', payload: games };
}

export function updateStore(game) {
  return { type: 'UPDATE_STORE', payload: game };
}
