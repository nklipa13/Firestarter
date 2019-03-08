import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './Project.scss';

const Project = ({ data }) => (
  <div className="project-wrapper">
    {data.name}
  </div>
);

Project.propTypes = {
  data: PropTypes.object.isRequired,
};

const mapStateToProps = ({ project }) => ({
  data: project.data,
});

export default connect(mapStateToProps)(Project);
