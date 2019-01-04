/* eslint-disable react/jsx-one-expression-per-line */
import React from "react";
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

const DefaultTriggerComponent = props => {
  const { onClick } = props;
  return (
    <button className="ui button" onClick={onClick} type="button">
      Command Palette &nbsp;
      <kbd className="ui mini horizontal grey label">
        <span style={visualyHidden}> Keyboard Shortcut </span>⇧⌘P
      </kbd>
    </button>
  );
};

const CustomTriggerComponent = props => {
  const { onClick, trigger } = props;
  return (
    <div onClick={onClick} onKeyPress={onClick} role="button" tabIndex={0}>
      {trigger}
    </div>
  );
};

export default function PaletteTrigger(props) {
  const { onClick, trigger } = props;
  if (trigger) {
    return <CustomTriggerComponent onClick={onClick} trigger={trigger} />;
  }
  return <DefaultTriggerComponent onClick={onClick} />;
}

DefaultTriggerComponent.propTypes = {
  onClick: PropTypes.func
};

CustomTriggerComponent.propTypes = {
  onClick: PropTypes.func,
  trigger: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
};

PaletteTrigger.propTypes = CustomTriggerComponent.propTypes;
