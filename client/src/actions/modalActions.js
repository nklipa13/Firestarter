import { TOGGLE_MODAL } from '../actionTypes/modalActionTypes';
import { PROJECT_ADD_QUESTION_MODAL, PROJECT_ADD_CHANGE_MODAL } from '../components/Modals/modalTypes';
// import {} from '../components/Modals/modalTypes';

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
 */
export const openProjectAddQuestionModal = () => (dispatch) => {
  dispatch(toggleModal(PROJECT_ADD_QUESTION_MODAL, { width: 647 }, true));
};

/**
 * Opens project add change modal for the owner to add a version to the changelog
 */
export const openProjectAddChangeModal = () => (dispatch) => {
  dispatch(toggleModal(PROJECT_ADD_CHANGE_MODAL, { width: 647 }, true));
};
