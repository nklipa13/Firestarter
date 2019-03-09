import React from 'react';
import PropTypes from 'prop-types';

import './ItemNotFound.scss';

const ItemNotFound = ({
  message, question, buttonHandler, buttonText,
}) => (
  <div className="no-item-wrapper">
    <div className="error">Error</div>
    <div className="big-num">404</div>

    <div className="message">
      { message }
      <br />
      { question }
    </div>

    <div className="button button-submit" onClick={buttonHandler}>{ buttonText }</div>
  </div>
);

ItemNotFound.propTypes = {
  message: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  buttonHandler: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
};

export default ItemNotFound;