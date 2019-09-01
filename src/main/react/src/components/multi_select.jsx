import React, { Component } from "react";
import * as utils from "util/utils";
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";

function SelectedBagde(props) {
  return (
    <Badge className="m-1 d-flex" color="secondary" pill>
      <div className="m-1">{props.entity[props.displayKey]}</div>
      <Badge
        tag="button"
        className="btn-danger"
        onClick={() => props.onDelete(props.entity)}
        color="danger"
        pill
      >
        X
      </Badge>
    </Badge>
  );
}

class MultiSelect extends Component {
  constructor(props) {
    super(props);

    this.fetchData = this.fetchData.bind(this);
    this.addSelected = this.addSelected.bind(this);
    this.removeSelected = this.removeSelected.bind(this);
    this.updateParent = this.updateParent.bind(this);

    this.state = {
      data: [],
      isOpen: false,
      selectedData: []
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    utils.apiReq(this.props.api, data => {
      this.setState({
        data: data[this.props.apiAccess || this.props.api],
        selectedData: []
      });
    });
  }

  addSelected(entity) {
    let selectedData = [...this.state.selectedData, entity];
    this.setState({ selectedData });
    this.updateParent(selectedData);
  }

  removeSelected(entity) {
    let index = this.state.selectedData.findIndex(
      selectedEntity =>
        selectedEntity[this.props.uniqKey] === entity[this.props.uniqKey]
    );
    if (index !== -1) {
      let selectedData = this.state.selectedData;
      selectedData.splice(index, 1);
      this.setState({ selectedData });
      this.updateParent(selectedData);
    }
  }

  updateParent(value) {
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  render() {
    let { uniqKey } = this.props;
    return (
      <div className="form-group">
        <div className="form-control d-flex p-0 px-1">
          {this.state.selectedData.map(entity => (
            <SelectedBagde
              key={entity[uniqKey]}
              entity={entity}
              onDelete={this.removeSelected}
              displayKey={this.props.displayKey}
            />
          ))}
          <UncontrolledDropdown className="w-100">
            <DropdownToggle className="bg-transparent w-100 border-0" tag="div">
              <input
                className="border-0 w-100"
                type="text"
                style={{ outline: "none" }}
                placeholder="select..."
              />
            </DropdownToggle>
            <DropdownMenu>
              {this.state.data
                .filter(
                  entity =>
                    !this.state.selectedData.find(
                      selectedEntity =>
                        selectedEntity[uniqKey] === entity[uniqKey]
                    )
                )
                .map(entity => (
                  <DropdownItem
                    key={entity[uniqKey]}
                    value={entity[uniqKey]}
                    onClick={() => this.addSelected(entity)}
                  >
                    {entity[this.props.displayKey]}
                  </DropdownItem>
                ))}
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      </div>
    );
  }
}

export default MultiSelect;
