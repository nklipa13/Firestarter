import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ModalHeader from '../ModalHeader';
import Tabs from '../../Tabs/Tabs';
import { resetProjectFundForms } from '../../../actions/projectActions';
import ProjectOneTimeForm from './ProjectOneTimeForm/ProjectOneTimeForm';
import ProjectVestForm from './ProjectVestForm/ProjectVestForm';

import './ProjectFundModal.scss';

class ProjectFundModal extends Component {
  componentWillUnmount() {
    this.props.resetProjectFundForms();
  }

  render() {
    const { closeModal, projectId } = this.props;

    return (
      <div className="project-fund-modal-wrapper">
        <ModalHeader closeModal={closeModal} />

        <Tabs>
          <div label="One time">
            <ProjectOneTimeForm projectId={projectId} closeModal={closeModal} />
          </div>

          <div label="Vest">
            <ProjectVestForm projectId={projectId} closeModal={closeModal} />
          </div>

          <div label="Compound">Compound</div>
        </Tabs>
      </div>
    );
  }
}

ProjectFundModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  resetProjectFundForms: PropTypes.func.isRequired,
  projectId: PropTypes.number.isRequired,
};

const mapDispatchToProps = {
  resetProjectFundForms,
};

export default connect(null, mapDispatchToProps)(ProjectFundModal);
