import Constants from "utils/constants";

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(Constants.LOCAL_STORAGE_KEY);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(Constants.LOCAL_STORAGE_KEY, serializedState);
    // eslint-disable-next-line no-empty
  } catch (e) {}
};
