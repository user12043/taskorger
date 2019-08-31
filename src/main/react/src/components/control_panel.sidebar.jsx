/**
 * Created on 06.07.2019 - 20:30
 * part of taskorger
 * @author user12043
 */

import React from "react";
import { Collapse, Nav, Navbar, NavbarToggler, NavItem } from "reactstrap";
import { NavLink } from "react-router-dom";
import constants from "../constants";
import "../css/control-panel.css";

class SideBarItem extends React.Component {
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
    let bgClass =
      "border border-secondary " +
      (this.state.hovered ? "bg-info" : "bg-secondary");
    return (
      <NavItem
        className={bgClass}
        onMouseOver={() => this.handleHover(true)}
        onMouseLeave={() => this.handleHover(false)}
      >
        {this.props.children}
      </NavItem>
    );
  }
}

class ControlPanelSidebar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <Navbar
        id="control-panel-sidebar"
        color="secondary"
        dark
        className={"text-sm-left text-md-center bg-secondary position-fixed"}
        expand="md"
      >
        <NavbarToggler
          id="control-panel-sidebar-toggle"
          className={"text-light " + (this.state.isOpen ? "" : "closed")}
          onClick={this.toggle}
        >
          Options
        </NavbarToggler>
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" vertical navbar>
            <SideBarItem>
              <NavLink
                to={constants.ROUTES.CONTROL_PANEL_SUB.ANNOUNCEMENT_MAN}
                className="nav-link"
              >
                Announcement Management
              </NavLink>
            </SideBarItem>
            <SideBarItem>
              <NavLink
                to={constants.ROUTES.CONTROL_PANEL_SUB.COLUMN_MAN}
                className="nav-link"
              >
                Column Management
              </NavLink>
            </SideBarItem>
            <SideBarItem>
              <NavLink
                to={constants.ROUTES.CONTROL_PANEL_SUB.TAG_MAN}
                className="nav-link"
              >
                Tag Management
              </NavLink>
            </SideBarItem>
            <SideBarItem>
              <NavLink
                to={constants.ROUTES.CONTROL_PANEL_SUB.TASK_MAN}
                className="nav-link"
              >
                Task Management
              </NavLink>
            </SideBarItem>
            <SideBarItem>
              <NavLink
                to={constants.ROUTES.CONTROL_PANEL_SUB.TOPIC_MAN}
                className="nav-link"
              >
                Topic Management
              </NavLink>
            </SideBarItem>
            <SideBarItem>
              <NavLink
                to={constants.ROUTES.CONTROL_PANEL_SUB.USER_MAN}
                className="nav-link"
              >
                User Management
              </NavLink>
            </SideBarItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

export default ControlPanelSidebar;
