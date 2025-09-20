import React from "react";
import '../css/mainpage.css'; 

function MainPage() {
  return (
    <div className="mainpage-container">
      
      {/* Hero / Başlık */}
      <div className="hero-section">
        <h1>Hoşgeldiniz! DİV HOSPİTAL</h1>
        <p>Sağlığınız bizim önceliğimiz. Modern teknoloji ve uzman kadro ile hizmetinizdeyiz.</p>
      </div>

      {/* Hakkımızda */}
      <section className="about-section">
        <h2>Hakkımızda</h2>
        <p>
          DİV Hospital, sağlık hizmetlerinde yüksek kaliteyi ve hasta memnuniyetini ön planda tutar. 
          Modern altyapısı ve deneyimli doktor kadrosu ile güvenli ve hızlı hizmet sunar.
        </p>
        <p>
          Geniş poliklinik seçenekleri, son teknoloji cihazlar ve 7/24 acil servis ile sağlığınızı önemsiyoruz.
        </p>
      </section>

      {/* Hizmetler */}
      <section className="services-section">
        <h2>Hizmetlerimiz</h2>
        <ul>
          <li>
            <strong>Poliklinikler:</strong> Çeşitli branşlarda uzman doktorlarımız ile kaliteli poliklinik hizmeti.
          </li>
          <li>
            <strong>Acil Servis:</strong> 7/24 acil servisimiz ile her zaman yanınızdayız.
          </li>
          <li>
            <strong>Laboratuvar:</strong> Modern laboratuvarlarımız ile hızlı ve güvenilir test sonuçları.
          </li>
          <li>
            <strong>Randevu Sistemi:</strong> Kolay ve hızlı online randevu alma imkânı.
          </li>
          <li>
            <strong>Danışmanlık:</strong> Hastalarımıza özel sağlık danışmanlığı hizmeti.
          </li>
        </ul>
      </section>

    </div>
  );
}

export default MainPage;
