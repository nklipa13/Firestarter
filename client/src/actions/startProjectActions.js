import {
  START_PROJECT_REQUEST,
  START_PROJECT_SUCCESS,
  START_PROJECT_FAILURE,
  START_PROJECT_RESET,
} from '../actionTypes/startProjectActionTypes';
import { wait } from '../services/utils';
import { MOCK_PROJECTS } from './projectActions';

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
    const payload = await wait(MOCK_PROJECTS[0], 500);

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
