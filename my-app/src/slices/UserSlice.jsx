import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const setSessionStorage = () => {
    const data = sessionStorage.getItem("token");
    return data ? data : "lütfen giriş yapınız";
};



const initialState = {
    token:null,
    sessiontoken:setSessionStorage(),
    loading:false,
    user:{},
    appointments:[]
    

    

}



export const getuser=createAsyncThunk(
    "getuser",
    async (thunkApi) => {
        try {
            const response=await axios.get("https://hospitalappointmentsystem-backend.sliplane.app/appointment/user/getuser",
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
export const getappointmentuser=createAsyncThunk(
    "getappointmentuser",
    async (thunkApi) => {
        try {
            const response=await axios.get("https://hospitalappointmentsystem-backend.sliplane.app/appointment/gettallappointmentuser",
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
export const cancelappointment = createAsyncThunk(
  "cancelappointment",
  async ({ id }, thunkApi) => {   
    try {
      const response = await axios.put(
        `https://hospitalappointmentsystem-backend.sliplane.app/appointment/cancelappointment/${id}`,
        { id },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data || "Hata Oluştu");
    }
  }
);





export const login=createAsyncThunk(
    "login",
    async ({email,password},thunkAPI) => {
        try {
            const response=await axios.post("https://hospitalappointmentsystem-backend.sliplane.app/appointment/login",
                {
                    email,
                    password
                },
                 { responseType: "text" }

            )
            const token = JSON.parse(response.data).token;
            sessionStorage.setItem("token",token)
            console.log(token);
            

            return token


            
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data || "Hata oluştu");
            
        }
        
    }
)

const UserSlice=createSlice({
        name:"user",
        initialState,
        reducers:{
            clearSession(state){
                sessionStorage.removeItem("token")
                state.sessiontoken=null;
                state.token=null
                state.user={}
            }
        },
        extraReducers: (builder) => {
        builder
        
       
            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload;
                state.sessiontoken = action.payload;
            })
            .addCase(getuser.pending,(state)=>{
                state.loading=true
            })
            .addCase(getuser.fulfilled,(state,action)=>{
                state.user=action.payload
                state.loading=true
                
            })
            .addCase(getuser.rejected,(state)=>{
                state.user=null
                state.loading=false
            })
            .addCase(getappointmentuser.fulfilled,(state,action)=>{
                state.appointments=action.payload;
            })
           
            
    }
});

export const { clearSession } = UserSlice.actions;
export default UserSlice.reducer;