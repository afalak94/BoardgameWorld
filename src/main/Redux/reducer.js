const boardgamesReducer = (state = [], action) => {
  switch (action.type) {
    case 'STORE_GAMES':
      return [...state, action.payload];

    case 'UPDATE_STORE':
      let newState = state.slice();
      newState.splice(action.payload.key, 0, action.payload);
      console.log(action.payload);
      return newState;

    default:
      return state;
  }
};

export default boardgamesReducer;
