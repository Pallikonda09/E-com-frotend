import { Link } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "../redux/slices/wishlistSlice";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { addToCart } = useCart();
  const { user } = useSelector((state) => state.auth);
  const wishlist = useSelector((state) => state.wishlist.items);

  const isAuthenticated = !!user;
  const inWishlist = isAuthenticated && wishlist.some((item) => item._id === product._id);

  const handleWishlistToggle = () => {
    if (!isAuthenticated) {
      toast.error("Please log in to manage your wishlist");
      return;
    }

    dispatch(toggleWishlist(product));

    if (!inWishlist) {
      toast.success("Added to wishlist");
    } else {
      toast("Removed from wishlist", { icon: "💔" });
    }
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.error("Please log in to add to cart");
      return;
    }

    addToCart(product);
    toast.success("Added to cart");
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md overflow-hidden transition hover:shadow-lg">
      <Link to={`/product/${product._id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-contain p-4 bg-gray-100 dark:bg-gray-800"
        />
      </Link>

      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white truncate">{product.name}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">{product.category}</p>
        <div className="flex justify-between items-center mt-2">
          <span className="text-xl font-bold text-blue-600 dark:text-blue-400">₹{product.price}</span>

          {/* Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            className="transition p-1 rounded-full"
            title={inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
          >
            <Heart
              className={`w-5 h-5 transition-all duration-200 ${
                inWishlist
                  ? "fill-red-500 text-red-500 hover:text-red-600"
                  : "text-gray-400 hover:text-red-500"
              }`}
            />
          </button>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="mt-3 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition flex items-center justify-center gap-2"
        >
          <ShoppingCart size={18} />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;