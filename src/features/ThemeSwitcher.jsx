import { useEffect, useRef, useState } from "react";
import Theme from "./Theme";

function ThemeSwitcher() {
  const [isSwitcherOpen, setIsSwitcherOpen] = useState(false);
  const [theme, setTheme] = useState(null);
  const ref = useRef();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "system";
    setTheme(savedTheme);

    const applyTheme = () => {
      if (
        savedTheme === "dark" ||
        (savedTheme === "system" &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      ) {
        document.documentElement.setAttribute("data-bs-theme", "dark");
      } else {
        document.documentElement.setAttribute("data-bs-theme", "light");
      }
    };
    applyTheme();

    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsSwitcherOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleThemeChange = (mode) => {
    localStorage.setItem("theme", mode);
    setTheme(mode);

    if (mode === "system") {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      document.documentElement.setAttribute(
        "data-bs-theme",
        prefersDark ? "dark" : "light"
      );
    } else {
      document.documentElement.setAttribute("data-bs-theme", mode);
    }
    setIsSwitcherOpen(false);
  };

  return (
    <div className="dropdown" data-bs-theme="dark" ref={ref}>
      <button
        className="btn btn-outline-theme dropdown-toggle"
        onClick={() => setIsSwitcherOpen((prev) => !prev)}
        aria-expanded={isSwitcherOpen}
      >
        {theme === "dark" && (
          <i
            className="bi bi-moon-fill"
            style={{ color: "var(--accent-color)" }}
          ></i>
        )}
        {theme === "light" && (
          <i
            className="bi bi-sun-fill"
            style={{ color: "var(--accent-color)" }}
          ></i>
        )}
        {theme === "system" && (
          <i
            className="bi bi-display"
            style={{ color: "var(--accent-color)" }}
          ></i>
        )}
      </button>
      <ul
        className={`dropdown-menu dropdown-center justify-conent-center ${
          isSwitcherOpen ? "show" : ""
        }`}
      >
        {["dark", "light", "system"].map((mode) => (
          <Theme
            key={mode}
            mode={mode}
            currentTheme={theme}
            handleThemeChange={handleThemeChange}
          />
        ))}
      </ul>
    </div>
  );
}

export default ThemeSwitcher;
