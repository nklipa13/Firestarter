import {
  GET_PROJECT_REQUEST,
  GET_PROJECT_SUCCESS,
  GET_PROJECT_FAILURE,

  PROJECT_ADD_QUESTION_REQUEST,
  PROJECT_ADD_QUESTION_SUCCESS,
  PROJECT_ADD_QUESTION_FAILURE,
  PROJECT_ADD_QUESTION_RESET,

  PROJECT_ADD_CHANGE_REQUEST,
  PROJECT_ADD_CHANGE_SUCCESS,
  PROJECT_ADD_CHANGE_FAILURE,
  PROJECT_ADD_CHANGE_RESET,

  PROJECT_WITHDRAW_REQUEST,
  PROJECT_WITHDRAW_SUCCESS,
  PROJECT_WITHDRAW_FAILURE,
  PROJECT_WITHDRAW_RESET,

  PROJECT_FUND_REQUEST,
  PROJECT_FUND_SUCCESS,
  PROJECT_FUND_FAILURE,
  PROJECT_FUND_RESET,
} from '../actionTypes/projectActionTypes';

const INITIAL_STATE = {
  gettingProject: false,
  gettingProjectError: '',

  addingQuestion: false,
  addingQuestionError: '',

  addingChange: false,
  addingChangeError: '',

  withdrawing: false,
  withdrawingError: '',

  funding: false,
  fundingError: '',

  data: {},
};

const formatNewProject = newProject => ({
  ...newProject,
  faq: [...newProject.faq],
  logs: [...newProject.logs],
});

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

    case PROJECT_ADD_QUESTION_REQUEST:
      return { ...state, addingQuestion: true, addingQuestionError: '' };

    case PROJECT_ADD_QUESTION_SUCCESS:
      return {
        ...state,
        addingQuestion: false,
        addingQuestionError: '',
        data: formatNewProject(payload),
      };

    case PROJECT_ADD_QUESTION_FAILURE:
      return {
        ...state,
        addingQuestion: false,
        addingQuestionError: payload,
      };

    case PROJECT_ADD_QUESTION_RESET:
      return {
        ...state,
        addingQuestion: false,
        addingQuestionError: '',
      };

    case PROJECT_ADD_CHANGE_REQUEST:
      return { ...state, addingChange: true, addingChangeError: '' };

    case PROJECT_ADD_CHANGE_SUCCESS:
      return {
        ...state,
        addingChange: false,
        addingChangeError: '',
        data: formatNewProject(payload),
      };

    case PROJECT_ADD_CHANGE_FAILURE:
      return {
        ...state,
        addingChange: false,
        addingChangeError: payload,
      };

    case PROJECT_ADD_CHANGE_RESET:
      return {
        ...state,
        addingChange: false,
        addingChangeError: '',
      };

    case PROJECT_WITHDRAW_REQUEST:
      return { ...state, withdrawing: true, withdrawingError: '' };

    case PROJECT_WITHDRAW_SUCCESS:
      return {
        ...state,
        withdrawing: false,
        withdrawingError: '',
        data: formatNewProject(payload),
      };

    case PROJECT_WITHDRAW_FAILURE:
      return {
        ...state,
        withdrawing: false,
        withdrawingError: payload,
      };

    case PROJECT_WITHDRAW_RESET:
      return {
        ...state,
        withdrawing: false,
        withdrawingError: '',
      };

    case PROJECT_FUND_REQUEST:
      return { ...state, funding: true, fundingError: '' };

    case PROJECT_FUND_SUCCESS:
      return {
        ...state,
        funding: false,
        fundingError: '',
        data: formatNewProject(payload),
      };

    case PROJECT_FUND_FAILURE:
      return {
        ...state,
        funding: false,
        fundingError: payload,
      };

    case PROJECT_FUND_RESET:
      return {
        ...state,
        funding: false,
        fundingError: '',
      };

    default:
      return state;
  }
};
