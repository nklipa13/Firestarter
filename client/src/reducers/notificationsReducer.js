import { ADD_NOTIFICATION, CHANGE_NOTIFICATION, CLOSE_NOTIFICATION } from '../actionTypes/notificationsActionTypes';

const INITIAL_STATE = {
  notifications: [],
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_NOTIFICATION:
      return { ...state, notifications: [...state.notifications, payload] };

    case CLOSE_NOTIFICATION:
    case CHANGE_NOTIFICATION:
      return { ...state, notifications: payload };

    default:
      return state;
  }
};
