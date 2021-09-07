import Types from "utils/types";

const initialState = {
  spinnerState: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Types.START_SPINNER_LOADING:
      return {
        ...state,
        spinnerState: action.spinnerState,
      };

    default:
      return {
        ...state,
      };
  }
};
