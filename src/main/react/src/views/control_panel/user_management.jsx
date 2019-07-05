/**
 * Created on 05.07.2019 - 16:12
 * part of taskorger
 * @author user12043
 */

import React from "react";
import {Button, Collapse, Container, Form, FormGroup, Input, Label, Table} from "reactstrap";
import * as utils from "../../utils";
import constants from "../../constants";

class UserForm extends React.Component {
  static defaultProps = {
    onSave: null
  };

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      name: ""
    };

    this.saveUser = this.saveUser.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  saveUser(event) {
    event.preventDefault();

    this.props.onSave(true);
  }

  handleInput(event) {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  render() {
    if (!this.props.show) {
      return "";
    }
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
          <Button color="primary" onClick={this.saveUser}>Save</Button>
        </Form>
      </Container>
    );
  }
}

class UserManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      addingUser: false
    };

    this.fetchUsers = this.fetchUsers.bind(this);
    this.addUser = this.addUser.bind(this);
    this.userSaved = this.userSaved.bind(this);
  }

  fetchUsers() {
    utils.apiReq(constants.API_ROOT + "users", (data) => {
      this.setState({
        users: JSON.parse(data["user"])
      });
    });
  }

  addUser(event) {
    this.setState((state) => ({addingUser: !state.addingUser}));
  }

  userSaved(isSuccess) {
    if (isSuccess) {
      this.setState({addingUser: false});
    } else {
      alert("failed to save user!");
    }
  }

  render() {
    let users = [];
    this.state.users.forEach((user) => {
      users.push(
        <tr>
          <td>{user.id}</td>
          <td>{user.username}</td>
          <td>{user.name}</td>
        </tr>
      );
    });
    return (
      <Container className="border border-info bg-dark text-light">
        <hr/>
        <h3>Users</h3>
        <Button className="add-button" color="primary" onClick={this.addUser} outline>Add User</Button>
        <hr/>
        <Collapse isOpen={this.state.addingUser}>
          <UserForm show={this.state.addingUser} onSave={this.userSaved}/>
        </Collapse>
        <hr/>
        <Table className="text-light table-bordered">
          <thead>
          <tr>
            <th>Id</th>
            <th>Username</th>
            <th>Name</th>
            <th>Options</th>
          </tr>
          </thead>
          <tbody>{users}</tbody>
        </Table>
      </Container>
    );
  }
}

export default UserManagement;
