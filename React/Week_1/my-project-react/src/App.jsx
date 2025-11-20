import "./App.css";
import Bonjour from "./components/Ex01/Bonjour";
import Notification from "./components/Ex02/Notification";
import Profil from "./components/Ex03/Profil";

function App() {
  const user = {
    name: "John Doe",
    email: "johndone@example.com",
    isAdmin: true,
  };

  return (
    <div className="container mt-5">
      <div className="mb-3 p-3 bg-white rounded shadow-sm">
        <Bonjour />
      </div>

      <div className="mb-4 p-3 bg-white rounded shadow-sm">
        <Notification n={5} />
      </div>

      <div className="mb-3 p-3 bg-white rounded shadow-sm">
        <Profil {...user} />
      </div>
    </div>
  );
}

export default App;
