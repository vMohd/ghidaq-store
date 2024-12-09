import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../CartProvider";
import Alert from "../components/Alert";
import MainLayout from "../Layouts/MainLayout";
import Breadcrumbs from "./Breadcrumbs";
import EmptyCart from "../assets/empty_cart.svg";

const CartPage = () => {
  const { cart, removeFromCart, clearCart, applyPromoCode, updateQuantity } =
    useCart();
  const navigate = useNavigate();
  const [alert, setAlert] = useState({ type: "", message: "", show: false });

  const [promoCode, setPromoCode] = useState("");
  const [promoCodeDiscount, setPromoCodeDiscount] = useState(0);

  const promoCodes = [
    { code: "SAVE10", discount: 10 },
    { code: "SAVE20", discount: 20 },
    { code: "SAVE30", discount: 30 },
  ];

  const handleApplyPromoCode = () => {
    if (!promoCode || promoCode.trim() === "") {
      setAlert({
        type: "danger",
        message: "Promo code cannot be empty.",
        show: true,
      });
      return;
    }

    if (cart.items.length === 0) {
      setAlert({
        type: "danger",
        message:
          "Your cart is empty. Please add items to proceed with checkout.",
        show: true,
      });
      return;
    }

    const thePromoCode = promoCodes.find(
      (promo) => promo.code.toLowerCase() === promoCode.toLowerCase()
    );

    if (!thePromoCode) {
      setAlert({
        type: "danger",
        message: "Promo code is invalid.",
        show: true,
      });
      setPromoCodeDiscount(0);
      applyPromoCode(0);
      return;
    }

    if (promoCodeDiscount === thePromoCode.discount) {
      setAlert({
        type: "warning",
        message: `Promo code "${thePromoCode.code}" has already been applied.`,
        show: true,
      });
      return;
    }

    setAlert({
      type: "success",
      message: `Promo code "${thePromoCode.code}" applied successfully!`,
      show: true,
    });
    setPromoCodeDiscount(thePromoCode.discount);
    applyPromoCode(thePromoCode.discount);
  };

  const handleCheckout = () => {
    if (cart.items.length === 0) {
      setAlert({
        type: "danger",
        message:
          "Your cart is empty. Please add items to proceed with checkout.",
        show: true,
      });
    } else {
      navigate("/invoice", {
        state: {
          cartItems: cart.items || [],
          totalPrice: cart.totalPrice || 0,
          totalDiscount: cart.totalDiscount || 0,
          promoCodeDiscount: cart.promoCodeDiscount || 0,
        },
      });
      clearCart();
    }
  };

  const handleRemoveItem = (id) => {
    removeFromCart(id);
    setAlert({
      type: "info",
      message: "Product has been removed from the cart !",
      show: true,
    });
  };

  const handleClearCart = () => {
    clearCart();
    setAlert({
      type: "info",
      message: "Cart has been cleared !",
      show: true,
    });
  };

  const handleQuantityChange = (id, increment) => {
    const item = cart.items.find((item) => item.id === id);
    if (item) {
      const newQuantity = increment
        ? item.quantity + 1
        : Math.max(item.quantity - 1, 1);
      updateQuantity(id, newQuantity);
    }
  };

  const breadcrumbItems = [
    { label: "Home", link: "/", active: false },
    { label: "Cart", link: "/cart", active: true },
  ];

  return (
    <MainLayout>
      <div className="container mb-5">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="row justify-content-between align-items-center mb-4">
          <div className="col">
            <h2 className="fw-bold text-start">
              Shopping Cart ({cart.totalQuantity} items)
            </h2>
          </div>
          {cart.items.length > 0 && (
            <div className="col-auto">
              <button className="btn btn-danger" onClick={handleClearCart}>
                <i className="bi bi-cart-x"></i> Clear Cart
              </button>
            </div>
          )}
        </div>

        {cart.items.length === 0 ? (
          <div className="row justify-content-center align-items-center text-center">
            <div className="col-12">
              <p className="text-muted fs-2">Your cart is currently empty.</p>
            </div>
            <div className="col-md-4 mt-5">
              <img src={EmptyCart} alt="Empty Cart" className="img-fluid" />
            </div>
            <div className="text-start mt-5">
              <Link className="btn btn-hero-start" to="/">
                <i className="bi bi-arrow-left"></i> Continue Shopping
              </Link>
            </div>
          </div>
        ) : (
          <div className="row g-5">
            <div className="col-lg-8">
              {cart.items.map((item) => (
                <div className="card cart-card mb-4 p-2" key={item.id}>
                  <div className="row g-0">
                    <div className="col-md-3">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="img-fluid cart-image"
                      />
                      {item.discount > 5 && (
                        <div className="badge bg-danger text-white position-absolute top-0 start-0 m-3">
                          {item.discount}% OFF
                        </div>
                      )}
                    </div>
                    <div className="col-md-9">
                      <div className="card-body">
                        <h5 className="card-title text-start">
                          {item.title.slice(0, 60)}...
                        </h5>
                        <div className="d-flex flex-column flex-wrap justify-content-start align-items-start gap-2">
                          <div className="d-flex flex-wrap align-items-center gap-2">
                            <strong className="card-text">Price:</strong>
                            {item.discount > 5 && (
                              <p className="card-text text-decoration-line-through text-muted mb-0">
                                ${item.price}
                              </p>
                            )}
                            <p className="card-text mb-0">
                              ${item.discountedPrice || item.price}
                            </p>
                          </div>

                          <p className="card-text mb-0">
                            <strong>Total:</strong> $
                            {(
                              (item.discountedPrice || item.price) *
                              item.quantity
                            ).toFixed(2)}
                          </p>

                          <div className="d-flex align-items-center gap-2">
                            <strong>Quantity:</strong>
                            <button
                              className="btn btn-outline-qty btn-sm"
                              onClick={() =>
                                handleQuantityChange(item.id, false)
                              }
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M18 12H6"
                                ></path>
                              </svg>
                            </button>
                            <span className="fw-bold qty-border">
                              {item.quantity}
                            </span>
                            <button
                              className="btn btn-outline-qty"
                              onClick={() =>
                                handleQuantityChange(item.id, true)
                              }
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 6v12m6-6H6"
                                ></path>
                              </svg>
                            </button>
                          </div>
                          <button
                            className="btn btn-danger mt-2"
                            onClick={() => handleRemoveItem(item.id)}
                          >
                            <i className="bi bi-trash"></i> Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="col-lg-4">
              <div className="card cart-card p-3">
                <h4 className="mb-3">Order Summary</h4>
                <div className="d-flex justify-content-between">
                  <span>Price:</span>
                  <span className="fw-bold">
                    $
                    {cart.items
                      .reduce(
                        (total, item) => total + item.price * item.quantity,
                        0
                      )
                      .toFixed(2)}
                  </span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Delivery:</span>
                  <span className="text-success fw-bold">Free</span>
                </div>
                {cart.totalDiscount > 0 && (
                  <div className="d-flex justify-content-between">
                    <span>Discount:</span>
                    <span className="text-danger fw-bold">
                      -${cart.totalDiscount}
                    </span>
                  </div>
                )}
                {cart.promoCodeDiscount > 0 && (
                  <div className="d-flex justify-content-between">
                    <span>Promo Code Discount:</span>
                    <span className="text-danger fw-bold">
                      -$
                      {(
                        (cart.items.reduce(
                          (total, item) => total +  (item.discountedPrice || item.price) * item.quantity,
                          0
                        ) *
                          cart.promoCodeDiscount) /
                        100
                      ).toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="d-flex justify-content-between fw-bold">
                  <span>Total:</span>
                  <span>${cart.totalPrice}</span>
                </div>

                <div className="mt-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <button
                    className="btn btn-primary mt-3"
                    onClick={handleApplyPromoCode}
                  >
                    Apply Promo Code
                  </button>
                </div>
                <hr></hr>
                <div>
                  <button
                    className="btn btn-success btn-lg"
                    onClick={handleCheckout}
                  >
                    <i className="bi bi-cart-check"></i> Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <Alert
          type={alert.type}
          message={alert.message}
          show={alert.show}
          onClose={() => setAlert({ ...alert, show: false })}
          duration={3000}
        />
      </div>
    </MainLayout>
  );
};

export default CartPage;
