/**
 * Created on 10.07.2019 - 23:52
 * part of taskorger
 * @author user12043
 */

import React from "react";
import DataControl from "../../components/control_panel.data_control";
import * as utils from "../../utils";

class AnnouncementManagement extends React.Component {
  constructor(props) {
    super(props);

    this.fetchAnnouncements = this.fetchAnnouncements.bind(this);
    this.state = {
      announcements: []
    }
  }

  fetchAnnouncements() {
    utils.apiReq("announcement", (data) => {
      this.setState({
        announcements: data["announcement"]
      });
    });
  }

  componentWillMount() {
    this.fetchAnnouncements();
  }

  render() {
    return (
      <DataControl api="announcement"
                   fields={[
                     {name: "Content", key: "content", type: "text"},
                     {name: "Create date", key: "createDate", type: "text", hideInput: true},
                     {name: "Update date", key: "updateDate", type: "text", hideInput: true}
                   ]}
                   data={this.state.announcements}
                   header="Announcement Management"
                   onSave={this.fetchAnnouncements}
      />
    );
  }
}

export default AnnouncementManagement;
