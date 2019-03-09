import { START_PROJECT_RESET } from '../actionTypes/startProjectActionTypes';

const INITIAL_STATE = {
  startingProject: false,
  startingProjectError: '',
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
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
