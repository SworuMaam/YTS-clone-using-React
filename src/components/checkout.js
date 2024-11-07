import React, { useEffect, useState } from 'react';

function Checkout() {
  const [cart, setCart] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const deliveryFee = 20.00;
  const serviceCharge = 10.00;
  const discount = subTotal > 1000 ? 100.00 : 0.00;
  const grandTotal = subTotal + deliveryFee + serviceCharge - discount;

  useEffect(() => {
    loadCart();
  }, []);

  // Load cart data from localStorage
  function loadCart() {
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(cartData);

    // Calculate subtotal
    const subtotal = cartData.reduce((acc, item) => acc + parseFloat(item.price), 0);
    setSubTotal(subtotal);
  }

  // Remove item from the cart
  function removeItem(index) {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    loadCart();
  }

  return (
    <div className="checkout bg-gray-900 text-white py-10">
      <main className="flex justify-center">
        <section id="checkout" className="w-full max-w-5xl px-6">
          <h2 className="text-3xl font-semibold text-gray-100 mb-6 text-center">Your Cart</h2>
          <div className="flex flex-col md:flex-row gap-8 justify-center">
            {/* Cart Items Section */}
            <div className="w-full md:w-1/2 bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium text-gray-100 mb-4">Your Cart Items</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                  <thead>
                    <tr className="border-b-2 border-gray-700">
                      <th className="px-4 py-2 text-left text-gray-400">Movie</th>
                      <th className="px-4 py-2 text-left text-gray-400">Movie Name</th>
                      <th className="px-4 py-2 text-left text-gray-400">Price</th>
                      <th className="px-4 py-2 text-left text-gray-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="text-center text-gray-500 py-4">Your cart is empty.</td>
                      </tr>
                    ) : (
                      cart.map((item, index) => (
                        <tr key={index} className="border-b border-gray-700">
                          <td className="px-4 py-2">
                            <img src={item.poster} alt={item.title} className="w-12 rounded-md" />
                          </td>
                          <td className="px-4 py-2 text-gray-300">{item.title}</td>
                          <td className="px-4 py-2 text-gray-300">Rs {item.price}</td>
                          <td className="px-4 py-2">
                            <button
                              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                              onClick={() => removeItem(index)}
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Order Summary Section */}
            <div className="w-full md:w-1/3 bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium text-gray-100 mb-4">Order Summary</h3>
              <div className="space-y-4">
                <table className="min-w-full table-auto">
                  <tbody>
                    <tr className="border-b border-gray-700">
                      <td className="px-4 py-2 text-left">Sub Total:</td>
                      <td className="px-4 py-2 text-right">Rs {subTotal.toFixed(2)}</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="px-4 py-2 text-left">Delivery Fee:</td>
                      <td className="px-4 py-2 text-right">Rs {deliveryFee.toFixed(2)}</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="px-4 py-2 text-left">Service Charge:</td>
                      <td className="px-4 py-2 text-right">Rs {serviceCharge.toFixed(2)}</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="px-4 py-2 text-left">Discount:</td>
                      <td className="px-4 py-2 text-right">Rs {discount.toFixed(2)}</td>
                    </tr>
                    <tr className="border-b border-gray-700 font-semibold">
                      <td className="px-4 py-2 text-left">Grand Total:</td>
                      <td className="px-4 py-2 text-right">Rs {grandTotal.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td colSpan="2" className="px-4 py-4">
                        <button
                          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
                          onClick={() => alert("Proceeding to checkout...")}
                        >
                          Proceed to Checkout
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Checkout;
