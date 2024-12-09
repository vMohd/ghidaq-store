import React from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/logo.svg";
import MainLayouts from "../Layouts/MainLayout";

const InvoicePage = () => {
  const location = useLocation();
  const {
    cartItems = [],
    totalDiscount = 0,
    promoCodeDiscount = 0,
    totalPrice = 0,
  } = location.state || {};

  const formattedTotalDiscount = Number(totalDiscount).toFixed(2);
  const formattedPromoCodeDiscount = (cartItems.reduce((total, item) => total + (item.discountedPrice || item.price) * item.quantity, 0) * promoCodeDiscount / 100).toFixed(2);
  const formattedTotalPrice = Number(totalPrice);

  const invoiceNumber = Math.floor(Math.random() * 1000000);
  const invoiceDate = new Date().toLocaleDateString();

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity,0);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <MainLayouts>
      <div className="container">
        <h2 className="section-title text-start mb-4">Order Invoice</h2>
        <div className="card invoice-card shadow">
          <div className="card-body">
            <div className="container mb-3">
              <div className="row align-items-center">
                <div className="col-md-12">
                  <img
                    src={Logo}
                    alt="Ghidaq Store Logo"
                    width="60"
                    height="60"
                    draggable="false"
                    className="img-fluid"
                  />
                </div>
                <h3 className="fw-bold">Ghidaq Store</h3>
              </div>

              {cartItems.length > 0 ? (
                <div>
                  <div className="row justify-content-between align-items-start mb-1">
                    <div className="col-md-6 text-start">
                      <p className="text-muted fw-bold">Invoice</p>
                      <ul className="list-unstyled">
                        <li>
                          <span className="fw-bold">ID:</span> #
                          {invoiceNumber.toString().padStart(6, "0")}
                        </li>
                        <li>
                          <span className="fw-bold">Date:</span> {invoiceDate}
                        </li>
                        <li>
                          <span className="me-1 fw-bold"> Status: </span>
                          <span className="badge bg-success fw-bold">
                            Confirmed
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="table-responsive">
                    <table className="table">
                      <thead className="table">
                        <tr>
                          <th>#</th>
                          <th>Product</th>
                          <th>Quantity</th>
                          <th>Price</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItems.map((item, index) => (
                          <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>
                              <div className="d-flex align-items-center">
                                <img
                                  src={item.image}
                                  alt={item.title}
                                  className="invoice-image me-2"
                                />
                                <span>{item.title.slice(0, 40)}...</span>
                              </div>
                            </td>
                            <td>{item.quantity}</td>
                            <td>${item.price.toFixed(2)}</td>
                            <td>${(item.price * item.quantity).toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="row mt-1 text-start">
                    <div className="col-md-12">
                      <ul className="list-unstyled">
                        <li className="text-muted">
                          <span className="me-3">Subtotal:</span> $
                          {subtotal.toFixed(2)}
                        </li>
                        {totalDiscount > 0 && (
                          <li className="text-danger">
                            <span className="me-3">Discount:</span>
                            -${formattedTotalDiscount}
                          </li>
                        )}
                        {promoCodeDiscount > 0 && (
                          <li className="text-danger">
                            <span className="me-3">Promo Discount:</span>
                            -${formattedPromoCodeDiscount}
                          </li>
                        )}
                      </ul>
                      <span>
                        <span className="fw-bold me-3">Total Items:</span>
                        {totalItems}
                      </span>
                      <p>
                        <span className="fw-bold me-3">Total Price:</span> $
                        {formattedTotalPrice}
                      </p>
                    </div>
                  </div>
                  <hr></hr>
                  <div className="row justify-content-between align-items-center">
                    <div className="col">
                      <p className="text-start fw-bold">Thank you for your purchase!</p>
                    </div>
                    <div className="col-auto">
                      <Link className="btn btn-hero-start" to="/">
                        <i className="bi bi-arrow-left"></i> Continue Shopping
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="row justify-content-center align-items-center text-center">
                  <div className="text-danger text-center my-4 display-4">
                    No items in the invoice.
                  </div>
                  <div className="text-start mt-3">
                    <Link className="btn btn-hero-start" to="/">
                      <i className="bi bi-arrow-left"></i> Continue Shopping
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayouts>
  );
};

export default InvoicePage;
