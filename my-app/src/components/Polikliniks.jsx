import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getallpoliklinik } from "../slices/PoliklinikSlice"
import '../css/poliklinik.css'; 

function Polikliniks() {
  const dispatch = useDispatch()
  const { poliklinik, loading, error } = useSelector((state) => state.poliklinik)

  useEffect(() => {
    dispatch(getallpoliklinik())
  }, [dispatch])

  if (loading) return <p>Loading...</p>
  if (error) return <p style={{ color: "red" }}>Hata: {error}</p>

  return (
    <div className="polikliniks-container">
      <h2>Poliklinikler</h2>
      <div className="polikliniks-grid">
        {poliklinik && poliklinik.length > 0 ? (
          poliklinik.map((klinik) => (
            <div key={klinik.id} className="poliklinik-card">
              <h3>{klinik.name}</h3>
              <ul className="doctor-list">
                {klinik.doctors.map((doc) => (
                  <li key={doc.id}>{doc.name}</li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p>Henüz poliklinik yok</p>
        )}
      </div>
    </div>
  )
}

export default Polikliniks
