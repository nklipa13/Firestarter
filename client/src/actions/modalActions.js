import { TOGGLE_MODAL } from '../actionTypes/modalActionTypes';
import {
  PROJECT_ADD_QUESTION_MODAL,
  PROJECT_ADD_CHANGE_MODAL,
  PROJECT_WITHDRAW_MODAL,
  PROJECT_FUND_MODAL,
} from '../components/Modals/modalTypes';

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
 * @param id {Number}
 */
export const openProjectAddQuestionModal = id => (dispatch) => {
  dispatch(toggleModal(PROJECT_ADD_QUESTION_MODAL, { width: 647, projectId: id }, true));
};

/**
 * Opens project add change modal for the owner to add a version to the changelog
 *
 * @param id {Number}
 */
export const openProjectAddChangeModal = id => (dispatch) => {
  dispatch(toggleModal(PROJECT_ADD_CHANGE_MODAL, { width: 647, projectId: id }, true));
};

/**
 * Opens project withdraw modal for the owner to withdraw available funds
 *
 * @param id {Number}
 * @param maxEth {Number}
 * @param maxDai {Number}
 */
export const openProjectWithdrawModal = (id, maxEth, maxDai) => (dispatch) => {
  dispatch(toggleModal(PROJECT_WITHDRAW_MODAL, {
    width: 647, maxEth, maxDai, projectId: id,
  }, true));
};

/**
 * Opens project fund modal where the user can contribute to the project
 *
 * @param id {Number}
 */
export const openProjectFundModal = id => (dispatch) => {
  dispatch(toggleModal(PROJECT_FUND_MODAL, { width: 647, projectId: id }, true));
};
