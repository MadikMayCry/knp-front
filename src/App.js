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
import ZeroZeroOneWrapper from "Pages/Applications/CreateForms/ZeroZeroOne";
import ZeroZeroSevenWrapper from "Pages/Applications/CreateForms/ZeroZeroSeven";
import Applications from "Pages/Applications";
import FnoList from "Pages/FNO/journal";
import WrapperNotification from "Pages/Notification/List";
import SearchResults from "Pages/SearchResults";
import Calendar from "Pages/Calendar";

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
            path="/"
            render={props => <AuthLayout {...props} component={AuthPage} />}
          />
          <Route
            exact
            path="/home"
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
            render={props => <MainLayout {...props} component={FnoList} />}
          />
          <Route
            exact
            path="/sign-up-form"
            render={props => <MainLayout {...props} component={Signup} />}
          />
          {/* <Route
            exact
            path="/react-hook-form"
            render={props => (
              <MainLayout {...props} component={ReactHookForm} />
            )}
          /> */}
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
            path="/001"
            render={props => (
              <MainLayout {...props} component={ZeroZeroOneWrapper} />
            )}
          />
          <Route
            exact
            path="/007"
            render={props => (
              <MainLayout {...props} component={ZeroZeroSevenWrapper} />
            )}
          />
          <Route
            exact
            path="/applications"
            render={props => <MainLayout {...props} component={Applications} />}
          />
          <Route
            exact
            path="/notification-list"
            render={props => (
              <MainLayout {...props} component={WrapperNotification} />
            )}
          />
          <Route
            exact
            path="/search-results"
            render={props => (
              <MainLayout {...props} component={SearchResults} />
            )}
          />
          <Route
            exact
            path="/calendar"
            render={props => (
              <MainLayout {...props} component={Calendar} />
            )}
          />
          
        </Switch>
      </Router>
    );
  }
}

export default App;
