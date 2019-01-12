import _ from 'lodash';

export const boardgamesReducer = (state = [], action) => {
  switch (action.type) {
    case 'STORE_GAMES':
      return [action.payload];

    case 'UPDATE_STORE':
      let newState = state.slice();
      newState.splice(action.payload.key, 0, action.payload);
      console.log(action.payload);
      return newState;

    case 'CATEGORY':
      //filter by category
      return [
        ...state,
        state[0].filter(d =>
          d.value.category.some(cat => cat === action.payload)
        )
      ];

    case 'PRICE_ASC':
      //sort items by price ascending
      let sortedAsc = state[state.length - 1];
      sortedAsc = _.orderBy(sortedAsc, 'value.price', ['asc']);
      return [...state, sortedAsc];

    case 'PRICE_DESC':
      //sort items by price descending
      let sortedDesc = state[state.length - 1];
      sortedDesc = _.orderBy(sortedDesc, 'value.price', ['desc']);
      return [...state, sortedDesc];

    case 'NAME':
      //filter by name
      let letters = action.payload.toUpperCase();
      if (letters === '') {
        return [state[0]];
      }
      let filteredByName = state[0].filter(d =>
        d.value.name.toUpperCase().match(letters)
      );
      return [...state, filteredByName];

    default:
      return state;
  }
};

export const categoriesReducer = (state = [], action) => {
  switch (action.type) {
    case 'STORE_CATEGORIES':
      return action.payload;

    default:
      return state;
  }
};
