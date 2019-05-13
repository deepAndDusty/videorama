import React from "react";
import classes from "./SplitPane.module.scss";
import PropTypes from "prop-types";

const SplitPane = ({leftTop, leftBottom, right}) => {
  return (
    <div className={classes.splitPane}>
      <div className={classes.leftPane}>
        <div className={classes.topPane}>
        {leftTop}
        </div>
        <div className={classes.botomPane}>
        {leftBottom}
        </div>
      </div>
      <div className={classes.rightPane}>
        {right}
      </div>
    </div>
  );
}

SplitPane.propTypes = {
  leftTop: PropTypes.element,
  leftBottom: PropTypes.element,
  right: PropTypes.element
}

export default SplitPane;