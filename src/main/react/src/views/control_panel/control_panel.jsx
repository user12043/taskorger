/**
 * Created on 27.06.2019 - 23:24
 * part of taskorger
 * @author user12043
 */

import React from "react";
import "../../css/control-panel.css";
import {Route, Switch} from "react-router-dom";
import constants from "../../constants";
import UserManagement from "./user_management";
import {Container} from "reactstrap";
import ControlPanelSidebar from "../../components/control-panel-sidebar";

class ControlPanel extends React.Component {
  render() {
    return (
      <div id="control-panel">
        <ControlPanelSidebar/>

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
