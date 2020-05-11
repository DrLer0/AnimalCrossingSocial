import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Chart } from 'react-chartjs-2';
import { ThemeProvider } from '@material-ui/styles';
import validate from 'validate.js';

import { chartjs } from './helpers';
import theme from './theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';
import validators from './common/validators';
import Routes from './Routes';

import { Provider } from "react-redux";
import store from "./store";

import { Minimal as MinimalLayout } from './layouts';
import {
  SignIn as SignInView,
  SignUp as SignUpView
} from './views';

const browserHistory = createBrowserHistory();

Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
  draw: chartjs.draw
});

validate.validators = {
  ...validate.validators,
  ...validators
};

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Router history={browserHistory}>
            <Route
              component={SignInView}
              exact
              layout={MinimalLayout}
              path="/sign-in"
            />
            <Route
              component={SignUpView}
              exact
              layout={MinimalLayout}
              path="/sign-up"
            />

            <Routes />
          </Router>
        </ThemeProvider>
      </Provider>
    );
  }
}
