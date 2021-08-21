import {
  SEARCH_ALBUMS_ERROR,
  SEARCH_ALBUMS_SUCCESS,
  SEARCH_LOADING,
  SEARCH_ARTISTS_ERROR,
  SEARCH_ARTISTS_LOADING,
  SEARCH_ARTISTS_SUCCESS,
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

export const searchArtists = query => async dispatch => {
  dispatch({ type: SEARCH_ARTISTS_LOADING });
  
  try {
    const res = await axios.post('/api/artists/search', query, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    dispatch({
      type: SEARCH_ARTISTS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch(getError(err.response.data.msg, err.response.status, 'SEARCH_ARTISTS_ERROR'));
    dispatch({
      type: SEARCH_ARTISTS_ERROR,
    });
  }
}
