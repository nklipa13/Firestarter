import {
  START_PROJECT_REQUEST,
  START_PROJECT_SUCCESS,
  START_PROJECT_FAILURE,
  START_PROJECT_RESET,
} from '../actionTypes/startProjectActionTypes';

const INITIAL_STATE = {
  startingProject: false,
  startingProjectError: '',
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case START_PROJECT_REQUEST:
      return { ...state, startingProject: true, startingProjectError: '' };

    case START_PROJECT_SUCCESS:
      return {
        ...state,
        startingProject: false,
        startingProjectError: '',
        data: payload,
      };

    case START_PROJECT_FAILURE:
      return {
        ...state,
        startingProject: false,
        startingProjectError: payload,
      };

    case START_PROJECT_RESET:
      return {
        ...state,
        startingProject: false,
        startingProjectError: '',
      };

    default:
      return state;
  }
};
