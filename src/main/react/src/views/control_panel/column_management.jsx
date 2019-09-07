/**
 * Created on 1.09.2019 - 10:31
 * part of taskorger
 * @author user12043
 */

import React from "react";
import * as utils from "util/utils";
import DataControl from "components/control_panel.data_control";

class ColumnManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: []
    };

    this.fetchColumns = this.fetchColumns.bind(this);
  }

  componentWillMount() {
    this.fetchColumns();
  }

  fetchColumns() {
    utils.apiReq("column", data => {
      this.setState({
        columns: data.column
      });
    });
  }

  render() {
    const { columns } = this.state;
    return (
      <DataControl
        api="column"
        fields={[
          { name: "Name", key: "name", type: "text" },
          { name: "Ordinal", key: "ordinal", type: "number", defaultValue: 1 },
          {
            name: "Limit",
            key: "columnLimit",
            type: "number",
            defaultValue: 10
          },
          {
            name: "Create Date",
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
        data={columns}
        header="Column Management"
        onSave={this.fetchColumns}
      />
    );
  }
}

export default ColumnManagement;
