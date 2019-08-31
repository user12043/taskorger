import React, { Component } from "react";
import * as utils from "../utils";
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";

function SelectedUser(props) {
  return (
    <Badge className="m-1 d-flex" color="secondary" pill>
      <div className="m-1">{props.user.name}</div>
      <Badge
        tag="button"
        className="btn-danger"
        onClick={() => props.onDelete(props.user)}
        color="danger"
        pill
      >
        X
      </Badge>
    </Badge>
  );
}

class UserSelect extends Component {
  constructor(props) {
    super(props);

    this.fetchUsers = this.fetchUsers.bind(this);
    this.addSelected = this.addSelected.bind(this);
    this.removeSelected = this.removeSelected.bind(this);

    this.state = {
      users: [],
      isOpen: false,
      selectedUsers: []
    };
  }

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers() {
    utils.apiReq("user", data => {
      this.setState({
        users: data["user"],
        selectedUsers: []
      });
    });
  }

  addSelected(user) {
    let selectedUsers = [...this.state.selectedUsers, user];
    // selectedUsers.push(user);
    this.setState({ selectedUsers });
  }

  removeSelected(user) {
    let index = this.state.selectedUsers.findIndex(
      ({ username }) => username === user.username
    );
    if (index !== -1) {
      let selectedUsers = this.state.selectedUsers;
      selectedUsers.splice(index, 1);
      this.setState({ selectedUsers });
    }
  }

  render() {
    return (
      <div className="form-group">
        <div className="form-control d-flex p-0 px-1">
          {this.state.selectedUsers.map(user => (
            <SelectedUser
              key={user.username}
              user={user}
              onDelete={this.removeSelected}
            />
          ))}
          <UncontrolledDropdown className="w-100">
            <DropdownToggle className="bg-transparent w-100 border-0" tag="div">
              <input
                className="border-0 w-100"
                type="text"
                style={{ outline: "none" }}
                placeholder="select..."
              />
            </DropdownToggle>
            <DropdownMenu>
              {this.state.users
                .filter(
                  user =>
                    !this.state.selectedUsers.find(
                      ({ username }) => username === user.username
                    )
                )
                .map((user) => (
                  <DropdownItem
                    key={user.username}
                    value={user.username}
                    onClick={() => this.addSelected(user)}
                  >
                    {user.name}
                  </DropdownItem>
                ))}
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      </div>
    );
  }
}

export default UserSelect;
