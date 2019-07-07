/**
 * Created on 06.07.2019 - 21:45
 * part of taskorger
 * @author user12043
 */

import React from "react";
import * as utils from "../utils";
import {Alert, Button, Container, Form, FormGroup, Input, Label} from "reactstrap";

class UserForm extends React.Component {
  static defaultProps = {
    onSave: null,
  };

  constructor(props) {
    super(props);

    this.saveUser = this.saveUser.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.state = {
      username: "",
      name: "",
      password: "",
      error: null
    };
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      username: (nextProps.user) ? nextProps.user.username : "",
      name: (nextProps.user) ? nextProps.user.name : "",
      password: (nextProps.user) ? nextProps.user.password : "",
      error: null
    });
  }

  saveUser(event) {
    event.preventDefault();
    utils.apiReq("user", () => {
      this.props.onSave();
    }, {
      method: "post",
      body: JSON.stringify({
        username: this.state.username,
        name: this.state.name,
        password: this.state.password,
        createDate: new Date()
      })
    }, (response) => {
      this.setState({error: "Saving failed: " + response.message});
    });
  }

  handleInput(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  validateForm() {
    return this.state.username
      && this.state.username.length
      && this.state.name
      && this.state.name.length
      && this.state.password
      && this.state.password.length;
  }

  render() {
    let errorAlert = "";
    if (this.state.error) {
      errorAlert = <Alert color="danger">{this.state.error}</Alert>;
    }

    return (
      <Container>
        {errorAlert}
        <Form className="border border-secondary data-form" onSubmit={this.saveUser}>
          <FormGroup>
            <Label for="username">Username: </Label>
            <Input type="text" id="username" name="username" value={this.state.username}
                   onChange={this.handleInput}/>
          </FormGroup>
          <FormGroup>
            <Label for="name">Name: </Label>
            <Input type="text" id="name" name="name" value={this.state.name} onChange={this.handleInput}/>
          </FormGroup>
          <FormGroup>
            <Label for="password">Password: </Label>
            <Input type="text" id="password" name="password" value={this.state.password} onChange={this.handleInput}/>
          </FormGroup>
          <Button color="success" disabled={!this.validateForm()}>Save</Button>
        </Form>
      </Container>
    );
  }
}

export default UserForm;
