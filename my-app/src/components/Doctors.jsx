import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getalldoctors } from "../slices/DoctorSlice"
import '../css/doctor.css'

function Doctor() {
  const dispatch = useDispatch()
  const { doctors, loading, error } = useSelector((state) => state.doctors)

  useEffect(() => {
    dispatch(getalldoctors())
  }, [dispatch])

  if (loading) return <p>Yükleniyor...</p>
  if (error) return <p style={{ color: "red" }}>Hata: {error}</p>

  return (
    <div className="doctor-page">
      <h2 className="page-title">👨‍⚕️ Doktorlarımız</h2>
      <p className="page-desc">
        Alanında uzman doktorlarımızla sağlığınız için hizmetinizdeyiz. 
        Hangi bölümde tedavi olmak istediğinizi seçerek doktorlarımız hakkında bilgi alabilirsiniz.
      </p>

      <div className="doctor-grid">
        {doctors && doctors.length > 0 ? (
          doctors.map((doc) => (
            <div key={doc.id} className="doctor-card">
              <h3>{doc.name}</h3>
              <p className="specialty">Uzmanlık Alanı: {doc.poliklinik.name}</p>
              <p className="desc">
                {doc.name}, {doc.poliklinik.name} bölümünde uzun yıllar tecrübeye sahip olup 
                hasta odaklı yaklaşımıyla hizmet vermektedir.
              </p>
            </div>
          ))
        ) : (
          <p>Henüz doktor bulunmamaktadır.</p>
        )}
      </div>
    </div>
  )
}

export default Doctor
