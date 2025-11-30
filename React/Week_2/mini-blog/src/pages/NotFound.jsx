import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>404 - Page introuvable.</h1>
      <Link to="/" style={{ fontSize: "18px", textDecoration: "underline" }}>
        Retour à l'accueil
      </Link>
    </div>
  );
};

export default NotFound;
