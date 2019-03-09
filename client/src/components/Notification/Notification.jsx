import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './Notification.scss';

const Notification = ({ showNotif, notifType, notifMessage }) => (
  <div className={`notification-wrapper ${showNotif ? 'active' : ''}`}>
    <div className={`notification-inner-wrapper ${notifType}`}>
      {notifMessage}
    </div>
  </div>
);

Notification.propTypes = {
  showNotif: PropTypes.bool.isRequired,
  notifMessage: PropTypes.string.isRequired,
  notifType: PropTypes.string.isRequired,
};

const mapStateToProps = ({ notification }) => ({
  showNotif: notification.displayed,
  notifMessage: notification.message,
  notifType: notification.type,
});

export default connect(mapStateToProps)(Notification);
