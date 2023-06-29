import { createSlice } from "@reduxjs/toolkit";
import Auth from "../../utils/helper/auth.helper";
import {
  Login,
  ForgotPassword,
  ResetPassword,
  ChangePassword,
  ConfirmPasswordCode,
} from "../action/auth.action";

const initialState = {
  loading: false,
  loggedIn: Auth.checkLogin(),
  role: Auth.getRole(),
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      Auth.removeInfo();
      state.loggedIn = false;
      state.role = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(Login.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(Login.fulfilled, (state, action) => {
      state.loading = false;
      state.loggedIn = true;
      state.role = Auth.getRole();
    });
    builder.addCase(Login.rejected, (state, action) => {
      state.error = action;
    });

    builder.addCase(ForgotPassword.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(ForgotPassword.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(ForgotPassword.rejected, (state, action) => {
      state.error = action;
    });

    builder.addCase(ResetPassword.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(ResetPassword.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(ResetPassword.rejected, (state, action) => {
      state.error = action;
    });
    builder.addCase(ConfirmPasswordCode.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(ConfirmPasswordCode.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(ConfirmPasswordCode.rejected, (state, action) => {
      state.error = action;
      state.loading = false;
    });
    builder.addCase(ChangePassword.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(ChangePassword.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(ChangePassword.rejected, (state, action) => {
      state.error = action;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
