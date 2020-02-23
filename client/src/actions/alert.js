import uuid from 'uuid';

import { SET_ALERT, REMOVE_ALERT } from './types';

export const setAlert = (msg, color, timeout = 5000) => dispatch => {
  const id = uuid.v4();
  const alert = { id, msg, color };
  dispatch({ type: SET_ALERT, payload: alert });
  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: alert }), timeout);
};
