/**
 * Created on 13.07.2019 - 09:25
 * part of taskorger
 * @author user12043
 */
import React from "react";
import PropTypes from "prop-types";
import {
  Alert,
  Button,
  Container,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";
import * as utils from "util/utils";

class DataForm extends React.Component {
  constructor(props) {
    super(props);

    // this.validateForm = this.validateForm.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleComponentInput = this.handleComponentInput.bind(this);
    this.save = this.save.bind(this);

    const fieldsObject = {};
    props.fields.forEach(field => {
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

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
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

  // TODO make validate working
  static validateForm() {
    return false;
  }

  save(event) {
    event.preventDefault();
    const { props, state } = this;
    let entity = {};
    if (props.entity) {
      entity = props.entity;
    }

    props.fields.forEach(field => {
      if (!field.hideInput) {
        entity[field.key] = state[field.key];
      }
    });
    utils.apiReq(
      props.api,
      () => {
        if (props.onSave) {
          props.onSave();
        }
      },
      {
        method: "post",
        body: JSON.stringify(entity)
      },
      response =>
        this.setState({ error: `Saving failed! : ${response.message}` })
    );
  }

  render() {
    const { props, state } = this;
    return (
      <Container>
        {state.error && <Alert color="danger">{state.error}</Alert>}
        <Form
          className="border border-secondary data-form"
          onSubmit={this.save}
        >
          {props.fields.map(
            field =>
              !field.hideInput && (
                <FormGroup key={field.key}>
                  <Label htmlFor={field.key}>{field.name}: </Label>
                  {!field.formComponent ? (
                    <Input
                      type={field.type}
                      id={field.key}
                      name={field.key}
                      value={state[field.key]}
                      onChange={this.handleInput}
                      autoComplete="off"
                    />
                  ) : (
                    field.formComponent({
                      entity: props.entity,
                      onChange: value => {
                        this.handleComponentInput(field.key, value);
                      }
                    })
                  )}
                </FormGroup>
              )
          )}
          <Button color="secondary" disabled={false}>
            Save
          </Button>
        </Form>
      </Container>
    );
  }
}

DataForm.defaultProps = {
  onSave: null,
  api: "",
  entity: {}
};

DataForm.propTypes = {
  fields: PropTypes.array.isRequired,
  entity: PropTypes.object,
  api: PropTypes.string,
  onSave: PropTypes.func
};

export default DataForm;
