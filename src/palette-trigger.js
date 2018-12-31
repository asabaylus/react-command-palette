/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from "react";
import PropTypes from "prop-types";

export default class PaletteTrigger extends Component {
  render() {
    const { onClick } = this.props;
    return (
      <button className="ui button" onClick={onClick} type="button">
        Command Palette &nbsp;
        <kbd className="ui mini horizontal grey label">
          <span>Keyboard Shortcut</span> ⇧⌘P
        </kbd>
      </button>
    );
  }
}

PaletteTrigger.propTypes = {
  onClick: PropTypes.func.isRequired
};
