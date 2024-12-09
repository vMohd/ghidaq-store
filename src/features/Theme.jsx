import React from "react";

function Theme({ mode, currentTheme, handleThemeChange }) {
  const getIconClass = () => {
    switch (mode) {
      case "dark":
        return "bi bi-moon-fill";
      case "light":
        return "bi bi-sun-fill";
      case "system":
        return "bi bi-display";
      default:
        return "";
    }
  };

  return (
    <li>
      <button
        className={`dropdown-item ${currentTheme === mode ? "active" : ""}`}
        onClick={() => handleThemeChange(mode)}
      >
        <i className={`${getIconClass()} me-2`}></i> 
        {mode.charAt(0).toUpperCase() + mode.slice(1)}
      </button>
    </li>
  );
}

export default Theme;
