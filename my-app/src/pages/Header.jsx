import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearSession } from '../slices/UserSlice';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import '../css/header.css'; 

function Header() {
  const [menuActive, setMenuActive] = useState(false);
  const [role, setRole] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleMenu = () => setMenuActive(!menuActive);
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwt_decode(token);
        setRole(decoded.role); // token içinden role alıyoruz
      } catch (err) {
        console.error("Token decode hatası:", err);
      }
    }
  }, [token]);

  const handleLogout = () => {
    dispatch(clearSession()); 
    navigate("/login"); 
  };

  return (
    <div className="header-container">
      <nav className="navbar">
        <a href="/" className="navbar-brand">DİV HOSPİTAL</a>

        <div className="hamburger" onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>

        <ul className={`navbar-nav ${menuActive ? 'active' : ''}`}>
          <li><a href="/">Anasayfa</a></li>
          <li><a href="/polikliniks">Poliklinikler</a></li>
          <li><a href="/doctors">Doktorlarımız</a></li>
          <li><a href="/appointment">Randevu Al</a></li>

          {token && role === "ADMIN" && (
            <li><a href="/adminpanel">Admin Panel</a></li>
          )}

          {!token && <li><a href="/login">Giriş Yap</a></li>}
          {token && (
            <>
              <li><a href="/getappointments">Randevularım</a></li>
              <li><button className="logout-btn" onClick={handleLogout}>Çıkış Yap</button></li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Header;
