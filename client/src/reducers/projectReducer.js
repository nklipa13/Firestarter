import {
  GET_PROJECT_REQUEST,
  GET_PROJECT_SUCCESS,
  GET_PROJECT_FAILURE,
} from '../actionTypes/projectActionTypes';

const INITIAL_STATE = {
  gettingProject: false,
  gettingProjectError: '',

  data: {},
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_PROJECT_REQUEST:
      return { ...state, gettingProject: true, gettingProjectError: '' };

    case GET_PROJECT_SUCCESS:
      return {
        ...state,
        gettingProject: false,
        gettingProjectError: '',
        data: payload,
      };

    case GET_PROJECT_FAILURE:
      return {
        ...state,
        gettingProject: false,
        gettingProjectError: payload,
      };

    default:
      return state;
  }
};
