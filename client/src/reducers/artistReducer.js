import { ARTIST_ERROR, ARTIST_LOADED, ARTIST_LOADING } from '../actions/types';

const initialState = {
  isLoading: false,

  id: '',
  images: [{
    type: '',
    height: '',
    width: '',
    uri: '',
  }],
  members: [{
    active: '',
    id: '',
    name: '',
  }],
  name: '',
  profile: '',
  urls: [],
}

export default function(state = initialState, action) {
  switch (action.type) {
    case ARTIST_LOADING:
      return {
        ...state,
        isLoading: true,
      }
    case ARTIST_LOADED:
      return {
        ...state,
        ...action.payload,
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
