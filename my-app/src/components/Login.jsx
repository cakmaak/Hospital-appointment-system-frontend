import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../slices/UserSlice";
import '../css/login.css';
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login({ email, password })).unwrap();
      setErrorMsg(""); 
      alert("Giriş başarılı!");
      navigate("/");
    } catch (err) {
      setErrorMsg("Email veya şifre hatalı!");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="login-title">Giriş Yap</h2>
        {errorMsg && <p className="error-msg">{errorMsg}</p>}
        <form onSubmit={handleSubmit}>
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
              placeholder="Şifrenizi giriniz"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
          </button>
        </form>

       
        <p className="signup-text">
          Hesabınız yok mu?{" "}
          <Link to="/signup" className="signup-link">
            Kayıt Ol
          </Link>
        </p>

        <p className="demo-info">
    Demo Admin Girişi: <strong>Email:</strong> admin@admin.com | <strong>Şifre:</strong> 123456
  </p>
      </div>
    </div>
  );
}

export default Login;
