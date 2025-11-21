import "./App.css";
import Timer from "./components/Timer";
import ThemeToggle from "./components/ThemeToggle";
import UserList from "./components/UserList";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [theme, setTheme] = useLocalStorage("theme", "light");
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <>
      <div
        className={
          theme === "light"
            ? "bg-light text-dark min-vh-100"
            : "bg-dark text-white min-vh-100"
        }
      >
        <div className="container py-4">
          <h1 className="mb-4">Liste des utilisateurs</h1>
          <Timer />
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          <UserList />
        </div>
      </div>
    </>
  );
}

export default App;
