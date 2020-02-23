import {
  REQUEST_SUCCESS,
  REQUEST_FAIL,
  SEARCH_SUCCESS,
  SEARCH_FAIL,
  TRACK_SUCCESS,
  TRACK_FAIL
} from '../actions/types';

const initialState = {
  donors: [],
  requests: [],
  request: null,
  showForm: true
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case TRACK_SUCCESS:
      return { ...state, ...payload };
    case REQUEST_SUCCESS:
    case SEARCH_SUCCESS:
      return { ...state, ...payload, showForm: false };
    case REQUEST_FAIL:
    case SEARCH_FAIL:
    case TRACK_FAIL:
      return { donors: [], requests: [], request: null, showForm: true };

    default:
      return state;
  }
};
