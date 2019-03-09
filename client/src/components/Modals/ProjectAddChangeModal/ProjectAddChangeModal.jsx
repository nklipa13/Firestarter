import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProjectAddChangeForm from './ProjectAddChangeForm/ProjectAddChangeForm';
import { resetProjectAddChange } from '../../../actions/projectActions';
import ModalHeader from '../ModalHeader';

import './ProjectAddChangeModal.scss';

class ProjectAddChangeModal extends Component {
  componentWillMount() {
    this.props.resetProjectAddChange();
  }

  render() {
    const { closeModal, projectId } = this.props;

    return (
      <div className="project-add-question-modal-wrapper">
        <ModalHeader closeModal={closeModal} />

        <ProjectAddChangeForm closeModal={closeModal} projectId={projectId} />
      </div>
    );
  }
}

ProjectAddChangeModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  resetProjectAddChange: PropTypes.func.isRequired,
  projectId: PropTypes.number.isRequired,
};

const mapDispatchToProps = {
  resetProjectAddChange,
};

export default connect(null, mapDispatchToProps)(ProjectAddChangeModal);
