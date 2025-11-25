import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const UserPage = ({ users }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = users.find((u) => u.id === Number(id));

  if (!user) {
    return (
      <p>
        <strong>Utilisateur introuvable</strong>
      </p>
    );
  }

  return (
    <div className="card">
      <div className="card-body">
        <button
          className="btn btn-secondiare mt-3"
          onClick={() => navigate(-1)}
        >
          <i className="bi bi-arrow-left"></i>
        </button>
        <div className="card text-center p-5" style={{ minWidth: "300px" }}>
          <h5 className="card-title">{user.name}</h5>
          <p className="card-text mb-1">
            <strong>Email :</strong> {user.email}
          </p>
          <p className="card-text mb-1">
            <strong>Ville :</strong> {user.ville}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
