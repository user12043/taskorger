//modules
import React from 'react';
// styles
import "./css/index.css";
import "bootstrap/dist/css/bootstrap.min.css"
// components
import AppNavBar from "./components/navbar";

class App extends React.Component {
  constructor(props) {
    super(props);
    // this.state.loggedIn = false
  }

  render() {
    return (
      <AppNavBar loggedIn={true}/>
    );
  }
}

export default App;
