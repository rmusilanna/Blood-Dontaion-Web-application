import { combineReducers } from 'redux';
import auth from './auth';
import alert from './alert';
import blood from './blood';

export default combineReducers({
  auth,
  alert,
  blood
});
