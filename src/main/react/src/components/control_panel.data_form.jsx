/**
 * Created on 13.07.2019 - 09:25
 * part of taskorger
 * @author user12043
 */
import React from "react";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import * as utils from "util/utils";

class DataForm extends React.Component {
  static defaultProps = {
    fields: [],
    onSave: null,
    api: "",
    entity: null
  };

  constructor(props) {
    super(props);

    this.validateForm = this.validateForm.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleComponentInput = this.handleComponentInput.bind(this);
    this.save = this.save.bind(this);

    let fieldsObject = {};
    this.props.fields.forEach(field => {
      if (!field.formComponent) {
        fieldsObject[field.key] = field.defaultValue || "";
      }
    });
    this.state = {
      error: null,
      ...fieldsObject
    };
    this.initialState = this.state;
  }

  // TODO make validate working
  validateForm() {
    return false;
  }

  handleInput(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleComponentInput(key, value) {
    this.setState({
      [key]: value
    });
  }

  componentWillReceiveProps(nextProps, nextContext) {
    let newState = {};
    if (!nextProps.entity) {
      newState = this.initialState;
    } else {
      nextProps.fields.forEach(field => {
        if (nextProps.entity[field.key]) {
          newState[field.key] = nextProps.entity[field.key];
        }
      });
    }
    this.setState(newState);
  }

  save(event) {
    event.preventDefault();
    let entity = {};
    if (this.props.entity) {
      entity = this.props.entity;
    }

    let that = this;
    this.props.fields.forEach(field => {
      if (!field.hideInput) {
        entity[field.key] = that.state[field.key];
      }
    });
    utils.apiReq(
      this.props.api,
      () => {
        if (this.props.onSave) {
          this.props.onSave();
        }
      },
      {
        method: "post",
        body: JSON.stringify(entity)
      },
      response =>
        this.setState({ error: "Saving failed! : " + response.message })
    );
  }

  render() {
    return (
      <Container>
        {this.state.error && <Alert color="danger">{this.state.error}</Alert>}
        <Form
          className="border border-secondary data-form"
          onSubmit={this.save}
        >
          {this.props.fields.map(
            field =>
              !field.hideInput && (
                <FormGroup key={field.key}>
                  <Label htmlFor={field.key}>{field.name}: </Label>
                  {!field.formComponent ? (
                    <Input
                      type={field.type}
                      id={field.key}
                      name={field.key}
                      value={this.state[field.key]}
                      onChange={this.handleInput}
                      autoComplete="off"
                    />
                  ) : (
                    field.formComponent({
                      entity: this.state.entity,
                      onChange: this.handleComponentInput
                    })
                  )}
                </FormGroup>
              )
          )}
          <Button color="secondary" disabled={this.validateForm()}>
            Save
          </Button>
        </Form>
      </Container>
    );
  }
}

export default DataForm;
