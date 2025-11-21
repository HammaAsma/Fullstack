import { useState } from "react";
import "./App.css";
import Bonjour from "./components/Ex01/Bonjour";
import Notification from "./components/Ex02/Notification";
import Profil from "./components/Ex03/Profil";
import Timer from "./components/Timer";
import FormulaireTache from "./components/FormulaireTache";

function App() {
  // const user = {
  //   name: "John Doe",
  //   email: "johndone@example.com",
  //   isAdmin: true,
  // };
  const [taches, setTaches] = useState();
  function ajouterTache(texte) {
    setTaches([
      ...taches,
      {
        id: crypto.randomUUID(),
        texte,
        fait: false,
      },
    ]);
  }

  return (
    <>
      <FormulaireTache onAdd={ajouterTache} />
    </>
    // <div className="container mt-5">
    //   <div className="mb-3 p-3 bg-white rounded shadow-sm">
    //     <Bonjour />
    //   </div>

    //   <div className="mb-4 p-3 bg-white rounded shadow-sm">
    //     <Notification n={5} />
    //   </div>

    //   <div className="mb-3 p-3 bg-white rounded shadow-sm">
    //     <Profil {...user} />
    //   </div>
    // </div>
    //<Timer />
  );
}

export default App;
