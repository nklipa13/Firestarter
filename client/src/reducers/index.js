import { combineReducers } from 'redux';
import modalReducer from './modalReducer';
import generalReducer from './generalReducer';
import projectReducer from './projectReducer';

export default combineReducers({
  modal: modalReducer,
  general: generalReducer,
  project: projectReducer,
});
