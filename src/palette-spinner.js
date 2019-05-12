import React from "react";
import PropTypes from "prop-types";

import "./palette-spinner.css";

const DefaultSpinnerComponent = props => {
  const { display } = props;
  let cssClass;
  if (display === "inline") {
    cssClass = "default-spinner inline";
  } else {
    cssClass = "default-spinner";
  }
  return (
    <div className={cssClass} role="status">
      <span className="sr-only">Loading...</span>
    </div>
  );
};

// When user adds custom spinner wrap it so that if its a string
// then assume the text is accessible. If it's a component then instert
// a "Loading..." string that visible only to screen readers
const CustomSpinnerComponent = props => {
  const { spinner, display } = props;
  let cssClass = "spinner";
  if (display === "inline") {
    cssClass = "spinner-inline";
  } else {
    cssClass = "spinner";
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
  const { spinner, display } = props;
  if (spinner) {
    return <CustomSpinnerComponent spinner={spinner} display={display} />;
  }
  return <DefaultSpinnerComponent display={display} />;
}

DefaultSpinnerComponent.propTypes = {
  display: PropTypes.oneOf(["modal", "inline"])
};

CustomSpinnerComponent.propTypes = {
  display: PropTypes.oneOf(["modal", "inline"]),
  spinner: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
};

PaletteSpinner.propTypes = CustomSpinnerComponent.propTypes;
