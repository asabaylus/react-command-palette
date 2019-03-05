import React from "react";
import PropTypes from "prop-types";

import "./spinner.css";

const DefaultSpinnerComponent = () => (
  <div className="default-spinner" role="status">
    <span className="sr-only">Loading...</span>
  </div>
);

// When user adds custom spinner wrap it so that if its a string
// then assume the text is accessible. If it's a component then instert
// a "Loading..." string that visible only to screen readers
const CustomSpinnerComponent = props => {
  const { spinner } = props;
  return (
    <div className="spinner" role="status">
      {typeof spinner !== "string" ? (
        <span className="sr-only">Loading...</span>
      ) : null}
      {spinner}
    </div>
  );
};

export default function PaletteSpinner(props) {
  const { spinner } = props;
  if (spinner) {
    return <CustomSpinnerComponent spinner={spinner} />;
  }
  return <DefaultSpinnerComponent />;
}

CustomSpinnerComponent.propTypes = {
  spinner: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
};

PaletteSpinner.propTypes = CustomSpinnerComponent.propTypes;