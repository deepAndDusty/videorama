
import React from "react";
import PropTypes from "prop-types";
import classes from "./ListItem.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ListItem = ({ data, clickHandler, deleteHandler }) => {
  const {artist, title, videoID} = data;
  const video = {artist, title, videoID};
  const handleDelete = (e) => {
    e.preventDefault(); 
    deleteHandler(video);
  }

  return (
    <div className={classes.container} onClick={() => clickHandler(video)}>
      <img className={classes.thumbnail} src={`https://img.youtube.com/vi/${videoID}/default.jpg`} alt=""/>
      <div className={classes.item}>
        <div>{artist}</div>
        <div>{title}</div>
      </div>
      <div className={classes.deleteBtnContainer} onClick={handleDelete}>
        <FontAwesomeIcon icon="times-circle"/>
      </div>
    </div>
  );
};

ListItem.propTypes = {
  data: PropTypes.any.isRequired,
  clickHandler: PropTypes.func,
  deleteHandler: PropTypes.func,
};

export default ListItem;
