/**
 * Created on 7.09.2019 - 20:50
 * part of taskorger
 * @author user12043
 */

import React from "react";
// eslint-disable-next-line no-unused-vars
import { Alert, Collapse } from "reactstrap";
import PropTypes from "prop-types";

const style = {
  width: "30vw",
  zIndex: 9999,
  left: "unset"
};

const MessageDialog = ({ isOpen, color, message }) => (
  <Collapse isOpen={isOpen} style={style} className="fixed-bottom">
    <Alert color={color}>{message}</Alert>
  </Collapse>
);

MessageDialog.propTypes = {
  isOpen: PropTypes.bool,
  color: PropTypes.string,
  message: PropTypes.string
};

MessageDialog.defaultProps = {
  isOpen: true,
  color: "secondary",
  message: "dialog is open now"
};

export default MessageDialog;
