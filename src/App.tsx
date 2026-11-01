import { useState, useEffect } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";

import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(function () {
    return localStorage.getItem("dashboard-theme") === "dark";
  });

  useEffect(
    function () {
      localStorage.setItem("dashboard-theme", darkMode ? "dark" : "light");
    },
    [darkMode]
  );

  function handleToggleTheme() {
    setDarkMode(function (current) {
      return !current;
    });
  }

  return (
    <div className={darkMode ? "app dark-mode" : "app"}>
      <Header darkMode={darkMode} onToggleTheme={handleToggleTheme} />

      <main className="main">
        <AppRoutes />
      </main>

      <Footer />
    </div>
  );
}

export default App;
