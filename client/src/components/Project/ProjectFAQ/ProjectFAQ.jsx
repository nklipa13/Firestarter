import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { openProjectAddQuestionModal } from '../../../actions/modalActions';

import './ProjectFAQ.scss';

const ProjectFAQ = ({
  data, openProjectAddQuestionModal, projectId, isOwner, addingQuestion,
}) => (
  <div className="project-faq-wrapper">
    {
      isOwner && (
        <button
          className="button uppercase text-large-margin"
          type="button"
          disabled={addingQuestion}
          onClick={() => { openProjectAddQuestionModal(projectId); }}
        >
          Add a question
        </button>
      )
    }

    { data.length === 0 && (<div className="tab-empty-wrapper">Currently, there are not FAQs</div>) }

    {
      data.map(({ question, answer }) => (
        <div className="item" key={question}>
          <div className="question text-medium-margin text-bold">{question}</div>
          <div className="answer">{answer}</div>
        </div>
      ))
    }
  </div>
);

ProjectFAQ.propTypes = {
  data: PropTypes.array.isRequired,
  projectId: PropTypes.number.isRequired,
  isOwner: PropTypes.bool.isRequired,
  addingQuestion: PropTypes.bool.isRequired,
  openProjectAddQuestionModal: PropTypes.func.isRequired,
};

const mapStateToProps = ({ project }) => ({
  addingQuestion: project.addingQuestion,
});

const mapDispatchToProps = {
  openProjectAddQuestionModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectFAQ);
