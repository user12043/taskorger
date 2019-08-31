/**
 * Created on 27.06.2019 - 23:24
 * part of taskorger
 * @author user12043
 */

import React from "react";
import "../../css/control-panel.css";
import { Route, Switch } from "react-router-dom";
import constants from "../../constants";
import { Container } from "reactstrap";
import ControlPanelSidebar from "../../components/control_panel.sidebar";
import AnnouncementManagement from "./announcement_management";
import TaskManagement from "./task_management";
import TopicManagement from "./topic_management";
import UserManagement from "./user_management";

class ControlPanel extends React.Component {
  render() {
    return (
      <div id="control-panel">
        <ControlPanelSidebar />

        <Container className="control-content">
          <Switch>
            <Route
              path={constants.ROUTES.CONTROL_PANEL_SUB.ANNOUNCEMENT_MAN}
              component={AnnouncementManagement}
            />
            <Route
              path={constants.ROUTES.CONTROL_PANEL_SUB.COLUMN_MAN}
              component={"ColumnManagement"}
            />
            <Route
              path={constants.ROUTES.CONTROL_PANEL_SUB.TAG_MAN}
              component={"TagManagement"}
            />
            <Route
              path={constants.ROUTES.CONTROL_PANEL_SUB.TASK_MAN}
              component={TaskManagement}
            />
            <Route
              path={constants.ROUTES.CONTROL_PANEL_SUB.TOPIC_MAN}
              component={TopicManagement}
            />
            <Route
              path={constants.ROUTES.CONTROL_PANEL_SUB.USER_MAN}
              component={UserManagement}
            />
          </Switch>
        </Container>
      </div>
    );
  }
}

export default ControlPanel;
