import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Articles from "./pages/Articles";
import ArticleComments from "./pages/ArticleComments";
import Article from "./pages/Article";
import ProtectedRoute from "./routes/ProtectedRoute";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Editor from "./pages/Editor";
import Profile from "./pages/Profile";
import ProfileOverview from "./pages/ProfileOverview";
import ProfileInfo from "./pages/ProfileInfo";
import ProfilePosts from "./pages/ProfilePosts";
import { login, logout } from "./features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

const AppRoutes = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch();

  const userRole = useSelector((state) => state.auth.userRole);

  function handleLogin(email) {
    dispatch(login({ email, role: "admin" })); // par exemple
  }
  function handleLogout() {
    dispatch(logout());
  }
  return (
    <>
      {/* <div style={{ padding: "10px", background: "#eee" }}>
        <p>isAuth : {isAuth ? "Connecté" : "Déconnecté"}</p>
        <button onClick={login}>Login</button>
        <button onClick={logout}>Logout</button>
      </div> */}

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="articles" element={<Articles />}>
            <Route index element={<p>Sélectionnez un article</p>} />
            <Route path=":id" element={<Article />} />
            <Route path=":id/comments" element={<ArticleComments />} />
          </Route>
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route
            path="login"
            element={<Login onLogin={handleLogin} isAuth={isAuth} />}
          />
          <Route
            path="admin"
            element={
              <ProtectedRoute isAuth={isAuth}>
                <Admin onLogout={handleLogout} />
              </ProtectedRoute>
            }
          />
          <Route
            path="editor"
            element={
              userRole === "editor" || userRole === "admin" ? (
                <Editor />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRoute isAuth={isAuth}>
                <Profile />
              </ProtectedRoute>
            }
          >
            <Route index element={<ProfileOverview />} />
            <Route path="info" element={<ProfileInfo />} />
            <Route path="posts" element={<ProfilePosts />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
