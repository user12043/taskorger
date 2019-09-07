import React, { Component } from "react";
import * as utils from "util/utils";
import PropTypes from "prop-types";
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";

function SelectedBadge({ entity, onDelete }) {
  return (
    <Badge className="m-1 d-flex" color="secondary" pill>
      <div className="m-1">{entity.displayKey}</div>
      <Badge
        tag="button"
        className="btn-danger"
        onClick={() => onDelete(entity)}
        color="danger"
        pill
      >
        X
      </Badge>
    </Badge>
  );
}

SelectedBadge.propTypes = {
  entity: PropTypes.object.isRequired,
  displayKey: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired
};

class MultiSelect extends Component {
  constructor(props) {
    super(props);

    this.fetchData = this.fetchData.bind(this);
    this.addSelected = this.addSelected.bind(this);
    this.removeSelected = this.removeSelected.bind(this);
    this.updateParent = this.updateParent.bind(this);

    this.state = {
      data: [],
      selectedData: []
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const { props } = this;
    utils.apiReq(props.api, data => {
      this.setState({
        data: data[props.apiAccess || props.api],
        selectedData: []
      });
    });
  }

  addSelected(entity) {
    const { state } = this;
    const selectedData = [...state.selectedData, entity];
    this.setState({ selectedData });
    this.updateParent(selectedData);
  }

  removeSelected(entity) {
    const { state, props } = this;
    const index = state.selectedData.findIndex(
      selectedEntity => selectedEntity[props.uniqKey] === entity[props.uniqKey]
    );
    if (index !== -1) {
      const { selectedData } = this.state;
      selectedData.splice(index, 1);
      this.setState({ selectedData });
      this.updateParent(selectedData);
    }
  }

  updateParent(value) {
    const { props } = this;
    if (props.onChange) {
      props.onChange(value);
    }
  }

  render() {
    const { state } = this;
    const { uniqKey, displayKey } = this.props;
    return (
      <div className="form-group">
        <div className="form-control d-flex p-0 px-1">
          {state.selectedData.map(entity => (
            <SelectedBadge
              key={entity[uniqKey]}
              entity={entity}
              onDelete={this.removeSelected}
              displayKey={displayKey}
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
              {state.data
                .filter(
                  entity =>
                    !state.selectedData.find(
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
                    {entity[displayKey]}
                  </DropdownItem>
                ))}
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      </div>
    );
  }
}

MultiSelect.propTypes = {
  api: PropTypes.string.isRequired,
  apiAccess: PropTypes.string.isRequired,
  uniqKey: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  displayKey: PropTypes.string.isRequired
};

export default MultiSelect;
