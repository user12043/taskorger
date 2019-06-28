/**
 * Created on 18.06.2019 - 00:32
 * part of taskorger
 * @author user12043
 */

import React from "react";
import {BrowserRouter as Router, NavLink, Route} from "react-router-dom";
import constants from "../constants";
import Announcements from "../views/announcements";
import Tasks from "../views/tasks";
import NoteSrc from "../views/note_src";
import Settings from "../views/settings";
import ControlPanel from "../views/control_panel";

import {
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  UncontrolledDropdown
} from 'reactstrap';

class AppNavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      user: JSON.parse(localStorage.getItem(constants.LOGGED_USER))
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    let routes = [
      <Route exact key="0" path={constants.ROUTES.ANNOUNCEMENTS} component={Announcements}/>,
      <Route exact key="1" path={constants.ROUTES.TASKS} component={Tasks}/>,
      <Route exact key="2" path={constants.ROUTES.NOTE_SRC} component={NoteSrc}/>,
      <Route exact key="3" path={constants.ROUTES.SETTINGS} component={Settings}/>
    ];

    let navItems = [
      <NavItem key="0"><NavLink to={constants.ROUTES.ANNOUNCEMENTS}
                                className="nav-link">Announcements</NavLink></NavItem>,
      <NavItem key="1"><NavLink to={constants.ROUTES.TASKS} className="nav-link">Tasks</NavLink></NavItem>,
      <NavItem key="2"><NavLink to={constants.ROUTES.NOTE_SRC} className="nav-link">Note-Sources</NavLink></NavItem>,
      <NavItem key="3"><NavLink to={constants.ROUTES.SETTINGS} className="nav-link">Settings</NavLink></NavItem>
    ];

    if (this.props.user.role === constants.ROLES.ADMIN) {
      routes.push(
        <Route key={routes.length} path={constants.ROUTES.CONTROL_PANEL} component={ControlPanel}/>
      );
      navItems.push(
        <NavItem key={navItems.length}><NavLink to={constants.ROUTES.CONTROL_PANEL} className="nav-link">Control
          Panel</NavLink></NavItem>
      );
    }

    return (
      <Router>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand color="light" href="/">Taskorger</NavbarBrand>
          <NavbarToggler onClick={this.toggle}/>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {navItems}
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  {this.state.user.username} ({this.state.user.name})
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Profile
                  </DropdownItem>
                  <DropdownItem>
                    Messages
                  </DropdownItem>
                  <DropdownItem divider/>
                  <DropdownItem onClick={this.props.onLogout}>
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>

        {routes}
      </Router>
    );
  }
}

export default AppNavBar;
