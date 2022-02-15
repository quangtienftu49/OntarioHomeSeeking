import actionTypes from "../actions/actionTypes";

const initialState = {
  allCities: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ALL_CITIES_SUCCESS:
      state.allCities = action.allCities;
      return {
        ...state,
      };

    case actionTypes.FETCH_ALL_CITIES_FAILED:
      state.allCities = [];
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default adminReducer;
