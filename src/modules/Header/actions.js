export const onNameFilter = name => async dispatch => {
  dispatch({
    type: 'NAME',
    payload: name
  });
};
