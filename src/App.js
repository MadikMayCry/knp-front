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
import ListStatements from "Pages/Tax/ListStatements";

import FNOList from "Pages/FNO/List";

import "antd/dist/antd.css";
import "./App.css";
import Fetching from "Pages/Fetching";
import Signup from "Pages/HooksForm";
import ReactHookForm from "Pages/HooksForm/ReactHookForm";
import FNO from "Pages/FNO";
import WrapperFNOMPO from "Pages/FNO/fno-mpo";
import Declaration from "Pages/Declaration";
import ZeroZeroOneWrapper from "Pages/Tax/CreateForms/ZeroZeroOne";
import ZeroZeroSevenWrapper from "Pages/Tax/CreateForms/ZeroZeroSeven";

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
            render={props => (
              <MainLayout {...props} component={CreateStatement} />
            )}
          />
          <Route
            exact
            path="/tax-list"
            render={props => (
              <MainLayout {...props} component={ListStatements} />
            )}
          />
          {/* Fetching */}
          <Route
            exact
            path="/test"
            render={props => <MainLayout {...props} component={Test} />}
          />
          <Route
            exact
            path="/fetching"
            render={props => <MainLayout {...props} component={Fetching} />}
          />
          <Route
            exact
            path="/fno-list"
            render={props => <MainLayout {...props} component={FNOList} />}
          />
          s
          <Route
            exact
            path="/sign-up-form"
            render={props => <MainLayout {...props} component={Signup} />}
          />
          <Route
            exact
            path="/react-hook-form"
            render={props => (
              <MainLayout {...props} component={ReactHookForm} />
            )}
          />
          <Route
            exact
            path="/fno"
            render={props => <MainLayout {...props} component={FNO} />}
          />
          <Route
            exact
            path="/fno-mpo"
            render={props => (
              <MainLayout {...props} component={WrapperFNOMPO} />
            )}
          />
          <Route
            exact
            path="/declaration"
            render={props => <MainLayout {...props} component={Declaration} />}
          />
          <Route
            exact
            path="/zero-zero-one"
            render={props => (
              <MainLayout {...props} component={ZeroZeroOneWrapper} />
            )}
          />
          <Route
            exact
            path="/zero-zero-seven"
            render={props => (
              <MainLayout {...props} component={ZeroZeroSevenWrapper} />
            )}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
