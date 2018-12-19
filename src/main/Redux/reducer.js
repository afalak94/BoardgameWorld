const boardgamesReducer = (state = [], action) => {
  switch (action.type) {
    case 'STORE_GAMES':
      return [action.payload];

    case 'UPDATE_STORE':
      let newState = state.slice();
      newState.splice(action.payload.key, 0, action.payload);
      console.log(action.payload);
      return newState;

    case 'CATEGORY':
      return [
        ...state,
        state[0].filter(d =>
          d.value.category.some(cat => cat === action.payload)
        )
      ];

    default:
      return state;
  }
};

export default boardgamesReducer;
