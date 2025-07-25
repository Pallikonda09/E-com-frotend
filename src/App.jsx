import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Shop from "./pages/Shop";
import CartPage from "./pages/Cart";
import WishlistPage from "./pages/WishlistPage";
import ProductDetail from "./pages/ProductDetail";
import CategoriesSection from "./components/CategoriesSection";
import { Toaster } from "react-hot-toast"; 
import { ShoppingCart, Heart } from "lucide-react";
import { useCart } from "./context/CartContext";
import Checkout from "./pages/CheckOut";
import OrderConfirmation from "./pages/OrderConfirmation";
import SignUp from "./pages/Signup";
import Login from "./pages/Signin";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import PublicRoute from "./components/PublicRoute";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

// ✅ Footer Component
import Footer from "./components/Footer";

function FloatingActions() {
  const { cartItems } = useCart();

  const navigate = useNavigate();

  const { user, token } = useSelector((state) => state.auth);

  const handleCartClick = (e) => {
    if (!user || !token) {
      e.preventDefault();
      toast.error("Please login to view your cart");
      navigate("/login");
      return;
    }
  };

  const handleWishlistClick = (e) => {
    if (!user || !token) {
      e.preventDefault();
      toast.error("Please login to view your wishlist");
      navigate("/login");
      return;
    }
  };

  if (!user || !token) return null;

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
      <Link 
        to="/cart" 
        onClick={handleCartClick}
        className="relative bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
      >
        <ShoppingCart size={24} />
        {cartItems.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold">
            {cartItems.length}
          </span>
        )}
      </Link>

    
    </div>
  );
}

function App() {
  const [globalSearch, setGlobalSearch] = useState("");

  // Handler function to update global search state
  const handleSearchChange = (searchValue) => {
    console.log("App: Search changed to:", searchValue); // Debug log
    setGlobalSearch(searchValue);
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* ✅ Fixed: Pass onSearchChange function instead of globalSearch and setGlobalSearch */}
        <Navbar onSearchChange={handleSearchChange} />
        <FloatingActions />
        <Toaster position="top-right" />

        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* ✅ Pass globalSearch to Shop component */}
            <Route path="/shop" element={<Shop globalSearch={globalSearch} />} />
            <Route path="/product/:id" element={<ProductDetail />} />

            {/* ✅ Private Routes */}
            <Route path="/cart" element={<PrivateRoute><CartPage /></PrivateRoute>} />
            <Route path="/wishlist" element={<PrivateRoute><WishlistPage  /></PrivateRoute>} />
            <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
            <Route path="/order-confirmation" element={<PrivateRoute><OrderConfirmation /></PrivateRoute>} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/categories" element={<CategoriesSection />} />

            {/* ✅ Public Routes */}
           <Route path="/signup" element={<PublicRoute><SignUp /></PublicRoute>} />          
            <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
         </Routes>
        
        </div>

        {/* ✅ Global Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
