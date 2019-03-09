import {
  CONNECT_PROVIDER,
  CONNECT_PROVIDER_SUCCESS,
  CONNECT_PROVIDER_FAILURE,
} from '../actionTypes/accountActionTypes';

const INITIAL_STATE = {
  loggingIn: false,
  connectingProvider: false,
  account: '',
  accountError: '',
  walletBalance: 0,
  gameBalance: 0,
  network: 0,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case CONNECT_PROVIDER:
      return { ...state, connectingProvider: true };

    case CONNECT_PROVIDER_SUCCESS:
      return {
        ...state,
        connectingProvider: false,
        accountError: '',
        ...payload,
      };

    case CONNECT_PROVIDER_FAILURE:
      return {
        ...state,
        connectingProvider: false,
        account: '',
        firstLogging: '',
        walletBalance: 0,
        gameBalance: 0,
        accountError: payload,
      };

    default:
      return state;
  }
};
