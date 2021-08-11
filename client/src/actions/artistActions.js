import { ARTIST_ERROR, ARTIST_LOADED, ARTIST_LOADING } from './types';
import axios from 'axios';

export const loadArtist = id => async dispatch => {
  dispatch({ type: ARTIST_LOADING });

  try {
    const res = await axios.get(`/api/artists/${id}`);
    dispatch({
      type: ARTIST_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ARTIST_ERROR,
    });
  }
}