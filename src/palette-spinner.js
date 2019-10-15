import React from "react";
import PropTypes from "prop-types";

import "./palette-spinner.css";

const DefaultSpinnerComponent = props => {
  const { display, theme } = props;
  let cssClass;
  if (display === "inline") {
    cssClass = `default-spinner ${theme} inline`;
  } else {
    cssClass = `default-spinner ${theme} modal`;
  }
  return (
    <div className={cssClass} role="status">
      <span className="sr-only">Loading...</span>
    </div>
  );
};

// When a developer adds custom spinner wrap it so that if its a string
// then assume the text is accessible. If it's a component then instert
// a "Loading..." string that visible only to screen readers
const CustomSpinnerComponent = props => {
  const { spinner, display, theme = "atom-spinner" } = props;
  let cssClass;
  if (display === "inline") {
    cssClass = `spinner ${theme} inline`;
  } else {
    cssClass = `spinner ${theme} modal`;
  }
  return (
    <div className={cssClass} role="status">
      {typeof spinner !== "string" ? (
        <span className="sr-only">Loading...</span>
      ) : null}
      {spinner}
    </div>
  );
};

export default function PaletteSpinner(props) {
  const { spinner, display, theme } = props;
  if (spinner) {
    return <CustomSpinnerComponent {...props} />;
  }
  return <DefaultSpinnerComponent display={display} theme={theme} />;
}

DefaultSpinnerComponent.propTypes = {
  display: PropTypes.oneOf(["modal", "inline"]),
  theme: PropTypes.string
};

CustomSpinnerComponent.propTypes = {
  display: PropTypes.oneOf(["modal", "inline"]),
  theme: PropTypes.string,
  spinner: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
};

PaletteSpinner.propTypes = CustomSpinnerComponent.propTypes;
