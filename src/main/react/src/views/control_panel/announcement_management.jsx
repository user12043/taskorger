/**
 * Created on 10.07.2019 - 23:52
 * part of taskorger
 * @author user12043
 */


import React from "react";
import DataControl from "../../components/data_control";
import * as utils from "../../utils";

class AnnouncementManagement extends React.Component {
  constructor(props) {
    super(props);

    this.fetchAnnouncements = this.fetchAnnouncements.bind(this);
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
      <DataControl
        fields={[
          {name: "Field 1", key: "f1", type: "text"},
          {name: "Field 2", key: "f2", type: "text"},
          {name: "Field 3", key: "f3", type: "password"},
        ]}
        data={[
          {f1: "f1value", f2: "f2value", f3: "f3value"}
        ]}
        header="Announcement Management"
      />
    );
  }
}

export default AnnouncementManagement;
