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
  }]
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SEARCH_ARTISTS_SUCCESS:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state;
  }
}