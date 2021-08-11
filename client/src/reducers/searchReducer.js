import {
  SEARCH_ALBUMS_ERROR,
  SEARCH_ALBUMS_SUCCESS,
  SEARCH_LOADING,
} from '../actions/types';

const initialState = {
  pagination: null,
  results: null,
  isLoading: false,
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SEARCH_LOADING:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_ALBUMS_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
      }
    case SEARCH_ALBUMS_ERROR:
      return {
        ...state,
        pagination: null,
        results: null,
        isLoading: false,
      }
    default:
      return state;
  }
}
