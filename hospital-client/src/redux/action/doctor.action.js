import { ApiCaller } from "../../services/ApiCaller.services";
import { createAsyncThunk } from "@reduxjs/toolkit";

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
export const getAllSpeciality = createAsyncThunk(
  "doctor/get-all-speciality",
  async () => {
    try {
      const { data } = await ApiCaller("GET", null, "speciality/get-all");
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const getAllAccountDoctor = createAsyncThunk(
  "doctor/get-all-account-doctor",
  async () => {
    try {
      const { data } = await ApiCaller(
        "GET",
        null,
        "admin/doctor/get-all-account-doctor"
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
export const createDoctor = createAsyncThunk(
  "doctor/create-doctor",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await ApiCaller(
        "POST",
        body,
        "admin/doctor/create-doctor"
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const updateDoctor = createAsyncThunk(
  "doctor/update-doctor",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await ApiCaller("POST", body, "doctor/update-doctor");
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const createAccountDoctor = createAsyncThunk(
  "doctor/create-account-doctor",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await ApiCaller(
        "POST",
        body,
        "admin/doctor/create-account-doctor"
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const updateAccountDoctor = createAsyncThunk(
  "doctor/update-account-doctor",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await ApiCaller(
        "POST",
        body,
        "admin/doctor/update-account-doctor"
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
