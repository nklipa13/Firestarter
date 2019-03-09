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
export const startProject = (formData, history) => async (dispatch) => {
  dispatch({ type: START_PROJECT_REQUEST });

  try {
    const data = {
      ...formData,
      creator: '0x45002669Ad051fd899331328E5F38f97feD075Bc',
    };

    const payload = await startProjectApiCall(data);

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
