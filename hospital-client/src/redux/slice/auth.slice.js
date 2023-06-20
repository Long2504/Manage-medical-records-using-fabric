import { createSlice } from '@reduxjs/toolkit';
import Auth from '../../utils/helper/auth.helper';
import { Login } from '../action/auth.action';


const initialState = {
  loading: false,
  loggedIn: Auth.checkLogin(),
  role: Auth.getRole(),
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      Auth.removeInfo();
      state.loggedIn = false;
      state.role = null;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(Login.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(Login.fulfilled, (state, action) => {
        state.loading = false;
        state.loggedIn = true;
        state.role = Auth.getRole();
      })
      .addCase((state, action) => {
        state.error = action;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
