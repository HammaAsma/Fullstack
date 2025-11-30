import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";

const Admin = ({ onLogout }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handelLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg">
            <div className="card-header bg-secondary text-white">
              <h1 className="mb-0">Admin Dashboard</h1>
            </div>
            <div className="card-body">
              <p className="text-muted">Cette zone est protégée.</p>
              <button className="btn btn-danger w-100" onClick={handelLogout}>
                Se Déconnecter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
