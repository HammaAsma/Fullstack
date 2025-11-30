import React, { useState } from "react";
import { articles } from "../data/articles";
import { Link, useParams, useNavigate } from "react-router-dom";

const Article = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [showdetail, setShowdetail] = useState(false);
  const article = articles.find((a) => a.id === Number(id));

  // Si l'article n'existe pas
  if (!article) {
    return (
      <div className="container mt-4">
        <div className="alert alert-secondary p-4 text-center">
          <h2 className="mb-3">⚠️ Article Introuvable</h2>
          <button
            className="btn btn-outline-secondary"
            onClick={() => navigate("/articles", { replace: true })}
          >
            Retour aux articles
          </button>
        </div>
      </div>
    );
  }

  // Gestion texte affiché
  const maxLength = 10;
  const isLongText = article.contenu.length > maxLength;
  const texteAffiche =
    showdetail || !isLongText
      ? article.contenu
      : article.contenu.slice(0, maxLength) + " ...";

  return (
    <div className="container mt-4">
      {/* Card principale */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h3 className="card-title mb-3">{article.titre}</h3>

          <p className="card-text">{texteAffiche}</p>

          {isLongText && !showdetail && (
            <button
              className="btn btn-link p-0"
              onClick={() => setShowdetail(true)}
            >
              Lire plus
            </button>
          )}
        </div>
      </div>

      {/* Card pour les actions */}
      <div className="card shadow-sm p-4 d-flex flex-row gap-3 align-items-center">
        <Link to={`/articles/${id}/comments`} className="btn btn-primary">
          Commentaires
        </Link>

        <button
          onClick={() => navigate("/articles")}
          className="btn btn-outline-dark"
        >
          Retour à la liste
        </button>
      </div>
    </div>
  );
};

export default Article;
