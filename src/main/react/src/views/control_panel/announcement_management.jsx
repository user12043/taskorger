/**
 * Created on 10.07.2019 - 23:52
 * part of taskorger
 * @author user12043
 */

import React from "react";
import DataControl from "components/control_panel.data_control";

const AnnouncementManagement = () => {
  return (
    <DataControl
      api="announcement"
      apiAccess="announcements"
      fields={[
        { name: "Content", key: "content", type: "text" },
        {
          name: "Create date",
          key: "createDate",
          type: "text",
          hideInput: true
        },
        {
          name: "Update date",
          key: "updateDate",
          type: "text",
          hideInput: true
        }
      ]}
      header="Announcement Management"
    />
  );
};

export default AnnouncementManagement;
