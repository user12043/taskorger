import React, {Component} from "react";
import * as utils from "../utils";
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";

class UserSelect extends Component {
  constructor(props) {
    super(props);

    this.fetchUsers = this.fetchUsers.bind(this);
    this.toggle = this.toggle.bind(this);
    this.addSelected = this.addSelected.bind(this);

    this.state = {
      users: [],
      isOpen: false,
      selectedIndices: []
    }
  }

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers() {
    utils.apiReq("user", (data) => {
      this.setState({
        users: data["user"],
        selectedIndices: []
      });
    })
  }

  toggle() {
    this.setState({isOpen: !this.state.isOpen});
  }

  addSelected(e) {
    let selectedIndices = [...this.state.selectedIndices, ...e.target.value];
    this.setState({selectedIndices});
  }

  render() {
    return (
      <div>
        <Dropdown isOpen={this.state.isOpen} toggle={this.toggle} direction="right">
          <DropdownToggle className="text-light" caret>
            {this.state.selectedIndices.length ? this.state.selectedIndices.map((index) => (
              <span key={this.state.users[index].username}>{this.state.users[index].name}</span>
            )) : "Select assignees..."}
          </DropdownToggle>
          <DropdownMenu>
            {this.state.users.map((user, index) => (
              <DropdownItem key={user.username}
                            onClick={this.addSelected}
                            value={index}
              >{user.name}</DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  }
}

export default UserSelect;