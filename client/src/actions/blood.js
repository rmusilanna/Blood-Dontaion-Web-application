import {
  REQUEST_FAIL,
  REQUEST_SUCCESS,
  SEARCH_FAIL,
  SEARCH_SUCCESS,
  TRACK_FAIL,
  TRACK_SUCCESS
} from './types';
import { setAlert } from './alert';
import axios from 'axios';

export const getActiveRequests = () => async dispatch => {
  try {
    const res = await axios.get('/api/blood/requests');

    dispatch({ type: TRACK_SUCCESS, payload: res.data });
  } catch (err) {
    console.log(err);

    dispatch({ type: TRACK_FAIL });
  }
};

export const getPrevDonations = () => async dispatch => {
  try {
    const res = await axios.get('/api/blood/prev/requests');

    dispatch({ type: TRACK_SUCCESS, payload: res.data });
  } catch (err) {
    console.log(err);

    dispatch({ type: TRACK_FAIL });
  }
};

export const requestBlood = ({
  name,
  email,
  phone,
  bloodgrp,
  city,
  state,
  country,
  reminder
}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = {
    name,
    email,
    phone,
    bloodgrp,
    city,
    state,
    country,
    reminder
  };
  try {
    const res = await axios.post('/api/blood/request', body, config);
    dispatch({
      type: REQUEST_SUCCESS,
      payload: res.data
    });
    dispatch(setAlert('Request Successful', 'green'));
  } catch (err) {
    const { errors } = err.response.data;

    if (errors) errors.forEach(error => dispatch(setAlert(error.msg, 'red')));

    dispatch({ type: REQUEST_FAIL });
    console.log(err);
  }
};

export const searchBlood = ({
  bloodgrp,
  city,
  state,
  country
}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = {
    bloodgrp,
    city,
    state,
    country
  };
  try {
    const res = await axios.post('/api/blood/search', body, config);
    dispatch({
      type: SEARCH_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    const { errors } = err.response.data;

    if (errors) errors.forEach(error => dispatch(setAlert(error.msg, 'red')));

    dispatch({ type: SEARCH_FAIL });
    console.log(err);
  }
};

// Track

export const trackRequest = id => async dispatch => {
  try {
    const res = await axios.get(`/api/blood/track/${id}`);
    dispatch({ type: TRACK_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: TRACK_FAIL });
    console.log(err);
  }
};

export const donate = (id, history) => async dispatch => {
  try {
    const res = await axios.put(`/api/blood/request/${id}`);
    dispatch({ type: TRACK_SUCCESS, payload: res.data });
    dispatch(setAlert('Donation Successful', 'green'));

    history.push('/dashboard');
  } catch (err) {
    dispatch({ type: TRACK_FAIL });
    console.log(err);
  }
};
export const cancelDonation = (id, history) => async dispatch => {
  try {
    const res = await axios.delete(`/api/blood/request/${id}`);
    dispatch({ type: TRACK_SUCCESS, payload: res.data });
    dispatch(setAlert('Donation Cancelled', 'green'));

    history.push('/dashboard');
  } catch (err) {
    dispatch({ type: TRACK_FAIL });
    console.log(err);
  }
};

export const changeShowForm = () => ({ type: REQUEST_FAIL });
export const resetTrack = () => ({ type: TRACK_FAIL });
