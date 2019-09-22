/**
 * Created on 05.07.2019 - 16:12
 * part of taskorger
 * @author user12043
 */
/* eslint-disable react/prop-types */

import React from "react";
import DataControl from "components/control_panel.data_control";

const UserManagement = () => {
  return (
    <DataControl
      api="user"
      apiAccess="users"
      fields={[
        { name: "Name", key: "name", type: "text" },
        { name: "Username", key: "username", type: "text" },
        {
          name: "Password",
          key: "password",
          type: "text",
          hideColumn: true
        },
        { name: "Role", key: "role", type: "number", defaultValue: "0" },
        {
          name: "Create date",
          key: "createDate",
          type: "date",
          hideInput: true,
          tableComponent: ({ value }) => <div key={value}>{value}</div>
        },
        {
          name: "Update date",
          key: "updateDate",
          type: "date",
          hideInput: true
        }
      ]}
      header="User Management"
    />
  );
};

export default UserManagement;
