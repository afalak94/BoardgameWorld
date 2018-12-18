export const addUser = user => async dispatch => {
  dispatch({
    type: 'STORE_USER',
    payload: user
  });
};
