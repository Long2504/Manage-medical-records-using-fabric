m
import { ApiCaller } from "../../services/ApiCaller.services";

export const getAllDoctor = createAsyncThunk(
  "doctor/get-all-doctor",
  async () => {
    try {
      const { data } = await ApiCaller(
        "GET",
        null,
        "admin/doctor/get-all-doctor"
      );
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const getAllDoctorNotJoinChannel = createAsyncThunk(
  "doctor/get-all-doctor-not-join-channel",
  async () => {
    try {
      const { data } = await ApiCaller(
        "GET",
        null,
        "admin/doctor/get-doctor-not-join-channel"
      );
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const createAccountDoctor = createAsyncThunk(
  "doctor/create-account-doctor",
  async (body) => {
    try {
      const { data } = await ApiCaller(
        "POST",
        body,
        "admin/doctor/create-account-doctor"
      );
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
);
export const updateAccountDoctor = createAsyncThunk(
  "doctor/update-account-doctor",
  async (body) => {
    try {
      const { data } = await ApiCaller(
        "POST",
        body,
        "admin/doctor/create-account-doctor"
      );
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
);
