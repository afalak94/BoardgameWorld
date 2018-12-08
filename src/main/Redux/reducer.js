const boardgamesReducer = (state = [], action) => {
  switch (action.type) {
    case 'STORE_GAMES':
      return [...state, action.payload];

    default:
      return state;
  }
};

export default boardgamesReducer;
