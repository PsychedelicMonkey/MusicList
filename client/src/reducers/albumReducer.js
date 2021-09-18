import { ALBUM_ERROR, ALBUM_LOADED, ALBUM_LOADING, } from '../actions/types';

const initialState = {
  album: null,
  isLoading: false,
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ALBUM_LOADING:
      return {
        ...state,
        isLoading: true,
      }
    case ALBUM_LOADED:
      return {
        ...state,
        album: payload,
        isLoading: false,
      }
    case ALBUM_ERROR:
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state;
  }
}
