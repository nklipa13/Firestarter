import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { openProjectAddQuestionModal } from '../../../actions/modalActions';

import './ProjectFAQ.scss';

const ProjectFAQ = ({
  data, openProjectAddQuestionModal, id,
}) => (
  <div className="project-faq-wrapper">
    <button
      className="button uppercase text-large-margin"
      type="button"
      onClick={() => { openProjectAddQuestionModal(id); }}
    >
      Add a question
    </button>

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
  id: PropTypes.number.isRequired,
  openProjectAddQuestionModal: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  openProjectAddQuestionModal,
};

export default connect(null, mapDispatchToProps)(ProjectFAQ);
