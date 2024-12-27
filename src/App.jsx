import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NewsPage from "./NewsPage";

function App() {
  return (
    <Router>
      <div>
        <header style={{ textAlign: "center", padding: "10px", background: "#f4f4f4" }}>
          <h1>Bienvenue sur l'agence de presse de Baran</h1>
          <a
            href="https://firatnews.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: "16px", textDecoration: "none", color: "blue" }}
          >
            Aller à la page d'accueil d'ANF
          </a>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<NewsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
