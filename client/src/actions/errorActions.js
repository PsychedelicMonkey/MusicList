import { GET_ERROR, CLEAR_ERRORS } from './types';

export const getError = (msg, status, id) => dispatch => {
  dispatch({
    type: GET_ERROR,
    payload: {
      msg,
      status,
      id,
    }
  });
}

export const clearErrors = () => dispatch => {
  dispatch({
    type: CLEAR_ERRORS,
  });
}
