import {
  ADD_NOTIFICATION,
  CLOSE_NOTIFICATION,
  CHANGE_NOTIFICATION,
} from '../actionTypes/notificationsActionTypes';

/**
 * Adds a tx notification to the right corner of the app
 *
 * @return {Function}
 */
export const addNotification = (id, type, title, description, hash = '') => (dispatch) => {
  const payload = {
    id, type, title, description, hash,
  };

  dispatch({ type: ADD_NOTIFICATION, payload });
};

/**
 * Closes a tx if the tx is still present
 *
 * @param id {Number}
 *
 * @return {Function}
 */
export const closeNotification = id => (dispatch, getState) => {
  const notifications = [...getState().notifications.notifications];
  const index = notifications.findIndex(notif => notif.id === id);

  if (index < 0) return;

  notifications.splice(index, 1);

  dispatch({ type: CLOSE_NOTIFICATION, payload: notifications });
};

export const changeNotification = (id, changes) => (dispatch, getState) => {
  const notifications = [...getState().notifications.notifications];
  const index = notifications.findIndex(notif => notif.id === id);

  if (index < 0) return;

  notifications.splice(index, 1, { ...notifications[index], ...changes });

  dispatch({ type: CHANGE_NOTIFICATION, payload: notifications });
};

/**
 * Handles a transactions status in the notification
 *
 * @param txPromise {Promise}
 * @param title {String}
 * @param dispatch {Function}
 * @param getState {Function}
 * @return {Promise<any>}
 */
export const sendTx = (txPromise, title, dispatch, getState) => new Promise(async (resolve, reject) => {
  const id = getState().notifications.notifications.length;

  dispatch(addNotification(id, 'loading', title, 'Waiting for transaction signature...'));

  const formatTx = hash => `${hash.slice(0, 8)}...`;
  const closeThisNotification = () => {
    setTimeout(() => { dispatch(closeNotification(id)); }, 3000);
  };

  try {
    txPromise
      .on('transactionHash', (hash) => {
        const description = `Transaction ${formatTx(hash)} was created. Waiting for confirmation`;

        dispatch(changeNotification(id, { tx: hash, description }));
      })
      .on('receipt', (receipt) => {
        const { transactionHash } = receipt;
        const description = `Transaction ${formatTx(transactionHash)} was confirmed`;

        dispatch(changeNotification(id, { type: 'success', description }));
        closeThisNotification();

        resolve(receipt);
      })
      .on('error', (err) => {
        dispatch(changeNotification(id, { tx: '', type: 'error', description: err.message }));
        closeThisNotification();

        reject(err);
      });
  } catch (err) {
    closeThisNotification();
    reject(err);
  }
});
