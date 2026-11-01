interface HeaderProps {
  darkMode: boolean;
  onToggleTheme: () => void;
}

function Header({ darkMode, onToggleTheme }: HeaderProps) {
  return (
    <header className="header">
      <div>
        <h1>User Management Dashboard</h1>
        <p>Manage and explore your users</p>
      </div>

      <button className="theme-button" onClick={onToggleTheme}>
        {darkMode ? "Light Mode ☀️" : "Dark Mode 🌙"}
      </button>
    </header>
  );
}

export default Header;
