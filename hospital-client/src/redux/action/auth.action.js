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
  async (email) => {
    try {
      const { data } = await ApiCaller(
        "POST",
        { email },
        "auth/forgotpassword"
      );
      console.log(data);
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
      const { result } = await ApiCaller("POST", data, "auth/change_password");
      console.log(result);
    } catch (error) {
      throw new Error(error);
    }
  }
);
