/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from "react";
import PropTypes from "prop-types";

/* https://snook.ca/archives/html_and_css/hiding-content-for-accessibility */
const visualyHidden = {
  position: "absolute !important",
  height: "1px",
  width: "1px",
  overflow: "hidden",
  clip: "rect(1px, 1px, 1px, 1px)",
  display: "inline-block"
};

export default class PaletteTrigger extends Component {
  render() {
    const { onClick } = this.props;
    return (
      <button className="ui button" onClick={onClick} type="button">
        Command Palette &nbsp;
        <kbd className="ui mini horizontal grey label">
          <span style={visualyHidden}> Keyboard Shortcut </span>⇧⌘P
        </kbd>
      </button>
    );
  }
}

PaletteTrigger.propTypes = {
  onClick: PropTypes.func.isRequired
};
