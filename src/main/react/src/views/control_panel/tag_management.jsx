/**
 * Created on 1.09.2019 - 11:24
 * part of taskorger
 * @author user12043
 */

import React from "react";
import DataControl from "components/control_panel.data_control";
import * as utils from "util/utils";

export default class TagManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: []
    };

    this.fetchTags = this.fetchTags.bind(this);
  }

  componentWillMount() {
    this.fetchTags();
  }

  fetchTags() {
    utils.apiReq("tag", data => {
      this.setState({
        tags: data.tag
      });
    });
  }

  render() {
    const { tags } = this.state;
    return (
      <DataControl
        api="tag"
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
        data={tags}
        header="Tag Management"
        onSave={this.fetchTags}
      />
    );
  }
}
