import { Outlet, NavLink, useNavigate } from "react-router-dom";

export default function AdminLayout({ setIsAuth }) {
  const navigate = useNavigate();

  function handleLogout() {
    setIsAuth(false);
    navigate("/", { replace: true });
  }

  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      {/* Topbar */}
      <header
        className="admin-topbar"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Administration</h1>

        {/* LOGOUT BUTTON */}
        <button className="logout-btn" onClick={handleLogout}>
          {/* SVG Icon */}
          <svg className="logout-icon" viewBox="0 0 24 24">
            <path d="M16 13v-2H7V8l-5 4 5 4v-3h9zm3-10H8c-1.1 0-2 .9-2 2v4h2V5h11v14H8v-4H6v4c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
          </svg>
          Logout
        </button>
      </header>

      {/* Layout admin */}
      <div className="admin-layout">
        <aside className="admin-sidebar">
          <nav>
            <NavLink to="/admin/users">Utilisateurs</NavLink>
            <NavLink to="/admin/roles">Rôles</NavLink>
          </nav>
        </aside>

        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
