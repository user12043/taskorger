/**
 * Created on 13.07.2019 - 09:25
 * part of taskorger
 * @author user12043
 */
import React from "react";
import {Alert, Button, Container, Form, FormGroup, Input, Label} from "reactstrap";
import * as utils from "../utils";

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
    this.save = this.save.bind(this);

    let fieldsObject = {};
    this.props.fields.forEach((field) => {
      fieldsObject[field.key] = field.defaultValue || "";
    });
    this.state = {
      ...{
        error: null,
      }, ...fieldsObject
    };
  }

  validateForm() {
    let valid = false;
    this.props.fields.filter((field) => !field.hideInput).forEach((field) => {
      valid = this.state[field.key] && this.state[field.key].length
    });
    return valid;
  }

  handleInput(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  componentWillReceiveProps(nextProps, nextContext) {
    let newState = {};
    if (!nextProps.entity) {
      nextProps.fields.forEach((field) => {
        newState[field.key] = field.defaultValue || "";
      });
    } else {
      nextProps.fields.forEach((field) => {
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
      entity.id = utils.getIdFromSelfLink(this.props.entity);
    } else {
      entity = {
        createDate: new Date()
      }
    }

    let that = this;
    this.props.fields.forEach((field) => {
      if (!field.hideInput) {
        entity[field.key] = that.state[field.key];
      }
    });
    utils.apiReq(this.props.api, () => {
      if (this.props.onSave) {
        this.props.onSave();
      }
    }, {
      method: "post",
      body: JSON.stringify(entity)
    }, (response) => this.setState({error: "Saving failed! : " + response.message}));
  }

  render() {
    return (
      <Container>
        {(this.state.error) &&
        <Alert color="danger">{this.state.error}</Alert>
        }
        <Form className="border border-secondary data-form" onSubmit={this.save}>
          {this.props.fields.map((field) => (
            !field.hideInput && <FormGroup key={field.key}>
              <Label for={field.key}>{field.name}: </Label>
              <Input type={field.type} id={field.key} name={field.key} value={this.state[field.key]}
                     onChange={this.handleInput}/>
            </FormGroup>
          ))}
          <Button color="success" disabled={!this.validateForm()}>Save</Button>
        </Form>
      </Container>
    );
  }
}

export default DataForm;
