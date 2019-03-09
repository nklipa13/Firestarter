import {
  GET_PROJECT_REQUEST,
  GET_PROJECT_SUCCESS,
  GET_PROJECT_FAILURE,

  GET_ALL_PROJECTS_REQUEST,
  GET_ALL_PROJECTS_SUCCESS,
  GET_ALL_PROJECTS_FAILURE,

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
import { wait } from '../services/utils';
import {
  compoundFundApiCall,
  vestFundApiCall,
  getAllProjectsApiCall,
  getProjectApiCall,
  oneTimeFundApiCall,
} from '../services/api';
import { sendTx } from './notificationsActions';
import {
  oneTimeFundContractCall,
  vestFundContractCall,
  compoundFundContractCall,
} from '../services/ethereumService';

export const MOCK_PROJECTS = [
  {
    id: 0,
    name: 'Community-driven Dapps on the Ethereum blockchain',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nulla ante, pretium vel neque.',
    supporters: 42,
    ethRaised: 69,
    daysPassed: 21,
    cover: 'https://bit.ly/2SUf41r',
    creator: {
      address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
      avatar: 'https://bit.ly/2EKavSx',
      about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nulla ante, pretium vel neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nulla ante, pretium vel neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nulla ante, pretium vel neque.' // eslint-disable-line
    },
    about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nulla ante, pretium vel neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nulla ante, pretium vel neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nulla ante, pretium vel neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nulla ante, pretium vel neque.:Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nulla ante, pretium vel neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nulla ante, pretium vel neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nulla ante, pretium vel neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nulla ante, pretium vel neque. Praesent nulla ante, pretium vel neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nulla ante, pretium vel.', // eslint-disable-line
    ethWithdraw: 69,
    daiWithdraw: 10,
    finance: {
      oneTimePayments: {
        eth: 31,
        usd: 3100,
        dai: 120,
        mln: 250,
      },
      funded: {
        earned: 4,
        locked: 72,
      },
      compound: {
        earned: 20,
        locked: 10000,
      },
      total: 69,
      withdrawHistory: [
        {
          date: '12 September 2019',
          daiAmount: 0,
          ethAmount: 20,
          purpose: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nulla ante, pretium vel neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nulla ante, pretium vel neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nulla ante, pretium vel neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nulla ante, pretium vel neque.', // eslint-disable-line
        },
        {
          date: '13 September 2019',
          daiAmount: 10,
          ethAmount: 1,
          purpose: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nulla ante, pretium vel neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nulla ante, pretium vel neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nulla ante, pretium vel neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nulla ante, pretium vel neque.', // eslint-disable-line
        },
      ],
    },
    faqs: [
      {
        question: 'How about answering some questions now?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nulla ante, pretium vel neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nulla ante, pretium vel neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nulla ante, pretium vel neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nulla ante, pretium vel neque.',  // eslint-disable-line
      },
      {
        question: 'How about some more?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nulla ante, pretium vel neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nulla ante, pretium vel neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nulla ante, pretium vel neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nulla ante, pretium vel neque.',  // eslint-disable-line
      },
    ],
    changelog: [
      {
        version: 'v2.0.0-alpha',
        date: '20 October 2019',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Praesent nulla ante, pretium vel neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit.', // eslint-disable-line
        changes: [
          ' Lorem ipsum dolor sit amet, consectetur.', 'Dolor sit amet, consectetur.',
          'Consectetur ipsum consectetur sit amet, mipsuminsectetur.', 'Mipsum dolor sit amet, consectetur.',
        ],
      },
      {
        version: 'v1.9.4',
        date: '17 September 2019',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Praesent nulla ante, pretium vel neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit.', // eslint-disable-line
        changes: [
          ' Lorem ipsum dolor sit amet, consectetur.', 'Dolor sit amet, consectetur.',
          'Consectetur ipsum consectetur sit amet, mipsuminsectetur.', 'Mipsum dolor sit amet, consectetur.',
        ],
      },
    ],
  },
];

/**
 * Gets the project data for the passed down id
 *
 * @param id {String}
 *
 * @return {Function}
 */
export const getProject = id => async (dispatch) => {
  dispatch({ type: GET_PROJECT_REQUEST });

  try {
    const payload = await getProjectApiCall(id);

    if (payload.length === 0) throw new Error('Project not found');

    dispatch({ type: GET_PROJECT_SUCCESS, payload: payload[0] });
  } catch (err) {
    dispatch({ type: GET_PROJECT_FAILURE, payload: err.message });
  }
};

/**
 * Gets all projects
 *
 * @return {Function}
 */
export const getAllProjects = () => async (dispatch) => {
  dispatch({ type: GET_ALL_PROJECTS_REQUEST });

  try {
    const payload = await getAllProjectsApiCall();

    if (payload.length === 0) throw new Error('Projects not found');

    dispatch({ type: GET_ALL_PROJECTS_SUCCESS, payload });
  } catch (err) {
    dispatch({ type: GET_ALL_PROJECTS_FAILURE, payload: err.message });
  }
};

/**
 * Adds a new question-answer item to the faqs project array
 *
 * @param formData {Object}
 * @param projectId {String}
 * @param closeModal {Function}
 *
 * @return {Function}
 */
export const projectAddQuestion = (formData, projectId, closeModal) => async (dispatch) => {
  dispatch({ type: PROJECT_ADD_QUESTION_REQUEST });

  try {
    const payload = await wait(MOCK_PROJECTS[projectId], 500);

    payload.faqs.push(formData);

    dispatch({ type: PROJECT_ADD_QUESTION_SUCCESS, payload });
    closeModal();
  } catch (err) {
    dispatch({ type: PROJECT_ADD_QUESTION_FAILURE, payload: err.message });
  }
};

/**
 * Resets the add new question-answer form state
 *
 * @return {Function}
 */
export const resetProjectAddQuestion = () => (dispatch) => { dispatch({ type: PROJECT_ADD_QUESTION_RESET }); };

/**
 * Adds a new version item to the changelog project array
 *
 * @param formData {Object}
 * @param projectId {String}
 * @param closeModal {Function}
 *
 * @return {Function}
 */
export const projectAddChange = (formData, projectId, closeModal) => async (dispatch) => {
  dispatch({ type: PROJECT_ADD_CHANGE_REQUEST });

  try {
    const payload = await wait(MOCK_PROJECTS[projectId], 500);

    payload.changelog.unshift({
      version: formData.version,
      date: formData.date,
      description: formData.description, // eslint-disable-line
      changes: formData.changes.map(c => c.change),
    });

    dispatch({ type: PROJECT_ADD_CHANGE_SUCCESS, payload });
    closeModal();
  } catch (err) {
    dispatch({ type: PROJECT_ADD_CHANGE_FAILURE, payload: err.message });
  }
};

/**
 * Resets the add new changelog item form state
 *
 * @return {Function}
 */
export const resetProjectAddChange = () => (dispatch) => { dispatch({ type: PROJECT_ADD_CHANGE_RESET }); };

/**
 * Withdraws funds in either or both eth, dai from the project.
 *
 * @param formData {Object}
 * @param projectId {String}
 * @param closeModal {Function}
 *
 * @return {Function}
 */
export const projectWithdraw = (formData, projectId, closeModal) => async (dispatch) => {
  dispatch({ type: PROJECT_WITHDRAW_REQUEST });

  try {
    const payload = await wait(MOCK_PROJECTS[projectId], 500);

    payload.ethWithdraw -= formData.ethAmount;
    payload.daiWithdraw -= formData.daiAmount;

    dispatch({ type: PROJECT_WITHDRAW_SUCCESS, payload });
    closeModal();
  } catch (err) {
    dispatch({ type: PROJECT_WITHDRAW_FAILURE, payload: err.message });
  }
};

/**
 * Resets the withdraw funds from project form state
 *
 * @return {Function}
 */
export const resetProjectWithdraw = () => (dispatch) => { dispatch({ type: PROJECT_WITHDRAW_RESET }); };

/**
 * Handles the contract and api call for the one time fund method
 *
 * @param formData
 * @param projectId
 * @param account
 * @param dispatch
 * @param getState
 *
 * @return {Promise<any>}
 */
const oneTimeFund = (formData, projectId, account, dispatch, getState) => new Promise(async (resolve, reject) => {
  const proxySendHandler = promise => sendTx(promise, 'One time fund', dispatch, getState);

  try {
    await oneTimeFundContractCall(proxySendHandler, account, projectId, formData.ethAmount);
    const payload = await oneTimeFundApiCall(projectId, parseFloat(formData.ethAmount), account);

    resolve(payload);
  } catch (err) {
    reject(err);
  }
});

/**
 * Handles the contract and api call for the vesting fund method
 *
 * @param formData
 * @param projectId
 * @param account
 * @param dispatch
 * @param getState
 *
 * @return {Promise<any>}
 */
const vestFund = (formData, projectId, account, dispatch, getState) => new Promise(async (resolve, reject) => {
  const proxySendHandler = promise => sendTx(promise, 'Vest', dispatch, getState);

  try {
    await vestFundContractCall(proxySendHandler, account, projectId, formData.ethAmount, formData.weeks);
    const payload = await vestFundApiCall(projectId, parseFloat(formData.ethAmount));

    resolve(payload);
  } catch (err) {
    reject(err);
  }
});

/**
 * Handles the contract and api call for the compound fund method
 *
 * @param formData
 * @param projectId
 * @param account
 * @param dispatch
 * @param getState
 *
 * @return {Promise<any>}
 */
const compoundFund = (formData, projectId, account, dispatch, getState) => new Promise(async (resolve, reject) => {
  const proxySendHandler1 = promise => sendTx(promise, 'Approve dai', dispatch, getState);
  const proxySendHandler2 = promise => sendTx(promise, 'Compound', dispatch, getState);

  try {
    await compoundFundContractCall(proxySendHandler1, proxySendHandler2, account, projectId, formData.daiAmount);
    const payload = await compoundFundApiCall(projectId, parseFloat(formData.daiAmount));

    resolve(payload);
  } catch (err) {
    reject(err);
  }
});

/**
 * Adss funds to the project via 3 types.
 *
 * @param formData {Object}
 * @param projectId {String}
 * @param closeModal {Function}
 * @param type {String}
 *
 * @return {Function}
 */
export const fundProject = (formData, projectId, closeModal, type) => async (dispatch, getState) => {
  dispatch({ type: PROJECT_FUND_REQUEST });

  try {
    const { account } = getState().account;
    let payload = {};

    if (type === 'one-time') payload = await oneTimeFund(formData, projectId, account, dispatch, getState);
    if (type === 'vest') payload = await vestFund(formData, projectId, account, dispatch, getState);
    if (type === 'compound') payload = await compoundFund(formData, projectId, account, dispatch, getState);

    dispatch({ type: PROJECT_FUND_SUCCESS, payload });
    closeModal();
  } catch (err) {
    dispatch({ type: PROJECT_FUND_FAILURE, payload: err.message });
  }
};

/**
 * Resets the fund project forms
 *
 * @return {Function}
 */
export const resetProjectFundForms = () => (dispatch) => { dispatch({ type: PROJECT_FUND_RESET }); };
