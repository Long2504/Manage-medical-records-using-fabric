import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiCaller } from "../../services/ApiCaller.services";


export const getScheduleOfDoctorByDate = createAsyncThunk('schedule/get-schedule-doctor', async (body) => {
  try {
    const { data } = await ApiCaller('POST', body, 'doctor/get-schedule-doctor');
    return data;
  } catch (error) {
    throw new Error(error);
  }
})