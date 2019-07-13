/**
 * Created on 13.07.2019 - 09:24
 * part of taskorger
 * @author user12043
 */


import React from "react";
import {Button, Collapse, Container, Table} from "reactstrap";
import DataForm from "./data_form";

class DataControl extends React.Component {
  static defaultProps = {
    fields: [],
    data: null,
    currentData: null,
    header: null
  };

  constructor(props) {
    super(props);

    this.toggleForm = this.toggleForm.bind(this);
    this.state = {
      formOpen: false
    }
  }

  toggleForm() {
    this.setState((state) => ({
      formOpen: !state.formOpen,
      editingUser: null
    }));
  }

  render() {
    return (
      <Container className="border border-info bg-dark text-light pt-2">
        <h3>{this.props.header}</h3>
        <Button className="add-button" color={(this.state.formOpen) ? "danger" : "primary"}
                onClick={this.toggleForm}
                outline
        >
          {(this.state.formOpen) ? "Cancel" : "Add User"}
        </Button>
        <Collapse isOpen={this.state.formOpen} className="mt-2">
          <DataForm onSave={this.props.onSave}
                    currentData={this.props.currentData}
                    fields={this.props.fields}
          />
        </Collapse>
        <hr/>
        <Table className="text-light table-bordered table-responsive-sm">
          <thead>
          <tr>
            {this.props.fields.map((field, index) => <th key={index}>{field.name}</th>)}
          </tr>
          </thead>
          <tbody>
          {this.props.data.map((entity, index) => <tr key={index}>{this.props.fields.map((field, index) => <td
            key={index}>{entity[field.key]}</td>)}</tr>)}
          </tbody>
        </Table>
      </Container>
    );
  }
}

export default DataControl;
