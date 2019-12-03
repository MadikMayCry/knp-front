import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter
} from "react-router-dom";

// Pages
import AuthPage from "Pages/Authorization/AuthPage";
import AuthLayout from "Layout/AuthLayout";
import MainLayout from "Layout/MainLayout";

import Test from "Pages/Test";

import Home from "Pages/Home";
import CreateStatement from "Pages/Tax/CreateStatement";

import "antd/dist/antd.css";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/authorization"
            render={props => <AuthLayout {...props} component={AuthPage} />}
          />
          <Route
            exact
            path="/"
            render={props => <MainLayout {...props} component={Home} />}
          />
          <Route
            exact
            path="/tax-create"
            render={props => <MainLayout {...props} component={CreateStatement} />}
          />
          <Route
            exact
            path="/test"
            render={props => <MainLayout {...props} component={Test} />}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
