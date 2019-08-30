/**
 * Created on 21.07.2019 - 23:32
 * part of taskorger
 * @author user12043
 */

import React from "react";
import * as util from "../../utils";
import DataControl from "../../components/control_panel.data_control";
import UserSelect from "../../components/user_select";

class TaskManagement extends React.Component {
  constructor(props) {
    super(props);

    this.fetchTasks = this.fetchTasks.bind(this);
    this.state = {
      tasks: []
    };
  }

  fetchTasks() {
    util.apiReq("task", data => {
      this.setState({
        tasks: data["task"]
      });
    });
  }

  componentWillMount() {
    this.fetchTasks();
  }

  render() {
    return (
      <DataControl
        api="task"
        data={this.state.tasks}
        header="Task Management"
        fields={[
          { name: "Header", key: "header", type: "text" },
          { name: "Content", key: "content", type: "text" },
          { name: "Priority", key: "priority", type: "number" },
          { name: "Deadline", key: "deadline", type: "date" },
          { name: "Status", key: "status", type: "number" },
          {
            name: "Create Date",
            key: "createDate",
            type: "date",
            hideInput: true
          },
          {
            name: "Update Date",
            key: "updateDate",
            type: "date",
            hideInput: true
          },
          { name: "Topic", key: "topic", type: "text" },
          { name: "Assignees", key: "assignees", component: <UserSelect /> }
        ]}
      />
    );
  }
}

export default TaskManagement;
