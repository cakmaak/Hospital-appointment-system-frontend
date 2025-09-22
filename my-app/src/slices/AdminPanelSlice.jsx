import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
  appointments: [],
  loading: false,
  error: null,
};

export const addpoliklinik=createAsyncThunk(
    "addpoliklinik",
    async ({name},thunkApi) => {
        try {
            const response=await axios.post("https://hospitalappointmentsystem-backend-production.up.railway.app/appointment/poliklinik/savepoliklinik",
                {name},
                {
                     headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
                }
            );
            return response.data;
            
        } catch (error) {
            return thunkApi.rejectWithValue(
        error.response?.data || "Hata oluştu"
      );
            
        }
        
    }
)
export const deletepoliklinik=createAsyncThunk(
    "deletepoliklinik",
    async ({id},thunkApi) => {
        try {
            const response=await axios.delete(`https://hospitalappointmentsystem-backend-production.up.railway.app/appointment/poliklinik/deletepoliklinik/${id}`,
                
                {
                     headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
                }
            );
            return response.data;
            
        } catch (error) {
            return thunkApi.rejectWithValue(
        error.response?.data || "Hata oluştu"
      );
            
        }
        
    }
)
export const deletedoctor = createAsyncThunk(
  "deletedoctor",
  async ({ id }, thunkApi) => {
    try {
      const response = await axios.delete(
        `https://hospitalappointmentsystem-backend-production.up.railway.app/appointment/doctor/deletedoctor/${id}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data || "Hata oluştu");
    }
  }
);
export const adddoctor=createAsyncThunk(
    "adddoctor",
    async ({name,poliklinikid},thunkApi) => {
        try {
            const response=await axios.post(`https://hospitalappointmentsystem-backend-production.up.railway.app/appointment/doctor/savedoctor/${poliklinikid}`,
                {name},
                {
                     headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
                }
            );
            return response.data;
            
        } catch (error) {
            return thunkApi.rejectWithValue(
        error.response?.data || "Hata oluştu"
      );
            
        }
        
    }
)



export const acceptappointment=createAsyncThunk(
    "acceptappointment",
    async ({id},thunkApi) => {
        try {
            const response =await axios.put(`https://hospitalappointmentsystem-backend-production.up.railway.app/appointment/acceptappointment/${id}`,
                {id},
                {
                    headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
                }
            );
            return response.data
            
            
        } catch (error) {
            return thunkApi.rejectWithValue(
        error.response?.data || "Hata oluştu"
      );
            
        }
    }
)

export const rejectedappointment=createAsyncThunk(
    "rejectedappointment", // <-- eksikti, ekledik
    async ({id},thunkApi) => {
        try {
            const response = await axios.put(
                `https://hospitalappointmentsystem-backend-production.up.railway.app/appointment/rejectedappointment/${id}`,
                {id},
                {
                  headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                  },
                }
            );
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(
                error.response?.data || "Hata oluştu"
            );
        }
    }
);

export const getappointment=createAsyncThunk(
    "getappointment",
    async (thunkApi) => {
        try {
            const response=await axios.get("https://hospitalappointmentsystem-backend-production.up.railway.app/appointment/getallappointment",
                {
                    headers:{
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`
                    }


                }
            );
            return response.data
            
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data || "Hata Oluştu")
            
        }
        
        
    }
)
export const signup= createAsyncThunk(
    "signup",
    async ({email,password,name},thunkApi) => {
        try {
            const response=await axios.post("https://hospitalappointmentsystem-backend-production.up.railway.app/appointment/user/saveuser",
                {
                    email,
                    password,
                    name
                    
                },

                

               

            )
            
            
            
            
            return response;

            
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data || "Hata oluştu");
            


    
    }
}
)

export const saveadmin= createAsyncThunk(
    "saveadmin",
    async ({email,password,name},thunkApi) => {
        try {
            const response=await axios.post("https://hospitalappointmentsystem-backend-production.up.railway.app/appointment/user/saveadmin",
                {
                    email,
                    password,
                    name
                    
                },

                {
                  headers:{
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`
                    }
                }

               

            )
            
            
            
            
            return response;

            
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data || "Hata oluştu");

    }
}
)



export const AdminPanelSlice = createSlice({
  name: "AdminPanelSlice", 
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(acceptappointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(acceptappointment.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(acceptappointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(rejectedappointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(rejectedappointment.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(getappointment.fulfilled,(state,action)=>{
        state.appointments=action.payload
      })
      .addCase(rejectedappointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
      
  },
});
    export default AdminPanelSlice.reducer

