export const loadState = item => {
  try {
    const serializedState = window.localStorage.getItem(item);
    if (!serializedState) {
        return undefined;
    }
    return JSON.parse(serializedState);
} catch (err) {
    console.error(err, "issues with localStorage");
    return undefined;
  }
};

export const saveState = (item, state) => {
  try {
    if (!state && state !== "undefined") {
        return undefined;
    }
    const serializedState = JSON.stringify(state);
    debugger
    window.localStorage.setItem(item, serializedState);
  } catch (err) {
    console.error(err, "issues with localStorage");
    return undefined;
  }
};
