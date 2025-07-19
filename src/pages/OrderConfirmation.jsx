import { useLocation, Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const OrderConfirmation = () => {
  const location = useLocation();
  const { name, total } = location.state || {};

  if (!name || !total) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center p-6">
        <div>
          <h1 className="text-2xl font-semibold text-red-600">Invalid Order</h1>
          <p className="text-gray-600 mt-2">No order details found.</p>
          <Link to="/" className="text-blue-600 hover:underline mt-4 block">
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-xl bg-white p-8 rounded-xl shadow-md text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900">Order Confirmed!</h1>
        <p className="text-gray-700 mt-4">
          Thank you, <span className="font-semibold">{name}</span>! <br />
          Your order of <span className="text-green-600 font-semibold">₹{total.toLocaleString()}</span> has been placed successfully.
        </p>

        <Link
          to="/shop"
          className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;
