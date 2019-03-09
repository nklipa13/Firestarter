import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProjectAddChangeForm from './ProjectAddChangeForm/ProjectAddChangeForm';

import './ProjectAddChangeModal.scss';

class ProjectAddChangeModal extends Component {
  componentWillMount() {
    console.log('');
  }

  render() {
    return (
      <div className="project-add-question-modal-wrapper">
        <ProjectAddChangeForm />
      </div>
    );
  }
}

ProjectAddChangeModal.propTypes = {};

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(ProjectAddChangeModal);
