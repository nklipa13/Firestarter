import {
  START_PROJECT_RESET,
} from '../actionTypes/startProjectActionTypes';

export const resetStartProjectForm = () => (dispatch) => { dispatch({ type: START_PROJECT_RESET }); };
