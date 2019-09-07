/**
 * Created on 21.07.2019 - 23:32
 * part of taskorger
 * @author user12043
 */

import React from "react";
import * as util from "util/utils";
import DataControl from "components/control_panel.data_control";
import MultiSelect from "components/multi_select";

class TaskManagement extends React.Component {
  constructor(props) {
    super(props);

    this.fetchData = this.fetchData.bind(this);
    this.state = {
      tasks: [],
      topics: [],
      columns: []
    };
  }

  componentWillMount() {
    this.fetchData();
  }

  async fetchData() {
    let tasks = [];
    let topics = [];
    let columns = [];
    await util.apiReq("task", data => {
      tasks = data.task;
    });

    await util.apiReq("topic", data => {
      topics = data.topic;
    });

    await util.apiReq("column", data => {
      columns = data.column;
    });

    this.setState({
      tasks,
      topics,
      columns
    });
  }

  render() {
    const { tasks, topics, columns } = this.state;
    return (
      <DataControl
        api="task"
        data={tasks}
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
          {
            name: "Topic",
            key: "topic",
            formComponent: ({ entity, onChange }) => (
              <select
                id="topic"
                name="topic"
                value={entity.topic.id}
                onChange={value => onChange(value)}
              >
                {topics.map(({ id, name }) => (
                  <option value={id}>{name}</option>
                ))}
              </select>
            )
          },
          {
            name: "Assignees",
            key: "assignees",
            defaultValue: [],
            formComponent: ({ onChange }) => (
              <MultiSelect
                onChange={selectedList => onChange("assignees", selectedList)}
                api="user?projection=relatedUser"
                apiAccess="user"
                uniqKey="id"
                displayKey="name"
              />
            )
          },
          {
            name: "Column",
            key: "column",
            defaultValue: {},
            formComponent: ({ entity }) => (
              <select id="column" name="column" value={entity.column.id}>
                {columns.map(({ id, name }) => (
                  <option value={id}>{name}</option>
                ))}
              </select>
            )
          },
          {
            name: "Tag",
            key: "tags",
            defaultValue: []
          }
        ]}
      />
    );
  }
}

export default TaskManagement;
