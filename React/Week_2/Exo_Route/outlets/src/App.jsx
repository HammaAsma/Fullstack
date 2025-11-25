import { use, useState } from "react";
import "./App.css";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import MainLayout from "./components/main/MainLayout";
import HomePage from "./components/main/HomePage";
import AboutPage from "./components/main/AboutPage";
import AdminLayout from "./components/admin/AdminLayout";
import AdminUsers from "./components/admin/AdminUsers";
import AdminRoles from "./components/admin/AdminRoles";
import NotFoundPage from "./components/errors/NotFoundPage";
import UserPage from "./components/Users/UserPage";

function App() {
  const Users = [
    {
      id: 1,
      name: "Alice",
      email: "example@example.com",
      password: "123456",
      ville: "paris",
    },
    {
      id: 2,
      name: "Bob",
      email: "Bob@example.com",
      password: "745896",
      ville: "london",
    },
    {
      id: 3,
      name: "Charlie",
      email: "Charlie@example.com",
      password: "541263",
      ville: "rabat",
    },
  ];
  const [isAuth, setIsAuth] = useState(false);

  return (
    <>
      <Routes>
        {/* Layout public */}
        <Route element={<MainLayout />}>
          <Route
            path="/"
            element={<HomePage users={Users} setIsAuth={setIsAuth} />}
          />

          <Route path="/about" element={<AboutPage />} />
        </Route>
        {/* Layout admin protege */}

        <Route
          path="/admin"
          element={
            isAuth ? (
              <AdminLayout setIsAuth={setIsAuth} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        >
          {/* /admin/users */}
          <Route path="users" element={<AdminUsers users={Users} />} />
          <Route path="users/user/:id" element={<UserPage users={Users} />} />
          {/* /admin/roles */}
          <Route path="roles" element={<AdminRoles />} />
        </Route>
        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
