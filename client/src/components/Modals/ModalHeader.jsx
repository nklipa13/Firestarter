import React from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '../Decorative/CloseIcon';

import './modals.scss';

const ModalHeader = ({ closeModal }) => (
  <div className="modal-header">
    <span onClick={closeModal} className="icon-close">
      <CloseIcon size={21} />
    </span>
  </div>
);

ModalHeader.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default ModalHeader;
