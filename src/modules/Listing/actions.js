export const onCategoryClick = name => async dispatch => {
  dispatch({
    type: 'CATEGORY',
    payload: name
  });
};
