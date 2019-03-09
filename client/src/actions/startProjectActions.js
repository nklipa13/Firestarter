import {
  START_PROJECT_REQUEST,
  START_PROJECT_SUCCESS,
  START_PROJECT_FAILURE,
  START_PROJECT_RESET,
} from '../actionTypes/startProjectActionTypes';
import { startProjectApiCall } from '../services/api';
import { startProjectContractCall } from '../services/ethereumService';
import { sendTx } from './notificationsActions';

/**
 * Creates a new project for the user address that submitted it
 *
 * @param formData {Object}
 * @param history {Object}
 *
 * @return {Function}
 */
export const startProject = (formData, history) => async (dispatch, getState) => {
  const { account } = getState().account;
  const proxySendHandler = promise => sendTx(promise, 'Start project', dispatch, getState);

  dispatch({ type: START_PROJECT_REQUEST });

  try {
    const projectId = await startProjectContractCall(proxySendHandler, account, formData.name);
    await startProjectApiCall({ ...formData, creator: account, projectId });

    dispatch({ type: START_PROJECT_SUCCESS });
    history.push(`/project/${projectId}`);
  } catch (err) {
    dispatch({ type: START_PROJECT_FAILURE, payload: err.message });
  }
};

/**
 * Resets the start project form state
 *
 * @return {Function}
 */
export const resetStartProjectForm = () => (dispatch) => { dispatch({ type: START_PROJECT_RESET }); };
