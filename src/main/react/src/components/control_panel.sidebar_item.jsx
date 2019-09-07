/**
 * Created on 7.09.2019 - 22:29
 * part of taskorger
 * @author user12043
 */

import React from "react";
import PropTypes from "prop-types";
import { NavItem } from "reactstrap";

class SidebarItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleHover = this.handleHover.bind(this);
    this.state = {
      hovered: false
    };
  }

  handleHover(hoverState) {
    this.setState({
      hovered: hoverState
    });
  }

  render() {
    const { hovered } = this.state;
    const { children } = this.props;
    const bgClass = `border border-secondary ${
      hovered ? "bg-info" : "bg-secondary"
    }`;
    return (
      <NavItem
        className={bgClass}
        onMouseOver={() => this.handleHover(true)}
        onFocus={() => this.handleHover(true)}
        onMouseLeave={() => this.handleHover(false)}
      >
        {children}
      </NavItem>
    );
  }
}

SidebarItem.propTypes = {
  children: PropTypes.element
};

SidebarItem.defaultProps = {
  children: null
};

export default SidebarItem;
