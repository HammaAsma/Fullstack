import { Outlet, NavLink } from "react-router-dom";

export default function MainLayout() {
  return (
    <div>
      {/* Navbar simple */}
      <header
        style={{
          padding: "10px 20px",
          borderBottom: "1px solid #ddd",
          marginBottom: "20px",
        }}
      >
        <nav style={{ display: "flex", gap: "15px" }}>
          <NavLink to="/" end>Accueil</NavLink>
          <NavLink to="/about">À propos</NavLink>
          <NavLink to="/admin/users">Admin</NavLink>
        </nav>
      </header>

      {/* Contenu des pages publiques */}
      <main style={{ padding: "20px" }}>
        <Outlet />
      </main>
    </div>
  );
}