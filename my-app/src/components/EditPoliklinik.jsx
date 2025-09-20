import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addpoliklinik, deletepoliklinik } from "../slices/AdminPanelSlice";
import { getallpoliklinik } from "../slices/PoliklinikSlice";

function EditPoliklinik() {
  const dispatch = useDispatch();
  const { poliklinik } = useSelector((state) => state.poliklinik);

  const [poliklinikName, setPoliklinikName] = useState("");
  const [selectedPoliklinik, setSelectedPoliklinik] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    dispatch(getallpoliklinik());
  }, [dispatch]);

  const showMessage = (text, type = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 3000);
  };

  const handleAddPoliklinik = async () => {
    if (!poliklinikName)
      return showMessage("Lütfen poliklinik adını girin!", "error");

    try {
      await dispatch(addpoliklinik({ name: poliklinikName })).unwrap();
      showMessage("Poliklinik başarıyla eklendi!");
      setPoliklinikName("");
      dispatch(getallpoliklinik());
    } catch {
      showMessage("Poliklinik eklenemedi, bir sorun oluştu.", "error");
    }
  };

  const handleDeletePoliklinik = async () => {
  if (!selectedPoliklinik)
    return showMessage("Lütfen silinecek polikliniği seçin!", "error");

  try {
    await dispatch(deletepoliklinik({ id: selectedPoliklinik })).unwrap();
  } catch (err) {
    console.error("Silme sırasında hata:", err);
  } finally {
    showMessage("Poliklinik başarıyla silindi!");
    setSelectedPoliklinik("");
    dispatch(getallpoliklinik());
  }
};

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Poliklinik Yönetimi</h2>

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

        <label style={styles.label}>Poliklinik Adı:</label>
        <input
          type="text"
          value={poliklinikName}
          onChange={(e) => setPoliklinikName(e.target.value)}
          placeholder="Örn: Kardiyoloji"
          style={styles.input}
        />

        <button
          style={{ ...styles.button, ...styles.add }}
          onClick={handleAddPoliklinik}
        >
          Poliklinik Ekle
        </button>

        <hr style={styles.divider} />

        <label style={styles.label}>Silinecek Poliklinik:</label>
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

        <button
          style={{ ...styles.button, ...styles.delete }}
          onClick={handleDeletePoliklinik}
        >
          Poliklinik Sil
        </button>
      </div>
    </div>
  );
}

export default EditPoliklinik;

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
