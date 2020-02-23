import axios from 'axios';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  REQUEST_FAIL,
  LOGOUT
} from './types';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';

export const loadUser = () => async dispatch => {
  if (localStorage.token) setAuthToken(localStorage.token);

  try {
    const res = await axios.get('/api/auth');

    dispatch({ type: USER_LOADED, payload: res.data });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

export const register = ({
  name,
  email,
  password,
  bloodgrp,
  phone,
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
    name,
    email,
    password,
    bloodgrp,
    city,
    phone,
    state,
    country
  };
  try {
    const res = await axios.post('/api/users', body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (err) {
    const { errors } = err.response.data;

    if (errors) errors.forEach(error => dispatch(setAlert(error.msg, 'red')));

    dispatch({ type: REGISTER_FAIL });
    console.log(err);
  }
};

export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = { email, password };
  try {
    const res = await axios.post('/api/auth', body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (err) {
    const { errors } = err.response.data;

    if (errors) errors.forEach(error => dispatch(setAlert(error.msg, 'red')));

    dispatch({ type: LOGIN_FAIL });
    console.log(err);
  }
};

export const logout = history => dispatch => {
  dispatch({ type: LOGOUT });
  dispatch(setAlert(`You're successfully logged out`, 'green'));
  dispatch({ type: REQUEST_FAIL });
  history.push('/login');
};

export const changePassword = (current, newp) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const { data } = await axios.post(
      '/api/auth/edit',
      { current, newp },
      config
    );
    dispatch(setAlert(data.msg, 'green'));
  } catch (err) {
    const { errors } = err.response.data;

    if (errors) errors.forEach(error => dispatch(setAlert(error.msg, 'red')));

    console.log(err);
  }
};

export const changePhone = phone => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const { data } = await axios.put('/api/auth/edit', { phone }, config);
    dispatch(setAlert(data.msg, 'green'));
  } catch (err) {
    const { errors } = err.response.data;

    if (errors) errors.forEach(error => dispatch(setAlert(error.msg, 'red')));

    console.log(err);
  }
};

export const authError = () => ({ type: AUTH_ERROR });
