/**
 * Created on 06.07.2019 - 21:45
 * part of taskorger
 * @author user12043
 */

import React from "react";
import * as utils from "../utils";
import {Button, Container, Form, FormGroup, Input, Label} from "reactstrap";

class UserForm extends React.Component {
  static defaultProps = {
    onSave: null
  };

  constructor(props) {
    super(props);

    this.saveUser = this.saveUser.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.state = {
      username: "",
      name: "",
      password: ""
    };
  }

  saveUser(event) {
    event.preventDefault();
    let url = "user";
    if (this.props.user) {
      url = utils.getSelfLink(this.props.user);
    }
    utils.apiReq(url, () => {
      this.props.onSave(true);
    }, {
      method: "post",
      body: JSON.stringify({
        username: this.state.username,
        name: this.state.name,
        password: this.state.password,
        createDate: new Date()
      })
    });
  }

  handleInput(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <Container>
        <Form className="border border-secondary data-form">
          <FormGroup>
            <Label for="username">Username: </Label>
            <Input type="text" id="username" name="username" value={this.state.username}
                   onChange={this.handleInput}/>
          </FormGroup>
          <FormGroup>
            <Label for="name">Name: </Label>
            <Input type="text" id="name" value={this.state.name} onChange={this.handleInput}/>
          </FormGroup>
          <FormGroup>
            <Label for="password">Password: </Label>
            <Input type="text" id="password" value={this.state.password} onChange={this.handleInput}/>
          </FormGroup>
          <Button color="success" onClick={this.saveUser}>Save</Button>
        </Form>
      </Container>
    );
  }
}

export default UserForm;
