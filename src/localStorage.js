export const loadState = item => {
  try {
    const serializedState = window.localStorage.getItem(item);
    if (!serializedState) {
        return {};
    }
    return JSON.parse(serializedState);
} catch (err) {
    console.error(err, "issues with localStorage");
    return undefined;
  }
};

export const saveState = (item, state) => {
  try {
    const serializedState = JSON.stringify(state);
    window.localStorage.setItem(item, serializedState);
  } catch (err) {
    console.error(err, "issues with localStorage");
    return undefined;
  }
};
