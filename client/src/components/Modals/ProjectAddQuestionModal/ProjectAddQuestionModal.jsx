import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProjectAddQuestionForm from './ProjectAddQuestionForm/ProjectAddQuestionForm';

import './ProjectAddQuestionModal.scss';

class ProjectAddQuestionModal extends Component {
  componentWillMount() {
    console.log('');
  }

  render() {
    return (
      <div className="project-add-question-modal-wrapper">
        <ProjectAddQuestionForm />
      </div>
    );
  }
}

ProjectAddQuestionModal.propTypes = {};

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(ProjectAddQuestionModal);
