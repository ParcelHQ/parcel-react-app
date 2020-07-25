import { combineReducers } from 'redux';
import customizer from './customizer/';
import auth from './auth/';
import navbar from './navbar';

const rootReducer = combineReducers({
  customizer: customizer,
  auth: auth,
  navbar: navbar,
});

export default rootReducer;
