import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiCaller } from "../../services/ApiCaller.services";
import Auth from "../../utils/helper/auth.helper";
import { handleErrors } from "../../utils/helper/commom.helper";

export const Login = createAsyncThunk("auth/signin", async (body, { rejectWithValue }) => {
  try {
    const { data } = await ApiCaller("POST", body, "auth/signin");
    console.log(data);
    Auth.setInfo(data);
  } catch (error) {
    return rejectWithValue(handleErrors(error));
  }
});
export const ForgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (username, { rejectWithValue }) => {
    try {
      const { data } = await ApiCaller(
        "POST",
        { username },
        "auth/forgotpassword"
      );
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);
export const ConfirmPasswordCode = createAsyncThunk(
  "auth/ConfirmPasswordCode",
  async (data, { rejectWithValue }) => {
    try {
      const { result } = await ApiCaller(
        "POST",
        data,
        "auth/verify-forget-password"
      );
      return result;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);
export const ResetPassword = createAsyncThunk(
  "auth/ResetPassword",
  async (data, { rejectWithValue }) => {
    try {
      const { result } = await ApiCaller("POST", data, "auth/password_reset");
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);
export const ChangePassword = createAsyncThunk(
  "auth/ChangePassword",
  async (data, { rejectWithValue }) => {
    try {
      const { result } = await ApiCaller("POST", data, "auth/change-password");
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);
