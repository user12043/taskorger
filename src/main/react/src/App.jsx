//modules
import React from 'react';
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
    this.state = {
      loggedIn: false,
      loggedUser: {
        username: "username",
        name: "name"
      }
    }
  }

  render() {
    let elements = [];
    if (this.state.loggedIn) {
      elements.push(
        <AppNavBar key={elements.length} user={this.state.loggedUser}/>
      );
    } else {
      elements.push(<Login key={elements.length}/>);
    }
    return (
      <div id="appContainer">{elements}</div>
    );
  }
}

export default App;
