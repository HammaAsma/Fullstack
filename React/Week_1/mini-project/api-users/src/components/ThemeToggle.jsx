const ThemeToggle = ({ theme, toggleTheme }) => {
  // Thème dark/light
  return (
    <div className="mb-4 d-flex justify-content-end">
      <button
        className={`btn ${theme === "light" ? "btn-dark" : "btn-light"}`}
        onClick={toggleTheme}
      >
        {theme === "light" ? "Sombre" : "Clair"}
      </button>
    </div>
  );
};

export default ThemeToggle;
