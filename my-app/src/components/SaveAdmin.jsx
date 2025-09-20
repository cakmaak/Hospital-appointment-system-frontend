import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveadmin } from "../slices/AdminPanelSlice";
import '../css/saveadmin.css';
import { useNavigate } from "react-router-dom";

function SaveAdmin() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(saveadmin({ email, password, name })).unwrap();
      setErrorMsg("");
      setSuccessMsg("Admin başarıyla kaydedildi!");
      setEmail("");
      setPassword("");
      setName("");
    
    } catch (err) {
      setSuccessMsg("");
      setErrorMsg("Kayıt yapılamadı, bir hata oluştu.");
    }
  };

  return (
    <div className="saveadmin-page">
      <div className="saveadmin-card">
        <h2 className="saveadmin-title">Yeni Admin Ekle</h2>
        {errorMsg && <p className="error-msg">{errorMsg}</p>}
        {successMsg && <p className="success-msg">{successMsg}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>İsim</label>
            <input
              type="text"
              placeholder="İsim giriniz"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Email giriniz"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Şifre</label>
            <input
              type="password"
              placeholder="Şifre giriniz"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="saveadmin-btn" disabled={loading}>
            {loading ? "Kaydediliyor..." : "Kaydet"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SaveAdmin;
