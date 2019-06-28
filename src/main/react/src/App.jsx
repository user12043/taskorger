//modules
import React from 'react';
import constants from "./constants";
import {withRouter} from "react-router-dom";
import * as util from "./utils";
// styles
import "./css/index.css";
import "bootstrap/dist/css/bootstrap.min.css"
// components
import AppNavBar from "./components/navbar";
//views
import Login from "./views/login";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.onLogin = this.onLogin.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  onLogin(username, password) {
    util.apiReq("user/search/findByUserNameAndPassword?username=" + username + "&password=" + password, (data) => {
      let user = data["_embedded"]["user"];
      if (user[0]) {
        console.log("login success");
        localStorage.setItem(constants.LOGGED_USER, JSON.stringify(user[0]));
        this.forceUpdate();
        // default route to announcements page
        withRouter((history) => {
          history.push(constants.ROUTES.ANNOUNCEMENTS);
        });
      } else {
        alert("login failed");
        localStorage.removeItem(constants.LOGGED_USER);
      }
    });
  }

  onLogout() {
    localStorage.removeItem(constants.LOGGED_USER);
    this.forceUpdate();
  }

  render() {
    let elements = [];
    if (localStorage.getItem(constants.LOGGED_USER)) {
      elements.push(
        <AppNavBar key={elements.length}
                   user={JSON.parse(localStorage.getItem(constants.LOGGED_USER))}
                   onLogout={this.onLogout}
        />
      );
    } else {
      elements.push(<Login key={elements.length} onLogin={this.onLogin}/>);
    }
    return (
      <div id="appContainer">{elements}</div>
    );
  }
}

export default App;
