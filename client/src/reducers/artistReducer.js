import { ARTIST_ERROR, ARTIST_LOADED, ARTIST_LOADING } from '../actions/types';

const initialState = {
  artist: null,
  isLoading: false,
}

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ARTIST_LOADING:
      return {
        ...state,
        isLoading: true,
      }
    case ARTIST_LOADED:
      return {
        ...state,
        artist: payload,
        isLoading: false,
      }
    case ARTIST_ERROR:
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state;
  }
}
