import { text } from "express";
import React, { useState } from "react";

const FormulaireTache = ({ onAdd }) => {
  const [texte, setTexte] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    if (!texte.trim()) return;
    onAdd(texte);
    setTexte("");
  }

  return (
    <form onSubmit="{handleSubmit}">
      <input
        type="text"
        placeholder="Nouvelle Tâche"
        value={text}
        onChange={(e) => setTexte(e.target.value)}
      />
      <button>Ajouter</button>
    </form>
  );
};

export default FormulaireTache;
