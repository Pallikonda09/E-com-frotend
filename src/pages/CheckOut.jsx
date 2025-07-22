import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Checkout = () => {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
 


  const [form, setForm] = useState({
    name: "",
    address: "",
    card: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.address || !form.card) {
      alert("Please fill all fields.");
      return;
    }

    clearCart();
    navigate("/order-confirmation", { state: { name: form.name, total: getTotalPrice() } });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-slate-900 rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Checkout</h2>

      {/* Cart Summary */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Order Summary:</h3>
        {cartItems.map((item) => (
          <div key={item.id} className="flex justify-between mb-2">
            <span>{item.name} × {item.quantity}</span>
            <span>₹{(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <hr className="my-2" />
        <div className="text-lg font-semibold flex justify-between">
          <span>Total:</span>
          <span>₹{getTotalPrice().toFixed(2)}</span>
        </div>
      </div>

      {/* Billing Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="w-full p-2 border rounded"
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Shipping Address"
          className="w-full p-2 border rounded"
          onChange={handleChange}
        />
        <input
          type="text"
          name="card"
          placeholder="Card Number (dummy)"
          className="w-full p-2 border rounded"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;

