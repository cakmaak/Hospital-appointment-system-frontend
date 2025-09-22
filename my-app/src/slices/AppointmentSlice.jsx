import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  appointment: [],
  loading: false,
  error: null,
};

export const saveAppointment = createAsyncThunk(
  "appointment/saveAppointment",
  async ({ tarih, poliklinikid, doctorid }, thunkAPI) => {
    try {
      const response = await axios.post(
        `https://hospitalappointmentsystem-backend-production.up.railway.app/appointment/saveappointment/${poliklinikid}/${doctorid}`,
        { tarih },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Hata oluştu"
      );
    }
  }
);

export const AppointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(saveAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.appointment = action.payload;
        state.error = null;
      })
      .addCase(saveAppointment.rejected, (state, action) => {
        state.loading = false;
        state.appointment = null;
        state.error = action.payload;
      });
  },
});

export default AppointmentSlice.reducer;
