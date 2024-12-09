import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from "../CartProvider"; 

function CartBadge() {
  const { cart } = useCart(); 

  const totalQuantity = cart.items
    ? cart.items.reduce((total, item) => total + item.quantity, 0)
    : 0; 

  return (
    <div className="cart-badge">
      <Link to="/cart" className="btn btn-outline-theme">
        <i className="bi bi-cart"></i>
        {totalQuantity > 0 && (
          <span className="badge bg-danger ms-2">{totalQuantity}</span>
        )}
      </Link>
    </div>
  );
}

export default CartBadge;
