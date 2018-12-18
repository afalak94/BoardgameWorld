const authReducer = (state = [], action) => {
  switch (action.type) {
    case 'STORE_USER':
      return [action.payload];

    default:
      return state;
  }
};

export default authReducer;
