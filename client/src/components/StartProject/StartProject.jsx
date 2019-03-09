import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { resetStartProjectForm } from '../../actions/startProjectActions';
import StartProjectForm from './StartProjectForm/StartProjectForm';

import './StartProject.scss';
import Loader from '../Loader/Loader';
import NoProvider from '../NoProvider/NoProvider';

class StartProject extends Component {
  componentWillUnmount() {
    this.props.resetStartProjectForm();
  }

  render() {
    const { history, connectingProvider, account } = this.props;

    if (connectingProvider) {
      return <Loader />;
    }

    if (account === '') {
      return <NoProvider />;
    }

    return (
      <div className="start-project-wrapper">
        <div className="width-container">
          <div className="main-title heading-2 text-large-margin text-light">
            Start a project
          </div>

          <div className="sub-title heading-4 text-light">
            Complete this simple form to start your project on Firestarter
          </div>

          <StartProjectForm history={history} />
        </div>
      </div>
    );
  }
}

StartProject.propTypes = {
  resetStartProjectForm: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  connectingProvider: PropTypes.bool.isRequired,
  account: PropTypes.string.isRequired,
};

const mapStateToProps = ({ account }) => ({
  connectingProvider: account.connectingProvider,
  account: account.account,
});

const mapDispatchToProps = {
  resetStartProjectForm,
};

export default connect(mapStateToProps, mapDispatchToProps)(StartProject);
