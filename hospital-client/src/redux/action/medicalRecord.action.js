import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiCaller } from "../../services/ApiCaller.services";


export const createMedicalRecord = createAsyncThunk('medicalRecord/create', async (body) => {
  try {
    const { data } = await ApiCaller('POST', body, 'doctor/create-medical-record');
    return data;
  } catch (error) {
    throw new Error(error);
  }
})


export const getMedicalRecordByIdDoctor = createAsyncThunk('medicalRecord/getByIdDoctor', async (body) => {
  try {
    const { data } = await ApiCaller('POST', body, "medical-record/get-by-id-doctor");
    return data;
  } catch (error) {
    throw new Error(error);
  }
}
)
