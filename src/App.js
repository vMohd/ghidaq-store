import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from "react";
import { CartProvider } from './CartProvider';
import LandingPage from './components/LandingPage';
import TheCategory from './components/TheCategory';
import TheAbout from './components/TheAbout';
import TheContact from './components/TheContact';
import ProductDetails from './components/ProductDetails';
import TheInfo from './components/TheInfo';
import NotFound from './components/NotFound';
import SalesPage from './components/SalesPage';
import CartPage from './components/CartPage';
import InvoicePage from './components/InvoicePage';


import './App.css';

function App() {
  useEffect(() => {
    const root = document.documentElement;
    const savedTheme = localStorage.getItem("theme") || "system";

    const applyTheme = (theme) => {
      if (theme === "dark") {
        root.setAttribute("data-bs-theme", "dark");
      } else if (theme === "light") {
        root.setAttribute("data-bs-theme", "light");
      } else if (theme === "system") {
        const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
        root.setAttribute("data-bs-theme", isDarkMode ? "dark" : "light");
      }
    };

    applyTheme(savedTheme);

    const handleSystemThemeChange = (e) => {
      if (localStorage.getItem("theme") === "system") {
        root.setAttribute("data-bs-theme", e.matches ? "dark" : "light");
      }
    };

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, []);


  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<TheAbout />} />
          <Route path="/contact" element={<TheContact />} />
          <Route path="/info" element={<TheInfo />} />
          <Route path="/category/:category" element={<TheCategory />} />
          <Route path="/product/:productId" element={<ProductDetails />} />
          <Route path="/sales" element={<SalesPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/invoice" element={<InvoicePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </CartProvider>

  );
}

export default App;
