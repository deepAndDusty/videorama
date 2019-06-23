import React, { Fragment } from "react";
import PropTypes from "prop-types";
import classes from "./YTPlayer.module.scss";
import YouTube from "react-youtube";

const YTPlayer = ({ selectedVideo, onReady, onEnd, isEmptyPlaylist }) => {
  const { videoID } = selectedVideo || {};

  const opts = {
    width: "100%",
    height: "100%",
    playerVars: {
      autoplay: 1,
      frameBorder: 0
    }
  };
  const shouldShowMessage = videoID;
  return (
    <Fragment>
      <div className={classes.title}>VIDEORAMA</div>
      <div className={classes.playerContainer}>
        {!shouldShowMessage ? (
          <div className={classes.noVideoSelected}>Add videos to start</div>
        ) : (
          <YouTube
            videoId={videoID}
            onEnd={onEnd}
            opts={opts}
            onReady={onReady}
          />
        )}
      </div>
    </Fragment>
  );
};

YTPlayer.propTypes = {
  selectedVideo: PropTypes.object,
  onReady: PropTypes.func.isRequired,
  onEnd: PropTypes.func.isRequired,
  isEmptyPlaylist: PropTypes.bool.isRequired
};

export default YTPlayer;