/**
 * Created on 18.06.2019 - 11:04
 * part of taskorger
 * @author user12043
 */

import React from "react";
import {Button, Col, Container, Form, FormGroup, Input, Label} from "reactstrap";
import constants from "../constants";
import "../css/login.css";
import {withRouter} from "react-router-dom";

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

    //redirect to login if not
    if (this.props.location.pathname !== constants.ROUTES.LOGIN) {
      this.props.history.push(constants.ROUTES.LOGIN);
    }
  }

  onSubmit(event) {
    event.preventDefault();
    this.setState({ submitted: true });
    console.log("login: ", this.state.username + ", " + this.state.password);
    if (!this.props.onLogin(this.state.username, this.state.password)) {
      this.setState({ submitted: false });
    }
  }

  onChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  validateForm() {
    return this.state.username.length && this.state.password.length;
  }

  render() {
    return (
      <Container className="loginContainer border border-info">
        <h2>Sign In</h2>
        <Form className="form" onSubmit={this.onSubmit}>
          <Col>
            <FormGroup>
              <Label>Username</Label>
              <Input
                onChange={this.onChange}
                type="text"
                name="username"
                id="username"
                placeholder="username"
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                onChange={this.onChange}
                type="password"
                name="password"
                id="password"
                placeholder="********"
              />
            </FormGroup>
          </Col>
          <Button
            disabled={!this.validateForm() && !this.state.submitted}
            type="submit"
          >
            Submit
          </Button>
        </Form>
      </Container>
    );
  }
}

export default withRouter(Login);
