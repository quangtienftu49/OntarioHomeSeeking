import actionTypes from "./actionTypes";
import { getAllCities, saveHomelisting } from "../../services/userService";
import { toast } from "react-toastify";

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

export const saveHomelistingAction = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await saveHomelisting(data);
      //   console.log("check res", res);
      if (res && res.errCode === 0) {
        toast.success("Save a home listing successfully!");
        dispatch({
          type: actionTypes.SAVE_HOMELISTING_SUCCESS,
        });
      } else {
        toast.error("Cannot post a home listing!");

        dispatch({
          type: actionTypes.SAVE_HOMELISTING_FAILED,
        });
      }
    } catch (e) {
      toast.error("Cannot post a home listing!");
      console.log("SAVE_HOMELISTING_FAILED", e);
      dispatch({
        type: actionTypes.SAVE_HOMELISTING_FAILED,
      });
    }
  };
};
