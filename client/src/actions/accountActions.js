import {
  CONNECT_PROVIDER,
  CONNECT_PROVIDER_SUCCESS,
  CONNECT_PROVIDER_FAILURE,
  LOGIN_STARTED,
  LOGIN_FINISHED,
} from '../actionTypes/accountActionTypes';
import { notify } from './notificationActions';
import {
  isEthereumApproved,
  getBalance,
  getAccount,
  nameOfNetwork,
  getNetwork,
  ethereumEnable,
} from '../services/ethereumService';
import clientConfig from '../config/client.json';
import { setWeb3toMetamask, setupWeb3 } from '../services/web3Service';
import { toDecimal } from '../services/utils';

/**
 * Listens to account change and reloads the page if there is no account or
 * the account changes
 *
 * @return {Function}
 */
export const listenToAccChange = () => (dispatch, getState) => {
  setInterval(async () => {
    const { account, connectingProvider } = getState().account;

    if (connectingProvider) return;
    if (!account) return;

    const accounts = await window._web3.eth.getAccounts();

    if (!accounts[0]) window.location.reload();
    if (accounts[0] !== account) window.location.reload();
  }, 1000);
};

export const loginWallet = silent => async (dispatch, getState) => {
  dispatch({ type: CONNECT_PROVIDER });
  try {
    const ethereumApproved = await isEthereumApproved();

    if (silent && !ethereumApproved) {
      throw new Error('Provider not pre-approved');
    }

    await ethereumEnable();

    setWeb3toMetamask();

    const network = await getNetwork();

    if (clientConfig.network !== network) {
      throw new Error(
        `Wrong network - please set network to ${nameOfNetwork(
          clientConfig.network,
        )}`,
      );
    }

    const account = await getAccount();
    if (getState().account.account === account) return;

    const walletBalance = toDecimal(await getBalance(account));

    dispatch({
      type: CONNECT_PROVIDER_SUCCESS,
      payload: {
        account,
        walletBalance,
        network,
      },
    });

    dispatch(listenToAccChange());
  } catch (err) {
    setupWeb3();
    dispatch({ type: CONNECT_PROVIDER_FAILURE, payload: err.message });
    if (!silent) notify(err.message, 'error')(dispatch);
  }
};

/**
 * If the user has already once successfully added an account this will
 * try a silent login for that account type
 *
 * @return {Function}
 */
export const silentLogin = () => async (dispatch) => {
  dispatch({ type: LOGIN_STARTED });
  try {
    await dispatch(loginWallet(false));
    return dispatch({ type: LOGIN_FINISHED });
  } catch (err) {
    console.log('LOGIN ERROR', err);
  }

  dispatch({ type: LOGIN_FINISHED });
};
