import React, { Component } from "react";
import SplitPane from "./components/SplitPane/SplitPane";
import AddVideoForm from "./containers/AddVideoForm/AddVideoForm";
import List from "./components/List/List";
import YTPlayer from "./components/YTPlayer/YTPlayer";
import fa from "./FontAwesome";

class App extends Component {
  state = {
    videos: [],
    selectedVideo: {},
    isEmptyPlaylist: true,
    continuousPlay: true,
  };

  componentDidMount() {
    this._getStoredVideos();
  }

  _getStoredVideos = () => {
    const videos = window.localStorage.getItem("videos");
    if (videos) {
      const parsed = JSON.parse(videos);
      this._setVideos(parsed.videos);
    }
  };

  _setVideos = videos => {
    this.setState(prevState => {
      return {
        ...prevState,
        videos: videos,
        isEmptyPlaylist: !videos.length
      };
    }, this._persistStateToStorage);
  };

  _getInitialVideoID = () => {
    const { videoID } = this.state.selectedVideo;
    const { continuousPlay } = this.state;
    if (videoID) {
      return videoID;
    } else if (continuousPlay) {
      const { videos } = this.state;
      return videos[0].videoID;
    }
  };

  _persistStateToStorage = () => {
    let { videos } = this.state;
    const updatedState = JSON.stringify({ videos });
    window.localStorage.setItem("videos", updatedState);
  };

  _validateVideo = videoID => this.state.videos.some(video => video.videoID === videoID);

  onVideoSubmited = video => {
    const hasVideo = this._validateVideo(video.videoID);
    if (hasVideo) {
      alert(`This video from: ${video.artist} with title: ${video.title} already exists in this playlist.`);
      return;
    }
    this.setState(
      prevState => ({
        videos: [...prevState.videos, video],
        hasEmptyList: false
      }),
      this._persistStateToStorage
    );
  };

  onVideoReady = event => {
    const isEmptyPlaylist = !!this.state.videos.length;
    if (!isEmptyPlaylist){
      this.setState(prevState => {
        return {
          ...prevState,
          isEmptyPlaylist
        };
      });
    } else {
      const nextVideoID = this._getInitialVideoID();
      event.target.loadVideoById(nextVideoID);
    }
  };


  onEnd = event => {
    const previousVideo = event.target.getVideoData();
    if(this.state.continuousPlay){
      this.playNextVideo(previousVideo.video_id);
    }
  };

  playNextVideo = (previousVideo) => {
    const indexOfCurrent = this.state.videos.findIndex((e) => {
      return e.videoID === previousVideo;
    });
    let nextIndex = indexOfCurrent + 1;
    if(!this.state.videos[nextIndex]){
      nextIndex = 0;
    }
    this.setState((prevState) => {
      return {
        ...prevState,
        selectedVideo: prevState.videos[nextIndex]}
    });
  }

  onVideoPlay = selectedVideo => {
    this.setState(prevState => {
      return {
        ...prevState,
        selectedVideo: selectedVideo
      };
    });
  };

  onVideoRemove = (selected) => {
    const updatedState = this.state.videos.filter(item => item.videoID !== selected.videoID);
    this._persistStateToStorage();
    this._setVideos(updatedState);
  }

  render() {
    const { videos, selectedVideo, isEmptyPlaylist } = this.state;

    return (
      <SplitPane
        leftTop={<AddVideoForm onVideoSubmited={this.onVideoSubmited} />}
        leftBottom={<List clickHandler={this.onVideoPlay} deleteHandler={this.onVideoRemove} data={videos} />}
        right={
            <YTPlayer
              isEmptyPlaylist={isEmptyPlaylist}
              selectedVideo={selectedVideo}
              onReady={this.onVideoReady}
              onEnd={this.onEnd}
            />
        }
      />
    );
  }
}

export default App;
