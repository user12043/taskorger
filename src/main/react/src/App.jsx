/* eslint-disable react/prop-types */
// modules
import React from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import constants from "./util/constants";
import * as utils from "./util/utils";
import "./css/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AppNavBar from "./components/navbar";
import Login from "./views/login";
import Announcements from "./views/announcements";
import Tasks from "./views/tasks";
import NoteSrc from "./views/note_src";
import Settings from "./views/settings";
import ControlPanel from "./views/control_panel/control_panel";
import MessageDialog from "./components/message_dialog";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.onLogin = this.onLogin.bind(this);
    this.onLogout = this.onLogout.bind(this);

    this.state = {
      isMessageDialogOpen: false,
      messageDialogColor: "",
      messageDialogMessage: ""
    };
  }

  onLogin(username, password) {
    const { history } = this.props;
    utils.apiReq(
      `user/search/findByUsernameAndPassword?username=${username}&password=${password}`,
      data => {
        const { user } = data;
        if (user[0]) {
          console.log("login success");
          localStorage.setItem(constants.LOGGED_USER, JSON.stringify(user[0]));
          if (user[0].role === constants.ROLES.ADMIN) {
            localStorage.setItem(constants.USER_ADMIN, constants.ROLES.ADMIN);
          } else {
            this.forceUpdate();
          }
          // default route to announcements page
          history.push(constants.ROUTES.ANNOUNCEMENTS);
        } else {
          // alert("login failed");
          localStorage.removeItem(constants.LOGGED_USER);
          return false;
        }
      }
    );
  }

  onLogout() {
    localStorage.clear();
    this.forceUpdate();
  }

  render() {
    const { state } = this;
    const { props } = this;
    const elements = [];
    let routes = [];

    if (localStorage.getItem(constants.LOGGED_USER)) {
      elements.push(
        <AppNavBar key={elements.length} onLogout={this.onLogout} />
      );
      routes = [
        <Route
          exact
          key="0"
          path={constants.ROUTES.ANNOUNCEMENTS}
          component={Announcements}
        />,
        <Route exact key="1" path={constants.ROUTES.TASKS} component={Tasks} />,
        <Route
          exact
          key="2"
          path={constants.ROUTES.NOTE_SRC}
          component={NoteSrc}
        />,
        <Route
          exact
          key="3"
          path={constants.ROUTES.SETTINGS}
          component={Settings}
        />
      ];

      if (
        +localStorage.getItem(constants.USER_ADMIN) === constants.ROLES.ADMIN
      ) {
        routes.push(
          <Route
            key={routes.length}
            path={constants.ROUTES.CONTROL_PANEL}
            component={ControlPanel}
          />
        );
      }
    } else {
      // not logged in
      // add login route and redirect
      routes = (
        <Route key={routes.length} path={constants.ROUTES.LOGIN}>
          <Login onLogin={this.onLogin} />
        </Route>
      );
      if (props.location.pathname !== constants.ROUTES.LOGIN) {
        props.history.push(constants.ROUTES.LOGIN);
      }
    }
    return (
      <div id="appContainer">
        <MessageDialog
          isOpen={state.isMessageDialogOpen}
          color={state.messageDialogColor}
          message={state.messageDialogMessage}
        />
        {elements}
        <Switch>
          {routes}
          <Route>
            <Redirect to={constants.ROUTES.ANNOUNCEMENTS} />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
