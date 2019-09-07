/**
 * Created on 18.06.2019 - 11:04
 * part of taskorger
 * @author user12043
 */

import React from "react";
import constants from "util/constants";
import "css/login.css";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      submitted: false
    };

    // register custom methods
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // redirect to login if not
    if (props.location.pathname !== constants.ROUTES.LOGIN) {
      props.history.push(constants.ROUTES.LOGIN);
    }
  }

  onSubmit(event) {
    event.preventDefault();
    this.setState({ submitted: true });
    const { username, password } = this.state;
    const { onLogin } = this.props;
    console.log("login: ", `${username}, ${password}`);
    if (!onLogin(username, password)) {
      this.setState({ submitted: false });
    }
  }

  onChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  validateForm() {
    const { username, password } = this.state;
    return username.length && password.length;
  }

  render() {
    const { submitted } = this.state;
    return (
      <div className="container loginContainer border border-info">
        <h2>Sign In</h2>
        <form className="form" onSubmit={this.onSubmit}>
          <div className="col">
            <div className="form-group">
              <label htmlFor="username">
                Username
                <input
                  className="form-control"
                  onChange={this.onChange}
                  type="text"
                  name="username"
                  id="username"
                  placeholder="username"
                />
              </label>
            </div>
          </div>
          <div className="col">
            <div className="form-group">
              <label htmlFor="password">
                Password
                <input
                  className="form-control"
                  onChange={this.onChange}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="********"
                />
              </label>
            </div>
          </div>
          <button
            className="btn btn-primary"
            disabled={!this.validateForm() && !submitted}
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  onLogin: PropTypes.func.isRequired
};

export default withRouter(Login);
