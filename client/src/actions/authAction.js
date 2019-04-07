import axios from "axios";
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS
} from "./types";

export const loadUser = () => async (dispatch, getState) => {
  dispatch({ type: USER_LOADING });

  const token = getState().auth.token;
  const config = {
    headers: {
      "Content-type": "applications/json"
    }
  };
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  try {
    const res = await axios.get("/api/auth/user", config);

    dispatch({ type: USER_LOADED, payload: res.data });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};
