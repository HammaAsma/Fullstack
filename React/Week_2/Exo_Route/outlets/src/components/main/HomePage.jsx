import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = ({ users, setIsAuth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const findUser = users.find(
      (u) => u.email === email && u.password === password
    );
    if (findUser) {
      alert("connexion réuissie !");
      setIsAuth(true);
      navigate("/admin");
    } else {
      alert("Email ou mdp incorrect !");
    }
  };
  return (
    <div>
      <h1 className="mb-4 text-center">Connexion</h1>

      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email :
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Mot de passe :
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="d-flex justify-content-start">
          <button type="submit" className="btn btn-primary">
            Se connecter
          </button>
        </div>
      </form>
    </div>
  );
};

export default HomePage;
