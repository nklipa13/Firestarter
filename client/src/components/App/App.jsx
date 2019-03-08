import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import Page404 from '../Page404/Page404';
import ModalRoot from '../Modals/ModalRoot';

import '../../common/fonts.scss';
import './App.scss';

class RoutesWrapper extends Component {
  componentWillMount() {
    console.log('');
  }

  render() {
    const { store } = this.props;

    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="app">

            <Switch>
              <Route exact path="/" component={HomePage} />
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
};

export default RoutesWrapper;