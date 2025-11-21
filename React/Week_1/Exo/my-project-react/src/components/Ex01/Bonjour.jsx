import React from "react";

const Bonjour = () => {
  const heure = new Date().getHours();
  return <div>{heure < 12 ? "Bonjour" : "Bonsoir"}</div>;
};

export default Bonjour;
