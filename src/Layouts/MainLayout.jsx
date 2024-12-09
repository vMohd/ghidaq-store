import React, { useEffect, useState } from "react";
import ThemeSwitcher from "../features/ThemeSwitcher";
import Logo from "../assets/logo.svg";
import MohdLogo from "../assets/mohd_logo.svg";
import CartBadge from "../components/CartBadge";

import { NavLink } from "react-router-dom";

const MainLayouts = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 500) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <NavLink
            className="navbar-brand d-flex align-items-center fw-bold"
            to="/"
          >
            <img
              src={Logo}
              alt="Ghidaq Store Logo"
              className="img-fluid me-1"
              draggable="false"
            />
            Ghidaq
          </NavLink>

          <div className="ms-auto p-3 order-md-1">
            <CartBadge />
          </div>

          <button
            className="navbar-toggler order-md-2"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <div className="burger-box">
              <span className="top-bun"></span>
              <span className="patty"></span>
              <span className="bottom-bun"></span>
            </div>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto algin-items-start">
              <li className="nav-item">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "nav-link active-link" : "nav-link"
                  }
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive ? "nav-link active-link" : "nav-link"
                  }
                >
                  About Us
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    isActive ? "nav-link active-link" : "nav-link"
                  }
                >
                  Contact Us
                </NavLink>
              </li>
            </ul>

            <div className="p-1">
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      </nav>

      <main className="py-5">{children}</main>

      <footer className="py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h5 className="footer-section">Ghidaq Store</h5>
              <p className="text-start footer-text">
                Ghidaq Store is your trusted destination for the latest
                electronics, featuring an exclusive range of high-quality
                laptops, smartphones, TVs, and gaming gear.
              </p>
            </div>

            <div className="col-md-4">
              <h5 className="footer-section">Quick Links</h5>
              <ul className="footer-links">
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive ? "active-link footer-link" : "footer-link"
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/about"
                    className={({ isActive }) =>
                      isActive ? "active-link footer-link" : "footer-link"
                    }
                  >
                    About Us
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                      isActive ? "active-link footer-link" : "footer-link"
                    }
                  >
                    Contact Us
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/info"
                    className={({ isActive }) =>
                      isActive ? "active-link footer-link" : "footer-link"
                    }
                  >
                    Shopping Information
                  </NavLink>
                </li>
              </ul>
            </div>

            <div className="col-md-4">
              <h5 className="footer-section">Follow Us</h5>
              <div className="social-media">
                <ul className="list-unstyled d-flex justify-content-center gap-2">
                  <li>
                    <NavLink to="/" className="social-icon">
                      <i className="bi bi-instagram"></i>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/" className="social-icon">
                      <i className="bi bi-twitter-x"></i>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/" className="social-icon">
                      <i className="bi bi-tiktok"></i>
                    </NavLink>
                  </li>
                </ul>
              </div>

              <div className="row mt-3">
                <div className="col d-flex justify-content-center">
                  <img
                    src={Logo}
                    alt="Ghidaq Store Logo"
                    width="60"
                    height="60"
                    draggable="false"
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-3 small credits">
            <hr />
            &copy; {new Date().getFullYear()} Ghidaq Store. All Rights Reserved.
            <br />
            Made with <span>♥</span> by
             <a
              href="https://bento.me/mwd"
              target="_blank"
              rel="noopener noreferrer"
              className="credits-link"
            >
              {" < Mohammed Al Sunbul />"}
            </a>
            <div className="mt-3">
              <a
                href="https://bento.me/mwd"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={MohdLogo}
                  alt="Mohammed Logo"
                  width="120"
                  draggable="false"
                  className="img-fluid"
                />
              </a>
            </div>
          </div>
        </div>
      </footer>

      <button
        className={`scroll-to-top ${isVisible ? "visible" : ""}`}
        onClick={scrollToTop}
      >
        ↑
      </button>
    </div>
  );
};

export default MainLayouts;
