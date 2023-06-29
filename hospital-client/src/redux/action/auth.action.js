import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiCaller } from "../../services/ApiCaller.services";
import Auth from "../../utils/helper/auth.helper";

export const Login = createAsyncThunk("auth/signin", async (body) => {
  try {
    const { data } = await ApiCaller("POST", body, "auth/signin");
    console.log(data);
    Auth.setInfo(data);
  } catch (error) {
    throw new Error(error);
  }
});
export const ForgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (username) => {
    try {
      const { data } = await ApiCaller(
        "POST",
        { username },
        "auth/forgotpassword"
      );
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
);
export const ConfirmPasswordCode = createAsyncThunk(
  "auth/ConfirmPasswordCode",
  async (data) => {
    try {
      const { result } = await ApiCaller(
        "POST",
        data,
        "auth/verify-forget-password"
      );
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
);
export const ResetPassword = createAsyncThunk(
  "auth/ResetPassword",
  async (data) => {
    try {
      const { result } = await ApiCaller("POST", data, "auth/password_reset");
      console.log(result);
    } catch (error) {
      throw new Error(error);
    }
  }
);
export const ChangePassword = createAsyncThunk(
  "auth/ChangePassword",
  async (data) => {
    try {
      const { result } = await ApiCaller("POST", data, "auth/change-password");
      console.log(result);
    } catch (error) {
      throw new Error(error);
    }
  }
);
