import {
  GET_PROJECT_REQUEST,
  GET_PROJECT_SUCCESS,
  GET_PROJECT_FAILURE,

  PROJECT_ADD_QUESTION_REQUEST,
  PROJECT_ADD_QUESTION_SUCCESS,
  PROJECT_ADD_QUESTION_FAILURE,
  PROJECT_ADD_QUESTION_RESET,

  PROJECT_ADD_CHANGE_REQUEST,
  PROJECT_ADD_CHANGE_SUCCESS,
  PROJECT_ADD_CHANGE_FAILURE,
  PROJECT_ADD_CHANGE_RESET,

  PROJECT_WITHDRAW_RESET,
} from '../actionTypes/projectActionTypes';
import { wait } from '../services/utils';

const MOCK_PROJECTS = [
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
    const payload = await wait(MOCK_PROJECTS[id], 500);

    dispatch({ type: GET_PROJECT_SUCCESS, payload });
  } catch (err) {
    dispatch({ type: GET_PROJECT_FAILURE, payload: err.message });
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
 * Resets the withdraw funds from project form state
 *
 * @return {Function}
 */
export const resetProjectWithdraw = () => (dispatch) => { dispatch({ type: PROJECT_WITHDRAW_RESET }); };
