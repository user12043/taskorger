/**
 * Created on 13.07.2019 - 09:24
 * part of taskorger
 * @author user12043
 */

import React from "react";
import { Button, ButtonGroup, Collapse, Container, Table } from "reactstrap";
import DataForm from "./control_panel.data_form";
import * as utils from "util/utils";

class DataControl extends React.Component {
  static defaultProps = {
    fields: [],
    data: null,
    entity: null,
    header: null
  };

  constructor(props) {
    super(props);

    this.toggleForm = this.toggleForm.bind(this);
    this.editEntity = this.editEntity.bind(this);
    this.deleteEntity = this.deleteEntity.bind(this);
    this.onSave = this.onSave.bind(this);
    this.state = {
      formOpen: false,
      editingEntity: null
    };
  }

  toggleForm() {
    this.setState(state => ({
      formOpen: !state.formOpen,
      editingEntity: null
    }));
  }

  onSave() {
    this.setState({
      formOpen: false,
      editingEntity: null
    });
    this.props.onSave && this.props.onSave();
  }

  editEntity(entity) {
    this.setState({ editingEntity: entity, formOpen: true });
  }

  deleteEntity(entity) {
    utils.apiReq(
      utils.getSelfLink(entity),
      () => this.props.onSave && this.props.onSave(),
      {
        method: "delete"
      },
      response => console.log(response.message)
    );
  }

  render() {
    return (
      <Container className="border border-info bg-dark text-light pt-2 ml-5 ml-md-0">
        <h3>{this.props.header}</h3>
        <Button
          className="add-button"
          color={this.state.formOpen ? "danger" : "primary"}
          onClick={this.toggleForm}
          outline
        >
          {this.state.formOpen ? "Cancel" : "Add"}
        </Button>
        <Collapse isOpen={this.state.formOpen} className="mt-2">
          <DataForm
            onSave={this.onSave}
            fields={this.props.fields}
            entity={this.state.editingEntity}
            api={this.props.api}
          />
        </Collapse>
        <hr />
        {this.props.data && this.props.data.length ? (
          <Table className="text-light table-bordered table-responsive-sm">
            <thead>
              <tr>
                {this.props.fields.map((field, index) => (
                  <th key={index}>{field.name}</th>
                ))}
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {this.props.data.map((entity, index) => (
                <tr key={index}>
                  {this.props.fields.map((field, index) =>
                    !field.tableComponent ? (
                      <td key={index}>{entity[field.key]}</td>
                    ) : (
                      <field.tableComponent entity={entity} />
                    )
                  )}
                  <td>
                    <ButtonGroup>
                      <Button
                        color="primary"
                        onClick={() => this.editEntity(entity)}
                        outline
                      >
                        Edit
                      </Button>
                      <Button
                        color="danger"
                        onClick={() => this.deleteEntity(entity)}
                        outline
                      >
                        Delete
                      </Button>
                    </ButtonGroup>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <h5 className="text-center m-5">No data</h5>
        )}
      </Container>
    );
  }
}

export default DataControl;
