import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signup } from '../slices/AdminPanelSlice';

function Signup() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      setMessage({ text: "Lütfen tüm alanları doldurun!", type: "error" });
      return;
    }
    try {
      await dispatch(signup(formData)).unwrap();
      setMessage({ text: "Kayıt başarıyla oluşturuldu!", type: "success" });
      setFormData({ name: "", email: "", password: "" });
    } catch (err) {
      setMessage({ text: err || "Kayıt başarısız!", type: "error" });
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2>Kayıt Ol</h2>

        {message.text && (
          <div className={`signup-message ${message.type}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="signup-form">
          <label>Ad Soyad</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Örn: Ahmet Yılmaz"
          />

          <label>E-posta</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="ornek@mail.com"
          />

          <label>Şifre</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
          />

          <button type="submit">Kayıt Ol</button>
        </form>
      </div>

      <style jsx>{`
        .signup-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          padding: 1rem;
          background: #f4f6f8;
        }
        .signup-card {
          width: 100%;
          max-width: 400px;
          background: #ffffff;
          border-radius: 16px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
          padding: 2rem;
          box-sizing: border-box;
          transition: transform 0.3s ease;
        }
        .signup-card:hover {
          transform: translateY(-5px);
        }
        h2 {
          text-align: center;
          color: #4f46e5;
          margin-bottom: 1.5rem;
          font-size: 1.8rem;
        }
        .signup-message {
          text-align: center;
          padding: 0.75rem;
          border-radius: 8px;
          margin-bottom: 1rem;
          color: #fff;
        }
        .signup-message.success {
          background-color: #16a34a;
        }
        .signup-message.error {
          background-color: #dc2626;
        }
        .signup-form label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: #374151;
        }
        .signup-form input {
          width: 100%;
          padding: 0.75rem;
          margin-bottom: 1rem;
          border: 1px solid #d1d5db;
          border-radius: 10px;
          font-size: 1rem;
          outline: none;
        }
        .signup-form button {
          width: 100%;
          padding: 0.75rem;
          font-size: 1rem;
          font-weight: 600;
          border: none;
          border-radius: 10px;
          background-color: #4f46e5;
          color: #fff;
          cursor: pointer;
          transition: background 0.3s ease;
        }
        .signup-form button:hover {
          background-color: #4338ca;
        }

        @media (max-width: 500px) {
          .signup-card {
            padding: 1.5rem;
            border-radius: 12px;
          }
          h2 {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}

export default Signup;
