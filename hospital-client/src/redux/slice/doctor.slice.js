import { createSlice } from '@reduxjs/toolkit';
import { getAllDoctor, getAllDoctorNotJoinChannel, createAccountDoctor } from '../action/doctor.action';

const initialState = {
  loading: false,
  listDoctor: [],
  listDoctorNotJoinChannel: [],
  error: null,
};

export const doctorSlice = createSlice({
  name: 'doctor',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAllDoctor.pending, (state) => {
      state.loading = true;
      state.listDoctor = [];
    });
    builder.addCase(getAllDoctor.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.listDoctor = payload;
    });
    builder.addCase(getAllDoctor.rejected, (state, { payload }) => {
      state.error = payload;
      state.loading = false;
      state.listDoctor = [];
    });
    builder.addCase(getAllDoctorNotJoinChannel.pending, (state) => {
      state.loading = true;
      state.listDoctor = [];
      state.listDoctorNotJoinChannel = [];
    });
    builder.addCase(getAllDoctorNotJoinChannel.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.listDoctorNotJoinChannel = payload;
    }
    );
    builder.addCase(getAllDoctorNotJoinChannel.rejected, (state, { payload }) => {
      state.error = payload;
      state.loading = false;
      state.listDoctorNotJoinChannel = [];
    });
    builder.addCase(createAccountDoctor.pending, (state) => {
      state.loading = true;
    }
    );
    builder.addCase(createAccountDoctor.fulfilled, (state) => {
      state.loading = false;
    }
    );
    builder.addCase(createAccountDoctor.rejected, (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    }
    );


  }
}
);

export default doctorSlice.reducer;
