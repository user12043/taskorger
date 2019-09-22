/**
 * Created on 1.09.2019 - 10:31
 * part of taskorger
 * @author user12043
 */

import React from "react";
import DataControl from "components/control_panel.data_control";

const ColumnManagement = () => {
  return (
    <DataControl
      api="column"
      apiAccess="columns"
      fields={[
        { name: "Name", key: "name", type: "text" },
        { name: "Ordinal", key: "ordinal", type: "number", defaultValue: 1 },
        {
          name: "Limit",
          key: "columnLimit",
          type: "number",
          defaultValue: 10
        },
        {
          name: "Create Date",
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
      header="Column Management"
    />
  );
};

export default ColumnManagement;
