/**
 * Created on 31.08.2019 - 20:53
 * part of taskorger
 * @author user12043
 */

import React from "react";
import DataControl from "../../components/control_panel.data_control";
import * as utils from "../../utils";

class TopicManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: []
    };

    this.fetchTopics = this.fetchTopics.bind(this);
  }

  fetchTopics() {
    utils.apiReq("topic", data => {
      this.setState({
        topics: data["topic"]
      });
    });
  }

  componentWillMount() {
    this.fetchTopics();
  }

  render() {
    return (
      <DataControl
        api="topic"
        fields={[
          { name: "Name", key: "name", type: "text" },
          {
            name: "Foreground Color",
            key: "foreground",
            type: "color",
            defaultValue: "#000000"
          },
          {
            name: "Background Color",
            key: "background",
            type: "color",
            defaultValue: "#000000"
          }
        ]}
        data={this.state.topics}
        header="Topic Management"
        onSave={this.fetchTopics}
      />
    );
  }
}

export default TopicManagement;
