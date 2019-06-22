/**
 * Created on 18.06.2019 - 11:04
 * part of taskorger
 * @author user12043
 */

import React from "react";
import {Button, Col, Container, Form, FormGroup, Input, Label,} from 'reactstrap';

class Login extends React.Component {
  render() {
    return (
      <Container>
        <h2>Sign In</h2>
        <Form className="form">
          <Col>
            <FormGroup>
              <Label>Username</Label>
              <Input
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
                type="password"
                name="password"
                id="password"
                placeholder="********"
              />
            </FormGroup>
          </Col>
          <Button>Submit</Button>
        </Form>
      </Container>
    )
  }
}

export default Login;
