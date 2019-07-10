/**
 * Created on 05.07.2019 - 16:12
 * part of taskorger
 * @author user12043
 */

import React from "react";
import {Button, ButtonGroup, Collapse, Container, Table} from "reactstrap";
import * as utils from "../../utils";
import UserForm from "../../components/user_form";

class UserManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      formOpen: false,
      editingUser: null
    };

    this.fetchUsers = this.fetchUsers.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.userSaved = this.userSaved.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.editUser = this.editUser.bind(this);
  }

  fetchUsers() {
    utils.apiReq("user", (data) => {
      this.setState({
        users: data["user"]
      });
    });
  }

  toggleForm() {
    this.setState((state) => ({
      formOpen: !state.formOpen,
      editingUser: null
    }));
  }

  userSaved() {
    this.setState({formOpen: false});
    this.fetchUsers();
  }

  componentWillMount() {
    this.fetchUsers();
  }

  deleteUser(user) {
    utils.apiReq(utils.getSelfLink(user), () => {
      this.fetchUsers();
    }, {
      method: "delete"
    });
  }

  editUser(user) {
    this.setState({
      editingUser: user,
      formOpen: true
    });
  }

  render() {
    let users = [];
    this.state.users.forEach((user, index) => {
      users.push(
        <tr key={index}>
          <td>{user.username}</td>
          <td>{user.name}</td>
          <td style={{width: "1px"}}>
            <ButtonGroup>
              <Button color="primary" onClick={() => this.editUser(user)} outline>Edit</Button>
              <Button color="danger" onClick={() => this.deleteUser(user)} outline>Delete</Button>
            </ButtonGroup>
          </td>
        </tr>
      );
    });
    return (
      <Container className="border border-info bg-dark text-light pt-2">
        <h3>Users</h3>
        <Button className="add-button" color={(this.state.formOpen) ? "danger" : "primary"}
                onClick={this.toggleForm}
                outline
        >
          {(this.state.formOpen) ? "Cancel" : "Add User"}
        </Button>
        <Collapse isOpen={this.state.formOpen} className="mt-2">
          <UserForm onSave={this.userSaved} user={this.state.editingUser}/>
        </Collapse>
        <hr/>
        <Table className="text-light table-bordered table-responsive-sm">
          <thead>
          <tr>
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
