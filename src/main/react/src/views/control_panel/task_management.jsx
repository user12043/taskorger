/**
 * Created on 21.07.2019 - 23:32
 * part of taskorger
 * @author user12043
 */
/* eslint-disable react/prop-types */

import React from "react";
import DataControl from "components/control_panel.data_control";
import MultiSelect from "components/multi_select";
import Select from "components/select";

const TaskManagement = () => {
  return (
    <DataControl
      api="task"
      apiAccess="tasks"
      header="Task Management"
      fields={[
        { name: "Header", key: "header", type: "text" },
        { name: "Content", key: "content", type: "text" },
        {
          name: "Priority",
          key: "priority",
          type: "number",
          defaultValue: "0"
        },
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
          formComponent: ({ entity, onChange } = {}) => (
            <Select
              id="topic"
              name="topic"
              className="form-control"
              api="topic"
              apiAccess="topics"
              valueKey="id"
              displayKey="name"
              defaultValue={(entity && entity.topic && entity.topic.id) || ""}
              onChange={({ target }) => onChange({ id: target.value })}
            />
          )
        },
        {
          name: "Assignees",
          key: "assignees",
          defaultValue: [],
          formComponent: ({ onChange }) => (
            <MultiSelect
              onChange={selectedList => onChange(selectedList)}
              api="user?projection=relatedUser"
              apiAccess="users"
              uniqKey="id"
              displayKey="name"
            />
          )
        },
        {
          name: "Column",
          key: "column",
          defaultValue: {},
          formComponent: ({ entity, onChange }) => (
            <Select
              id="column"
              name="column"
              className="form-control"
              api="column"
              apiAccess="columns"
              valueKey="id"
              displayKey="name"
              defaultValue={(entity && entity.column && entity.column.id) || ""}
              onChange={({ target }) => onChange({ id: target.value })}
            />
          )
        },
        {
          name: "Tags",
          key: "tags",
          defaultValue: [],
          formComponent: ({ onChange }) => (
            <MultiSelect
              onChange={selectedList => onChange(selectedList)}
              api="tag"
              apiAccess="tags"
              uniqKey="id"
              displayKey="name"
            />
          )
        }
      ]}
    />
  );
};

export default TaskManagement;
