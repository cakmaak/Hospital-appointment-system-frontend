import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'


const initialState = {
  doctors: [],
  loading: false,
  error: null,
}

export const getalldoctors = createAsyncThunk(
  "getalldoctors",
  async (_, thunkApi) => {
    try {
      const response = await axios.get(
        "https://hospitalappointmentsystem-backend.sliplane.app/appointment/doctor/getalldoctors"
      )
      return response.data
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data || "Hata oluştu")
    }
  }
)
const DoctorSlice = createSlice({
  name: "doctors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
   builder.addCase(getalldoctors.pending,(state)=>{
    state.loading = true;   
})
builder.addCase(getalldoctors.fulfilled,(state,action)=>{
    state.doctors = action.payload;
    state.loading = false;  
})
builder.addCase(getalldoctors.rejected,(state, action)=>{
    state.loading = false;
    state.error = action.payload || "Veri alınamadı";
})

  },
})

export default DoctorSlice.reducer
