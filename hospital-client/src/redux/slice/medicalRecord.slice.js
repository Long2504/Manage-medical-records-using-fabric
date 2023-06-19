import { createSlice } from '@reduxjs/toolkit';
import { createMedicalRecord, getMedicalRecordByIdDoctor } from '../action/medicalRecord.action';
const initialState = {
  loading: false,
  error: null,
  listMedicalRecord: [],
};

export const medicalRecordSlice = createSlice({
  name: 'medicalRecord',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(createMedicalRecord.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createMedicalRecord.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(createMedicalRecord.rejected, (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    });
    builder.addCase(getMedicalRecordByIdDoctor.pending, (state) => {
      state.loading = true;
      state.listMedicalRecord = [];
    }
    );
    builder.addCase(getMedicalRecordByIdDoctor.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.listMedicalRecord = payload;
    }
    );
    builder.addCase(getMedicalRecordByIdDoctor.rejected, (state, { payload }) => {
      state.error = payload;
      state.loading = false;
      state.listMedicalRecord = [];
    }
    );

  }
});

export default medicalRecordSlice.reducer;