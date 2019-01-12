export const onCategoryClick = name => async dispatch => {
  dispatch({
    type: 'CATEGORY',
    payload: name
  });
};

export const onPriceClick = price => async dispatch => {
  if (price === 'ASC') {
    dispatch({
      type: 'PRICE_ASC',
      payload: price
    });
  } else if (price === 'DESC') {
    dispatch({
      type: 'PRICE_DESC',
      payload: price
    });
  }
};

//adding boardgames to store
export function addToStore(games) {
  return { type: 'STORE_GAMES', payload: games };
}

export function updateStore(game) {
  return { type: 'UPDATE_STORE', payload: game };
}

export function addCategories(categories) {
  return { type: 'STORE_CATEGORIES', payload: categories };
}
