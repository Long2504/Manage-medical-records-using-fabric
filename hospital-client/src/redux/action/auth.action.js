import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiCaller } from "../../services/ApiCaller.services";

export const Login = createAsyncThunk('auth/signin', async (body) => {
  try {
    const { data } = await ApiCaller('POST', body, 'auth/signin');

  } catch (error) {
    throw new Error(error);
  }
})