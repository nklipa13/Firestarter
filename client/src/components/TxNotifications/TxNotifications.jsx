import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CloseIcon from '../Decorative/CloseIcon';
import TxErrorIcon from '../Decorative/TxErrorIcon';
import TxSuccessIcon from '../Decorative/TxSuccessIcon';
import Loader from '../Loader/Loader';
import { closeNotification } from '../../actions/notificationsActions';

import './TxNotifications.scss';

const TxNotifications = ({ notifications, closeNotification, network }) => (
  <div className="tx-notifications-wrapper">
    {
      notifications.map(({
        id, title, description, type, tx,
      }) => (
        <div className={`single-notification ${type} ${tx ? 'has-tx' : ''}`} key={id}>
          <span onClick={() => { closeNotification(id); }}><CloseIcon size={12} /></span>

          <div className="content">
            <span className="status-wrapper">
              { type === 'error' && (<TxErrorIcon />) }
              { type === 'success' && (<TxSuccessIcon />) }
              { type === 'loading' && (<Loader showDefaultMessage={false} />) }
            </span>

            <div className="info-wrapper">
              <div className="title">{ title }</div>
              { !tx && (<div className="description">{ description }</div>) }

              {
                tx && (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="description"
                    href={`https://${network === 42 ? 'kovan.' : ''}etherscan.io/tx/${tx}`}
                  >
                    { description }
                  </a>
                )
              }
            </div>
          </div>
        </div>
      ))
    }
  </div>
);

TxNotifications.propTypes = {
  notifications: PropTypes.array.isRequired,
  closeNotification: PropTypes.func.isRequired,
  network: PropTypes.number.isRequired,
};

const mapStateToProps = ({ notifications, general }) => ({
  notifications: notifications.notifications,
  network: general.network,
});

const mapDispatchToProps = {
  closeNotification,
};

export default connect(mapStateToProps, mapDispatchToProps)(TxNotifications);
