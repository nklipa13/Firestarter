import {
  GET_PROJECT_FAILURE,
  GET_PROJECT_REQUEST,
  GET_PROJECT_SUCCESS,
} from '../actionTypes/projectActionTypes';
import { wait } from '../services/utils';

const MOCK_PROJECTS = [
  {
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
