const cartReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD':
      return [...state, action.payload];

    case 'REMOVE':
      const firstMatchindex = state.indexOf(action.payload);
      return state.filter((item, index) => index !== firstMatchindex);

    default:
      return state;
  }
};

export default cartReducer;
