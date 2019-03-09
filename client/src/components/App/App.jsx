import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect, Provider } from 'react-redux';
import { silentLogin } from '../../actions/accountActions';

import HomePage from '../HomePage/HomePage';
import Page404 from '../Page404/Page404';
import ModalRoot from '../Modals/ModalRoot';
import Header from '../Header/Header';
import ProjectRoutes from '../Project/ProjectRoutes';
import StartProject from '../StartProject/StartProject';
import Loader from '../Loader/Loader';
import Notification from '../Notification/Notification';
import TxNotifications from '../TxNotifications/TxNotifications';

import '../../common/fonts.scss';
import './App.scss';

class RoutesWrapper extends Component {
  componentWillMount() {
    this.props.silentLogin();
  }

  render() {
    const { store, connectingProvider } = this.props;

    if (connectingProvider) {
      return <Loader />;
    }

    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="app">
            <Header />
            <Notification />
            <TxNotifications />

            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/start-project" component={StartProject} />
              <Route path="/project/:id" component={ProjectRoutes} />
              <Route path="*" component={Page404} />
            </Switch>

            <ModalRoot />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

RoutesWrapper.propTypes = {
  store: PropTypes.object.isRequired,
  silentLogin: PropTypes.func.isRequired,
  connectingProvider: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ account }) => ({
  connectingProvider: account.connectingProvider,
});

const mapDispatchToProps = {
  silentLogin,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RoutesWrapper);
