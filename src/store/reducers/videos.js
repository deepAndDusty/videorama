import * as actionTypes from "../actions";
import { loadState } from "../../localStorage";

const initialState = {
  videos: [],
  selectedVideo: {},
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_VIDEO:
      const newSate = [action.payload];
      return {
        ...state,
        videos: [...state.videos, ...newSate]
      };
    case actionTypes.REMOVE_VIDEO:
      const updatedState = state.videos.filter(item => item.videoID !== action.payload);
      return {
        ...state,
        videos: updatedState
      };
    case actionTypes.GET_VIDEOS:
      const storedState = loadState('videorama');
      return {
        ...state,
        ...storedState,
      };
    case actionTypes.SELECT_VIDEO:
      const newSelectedVideo = state.videos.filter(item => item.videoID === action.payload);
      return {
          ...state,
          selectedVideo: newSelectedVideo[0]
        };
    default:
      return state;
  }
};

export default reducer;
