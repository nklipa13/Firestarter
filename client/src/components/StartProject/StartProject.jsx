import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { resetStartProjectForm } from '../../actions/startProjectActions';
import StartProjectForm from './StartProjectForm/StartProjectForm';

import './StartProject.scss';

class StartProject extends Component {
  componentWillUnmount() {
    this.props.resetStartProjectForm();
  }

  render() {
    return (
      <div className="start-project-wrapper">
        <div className="width-container">
          <StartProjectForm />
        </div>
      </div>
    );
  }
}

StartProject.propTypes = {
  resetStartProjectForm: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  resetStartProjectForm,
};

export default connect(null, mapDispatchToProps)(StartProject);
