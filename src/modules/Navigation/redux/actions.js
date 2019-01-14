export function updateSearchTerm(term) {
  return {
    type: 'SEARCH_TERM',
    payload: term
  };
}
