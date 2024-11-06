// src/components/Checkout.js
import React, { useEffect, useState } from 'react';

function Checkout() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(cartItems);
  }, []);

  const handleRemove = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  return (
    <div className="container mx-auto p-6 max-w-lg">
      <h2 className="text-2xl font-bold text-gray-100 mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-400">Your cart is empty.</p>
      ) : (
        <ul className="space-y-4">
          {cart.map((item, index) => (
            <li key={item.id} className="flex items-center bg-gray-800 p-4 rounded-lg">
              <img src={item.poster} alt={item.title} className="w-12 h-12 rounded-lg mr-4" />
              <span className="flex-1 text-gray-100">{item.title}</span>
              <button
                onClick={() => handleRemove(index)}
                className="text-red-500 hover:text-red-600"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Checkout;
