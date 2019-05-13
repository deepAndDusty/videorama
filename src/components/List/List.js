import React from "react";
import PropTypes from "prop-types";

import ListItem from "./ListItem/ListItem";

const List = props => {
  const { data, clickHandler, deleteHandler} = props;
  return data.map((data, idx) => <ListItem key={idx} data={{...data}} deleteHandler={deleteHandler} clickHandler={clickHandler} />);
};

List.propTypes = {
  clickHandler: PropTypes.func,
  deleteHandler: PropTypes.func,
  videos: PropTypes.object
};

export default List;
