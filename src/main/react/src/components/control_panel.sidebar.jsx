/**
 * Created on 06.07.2019 - 20:30
 * part of taskorger
 * @author user12043
 */

import React from "react";
import { Collapse, Nav, Navbar, NavbarToggler } from "reactstrap";
import { NavLink } from "react-router-dom";
import constants from "util/constants";
import "css/control-panel.css";
import SidebarItem from "./control_panel.sidebar_item";

class ControlPanelSidebar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  }

  render() {
    const { isOpen } = this.state;
    return (
      <Navbar
        id="control-panel-sidebar"
        color="secondary"
        dark
        className="text-sm-left text-md-center bg-secondary position-fixed"
        expand="md"
      >
        <NavbarToggler
          id="control-panel-sidebar-toggle"
          className={`text-light ${isOpen ? "" : "closed"}`}
          onClick={this.toggle}
        >
          Options
        </NavbarToggler>
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" vertical navbar>
            <SidebarItem>
              <NavLink
                to={constants.ROUTES.CONTROL_PANEL_SUB.ANNOUNCEMENT_MAN}
                className="nav-link"
              >
                Announcement Management
              </NavLink>
            </SidebarItem>
            <SidebarItem>
              <NavLink
                to={constants.ROUTES.CONTROL_PANEL_SUB.COLUMN_MAN}
                className="nav-link"
              >
                Column Management
              </NavLink>
            </SidebarItem>
            <SidebarItem>
              <NavLink
                to={constants.ROUTES.CONTROL_PANEL_SUB.TAG_MAN}
                className="nav-link"
              >
                Tag Management
              </NavLink>
            </SidebarItem>
            <SidebarItem>
              <NavLink
                to={constants.ROUTES.CONTROL_PANEL_SUB.TASK_MAN}
                className="nav-link"
              >
                Task Management
              </NavLink>
            </SidebarItem>
            <SidebarItem>
              <NavLink
                to={constants.ROUTES.CONTROL_PANEL_SUB.TOPIC_MAN}
                className="nav-link"
              >
                Topic Management
              </NavLink>
            </SidebarItem>
            <SidebarItem>
              <NavLink
                to={constants.ROUTES.CONTROL_PANEL_SUB.USER_MAN}
                className="nav-link"
              >
                User Management
              </NavLink>
            </SidebarItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

export default ControlPanelSidebar;
