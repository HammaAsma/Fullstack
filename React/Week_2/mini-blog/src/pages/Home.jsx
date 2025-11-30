import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="card shadow-lg p-5 text-center"
        style={{ maxWidth: "600px" }}
      >
        <h1 className="mb-3 text-primary fw-bold">
          Bienvenue sur le Mini-Blog
        </h1>

        <p className="text-muted mb-4">
          Ceci est une mini-démo construite avec <strong>React Router</strong>{" "}
          pour apprendre la navigation, les routes dynamiques et la gestion des
          pages.
        </p>

        <button
          className="btn btn-primary btn-lg w-100"
          onClick={() => navigate("/articles")}
        >
          📚 Voir les Articles
        </button>
      </div>
    </div>
  );
};

export default Home;
