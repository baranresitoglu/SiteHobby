import React, { useEffect, useState } from "react";

function NewsPage() {
  const [news, setNews] = useState([]); // État pour les actualités
  const [loading, setLoading] = useState(true); // État de chargement
  const [error, setError] = useState(null); // État des erreurs
  const [category, setCategory] = useState("guncel"); // Catégorie par défaut

  // Fonction pour récupérer les actualités en fonction de la catégorie
  const fetchNewsByCategory = (category) => {
    setLoading(true);
    setError(null); // Réinitialiser l'erreur avant une nouvelle requête
    fetch(`/api/news/category/${category}`) // Corrigé : utilisation des backticks
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des actualités");
        }
        return response.json();
      })
      .then((data) => {
        setNews(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
        setNews([]); // Réinitialiser les actualités si une erreur survient
      });
  };

  // Charger les actualités lors du changement de catégorie
  useEffect(() => {
    fetchNewsByCategory(category);
  }, [category]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Actualités</h1>

      {/* Menu déroulant pour sélectionner une catégorie */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={{
          marginBottom: "20px",
          padding: "10px",
          fontSize: "16px",
        }}
      >
        <option value="guncel">Güncel</option>
        <option value="kurdistan">Kurdistan</option>
        <option value="rojava-suriye">Rojava-Suriye</option>
        <option value="kadin">Kadın</option>
        <option value="avrupa">Avrupa</option>
        <option value="dunya">Dünya</option>
        <option value="toplum-ekoloji">Toplum-Ekoloji</option>
        <option value="kultur">Kültür</option>
        <option value="analiz">Analiz</option>
      </select>

      {/* Affichage des erreurs */}
      {error && <p style={{ color: "red" }}>Erreur : {error}</p>}

      {/* Affichage des actualités ou message d'absence */}
      {!loading && news.length === 0 && !error && (
        <p>Aucune actualité disponible pour cette catégorie.</p>
      )}

      {news.map((article, index) => (
        <div
          key={index}
          style={{
            marginBottom: "20px",
            borderBottom: "1px solid #ddd",
            paddingBottom: "10px",
          }}
        >
          <h2>{article.title}</h2>
          {article.image ? (
            <img
              src={article.image}
              alt={article.title}
              style={{
                width: "150px",
                height: "auto",
                objectFit: "cover",
                margin: "10px 0",
              }}
            />
          ) : (
            <p style={{ color: "gray" }}>Aucune image disponible</p>
          )}
          <a
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "blue", textDecoration: "none" }}
          >
            Lire l'article complet
          </a>
        </div>
      ))}

      {loading && <p>Chargement des actualités...</p>}
    </div>
  );
}

export default NewsPage;
