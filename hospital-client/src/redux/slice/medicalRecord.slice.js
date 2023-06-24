import { createSlice } from "@reduxjs/toolkit";
import {
  createMedicalRecord,
  getAllMedicalRecord,
  getMedicalRecordByIdDoctor,
} from "../action/medicalRecord.action";
const initialState = {
  loading: false,
  error: null,
  listMedicalRecord: [],
  listAllMedicalRecord: [],
};

export const medicalRecordSlice = createSlice({
  name: "medicalRecord",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
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
    });
    builder.addCase(
      getMedicalRecordByIdDoctor.fulfilled,
      (state, { payload }) => {
        state.loading = false;
        state.listMedicalRecord = payload;
      }
    );
    builder.addCase(
      getMedicalRecordByIdDoctor.rejected,
      (state, { payload }) => {
        state.error = payload;
        state.loading = false;
        state.listMedicalRecord = [];
      }
    );
    builder.addCase(getAllMedicalRecord.pending, (state) => {
      state.loading = true;
      state.listAllMedicalRecord = [];
    });
    builder.addCase(getAllMedicalRecord.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.listAllMedicalRecord = payload;
    });
    builder.addCase(getAllMedicalRecord.rejected, (state, { payload }) => {
      state.error = payload;
      state.loading = false;
      state.listAllMedicalRecord = [];
    });
  },
});

export default medicalRecordSlice.reducer;
