/**
 * Created on 13.07.2019 - 09:24
 * part of taskorger
 * @author user12043
 */

import React from "react";
import { Button, ButtonGroup, Collapse, Container, Table } from "reactstrap";
import { apiReq, getSelfLink } from "util/utils";
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
      editingEntity: {},
      data: []
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  toggleForm() {
    this.setState(state => ({
      formOpen: !state.formOpen,
      editingEntity: {}
    }));
  }

  fetchData() {
    const { api, apiAccess } = this.props;
    apiReq(api, response => {
      this.setState({
        data: response[apiAccess || api]
      });
    });
  }

  onSave() {
    this.setState({
      formOpen: false,
      editingEntity: {}
    });
    this.fetchData();
  }

  editEntity(entity) {
    this.setState({ editingEntity: entity, formOpen: true });
  }

  deleteEntity(entity) {
    const { onSave } = this.props;
    apiReq(getSelfLink(entity), () => onSave(), {
      method: "delete"
    });
  }

  dataform = () => {
    const { props, state } = this;
    return (
      <>
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
      </>
    );
  };

  actions = entity => (
    <td>
      <ButtonGroup>
        <Button color="primary" onClick={() => this.editEntity(entity)} outline>
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
  );

  render() {
    const { fields } = this.props;
    const { data } = this.state;
    return (
      <Container className="border border-info bg-dark text-light pt-2 ml-5 ml-md-0">
        {this.dataform()}
        <hr />
        {data && data.length ? (
          <Table className="text-light table-bordered table-responsive-sm">
            <thead>
              <tr>
                {fields.map(field =>
                  !field.hideColumn ? (
                    <th key={field.key}>{field.name}</th>
                  ) : null
                )}
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {data.map((entity, index) => (
                <tr key={entity.id || index}>
                  {fields.map(
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
                  {this.actions(entity)}
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
  apiAccess: PropTypes.string
};

DataControl.defaultProps = {
  header: null,
  onSave: () => null,
  apiAccess: null
};

export default DataControl;
