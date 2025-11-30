import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";

const Layout = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch();

  function handleLogin(email) {
    dispatch(login({ email, role: "admin" }));
  }
  const activeStyle = ({ isActive }) => ({
    fontWeight: isActive ? "bold" : "normal",
    textDecoration: isActive ? "underline" : "none",
    color: isActive ? "crimson" : "black",
  });

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* NAVBAR BOOTSTRAP */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            Mini-Blog
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse">
            <ul
              className="navbar-nav ms-auto mb-2 mb-lg-0"
              style={{ gap: "15px" }}
            >
              <li className="nav-item">
                <NavLink to="/" end className="nav-link" style={activeStyle}>
                  Accueil
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/articles"
                  className="nav-link"
                  style={activeStyle}
                >
                  Articles
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/about" className="nav-link" style={activeStyle}>
                  About
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/contact" className="nav-link" style={activeStyle}>
                  Contact
                </NavLink>
              </li>
              {isAuth ? (
                <>
                  <li className="nav-item">
                    <NavLink
                      to="/admin"
                      className="nav-link"
                      style={activeStyle}
                    >
                      admin
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/profile"
                      className="nav-link"
                      style={activeStyle}
                    >
                      profile
                    </NavLink>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link" style={activeStyle}>
                    Login
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <Outlet />

      <footer className="bg-dark text-white text-center py-3 mt-auto">
        <p className="m-0">
          &copy; 2025 Mini-Blog - Projet pédagogique React Router & Redux
        </p>
      </footer>
    </div>
  );
};

export default Layout;
