import Types from "utils/types";

const spinnerAction = (flag) => async (dispatch) => {
  document.body.style.overflowY = flag ? "hidden" : "unset";
  dispatch({
    type: Types.START_SPINNER_LOADING,
    spinnerState: flag,
  });
};

export { spinnerAction };
