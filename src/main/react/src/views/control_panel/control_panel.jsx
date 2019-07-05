/**
 * Created on 27.06.2019 - 23:24
 * part of taskorger
 * @author user12043
 */

import React from "react";
import "../../css/control-panel.css";
import {Link, Route, Switch} from "react-router-dom";
import constants from "../../constants";
import UserManagement from "./user_management";
import {Container} from "reactstrap";

class SideBarItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleHover = this.handleHover.bind(this);
    this.state = {
      hovered: false
    }
  }

  handleHover(hoverState) {
    this.setState({
      hovered: hoverState
    });
  }

  render() {
    let bgClass = "sidebar-item border border-secondary " + ((this.state.hovered) ? "bg-secondary" : "bg-dark");
    return (
      <div className={bgClass} onMouseOver={() => this.handleHover(true)}
           onMouseLeave={() => this.handleHover(false)}>{this.props.children}</div>
    );
  }
}

class ControlPanel extends React.Component {
  render() {
    return (
      <div id="control-panel">
        <div id="sidebar" className="text-sm-left text-md-center bg-secondary">
          <div id="sidebar-header" className="bg-info">Options</div>
          <div id="sidebar-content">
            <SideBarItem><Link to={constants.ROUTES.CONTROL_PANEL_SUB.USER_MAN}>User Management</Link></SideBarItem>
            <SideBarItem><Link to={constants.ROUTES.CONTROL_PANEL_SUB.ANNOUNCEMENT_MAN}>Announcement
              Management</Link></SideBarItem>
            <SideBarItem><Link to={constants.ROUTES.CONTROL_PANEL_SUB.TASK_MAN}>Task Management</Link></SideBarItem>
          </div>
        </div>

        <Container className="control-content">
          <Switch>
            <Route path={constants.ROUTES.CONTROL_PANEL_SUB.USER_MAN} component={UserManagement}/>
            <Route path={constants.ROUTES.CONTROL_PANEL_SUB.ANNOUNCEMENT_MAN}><h1>Announcement Management</h1></Route>
            <Route path={constants.ROUTES.CONTROL_PANEL_SUB.TASK_MAN}><h1>Task Management</h1></Route>
          </Switch>
        </Container>
      </div>
    );
  }
}

export default ControlPanel;
