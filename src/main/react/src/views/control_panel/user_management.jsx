/**
 * Created on 05.07.2019 - 16:12
 * part of taskorger
 * @author user12043
 */

import React from "react";
import * as utils from "util/utils";
import DataControl from "components/control_panel.data_control";

class UserManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };

    this.fetchUsers = this.fetchUsers.bind(this);
  }

  fetchUsers() {
    utils.apiReq("user", data => {
      this.setState({
        users: data["user"]
      });
    });
  }

  componentWillMount() {
    this.fetchUsers();
  }

  render() {
    return (
      <DataControl
        api="user"
        fields={[
          { name: "Name", key: "name", type: "text" },
          { name: "Username", key: "username", type: "text" },
          { name: "Password", key: "password", type: "password" },
          { name: "Role", key: "role", type: "number", defaultValue: "0" },
          {
            name: "Create date",
            key: "createDate",
            type: "date",
            hideInput: true
          },
          {
            name: "Update date",
            key: "updateDate",
            type: "date",
            hideInput: true
          }
        ]}
        data={this.state.users}
        header="User Management"
        onSave={this.fetchUsers}
      />
    );
  }
}

export default UserManagement;
