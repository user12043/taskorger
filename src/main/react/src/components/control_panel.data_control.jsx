/**
 * Created on 13.07.2019 - 09:24
 * part of taskorger
 * @author user12043
 */

import React from "react";
import { Button, ButtonGroup, Collapse, Container, Table } from "reactstrap";
import * as utils from "util/utils";
import PropTypes from "prop-types";
import DataForm from "./control_panel.data_form";

class DataControl extends React.Component {
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
    const { onSave } = this.props;
    this.setState({
      formOpen: false,
      editingEntity: null
    });
    onSave();
  }

  editEntity(entity) {
    this.setState({ editingEntity: entity, formOpen: true });
  }

  deleteEntity(entity) {
    const { onSave } = this.props;
    utils.apiReq(
      utils.getSelfLink(entity),
      () => onSave(),
      {
        method: "delete"
      }
      // , response => alert(response.message)
    );
  }

  render() {
    const { state, props } = this;
    return (
      <Container className="border border-info bg-dark text-light pt-2 ml-5 ml-md-0">
        <h3>{props.header}</h3>
        <Button
          className="add-button"
          color={state.formOpen ? "danger" : "primary"}
          onClick={this.toggleForm}
          outline
        >
          {state.formOpen ? "Cancel" : "Add"}
        </Button>
        <Collapse isOpen={state.formOpen} className="mt-2">
          <DataForm
            onSave={this.onSave}
            fields={props.fields}
            entity={state.editingEntity}
            api={props.api}
          />
        </Collapse>
        <hr />
        {props.data && props.data.length ? (
          <Table className="text-light table-bordered table-responsive-sm">
            <thead>
              <tr>
                {props.fields.map(field =>
                  !field.hideColumn ? (
                    <th key={field.key}>{field.name}</th>
                  ) : null
                )}
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {props.data.map((entity, index) => (
                <tr key={entity.id || index}>
                  {props.fields.map(
                    field =>
                      !field.hideColumn &&
                      (!field.tableComponent ? (
                        <td key={field.key}>{entity[field.key]}</td>
                      ) : (
                        <td key={field.key}>
                          {field.tableComponent({
                            entity,
                            value: entity[field.key]
                          })}
                        </td>
                      ))
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

DataControl.propTypes = {
  header: PropTypes.string,
  onSave: PropTypes.func,
  fields: PropTypes.array.isRequired,
  api: PropTypes.string.isRequired,
  data: PropTypes.array
};

DataControl.defaultProps = {
  data: [],
  header: null,
  onSave: () => null
};

export default DataControl;
