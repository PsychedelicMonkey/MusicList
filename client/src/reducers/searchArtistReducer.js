import {
  SEARCH_ARTISTS_ERROR,
  SEARCH_ARTISTS_LOADING,
  SEARCH_ARTISTS_SUCCESS,
} from '../actions/types';

const initialState = {
  pagination: {},
  results: [{
    id: null,
    title: null,
    thumb: null,
    cover_image: null,
  }],
  isLoading: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SEARCH_ARTISTS_LOADING:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_ARTISTS_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
      }
    case SEARCH_ARTISTS_ERROR:
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state;
  }
}