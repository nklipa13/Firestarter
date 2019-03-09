import React from 'react';
import PropTypes from 'prop-types';

import './ProjectFAQ.scss';

const ProjectFAQ = ({ data }) => (
  <div className="project-faq-wrapper">
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
};

export default ProjectFAQ;
