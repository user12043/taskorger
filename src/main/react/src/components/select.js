/**
 * Created on 22.09.2019 - 14:58
 * part of taskorger
 * @author user12043
 */

import React from "react";
import PropTypes from "prop-types";
import * as utils from "util/utils";

class Select extends React.Component {
  constructor(props) {
    super(props);

    this.fetchData = this.fetchData.bind(this);

    this.state = {
      data: []
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const { api, apiAccess } = this.props;
    utils.apiReq(api, data => {
      this.setState({
        data: data[apiAccess || api]
      });
    });
  }

  render() {
    const { data } = this.state;
    const {
      id,
      name,
      onChange,
      defaultValue,
      valueKey,
      displayKey,
      apiAccess,
      ...others
    } = this.props;
    return (
      <select
        id={id}
        name={name}
        defaultValue={defaultValue}
        onChange={onChange}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...others}
      >
        <option>Select...</option>
        {data.map(item => (
          <option key={item[valueKey]} value={item[valueKey]}>
            {item[displayKey]}
          </option>
        ))}
      </select>
    );
  }
}

Select.propTypes = {
  api: PropTypes.string.isRequired,
  apiAccess: PropTypes.string,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  defaultValue: PropTypes.string.isRequired,
  valueKey: PropTypes.string.isRequired,
  displayKey: PropTypes.string.isRequired,
  onChange: PropTypes.func
};

Select.defaultProps = {
  onChange: () => {},
  apiAccess: null
};

export default Select;
