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
