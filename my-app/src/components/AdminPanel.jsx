import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getappointment, acceptappointment, rejectedappointment } from '../slices/AdminPanelSlice';
import '../css/adminpanel.css';
import { Link } from 'react-router-dom';

function AdminPanel() {
  const dispatch = useDispatch();
  const { appointments, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getappointment());
  }, [dispatch]);

  const handleAccept = (id) => {
    dispatch(acceptappointment({ id })).then(() => dispatch(getappointment()));
  };

  const handleReject = (id) => {
    dispatch(rejectedappointment({ id })).then(() => dispatch(getappointment()));
  };

  return (
    <div className="admin-container">
      <h2>Admin Panel - Randevular</h2>

      {loading && <p>Yükleniyor...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <Link to="/editdoctormenu">
  <button className="button-edit">Doktor menü</button>
</Link>

<Link to="/saveadmin">
  <button className="button-edit">Admin ekle</button>
</Link>

      <Link to="/editpoliklinik">
  <button className="button-edit">Poliklinik menü</button>
</Link>

      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Kullanıcı</th>
            <th>Doktor</th>
            <th>Poliklinik</th>
            <th>Tarih</th>
            <th>Durum</th>
            <th>İşlem</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((app) => (
            <tr key={app.id}>
              <td>{app.id}</td>
              <td>{app.username}</td>
              <td>{app.doctorname}</td>
              <td>{app.poliklinikname}</td>
              <td>{new Date(app.tarih).toLocaleString()}</td>
              <td
                className={
                  app.durum === 'ONAYLANDI'
                    ? 'status-onaylandi'
                    : app.durum === 'REDDEDİLDİ'
                    ? 'status-reddedildi'
                    : 'status-beklemede'
                }
              >
                {app.durum}
              </td>
              <td className="action-buttons">
                {app.durum === 'BEKLEMEDE' && (
                  <>
                    <button className="button-accept" onClick={() => handleAccept(app.id)}>
                      Onayla
                    </button>
                    <button className="button-reject" onClick={() => handleReject(app.id)}>
                      Reddet
                    </button>
                  </>
                )}
                {app.durum !== 'BEKLEMEDE' && <span>—</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPanel;
