/**
 * Created on 18.06.2019 - 00:32
 * part of taskorger
 * @author user12043
 */

import React from "react";
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
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
  NavLink,
  UncontrolledDropdown
} from 'reactstrap';

class AppNavBar extends React.Component {
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
      <Router>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand color="light" href="/">Taskorger</NavbarBrand>
          <NavbarToggler onClick={this.toggle}/>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink><Link to={constants.ROUTES.ANNOUNCEMENTS}>Announcements</Link></NavLink>
              </NavItem>
              <NavItem>
                <NavLink><Link to={constants.ROUTES.TASKS}>Tasks</Link></NavLink>
              </NavItem>
              <NavItem>
                <NavLink><Link to={constants.ROUTES.NOTE_SRC}>Note-Sources</Link></NavLink>
              </NavItem>
              <NavItem>
                <NavLink><Link to={constants.ROUTES.SETTINGS}>Settings</Link></NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  {this.props.user.username} ({this.props.user.name})
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Profile
                  </DropdownItem>
                  <DropdownItem>
                    Messages
                  </DropdownItem>
                  <DropdownItem divider/>
                  <DropdownItem>
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
