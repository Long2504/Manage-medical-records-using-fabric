import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiCaller } from "../../services/ApiCaller.services";


export const getScheduleOfDoctorByDate = createAsyncThunk('schedule/get-appointment-doctor', async (body) => {
  try {
    const { data } = await ApiCaller('POST', body, 'schedule/get-appointment-doctor');
    return data;
  } catch (error) {
    throw new Error(error);
  }
});