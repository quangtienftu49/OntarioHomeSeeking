const actionTypes = Object.freeze({
  //app
  APP_START_UP_COMPLETE: "APP_START_UP_COMPLETE",
  SET_CONTENT_OF_CONFIRM_MODAL: "SET_CONTENT_OF_CONFIRM_MODAL",

  //admin
  ADMIN_LOGIN_SUCCESS: "ADMIN_LOGIN_SUCCESS",
  ADMIN_LOGIN_FAIL: "ADMIN_LOGIN_FAIL",
  PROCESS_LOGOUT: "PROCESS_LOGOUT",

  //user
  ADD_USER_SUCCESS: "ADD_USER_SUCCESS",

  FETCH_ALL_CITIES_SUCCESS: "FETCH_ALL_CITIES_SUCCESS",
  FETCH_ALL_CITIES_FAILED: "FETCH_ALL_CITIES_FAILED",

  SAVE_HOMELISTING_SUCCESS: "SAVE_HOMELISTING_SUCCESS",
  SAVE_HOMELISTING_FAILED: "SAVE_HOMELISTING_FAILED",

  FETCH_ALL_HOMELISTING_SUCCESS: "FETCH_ALL_HOMELISTING_SUCCESS",
  FETCH_ALL_HOMELISTING_FAILED: "FETCH_ALL_HOMELISTING_FAILED",
});

export default actionTypes;
