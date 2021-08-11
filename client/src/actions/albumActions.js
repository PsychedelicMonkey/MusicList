import { ALBUM_ERROR, ALBUM_LOADED, ALBUM_LOADING } from './types';
import axios from 'axios';

export const loadAlbum = id => async dispatch => {
  dispatch({ type: ALBUM_LOADING });

  try {
    const res = await axios.get(`/api/albums/master/${id}`);
    dispatch({
      type: ALBUM_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ALBUM_ERROR,
    });
  }
}
