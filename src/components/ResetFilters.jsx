import React from "react";

function ResetFilters(props) {
  const { handleReset } = props;
  return (
    <button className="filters__reset" onClick={handleReset}>
      RESET
    </button>
  );
}

export default ResetFilters;
