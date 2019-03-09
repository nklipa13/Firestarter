import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { resetProjectWithdraw } from '../../../actions/projectActions';
import ModalHeader from '../ModalHeader';
import ProjectWithdrawForm from './ProjectWithdrawForm/ProjectWithdrawForm';

import './ProjectWithdrawModal.scss';

class ProjectWithdrawModal extends Component {
  componentWillUnmount() {
    this.props.resetProjectWithdraw();
  }

  render() {
    const { closeModal, projectId } = this.props;

    return (
      <div className="project-withdraw-modal-wrapper">
        <ModalHeader closeModal={closeModal} />

        <ProjectWithdrawForm closeModal={closeModal} projectId={projectId} />
      </div>
    );
  }
}

ProjectWithdrawModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  resetProjectWithdraw: PropTypes.func.isRequired,
  projectId: PropTypes.number.isRequired,
};

const mapDispatchToProps = {
  resetProjectWithdraw,
};

export default connect(null, mapDispatchToProps)(ProjectWithdrawModal);
