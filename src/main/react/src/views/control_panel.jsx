/**
 * Created on 27.06.2019 - 23:24
 * part of taskorger
 * @author user12043
 */

import React from "react";
import "../css/control-panel.css";

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
            <SideBarItem>item1</SideBarItem>
            <SideBarItem>item2</SideBarItem>
            <SideBarItem>item3</SideBarItem>
            <SideBarItem>item4</SideBarItem>
          </div>
        </div>

        <h1>This is control panel page</h1>
      </div>
    );
  }
}

export default ControlPanel;
