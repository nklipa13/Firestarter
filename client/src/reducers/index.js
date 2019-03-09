import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import modalReducer from './modalReducer';
import generalReducer from './generalReducer';
import projectReducer from './projectReducer';
import startProjectReducer from './startProjectReducer';
import accountReducer from './accountReducer';
import notificationReducer from './notificationReducer';

export default combineReducers({
  form: formReducer,
  modal: modalReducer,
  general: generalReducer,
  project: projectReducer,
  startProject: startProjectReducer,
  account: accountReducer,
  notification: notificationReducer,
});
