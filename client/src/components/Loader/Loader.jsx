import React from 'react';
import PropTypes from 'prop-types';

import './Loader.scss';

const Loader = ({ size }) => <div className="square-loaded" style={{ width: size, height: size }} />;

Loader.defaultProps = {
  size: 40,
};

Loader.propTypes = {
  size: PropTypes.number,
};

export default Loader;
