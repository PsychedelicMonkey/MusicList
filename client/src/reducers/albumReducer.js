import { ALBUM_ERROR, ALBUM_LOADED, ALBUM_LOADING, } from '../actions/types';

const initialState = {
  isLoading: false,

  artistID: '',
  artists: [{
    name: '',
    id: '',
  }],
  genres: [],
  images: [{
    uri: '',
    width: '',
    height: '',
  }],
  styles: [],
  tracklist: [{
    position: '',
    title: '',
    duration: '',
    type_: '',
  }],
  videos: [{
    uri: '',
    description: '',
    duration: '',
    title: '',
  }]
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ALBUM_LOADING:
      return {
        ...state,
        isLoading: true,
      }
    case ALBUM_LOADED:
      return {
        ...state,
        ...action.payload,
        ...action.payload.artists,
        artistID: action.payload.artists[0].id,
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
