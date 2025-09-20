import React from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Polikliniks from '../components/Polikliniks'
import Doctors from '../components/Doctors'
import Login from '../components/Login'
import Appointment from '../components/Appointment'
import GetAppointment from '../components/GetAppointment'
import AdminPanel from '../components/AdminPanel'
import EditDoctor from '../components/EditDoctor'
import Signup from '../components/Signup'
import SaveAdmin from '../components/SaveAdmin'
import Editpoliklinik from '../components/Editpoliklinik'

function RouterConfig() {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Home></Home>} ></Route>
            <Route path='/polikliniks' element={<Polikliniks></Polikliniks>} ></Route>
            <Route path='/doctors' element={<Doctors></Doctors>} ></Route>
            <Route path='/login' element={<Login></Login>} ></Route>
            <Route path='/appointment' element={<Appointment></Appointment>} > </Route>
            <Route path='/getappointments' element={<GetAppointment></GetAppointment>} ></Route>
            <Route path='/adminpanel' element={<AdminPanel></AdminPanel>} ></Route>
            <Route path='/editdoctormenu' element={<EditDoctor></EditDoctor>} ></Route>
            <Route path='/editpoliklinik' element={<Editpoliklinik></Editpoliklinik>} ></Route>
            <Route path='/signup' element={<Signup></Signup>} ></Route>
            <Route path='/saveadmin' element={<SaveAdmin></SaveAdmin>}></Route>

        </Routes>
      
    </div>
  )
}

export default RouterConfig
