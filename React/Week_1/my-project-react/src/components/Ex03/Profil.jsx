import React from "react";

const Profil = (user) => {
  return (
    <div>
      <h2>Profil Utilisateur</h2>
      <p>Nom: {user.name}</p>
      <p>Email: {user.email}</p>
      {user.isAdmin && <p style={{ color: "red" }}>Admin</p>}
    </div>
  );
};

export default Profil;
