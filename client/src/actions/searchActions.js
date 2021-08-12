import {
  SEARCH_ALBUMS_ERROR,
  SEARCH_ALBUMS_SUCCESS,
  SEARCH_LOADING,
} from './types';
import { getError } from './errorActions';
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
    dispatch(getError(err.response.data.msg, err.response.status, 'SEARCH_ALBUMS_ERROR'));
    dispatch({
      type: SEARCH_ALBUMS_ERROR,
    });
  }
}
