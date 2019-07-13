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
    entity: {}
  };

  constructor(props) {
    super(props);

    this.validateForm = this.validateForm.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.save = this.save.bind(this);

    let fieldsObject = {};
    this.props.fields.forEach((element) => {
      fieldsObject[element.key] = element.defaultValue || "";
    });
    this.state = {
      ...{
        error: null,
      }, ...fieldsObject
    };
  }

  validateForm() {
    let valid = false;
    this.props.fields.forEach((field) => {
      valid = this.state[field.key] && this.state[field.key].length
    });
    return valid;
  }

  handleInput(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  save(event) {
    event.preventDefault();
    let entity;
    if (this.props.entity) {
      entity = {
        id: utils.getIdFromSelfLink(this.props.entity)
      };
    }

    this.props.fields.forEach((field) => {
      entity[field.key] = this.state[field.key];
    });
    utils.apiReq(this.props.api, () => {
      this.props.onSave();
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
        <Form className="border border-secondary data-form" onSubmit={this.props.save}>
          {this.props.fields.map((field) => (
            <FormGroup key={field.key}>
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
