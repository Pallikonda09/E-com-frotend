// import React, { useState } from "react";
// import { useCart } from "../context/CartContext";
// import { Link } from "react-router-dom";

// const CartPage = () => {
//   const {
//     cartItems,
//     removeFromCart,
//     updateCartItemQuantity,
//     clearCart,
//     cartTotal,
//   } = useCart();

//   const [promoCode, setPromoCode] = useState("");
//   const [discount, setDiscount] = useState(0);
//   const [showClearConfirm, setShowClearConfirm] = useState(false);

//   const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
//   const shipping = subtotal > 1000 ? 0 : subtotal > 0 ? 50 : 0;
//   const tax = Math.round(subtotal * 0.18);
//   const total = subtotal + shipping + tax - discount;

//   const applyPromoCode = () => {
//     const codes = {
//       SAVE10: subtotal * 0.1,
//       WELCOME20: subtotal * 0.2,
//       FLAT100: 100,
//     };
//     const key = promoCode.toUpperCase();
//     if (codes[key]) {
//       setDiscount(codes[key]);
//     } else {
//       alert("Invalid promo code");
//     }
//   };

//   const handleQuantityChange = (id, value) => {
//     const qty = parseInt(value);
//     if (!isNaN(qty) && qty > 0) {
//       updateCartItemQuantity(id, qty);
//     }
//   };

//   const confirmClearCart = () => {
//     clearCart();
//     setShowClearConfirm(false);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="container mx-auto px-4 py-8">
//         <div className="flex items-center justify-between mb-8">
//           <h1 className="text-3xl font-medium">
//             Shopping <span className="italic text-yellow-500 font-semibold">Cart</span>
//           </h1>
//           {cartItems.length > 0 && (
//             <div className="flex items-center gap-4">
//               <span className="text-gray-600">{cartItems.length} item(s)</span>
//               <button
//                 onClick={() => setShowClearConfirm(true)}
//                 className="text-red-600 hover:text-red-700 font-medium"
//               >
//                 Clear Cart
//               </button>
//             </div>
//           )}
//         </div>

//         {showClearConfirm && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white p-6 rounded-lg max-w-sm mx-4">
//               <h3 className="text-lg font-semibold mb-4">Clear Cart?</h3>
//               <p className="text-gray-600 mb-6">
//                 Are you sure you want to remove all items from your cart?
//               </p>
//               <div className="flex gap-3">
//                 <button
//                   onClick={confirmClearCart}
//                   className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
//                 >
//                   Yes, Clear
//                 </button>
//                 <button
//                   onClick={() => setShowClearConfirm(false)}
//                   className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {cartItems.length === 0 ? (
//           <div className="text-center py-20">
//             <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your cart is empty</h2>
//             <p className="text-gray-600 mb-8">Looks like you haven't added anything yet.</p>
//             <Link to="/shop" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700">
//               Continue Shopping
//             </Link>
//           </div>
//         ) : (
//           <div className="lg:flex lg:gap-8">
//             <div className="lg:w-2/3">
//               <div className="bg-white rounded-xl shadow-sm">
//                 {cartItems.map((item, index) => (
//                   <div key={item._id} className={`p-6 ${index !== cartItems.length - 1 ? 'border-b' : ''}`}>
//                     <div className="flex gap-6">
//                       <img src={item.image} alt={item.name} className="w-32 h-32 object-cover rounded-lg" />
//                       <div className="flex-1">
//                         <h3 className="text-lg font-semibold">{item.name}</h3>
//                         <p className="text-gray-600">₹{item.price.toLocaleString()}</p>

//                         <div className="flex gap-4 mt-3 items-center">
//                           <label className="text-sm">Qty:</label>
//                           <input
//                             type="number"
//                             value={item.quantity}
//                             min="1"
//                             onChange={(e) => handleQuantityChange(item._id, e.target.value)}
//                             className="w-16 text-center border rounded"
//                           />
//                         </div>

//                         <div className="mt-3 font-bold text-gray-800">
//                           ₹{(item.price * item.quantity).toLocaleString()}
//                         </div>
//                       </div>
//                       <div className="flex flex-col items-end">
//                         <button
//                           onClick={() => removeFromCart(item._id)}
//                           className="bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200"
//                         >
//                           Remove
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Order Summary */}
//             <div className="lg:w-1/3 mt-8 lg:mt-0">
//               <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
//                 <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
//                 <div className="mb-6">
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Promo Code</label>
//                   <div className="flex gap-2">
//                     <input
//                       type="text"
//                       value={promoCode}
//                       onChange={(e) => setPromoCode(e.target.value)}
//                       placeholder="Enter code"
//                       className="flex-1 px-3 py-2 border rounded-lg"
//                     />
//                     <button
//                       onClick={applyPromoCode}
//                       className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
//                     >
//                       Apply
//                     </button>
//                   </div>
//                   <p className="text-xs text-gray-500 mt-1">Try: SAVE10, WELCOME20, FLAT100</p>
//                 </div>
//                 <div className="space-y-2">
//                   <div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal.toLocaleString()}</span></div>
//                   <div className="flex justify-between"><span>Shipping</span><span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span></div>
//                   <div className="flex justify-between"><span>Tax (18%)</span><span>₹{tax.toLocaleString()}</span></div>
//                   {discount > 0 && (
//                     <div className="flex justify-between text-green-600"><span>Discount</span><span>-₹{discount.toLocaleString()}</span></div>
//                   )}
//                 </div>
//                 <div className="border-t pt-4 mt-4 flex justify-between font-bold text-lg">
//                   <span>Total</span>
//                   <span>₹{total.toLocaleString()}</span>
//                 </div>

//                 <Link to="/checkout">
//                   <button className="mt-6 w-full bg-green-600 text-white py-3 rounded hover:bg-green-700">
//                     Proceed to Checkout
//                   </button>
//                 </Link>
//                 <Link to="/shop" className="block w-full text-center mt-4 text-blue-600 hover:underline">
//                   Continue Shopping
//                 </Link>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CartPage;

// src/pages/CartPage.jsx

import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const CartPage = () => {
  const {
    cartItems,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
  } = useCart();

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 1000 ? 0 : subtotal > 0 ? 50 : 0;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + shipping + tax - discount;

  const applyPromoCode = () => {
    const codes = {
      SAVE10: subtotal * 0.1,
      WELCOME20: subtotal * 0.2,
      FLAT100: 100,
    };
    const key = promoCode.toUpperCase();
    if (codes[key]) {
      setDiscount(codes[key]);
    } else {
      alert("Invalid promo code");
    }
  };

  const handleQuantityChange = (id, value) => {
    const qty = parseInt(value);
    if (!isNaN(qty) && qty > 0) {
      updateCartItemQuantity(id, qty);
    }
  };

  const confirmClearCart = () => {
    clearCart();
    setShowClearConfirm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-medium">
            Shopping <span className="italic text-yellow-500 font-semibold">Cart</span>
          </h1>
          {cartItems.length > 0 && (
            <div className="flex items-center gap-4">
              <span className="text-gray-600">{cartItems.length} item(s)</span>
              <button
                onClick={() => setShowClearConfirm(true)}
                className="text-red-600 hover:text-red-700 font-medium"
              >
                Clear Cart
              </button>
            </div>
          )}
        </div>

        {showClearConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-sm mx-4">
              <h3 className="text-lg font-semibold mb-4">Clear Cart?</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to remove all items from your cart?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={confirmClearCart}
                  className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
                >
                  Yes, Clear
                </button>
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {cartItems.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Looks like you haven't added anything yet.</p>
            <Link to="/shop" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="lg:flex lg:gap-8">
            <div className="lg:w-2/3">
              <div className="bg-white rounded-xl shadow-sm">
                {cartItems.map((item, index) => (
                  <div key={item._id} className={`p-6 ${index !== cartItems.length - 1 ? 'border-b' : ''}`}>
                    <div className="flex gap-6">
                      <img src={item.image} alt={item.name} className="w-32 h-32 object-cover rounded-lg" />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold">{item.name}</h3>
                        <p className="text-gray-600">₹{item.price.toLocaleString()}</p>

                        <div className="flex gap-4 mt-3 items-center">
                          <label className="text-sm">Qty:</label>
                          <input
                            type="number"
                            value={item.quantity}
                            min="1"
                            onChange={(e) => handleQuantityChange(item._id, e.target.value)}
                            className="w-16 text-center border rounded"
                          />
                        </div>

                        <div className="mt-3 font-bold text-gray-800">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3 mt-8 lg:mt-0">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
                <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Promo Code</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter code"
                      className="flex-1 px-3 py-2 border rounded-lg"
                    />
                    <button
                      onClick={applyPromoCode}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                    >
                      Apply
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Try: SAVE10, WELCOME20, FLAT100</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span>Shipping</span><span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span></div>
                  <div className="flex justify-between"><span>Tax (18%)</span><span>₹{tax.toLocaleString()}</span></div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600"><span>Discount</span><span>-₹{discount.toLocaleString()}</span></div>
                  )}
                </div>
                <div className="border-t pt-4 mt-4 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>

                <Link to="/checkout">
                  <button className="mt-6 w-full bg-green-600 text-white py-3 rounded hover:bg-green-700">
                    Proceed to Checkout
                  </button>
                </Link>
                <Link to="/shop" className="block w-full text-center mt-4 text-blue-600 hover:underline">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
