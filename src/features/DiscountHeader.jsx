import React, { useState } from "react";

const DiscountHeader = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    isVisible && (
      <header className="discount-header">
        <div className="container">
          <div className="d-flex justify-content-center align-items-center">
            <h5 className="fw-bold message-text mx-auto">
              Use Code: (SAVE20) To Get 20% Discount at Checkout.
            </h5>
            <button
            type="button"
            className="btn-close fs-5"
            aria-label="Close"
            onClick={handleClose}
          />
          </div>
        </div>
      </header>
    )
  );
};

export default DiscountHeader;
