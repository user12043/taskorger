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
    return (
      <Router>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand color="light" href="/">Taskorger</NavbarBrand>
          <NavbarToggler onClick={this.toggle}/>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink to={constants.ROUTES.ANNOUNCEMENTS} className="nav-link">Announcements</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to={constants.ROUTES.TASKS} className="nav-link">Tasks</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to={constants.ROUTES.NOTE_SRC} className="nav-link">Note-Sources</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to={constants.ROUTES.SETTINGS} className="nav-link">Settings</NavLink>
              </NavItem>
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

        <Route path={constants.ROUTES.ANNOUNCEMENTS} component={Announcements}/>
        <Route path={constants.ROUTES.TASKS} component={Tasks}/>
        <Route path={constants.ROUTES.NOTE_SRC} component={NoteSrc}/>
        <Route path={constants.ROUTES.SETTINGS} component={Settings}/>
      </Router>
    );
  }
}

export default AppNavBar;
