import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart
      ? JSON.parse(savedCart)
      : {
          items: [],
          totalQuantity: 0,
          totalPrice: 0,
          totalDiscount: 0,
          promoCodeDiscount: 0,
        };
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const calculateCart = (items, promoCodeDiscount) => {
    let totalQuantity = 0;
    let totalPrice = 0;
    let totalDiscount = 0;

    if (items.length === 0) {
      return {
        items,
        totalQuantity: 0,
        totalPrice: "0.00", 
        totalDiscount: "0.00",
        promoCodeDiscount: 0,
      };
    }

    items.forEach((item) => {
      item.discountedPrice = item.price;

      if (item.discount && item.discount >= 5) {
        const discountedPrice = item.price - (item.price * item.discount) / 100;
        item.discountedPrice = discountedPrice;
        totalDiscount += (item.price - discountedPrice) * item.quantity;
        totalPrice += discountedPrice * item.quantity;
      } else {
        totalPrice += item.price * item.quantity;
      }
      totalQuantity += item.quantity;
    });

    if (promoCodeDiscount > 0) {
      //totalDiscount += (totalPrice * promoCodeDiscount) / 100;
      const promoDiscountedPrice = totalPrice * (promoCodeDiscount / 100);
      totalPrice -= promoDiscountedPrice; 
    }

    totalPrice = Math.max(totalPrice, 1);
    return {
      items,
      totalQuantity,
      totalPrice: totalPrice.toFixed(2),
      totalDiscount: totalDiscount.toFixed(2),
    };
  };

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.items.find((i) => i.id === item.id);

      const updatedItems = existingItem
        ? prevCart.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          )
        : [...prevCart.items, { ...item, quantity: 1 }];

      return {
        ...prevCart,
        ...calculateCart(updatedItems, prevCart.promoCodeDiscount),
      };
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => {
      const updatedItems = prevCart.items.filter((item) => item.id !== id);

      return {
        ...prevCart,
        ...calculateCart(updatedItems, prevCart.promoCodeDiscount),
      };
    });
  };

  const updateQuantity = (id, quantity) => {
    setCart((prevCart) => {
      const updatedItems = prevCart.items.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(quantity, 1) } : item
      );

      return {
        ...prevCart,
        ...calculateCart(updatedItems, prevCart.promoCodeDiscount),
      };
    });
  };

  const applyPromoCode = (promoCode) => {
    setCart((prevCart) => {
      if (promoCode === 0) {
        return {
          ...prevCart,
          promoCodeDiscount: 0,
          ...calculateCart(prevCart.items, 0),
        };
      }
  
      return {
        ...prevCart,
        promoCodeDiscount: promoCode,
        ...calculateCart(prevCart.items, promoCode), 
      };
    });
  };
  
  const clearCart = () => {
    setCart({
      items: [],
      totalQuantity: 0,
      totalPrice: 0,
      totalDiscount: 0,
      promoCodeDiscount: 0,
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        applyPromoCode,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
