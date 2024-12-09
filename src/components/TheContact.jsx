import React, { useState } from "react";
import MainLayout from "../Layouts/MainLayout";
import Breadcrumbs from "./Breadcrumbs";
import { NavLink } from "react-router-dom";

const TheContact = () => {
  const breadcrumbItems = [
    { label: "Home", link: "/", active: false },
    { label: "Contact Us", link: "/contact", active: true },
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <MainLayout>
      <div className="container py-2 text-start">
        <Breadcrumbs items={breadcrumbItems} />
        <h1 className="section-title">Contact Us - Ghidaq Store</h1>
        <p className="text-muted mb-4">
          We will be happy if you contact us through one of our channels.
        </p>

        <div className="row justify-content-between">
          <div className="col-md-5 mb-4">
            <h2 className="fw-bold mb-4">Contact Information</h2>
            <div class="contact-info">
              <ul>
                <li>
                  <strong>Email:</strong> ghidaq@ghidaqstore.com
                </li>
                <li>
                  <strong>Phone:</strong> +966 500 000 000
                </li>
                <li>
                  <strong>Address:</strong> Riyadh, Saudi Arabia
                </li>
              </ul>
            </div>
            <h4 className="my-4 fw-bold">Social Media:</h4>
            <div className="d-flex justify-content-start">
              <div className="social-media social-media-contact">
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
            </div>
          </div>

          <div className="col-md-6">
            <h2 className="section-title">Get In Touch</h2>
            <p>Have any questions or need assistance? We are here to help!</p>
            <div className="contact-form p-4 shadow-lg rounded border">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="formName" className="form-label">
                    Your Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="formName"
                    placeholder="Enter your name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="formEmail" className="form-label">
                    Your Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="formEmail"
                    placeholder="Enter your email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="formMessage" className="form-label">
                    Your Message
                  </label>
                  <textarea
                    className="form-control"
                    id="formMessage"
                    rows="4"
                    placeholder="Enter your message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-hero-start">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default TheContact;
