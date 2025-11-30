import { useState, useEffect } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");

  const isAuth = useSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  // Si l'utilisateur est déjà authentifié, on le redirige vers la page d'administration
  // ou vers la page d'où il venait
  useEffect(() => {
    if (isAuth) {
      const redirectTo = location.state?.from || "/admin";
      if (window.location.pathname !== redirectTo) {
        navigate(redirectTo, { replace: true });
      }
    }
  }, [isAuth, navigate, location.state?.from]);

  // Si l'utilisateur est déjà authentifié, on ne montre rien (sera redirigé par l'effet ci-dessus)
  if (isAuth) {
    return <div>Redirection en cours...</div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, role: "admin" }));
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ height: "80vh" }}
    >
      <div
        className="card shadow-lg p-4"
        style={{ width: "400px", borderRadius: "12px" }}
      >
        <h2 className="text-center mb-4">🔐 Connexion</h2>

        {location.state?.from && (
          <div className="alert alert-warning text-center">
            Vous devez être connecté pour accéder à :{" "}
            <strong>{location.state.from}</strong>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold">Adresse Email</label>
            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="exemple@email.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary btn-lg w-100 mt-2">
            Se connecter
          </button>
        </form>

        <p className="text-center mt-3 text-muted">
          Accès réservé — merci d’entrer votre email.
        </p>
      </div>
    </div>
  );
};

export default Login;
