import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProjectAddQuestionForm from './ProjectAddQuestionForm/ProjectAddQuestionForm';
import { resetProjectAddQuestion } from '../../../actions/projectActions';

import './ProjectAddQuestionModal.scss';

class ProjectAddQuestionModal extends Component {
  componentWillMount() {
    this.props.resetProjectAddQuestion();
  }

  render() {
    const { closeModal, projectId } = this.props;

    return (
      <div className="project-add-question-modal-wrapper">
        <ProjectAddQuestionForm closeModal={closeModal} projectId={projectId} />
      </div>
    );
  }
}

ProjectAddQuestionModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  resetProjectAddQuestion: PropTypes.func.isRequired,
  projectId: PropTypes.number.isRequired,
};

const mapDispatchToProps = {
  resetProjectAddQuestion,
};

export default connect(null, mapDispatchToProps)(ProjectAddQuestionModal);
