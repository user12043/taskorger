/**
 * Created on 7.09.2019 - 20:50
 * part of taskorger
 * @author user12043
 */

import React from "react";
import { Alert, Card, CardBody, Collapse } from "reactstrap";
import PropTypes from "prop-types";

const MessageDialog = ({ isOpen, color, message }) => (
  <Collapse isOpen={isOpen}>
    <Card>
      <CardBody>
        <Alert color={color}>{message}</Alert>
      </CardBody>
    </Card>
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
