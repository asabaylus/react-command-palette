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
  const { onClick, theme } = props;
  return (
    <button className={theme} onClick={onClick} type="button">
      Command Palette &nbsp;
      <kbd className="ui mini horizontal grey label">
        <span style={visualyHidden}> Keyboard Shortcut </span>⇧⌘P
      </kbd>
    </button>
  );
};

const CustomTriggerComponent = props => {
  const { onClick, trigger, theme } = props;
  return (
    <div
      onClick={onClick}
      className={theme}
      onKeyPress={onClick}
      role="button"
      tabIndex={0}
    >
      {trigger}
    </div>
  );
};

function PaletteTrigger(props) {
  const { onClick, trigger, theme } = props;
  if (trigger) {
    return (
      <CustomTriggerComponent
        onClick={onClick}
        trigger={trigger}
        theme={theme}
      />
    );
  }
  return <DefaultTriggerComponent onClick={onClick} theme={theme} />;
}

PaletteTrigger.defaultProps = {
  theme: "ui button"
};

DefaultTriggerComponent.propTypes = {
  onClick: PropTypes.func,
  theme: PropTypes.string
};

CustomTriggerComponent.propTypes = {
  onClick: PropTypes.func,
  theme: PropTypes.string,
  trigger: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
};

PaletteTrigger.propTypes = CustomTriggerComponent.propTypes;

export default PaletteTrigger;
