/**
 * Created on 18.06.2019 - 11:04
 * part of taskorger
 * @author user12043
 */

import React from "react";
import {Button, Col, Container, Form, FormGroup, Input, Label} from 'reactstrap';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };

    // register custom methods
    this.onChange = this.onChange.bind(this);
    Login.onSubmit = Login.onSubmit.bind(this);
  }

  static onSubmit(event) {
    event.preventDefault();
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
      <Container>
        <h2>Sign In</h2>
        <Form className="form" onSubmit={Login.onSubmit}>
          <Col>
            <FormGroup>
              <Label>Username</Label>
              <Input onChange={this.onChange}
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
              <Input onChange={this.onChange}
                     type="password"
                     name="password"
                     id="password"
                     placeholder="********"
              />
            </FormGroup>
          </Col>
          <Button disabled={!this.validateForm()}
                  type="submit"
          >Submit</Button>
        </Form>
      </Container>
    )
  }
}

export default Login;
