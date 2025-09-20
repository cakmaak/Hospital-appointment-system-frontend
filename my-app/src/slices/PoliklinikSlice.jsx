import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  poliklinik: [],
  loading: false,
  error: null,
}


export const getallpoliklinik = createAsyncThunk(
  "poliklinik/getallpoliklinik",
  async (_, thunkApi) => {
    try {
      const response = await axios.get(
        "https://hospitalappointmentsystem-backend.sliplane.app/appointment/poliklinik/getallklinik"
      )
      return response.data
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data || "Hata oluştu")
    }
  }
)

const PoliklinikSlice = createSlice({
  name: "poliklinik",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
   builder.addCase(getallpoliklinik.pending,(state)=>{
    state.loading = true;   
})
builder.addCase(getallpoliklinik.fulfilled,(state,action)=>{
    state.poliklinik = action.payload;
    state.loading = false;  
})
builder.addCase(getallpoliklinik.rejected,(state, action)=>{
    state.loading = false;
    state.error = action.payload || "Veri alınamadı";
})

  },
})

export default PoliklinikSlice.reducer
