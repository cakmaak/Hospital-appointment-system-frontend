import { configureStore } from '@reduxjs/toolkit'
import PoliklinikReducer from './slices/PoliklinikSlice'
import DoctorReducer from './slices/DoctorSlice'
import UserReducer from './slices/UserSlice'
import AppointmentReducer from './slices/AppointmentSlice'
import AdminpanelReducer from './slices/AdminPanelSlice'



export const store = configureStore({
  reducer: {
    poliklinik:PoliklinikReducer,
    doctors:DoctorReducer,
    user:UserReducer,
    appointment:AppointmentReducer,
    admin:AdminpanelReducer

   

  },
})