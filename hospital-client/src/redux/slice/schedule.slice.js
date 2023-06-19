import { createSlice } from '@reduxjs/toolkit';
import { getScheduleOfDoctorByDate } from '../action/schedule.action';


const initialState = {
  loading: false,
  listScheduleByDate: [],
  error: null,
};

export const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getScheduleOfDoctorByDate.pending, (state) => {
      state.loading = true;
      state.listScheduleByDate = [];
    });
    builder.addCase(getScheduleOfDoctorByDate.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.listScheduleByDate = payload;
    });
    builder.addCase(getScheduleOfDoctorByDate.rejected, (state, { payload }) => {
      state.error = payload;
      state.loading = false;
      state.listScheduleByDate = [];
    });
  },
});


export default scheduleSlice.reducer;
