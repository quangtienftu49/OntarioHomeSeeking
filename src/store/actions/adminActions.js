import actionTypes from "./actionTypes";
import { getAllCities } from "../../services/userService";

export const adminLoginSuccess = (adminInfo) => ({
  type: actionTypes.ADMIN_LOGIN_SUCCESS,
  adminInfo: adminInfo,
});

export const adminLoginFail = () => ({
  type: actionTypes.ADMIN_LOGIN_FAIL,
});

export const processLogout = () => ({
  type: actionTypes.PROCESS_LOGOUT,
});

export const fetchAllCities = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCities();
      console.log("check res", res);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_CITIES_SUCCESS,
          allCities: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_CITIES_FAILED,
        });
      }
    } catch (e) {
      console.log("FETCH_ALL_CITIES_FAILED", e);
      dispatch({
        type: actionTypes.FETCH_ALL_CITIES_FAILED,
      });
    }
  };
};
