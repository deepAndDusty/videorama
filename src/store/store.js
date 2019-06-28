import throttle from "lodash/throttle";
import { createStore } from "redux";
import videosReducer from "../store/reducers/videos";
import { saveState } from "../localStorage";

const store = createStore(videosReducer);

store.subscribe(throttle(() => {
    const updatedState = store.getState();
    saveState("videorama",  updatedState ? updatedState : {});
}), 1000);

export default store;