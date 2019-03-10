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

  PROJECT_WITHDRAW_HISTORY_REQUEST,
  PROJECT_WITHDRAW_HISTORY_SUCCESS,
  PROJECT_WITHDRAW_HISTORY_FAILURE,

  PROJECT_ADD_PROPOSAL_REQUEST,
  PROJECT_ADD_PROPOSAL_SUCCESS,
  PROJECT_ADD_PROPOSAL_FAILURE,
  PROJECT_ADD_PROPOSAL_RESET,

  GET_PROJECT_PROPOSALS_REQUEST,
  GET_PROJECT_PROPOSALS_SUCCESS,
  GET_PROJECT_PROPOSALS_FAILURE,

  SUPPORT_PROPOSAL_REQUEST,
  SUPPORT_PROPOSAL_SUCCESS,
  SUPPORT_PROPOSAL_FAILURE,

  DECLINE_PROPOSAL_REQUEST,
  DECLINE_PROPOSAL_SUCCESS,
  DECLINE_PROPOSAL_FAILURE,
} from '../actionTypes/projectActionTypes';
import {
  compoundFundApiCall,
  vestFundApiCall,
  getAllProjectsApiCall,
  getProjectApiCall,
  oneTimeFundApiCall,
  projectAddQuestionApiCall,
  projectAddChangelogApiCall,
  projectAddProposalApiCall,
  getAllProjectProposalsApiCall,
} from '../services/api';
import { sendTx } from './notificationsActions';
import { SET_USER_FUNDING_STATUS } from '../actionTypes/accountActionTypes';
import {
  oneTimeFundContractCall,
  vestFundContractCall,
  compoundFundContractCall,
  projectWithdrawContractCall,
  signString,
  getProjectWithdrawHistoryContractCall,
  projectAddProposalContractCall,
  getIfUserHasFundsLockedCall,
  cancelFundingCall,
  getFinance,
  voteProposalContractCall,
  // getProjectProposalsContractCall,
} from '../services/ethereumService';

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
    let payload = await getProjectApiCall(id);

    if (payload.length === 0) throw new Error('Project not found');

    payload = await getFinance(id, payload[0]);
    console.log(payload);
    dispatch({ type: GET_PROJECT_SUCCESS, payload });
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
export const projectAddQuestion = (formData, projectId, closeModal) => async (dispatch, getState) => {
  dispatch({ type: PROJECT_ADD_QUESTION_REQUEST });

  try {
    const { account } = getState().account;

    console.log(account, formData.question);

    const sig = await signString(formData.question, account);

    console.log(sig);

    let payload = await projectAddQuestionApiCall(projectId, formData, account, sig);

    payload = await getFinance(projectId, payload);
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
export const projectAddChange = (formData, projectId, closeModal) => async (dispatch, getState) => {
  dispatch({ type: PROJECT_ADD_CHANGE_REQUEST });

  try {
    const data = {
      versionNumber: formData.version,
      versionDate: formData.date,
      description: formData.description, // eslint-disable-line
      versionChanges: formData.changes.map(c => c.change),
    };

    const { account } = getState().account;

    const sig = await signString(formData.description, account);

    let payload = await projectAddChangelogApiCall(projectId, data, account, sig);

    payload = await getFinance(projectId, payload);
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
 * Fetches withdraw history for a project
 *
 * @param projectId {Number}
 * @return {Function}
 */
export const getProjectWithdrawHistory = projectId => async (dispatch) => {
  dispatch({ type: PROJECT_WITHDRAW_HISTORY_REQUEST });

  try {
    const payload = await getProjectWithdrawHistoryContractCall(projectId);

    dispatch({ type: PROJECT_WITHDRAW_HISTORY_SUCCESS, payload });
  } catch (err) {
    dispatch({ type: PROJECT_WITHDRAW_HISTORY_FAILURE, payload: err.message });
  }
};

/**
 * Withdraws funds in either or both eth, dai from the project.
 *
 * @param formData {Object}
 * @param projectId {String}
 * @param closeModal {Function}
 *
 * @return {Function}
 */
export const projectWithdraw = (formData, projectId, closeModal) => async (dispatch, getState) => {
  dispatch({ type: PROJECT_WITHDRAW_REQUEST });

  const { account } = getState().account;
  const proxySendHandler = promise => sendTx(promise, 'Withdraw', dispatch, getState);

  try {
    await projectWithdrawContractCall(proxySendHandler, account, projectId, formData);

    dispatch(getProjectWithdrawHistory(projectId));
    dispatch({ type: PROJECT_WITHDRAW_SUCCESS });
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
    const payload = await vestFundApiCall(projectId, parseFloat(formData.ethAmount), account);

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
    const payload = await compoundFundApiCall(projectId, parseFloat(formData.daiAmount), account);

    resolve(payload);
  } catch (err) {
    reject(err);
  }
});

/**
 * Adds funds to the project via 3 types.
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

    payload = await getFinance(projectId, payload);
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

/**
 * Gets all proposals for the project
 *
 * @param projectId
 * @return {Function}
 */
export const getProjectProposals = projectId => async (dispatch) => {
  dispatch({ type: GET_PROJECT_PROPOSALS_REQUEST });

  try {
    const payload = await getAllProjectProposalsApiCall(projectId);

    // TODO get proposal vote info - info
    // TODO get proposal status - voted

    dispatch({ type: GET_PROJECT_PROPOSALS_SUCCESS, payload });
  } catch (err) {
    dispatch({ type: GET_PROJECT_PROPOSALS_FAILURE, payload: err.message });
  }
};

/**
 * Adds a proposal to a project
 *
 * @param formData {Object}
 * @param projectId {String}
 * @param closeModal {Function}
 *
 * @return {Function}
 */
export const projectAddProposal = (formData, projectId, closeModal) => async (dispatch, getState) => {
  dispatch({ type: PROJECT_ADD_PROPOSAL_REQUEST });

  const proxySendHandler = promise => sendTx(promise, 'Add proposal', dispatch, getState);

  try {
    const { account } = getState().account;

    const proposalId = await projectAddProposalContractCall(proxySendHandler, account, projectId, formData);
    await projectAddProposalApiCall(projectId, proposalId, formData);

    dispatch(getProjectProposals(projectId));
    dispatch({ type: PROJECT_ADD_PROPOSAL_SUCCESS });

    closeModal();
  } catch (err) {
    dispatch({ type: PROJECT_ADD_PROPOSAL_FAILURE, payload: err.message });
  }
};

/**
 * Resets the project add proposal form for the creator
 * @return {Function}
 */
export const resetProjectAddProposal = () => (dispatch) => { dispatch({ type: PROJECT_ADD_PROPOSAL_RESET }); };

export const didUserFundProject = account => async (dispatch, getState) => {
  const { projectId } = getState().project.data;

  console.log(getState().project.data);

  const res = await getIfUserHasFundsLockedCall(projectId, account);

  dispatch({ type: SET_USER_FUNDING_STATUS, payload: res.isLocked });

  console.log(res);
};

export const supportProposal = (projectId, proposalId, index) => async (dispatch, getState) => {
  dispatch({ type: SUPPORT_PROPOSAL_REQUEST });

  const proxySendHandler = promise => sendTx(promise, 'Support proposal', dispatch, getState);

  try {
    const { account } = getState().account;
    const { proposals } = getState().project;

    await voteProposalContractCall(proxySendHandler, account, projectId, proposalId, true);
    const newProposals = [...proposals];

    // TODO get proposal info
    newProposals[index] = { ...newProposals[index], voted: true };

    dispatch({ type: SUPPORT_PROPOSAL_SUCCESS, payload: newProposals });
  } catch (err) {
    dispatch({ type: SUPPORT_PROPOSAL_FAILURE, payload: err.message });
  }
};

export const declineProposal = (projectId, proposalId, index) => async (dispatch, getState) => {
  dispatch({ type: DECLINE_PROPOSAL_REQUEST });

  const proxySendHandler = promise => sendTx(promise, 'Decline proposal', dispatch, getState);

  try {
    const { account } = getState().account;
    const { proposals } = getState().project;

    await voteProposalContractCall(proxySendHandler, account, projectId, proposalId, false);
    const newProposals = [...proposals];

    // TODO get proposal info
    newProposals[index] = { ...newProposals[index], voted: true };

    dispatch({ type: DECLINE_PROPOSAL_SUCCESS, payload: newProposals });
  } catch (err) {
    dispatch({ type: DECLINE_PROPOSAL_FAILURE, payload: err.message });
  }
};

export const cancelFunding = (projectId, account, dispatch, getState) => new Promise(async (resolve, reject) => { // eslint-disable-line
  const proxySendHandler = promise => sendTx(promise, 'Cancel funding', dispatch, getState);

  try {
    const payload = await cancelFundingCall(proxySendHandler, account, projectId);

    resolve(payload);
  } catch (err) {
    reject(err);
  }
});
