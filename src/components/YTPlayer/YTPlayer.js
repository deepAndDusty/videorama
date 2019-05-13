import React from "react";
import PropTypes from "prop-types";
import classes from "./YTPlayer.module.scss";
import YouTube from "react-youtube";

const YTPlayer = ({ selectedVideo, onReady, onEnd, isEmptyPlaylist }) => {
  const { videoID } = selectedVideo;

  const opts = {
    width: "100%",
    height: "100%",
    playerVars: {
      autoplay: 1,
      frameBorder: 0
    }
  };

  return (
    <div className={classes.playerContainer}>
      {isEmptyPlaylist ? (
        <div className={classes.noVideoSelected}>Add videos to start</div>
      ) : (
        <YouTube videoId={videoID} onEnd={onEnd} opts={opts} onReady={onReady} />
      )}
    </div>
  );
};

YTPlayer.propTypes = {
  selectedVideo: PropTypes.object,
  onReady: PropTypes.func.isRequired,
  onEnd: PropTypes.func.isRequired,
  isEmptyPlaylist: PropTypes.bool.isRequired
};

export default YTPlayer;
