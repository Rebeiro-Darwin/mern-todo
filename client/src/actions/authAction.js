import axios from "axios";
import { returnErrors } from "./errorAction";
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

  try {
    const res = await axios.get("/api/auth/user", tokenConfig(getState));

    dispatch({ type: USER_LOADED, payload: res.data });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
    dispatch({ type: AUTH_ERROR });
  }
};

export const register = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  // turning a javascript obj to json
  const body = JSON.stringify({ name, email, password });
  try {
    const res = await axios.post("/api/users", body, config);
    dispatch({ type: REGISTER_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL
    });
    dispatch(
      returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
    );
    dispatch({ type: AUTH_ERROR });
  }
};

export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

export const tokenConfig = getState => {
  const token = getState().auth.token;
  const config = {
    headers: {
      "Content-type": "applications/json"
    }
  };
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return config;
};
