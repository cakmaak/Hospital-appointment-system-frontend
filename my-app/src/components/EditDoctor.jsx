import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adddoctor, deletedoctor } from "../slices/AdminPanelSlice";
import { getallpoliklinik } from "../slices/PoliklinikSlice";
import { getalldoctors } from "../slices/DoctorSlice";

function EditDoctor() {
  const dispatch = useDispatch();
  const { poliklinik } = useSelector((state) => state.poliklinik);
  const { doctors } = useSelector((state) => state.doctors);

  const [doctorName, setDoctorName] = useState("");
  const [selectedPoliklinik, setSelectedPoliklinik] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    dispatch(getallpoliklinik());
    dispatch(getalldoctors());
  }, [dispatch]);

  const showMessage = (text, type = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 3000);
  };

  const handleAddDoctor = async () => {
    if (!doctorName) return showMessage("Lütfen doktor adını girin!", "error");
    if (!selectedPoliklinik) return showMessage("Lütfen poliklinik seçin!", "error");

    try {
      await dispatch(adddoctor({ name: doctorName, poliklinikid: selectedPoliklinik })).unwrap();
      showMessage("Doktor başarıyla eklendi!");
      setDoctorName("");
      setSelectedPoliklinik("");
    } catch {
      showMessage("Doktor eklenemedi, bir sorun oluştu.", "error");
    }
  };

  const handleDeleteDoctor = async () => {
    if (!selectedDoctor) return showMessage("Lütfen silinecek doktoru seçin!", "error");

    try {
      await dispatch(deletedoctor({ id: selectedDoctor }));
      showMessage("Doktor başarıyla silindi!");
    } catch {
      showMessage("Doktor başarıyla silindi!");
    } finally {
      setSelectedDoctor("");
      dispatch(getalldoctors());
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Doktor Yönetimi</h2>

        {message.text && (
          <div
            style={{
              ...styles.message,
              ...(message.type === "success" ? styles.success : styles.error),
            }}
          >
            {message.text}
          </div>
        )}

     
        <label style={styles.label}>Doktor Adı:</label>
        <input
          type="text"
          value={doctorName}
          onChange={(e) => setDoctorName(e.target.value)}
          placeholder="Örn: Dr. Ahmet Yılmaz"
          style={styles.input}
        />

        <label style={styles.label}>Poliklinik Seç:</label>
        <select
          value={selectedPoliklinik}
          onChange={(e) => setSelectedPoliklinik(e.target.value)}
          style={styles.input}
        >
          <option value="">Seçiniz</option>
          {poliklinik?.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        <button style={{ ...styles.button, ...styles.add }} onClick={handleAddDoctor}>
          Doktor Ekle
        </button>

        <hr style={styles.divider} />

     
        <label style={styles.label}>Silinecek Doktor:</label>
        <select
          value={selectedDoctor}
          onChange={(e) => setSelectedDoctor(e.target.value)}
          style={styles.input}
        >
          <option value="">Seçiniz</option>
          {doctors?.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name} ({d.poliklinikName})
            </option>
          ))}
        </select>

        <button style={{ ...styles.button, ...styles.delete }} onClick={handleDeleteDoctor}>
          Doktor Sil
        </button>
      </div>
    </div>
  );
}

export default EditDoctor;


const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f9fafb",
    padding: "1rem",
    boxSizing: "border-box",
  },
  card: {
    width: "100%",
    maxWidth: "600px",
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
    padding: "2rem",
    boxSizing: "border-box",
  },
  title: {
    fontSize: "1.8rem",
    fontWeight: "700",
    color: "#4f46e5",
    textAlign: "center",
    marginBottom: "1.5rem",
  },
  label: {
    display: "block",
    marginBottom: "0.5rem",
    fontWeight: "500",
    color: "#374151",
  },
  input: {
    width: "100%",
    padding: "0.75rem 1rem",
    marginBottom: "1rem",
    border: "1px solid #d1d5db",
    borderRadius: "10px",
    fontSize: "1rem",
    outline: "none",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: "0.75rem",
    fontSize: "1rem",
    fontWeight: "600",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    marginTop: "0.5rem",
    transition: "all 0.3s ease",
  },
  add: {
    backgroundColor: "#4f46e5",
    color: "#ffffff",
  },
  delete: {
    backgroundColor: "#ef4444",
    color: "#ffffff",
  },
  message: {
    textAlign: "center",
    fontWeight: "500",
    padding: "0.75rem",
    borderRadius: "10px",
    marginBottom: "1rem",
    color: "#ffffff",
  },
  success: {
    backgroundColor: "#16a34a",
  },
  error: {
    backgroundColor: "#dc2626",
  },
  divider: {
    border: "none",
    height: "1px",
    backgroundColor: "#e5e7eb",
    margin: "2rem 0",
  },
};
