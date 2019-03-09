import {
  START_PROJECT_REQUEST,
  START_PROJECT_SUCCESS,
  START_PROJECT_FAILURE,
  START_PROJECT_RESET,
} from '../actionTypes/startProjectActionTypes';
import { startProjectApiCall } from '../services/api';

/**
 * Creates a new project for the user address that submitted it
 *
 * @param formData {Object}
 * @param history {Object}
 *
 * @return {Function}
 */
export const startProject = (formData, history) => async (dispatch, getState) => {
  dispatch({ type: START_PROJECT_REQUEST });
  const { account } = getState().account;

  try {

    const payload = await startProjectApiCall({ ...formData, creator: account });

    console.log('payload', payload);

    dispatch({ type: START_PROJECT_SUCCESS, payload });
    history.push(`/project/${payload.id}`);
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
