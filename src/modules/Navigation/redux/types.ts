export enum NavigationTypes {
  SEARCH_TERM = 'SEARCH_TERM'
}

export interface SearchTermAction {
  type: NavigationTypes.SEARCH_TERM;
  payload: string;
}
