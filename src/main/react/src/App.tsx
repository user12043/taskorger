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

const appRoutes = () => {
  const routes = [
    { path: constants.ROUTES.ANNOUNCEMENTS, component: Announcements },
    { path: constants.ROUTES.TASKS, component: Tasks },
    { path: constants.ROUTES.NOTE_SRC, component: NoteSrc },
    { path: constants.ROUTES.SETTINGS, component: Settings }
  ];
  if (utils.isAdmin()) {
    routes.push({
      path: constants.ROUTES.CONTROL_PANEL,
      component: ControlPanel,
      notExact: true
    });
    return routes;
  }
};

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
        const { users } = data;
        if (users[0]) {
          console.log("login success");
          const { id, username, name, role } = users[0];
          localStorage.setItem(
            constants.LOGGED_USER,
            JSON.stringify({ id, username, name, role })
          );
          // default route to announcements page
          history.push(constants.ROUTES.ANNOUNCEMENTS);
        } else {
          // TODO login failed global alert
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
    const { location } = this.props;
    const elements = [];
    let routes = [];

    if (localStorage.getItem(constants.LOGGED_USER)) {
      elements.push(
        <AppNavBar
          key={elements.length}
          onLogout={this.onLogout}
          user={JSON.parse(localStorage.getItem(constants.LOGGED_USER))}
        />
      );

      routes = appRoutes().map(({ path, component, notExact }) => (
        <Route exact={!notExact} key={path} path={path} component={component} />
      ));
    }
    console.log(`location:${JSON.stringify(location)}`);

    let content;
    if (localStorage.getItem(constants.LOGGED_USER)) {
      content = (
        <>
          {elements}
          <Switch>
            {routes}
            <Route>
              <Redirect to={constants.ROUTES.ANNOUNCEMENTS} />
            </Route>
          </Switch>
        </>
      );
    } else if (location.pathname === constants.ROUTES.LOGIN) {
      content = (
        <Route key={routes.length} path={constants.ROUTES.LOGIN}>
          <Login onLogin={this.onLogin} />
        </Route>
      );
    } else {
      content = <Redirect to={constants.ROUTES.LOGIN} />;
    }

    return (
      <div id="appContainer">
        {content}

        <MessageDialog
          isOpen={state.isMessageDialogOpen}
          color={state.messageDialogColor}
          message={state.messageDialogMessage}
        />
      </div>
    );
  }
}

export default withRouter(App);
