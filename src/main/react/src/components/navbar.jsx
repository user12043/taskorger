/**
 * Created on 18.06.2019 - 00:32
 * part of taskorger
 * @author user12043
 */

import React from "react";

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
      <div>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand color={"light"} href="/">Taskorger</NavbarBrand>
          <NavbarToggler onClick={this.toggle}/>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="#">Announcements</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">Tasks</NavLink>
              </NavItem>
              <NavItem>
                <NavLink>Note-Sources</NavLink>
              </NavItem>
              <NavItem>
                <NavLink>Settings</NavLink>
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
      </div>
    );
  }
}

export default AppNavBar;
