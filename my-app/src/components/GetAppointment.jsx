import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getuser, getappointmentuser, cancelappointment } from "../slices/UserSlice";
import '../css/getappointment.css';

export default function Randevularim() {
  const dispatch = useDispatch();
  const { user, appointments, loading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getuser());
    dispatch(getappointmentuser());
  }, [dispatch]);

  const handleCancel = (id) => {
    dispatch(cancelappointment({ id })).then(() => dispatch(getappointmentuser()));
  };

  const canCancel = (tarih, durum) => {
    const appointmentDate = new Date(tarih);
    const now = new Date();

    
    return durum === "BEKLEMEDE" && now < new Date(appointmentDate.getTime() - 24 * 60 * 60 * 1000);
  };

  return (
    <div className="randevularim-container">
      {user && (
        <div className="user-card">
          <h2>Hoşgeldin, {user.name} {user.surname}</h2>
          <p>Email: {user.email}</p>
        </div>
      )}

      {!loading && appointments.length === 0 && <p>Henüz randevunuz yok.</p>}

      <div className="appointments-list">
        {appointments.map((appt) => (
          <div key={appt.id} className="appointment-card">
            <p><strong>Kullanıcı:</strong> {appt.username}</p>
            <p><strong>Poliklinik:</strong> {appt.poliklinikname}</p>
            <p><strong>Doktor:</strong> {appt.doctorname}</p>
            <p><strong>Tarih:</strong> {new Date(appt.tarih).toLocaleString()}</p>
            <p><strong>Durum:</strong> {appt.durum}</p>
            {canCancel(appt.tarih, appt.durum) && (
              <button className="button-cancel" onClick={() => handleCancel(appt.id)}>
                İptal Et
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
