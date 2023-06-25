import { createSlice } from "@reduxjs/toolkit";
import {
  getAllDoctor,
  getAllDoctorNotJoinChannel,
  createAccountDoctor,
  getAllAccountDoctor,
  createDoctor,
  updateDoctor,
  getAllSpeciality,
} from "../action/doctor.action";

const initialState = {
  loading: false,
  listDoctor: [],
  listSpeciality: [],
  listAccountDoctor: [],
  listDoctorNotJoinChannel: [],
  filterDoctors: [],
  filterAccountDoctors: [],
  error: null,
};

export const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {
    searchDoctor: (state, action) => {
      const doctors = state.listDoctor.filter((doctor) =>
        (doctor.name || "").toLowerCase().includes(action.payload.toLowerCase())
      );
      return {
        ...state,
        filterDoctors:
          action.payload.length > 0 ? doctors : [...state.listDoctor],
      };
    },
    searchAccountDoctor: (state, action) => {
      const accounts = state.listAccountDoctor.filter(
        (account) =>
          account.name.toLowerCase().includes(action.payload.toLowerCase()) ||
          (account.user.email || "")
            .toLowerCase()
            .includes(action.payload.toLowerCase()) ||
          (account.user.username || "")
            .toLowerCase()
            .includes(action.payload.toLowerCase())
      );
      return {
        ...state,
        filterAccountDoctors:
          action.payload.length > 0 ? accounts : [...state.listAccountDoctor],
      };
    },
  },
  extraReducers: (builder) => {
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

    builder.addCase(getAllSpeciality.pending, (state) => {
      state.loading = true;
      state.listSpeciality = [];
    });
    builder.addCase(getAllSpeciality.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.listSpeciality = payload;
    });
    builder.addCase(getAllSpeciality.rejected, (state, { payload }) => {
      state.error = payload;
      state.loading = false;
      state.listSpeciality = [];
    });

    builder.addCase(getAllAccountDoctor.pending, (state) => {
      state.loading = true;
      state.listAccountDoctor = [];
    });
    builder.addCase(getAllAccountDoctor.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.listAccountDoctor = payload;
    });
    builder.addCase(getAllAccountDoctor.rejected, (state, { payload }) => {
      state.error = payload;
      state.loading = false;
      state.listAccountDoctor = [];
    });

    builder.addCase(getAllDoctorNotJoinChannel.pending, (state) => {
      state.loading = true;
      state.listDoctor = [];
      state.listDoctorNotJoinChannel = [];
    });
    builder.addCase(
      getAllDoctorNotJoinChannel.fulfilled,
      (state, { payload }) => {
        state.loading = false;
        state.listDoctorNotJoinChannel = payload;
      }
    );
    builder.addCase(
      getAllDoctorNotJoinChannel.rejected,
      (state, { payload }) => {
        state.error = payload;
        state.loading = false;
        state.listDoctorNotJoinChannel = [];
      }
    );
    builder.addCase(createAccountDoctor.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createAccountDoctor.fulfilled, (state, { payload }) => {
      state.loading = false;
      console.log(payload);
    });
    builder.addCase(createAccountDoctor.rejected, (state, { payload }) => {
      state.error = payload;
      console.log(payload);
      state.loading = false;
    });
    builder.addCase(createDoctor.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createDoctor.fulfilled, (state, { payload }) => {
      state.loading = false;
      console.log(payload);
    });
    builder.addCase(createDoctor.rejected, (state, { payload }) => {
      state.error = payload;
      console.log(payload);
      state.loading = false;
    });
    builder.addCase(updateDoctor.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateDoctor.fulfilled, (state, { payload }) => {
      state.loading = false;
      console.log(payload);
    });
    builder.addCase(updateDoctor.rejected, (state, { payload }) => {
      state.error = payload;
      console.log(payload);
      state.loading = false;
    });
  },
});
export const { searchDoctor, searchAccountDoctor } = doctorSlice.actions;

export default doctorSlice.reducer;
