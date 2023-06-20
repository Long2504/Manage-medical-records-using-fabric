import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiCaller } from "../../services/ApiCaller.services";
import Auth from "../../utils/helper/auth.helper";

export const Login = createAsyncThunk('auth/signin', async (body) => {
  try {
    const { data } = await ApiCaller('POST', body, 'auth/signin');
    console.log(data);
    Auth.setInfo(data);
  } catch (error) {
    throw new Error(error);
  }
})

