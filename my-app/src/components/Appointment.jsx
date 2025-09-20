import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveAppointment } from "../slices/AppointmentSlice";
import { getallpoliklinik } from "../slices/PoliklinikSlice";
import '../css/appointment.css';
import jwt_decode from "jwt-decode";

export default function Appointment() {
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [etarih, setEtarih] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const dispatch = useDispatch();
  const { poliklinik, loading, error } = useSelector((state) => state.poliklinik);
  const today = new Date().toISOString().slice(0,16);

  useEffect(() => {
    dispatch(getallpoliklinik());
    const token = sessionStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwt_decode(token); // .default yok!
        console.log("Decoded token:", decoded);
        console.log("Role:", decoded.role);
      } catch (err) {
        console.error("Token decode hatası:", err);
      }
    }
  }, [dispatch]);

  const handleClinicChange = (clinicId) => {
    const clinic = poliklinik.find((c) => c.id === parseInt(clinicId));
    setSelectedClinic(clinic);
    setSelectedDoctor(null);
    setSuccessMsg(""); 
  };

  const handleSave = () => {
    const token =sessionStorage.getItem("token")
    if (!token) {
      alert("randevu olusturmak için lütfen giriş yapınız")
    }


    if (!selectedClinic || !selectedDoctor || !etarih) {
      
      alert("Lütfen poliklinik, doktor ve tarih seçiniz!");
      return;
    }

    dispatch(
      saveAppointment({
        poliklinikid: selectedClinic.id,
        doctorid: selectedDoctor,
        tarih: etarih,
      })
    )
    .unwrap()
    .then(() => {
      setSuccessMsg("Randevunuz başarıyla oluşturuldu. Randevularım sayfasından kontrol edebilirsiniz.");
      setSelectedClinic(null);
      setSelectedDoctor(null);
      setEtarih("");
    })
    .catch(() => setSuccessMsg(""));
  };

  return (
    <div className="appointment-container">
      <h2>Randevu Al</h2>

      <label>Poliklinik:</label>
      <select onChange={(e) => handleClinicChange(e.target.value)} value={selectedClinic?.id || ""}>
        <option value="">-- Seçiniz --</option>
        {poliklinik?.map((clinic) => (
          <option key={clinic.id} value={clinic.id}>{clinic.name}</option>
        ))}
      </select>

      <label>Doktor:</label>
      <select
        disabled={!selectedClinic}
        onChange={(e) => setSelectedDoctor(parseInt(e.target.value))}
        value={selectedDoctor || ""}
      >
        <option value="">-- Seçiniz --</option>
        {selectedClinic?.doctors?.map((doc) => (
          <option key={doc.id} value={doc.id}>{doc.name}</option>
        ))}
      </select>

      <label>Tarih:</label>
      <input
        type="datetime-local"
        value={etarih}
        onChange={(e) => setEtarih(e.target.value)}
        min={today}
      />

      <button onClick={handleSave} disabled={loading}>
        {loading ? "Kaydediliyor..." : "Kaydet"}
      </button>

      {error && <p style={{ color: "#f87171", marginTop: "10px" }}>{error}</p>}
      {successMsg && <p style={{ color: "#4ade80", fontWeight: "600", marginTop: "10px" }}>{successMsg}</p>}
    </div>
  );
}
