import { TOGGLE_MODAL } from '../actionTypes/modalActionTypes';
import {
  PROJECT_ADD_QUESTION_MODAL,
  PROJECT_ADD_CHANGE_MODAL,
  PROJECT_WITHDRAW_MODAL,
  PROJECT_FUND_MODAL,
  PROJECT_ADD_PROPOSAL_MODAL,
} from '../components/Modals/modalTypes';
import { getMaxEthDaiForProject } from '../services/ethereumService';

/**
 * Dispatches action to toggle modal.
 *
 * @param {String} modalType
 * @param {Object} modalProps
 * @param {Boolean} action - to close or to open
 */
export const toggleModal = (modalType, modalProps, action) => (dispatch) => {
  dispatch({
    type: TOGGLE_MODAL,
    payload: { modalType, modalProps, action },
  });
};

/**
 * Closes the modal that is currently open
 */
export const closeModal = () => (dispatch) => {
  dispatch({
    type: TOGGLE_MODAL,
    payload: { modalType: '', modalProps: {}, action: false },
  });
};

/**
 * Opens project add question modal for the owner to add a question to the faq
 *
 * @param projectId {Number}
 */
export const openProjectAddQuestionModal = projectId => (dispatch) => {
  dispatch(toggleModal(PROJECT_ADD_QUESTION_MODAL, { width: 647, projectId }, true));
};

/**
 * Opens project add change modal for the owner to add a version to the changelog
 *
 * @param projectId {Number}
 */
export const openProjectAddChangeModal = projectId => (dispatch) => {
  dispatch(toggleModal(PROJECT_ADD_CHANGE_MODAL, { width: 647, projectId }, true));
};

/**
 * Opens project withdraw modal for the owner to withdraw available funds
 *
 * @param id {Number}
 */
export const openProjectWithdrawModal = id => async (dispatch) => {
  const { maxEth, maxDai } = await getMaxEthDaiForProject(id);

  dispatch(toggleModal(PROJECT_WITHDRAW_MODAL, {
    width: 647, maxEth, maxDai, projectId: id,
  }, true));
};

/**
 * Opens project fund modal where the user can contribute to the project
 *
 * @param projectId {Number}
 */
export const openProjectFundModal = projectId => (dispatch) => {
  dispatch(toggleModal(PROJECT_FUND_MODAL, { width: 647, projectId }, true));
};

/**
 * Opens project add proposal where the creator suggests proposals
 *
 * @param projectId {Number}
 */
export const openProjectAddProposalModal = projectId => (dispatch) => {
  dispatch(toggleModal(PROJECT_ADD_PROPOSAL_MODAL, { width: 647, projectId }, true));
};
