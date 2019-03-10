import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { openProjectAddProposalModal } from '../../../actions/modalActions';

import './ProjectProposals.scss';

const ProjectProposals = ({
  isOwner, projectId, addingProposal, openProjectAddProposalModal,
}) => (
  <div className="project-proposals-wrapper">
    {
      isOwner && (
        <button
          className="button uppercase text-large-margin"
          type="button"
          disabled={addingProposal}
          onClick={() => { openProjectAddProposalModal(projectId); }}
        >
          Make a proposal
        </button>
      )
    }
  </div>
);

ProjectProposals.propTypes = {
  projectId: PropTypes.number.isRequired,
  isOwner: PropTypes.bool.isRequired,
  addingProposal: PropTypes.bool.isRequired,
  openProjectAddProposalModal: PropTypes.func.isRequired,
};

const mapStateToProps = ({ project }) => ({
  addingProposal: project.addingProposal,
});

const mapDispatchToProps = {
  openProjectAddProposalModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectProposals);
