import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import SplitPane from "./components/SplitPane/SplitPane";
import AddVideoForm from "./containers/AddVideoForm/AddVideoForm";
import List from "./components/List/List";
import YTPlayer from "./components/YTPlayer/YTPlayer";
// eslint-disable-next-line
import fa from "./FontAwesome";
import * as actionTypes from "./store/actions";

class App extends Component {
  state = {
    videos: [],
    selectedVideo: {},
    isEmptyPlaylist: true,
    continuousPlay: true
  };

  getInitialVideoID = () => {
    const { videoID } = this.props.selectedVideo;
    const { continuousPlay } = this.state;
    if (videoID) {
      return videoID;
    } else if (continuousPlay) {
      const { videos } = this.props;
      return videos[0].videoID;
    }
  };

  validateVideo = videoID => this.props.videos.some(video => video.videoID === videoID);

  onVideoSubmited = video => {
    const hasVideo = this.validateVideo(video.videoID);
    if (hasVideo) {
      alert(
        `This video from: ${video.artist} with title: ${video.title} already exists in this playlist.`
      );
      return;
    }
  };

  playNextVideo = previousVideoID => {
    const {selectVideo, videos} = this.props;
    const indexOfCurrent = videos.findIndex(e => e.videoID === previousVideoID);
    let nextIndex = indexOfCurrent + 1;
    if (!videos[nextIndex]) {
      nextIndex = 0;
    }
    selectVideo(videos[nextIndex]);
  };

  onVideoReady = event => {
    const { videos } = this.props;
    const isPlaylistEmpty = !(videos && videos.length);
    if (!isPlaylistEmpty) {
      const nextVideoID = this.getInitialVideoID();
      event.target.loadVideoById(nextVideoID);
    }
  };

  onVideoPlay = selectedVideo => {
    const { selectVideo } = this.props;
    selectVideo(selectedVideo);
  };

  onEnd = event => {
    const previousVideo = event.target.getVideoData();
    if (this.state.continuousPlay) {
      this.playNextVideo(previousVideo.video_id);
    }
  };

  render() {
    const { videos, selectedVideo, addVideo, removeVideo } = this.props;
    const isEmptyPlaylist = !!(this.videos && !this.videos.length);
    return (
      <div className="mainContainer">
        <SplitPane
          leftTop={
            <AddVideoForm onVideoSubmited={addVideo} />
          }
          leftBottom={
            <List
              clickHandler={this.onVideoPlay}
              deleteHandler={removeVideo}
              data={videos}
            />
          }
          right={
            <YTPlayer
              isEmptyPlaylist={isEmptyPlaylist}
              selectedVideo={selectedVideo}
              onReady={this.onVideoReady}
              onEnd={this.onEnd}
            />
          }
        />
      </div>
    );
  }
}

App.propTypes = {
  videos: PropTypes.array,
  selectedVideo: PropTypes.object,
  selectVideo: PropTypes.func,
  addVideo: PropTypes.func,
  removeVideo: PropTypes.func
};

const mapStateToProps = state => {
  return {
    videos: state.videos,
    selectedVideo: state.selectedVideo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addVideo: video =>
      dispatch({ type: actionTypes.ADD_VIDEO, payload: video }),
    removeVideo: video =>
      dispatch({ type: actionTypes.REMOVE_VIDEO, payload: video.videoID }),
    selectVideo: video => {
      dispatch({ type: actionTypes.SELECT_VIDEO, payload: video.videoID });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
