/**
 * Created on 31.08.2019 - 20:53
 * part of taskorger
 * @author user12043
 */

import React from "react";
import DataControl from "components/control_panel.data_control";
import * as utils from "util/utils";

class TopicManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: []
    };

    this.fetchTopics = this.fetchTopics.bind(this);
  }

  componentWillMount() {
    this.fetchTopics();
  }

  fetchTopics() {
    utils.apiReq("topic", data => {
      this.setState({
        topics: data.topic
      });
    });
  }

  render() {
    const { topics } = this.state;
    return (
      <DataControl
        api="topic"
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
        data={topics}
        header="Topic Management"
        onSave={this.fetchTopics}
      />
    );
  }
}

export default TopicManagement;
