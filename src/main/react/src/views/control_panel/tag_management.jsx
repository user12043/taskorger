/**
 * Created on 1.09.2019 - 11:24
 * part of taskorger
 * @author user12043
 */

import React from "react";
import DataControl from "components/control_panel.data_control";

const TagManagement = () => {
  return (
    <DataControl
      api="tag"
      apiAccess="tags"
      fields={[
        { name: "Name", key: "name", type: "text" },
        { name: "Color", key: "color", type: "color", defaultValue: "#0" },
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
      header="Tag Management"
    />
  );
};

export default TagManagement;
