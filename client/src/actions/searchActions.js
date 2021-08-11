import {
  SEARCH_ALBUMS_ERROR,
  SEARCH_ALBUMS_SUCCESS,
  SEARCH_LOADING,
} from './types';
import axios from 'axios';

export const searchAlbums = query => async dispatch => {
  dispatch({ type: SEARCH_LOADING });

  try {
    const res = await axios.post('/api/albums/search', query, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    dispatch({
      type: SEARCH_ALBUMS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: SEARCH_ALBUMS_ERROR,
    });
  }
}
