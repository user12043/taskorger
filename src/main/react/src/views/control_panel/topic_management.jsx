/**
 * Created on 31.08.2019 - 20:53
 * part of taskorger
 * @author user12043
 */

import React from "react";
import DataControl from "components/control_panel.data_control";

const TopicManagement = () => {
  return (
    <DataControl
      api="topic"
      apiAccess="topics"
      fields={[
        { name: "Name", key: "name", type: "text" },
        {
          name: "Foreground Color",
          key: "foreground",
          type: "color",
          defaultValue: "#0"
        },
        {
          name: "Background Color",
          key: "background",
          type: "color",
          defaultValue: "#0"
        }
      ]}
      header="Topic Management"
    />
  );
};

export default TopicManagement;
