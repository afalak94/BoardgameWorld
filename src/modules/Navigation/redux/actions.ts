import { NavigationTypes, SearchTermAction } from './index';

export function updateSearchTerm(term: string): SearchTermAction {
  return {
    type: NavigationTypes.SEARCH_TERM,
    payload: term
  };
}
