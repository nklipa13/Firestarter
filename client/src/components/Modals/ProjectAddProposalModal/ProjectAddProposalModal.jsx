import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ModalHeader from '../ModalHeader';
import { resetProjectAddProposal } from '../../../actions/projectActions';
import ProjectAddProposalForm from './ProjectAddProposalForm/ProjectAddProposalForm';

import './ProjectAddProposalModal.scss';

class ProjectAddProposalModal extends Component {
  componentWillUnmount() {
    this.props.resetProjectAddProposal();
  }

  render() {
    const { closeModal, projectId } = this.props;

    return (
      <div className="project-add-proposal-modal-wrapper">
        <ModalHeader closeModal={closeModal} />

        <ProjectAddProposalForm projectId={projectId} closeModal={closeModal} />
      </div>
    );
  }
}

ProjectAddProposalModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  resetProjectAddProposal: PropTypes.func.isRequired,
  projectId: PropTypes.number.isRequired,
};

const mapDispatchToProps = {
  resetProjectAddProposal,
};

export default connect(null, mapDispatchToProps)(ProjectAddProposalModal);
