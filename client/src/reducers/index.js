import { combineReducers } from 'redux';
import modalReducer from './modalReducer';
import generalReducer from './generalReducer';

export default combineReducers({
  modal: modalReducer,
  general: generalReducer,
});
