import {
  GET_PROJECT_FAILURE,
  GET_PROJECT_REQUEST,
  GET_PROJECT_SUCCESS,
} from '../actionTypes/projectActionTypes';
import { wait } from '../services/utils';

const MOCK_PROJECTS = [
  {
    name: 'Community-driven Dapps on the Ethereum blockchain',
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
    const payload = await wait(MOCK_PROJECTS[id], 10000000000);

    dispatch({ type: GET_PROJECT_SUCCESS, payload });
  } catch (err) {
    dispatch({ type: GET_PROJECT_FAILURE, payload: err.message });
  }
};
