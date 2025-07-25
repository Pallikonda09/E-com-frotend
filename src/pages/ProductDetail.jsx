import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "../redux/slices/wishlistSlice";
import { Star, ShoppingCart, Heart } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { addToCart } = useCart();

  const wishlist = useSelector((state) => state.wishlist.items);
  const { user } = useSelector((state) => state.auth);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://e-com-backend-fxxd.onrender.com/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        setError("Product not found.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const isInWishlist = wishlist.some((item) => item._id === id);

  const handleWishlist = () => {
    if (!user) return alert("Please login to add to wishlist.");
    dispatch(toggleWishlist(product));
  };

  const handleAddToCart = () => {
    if (!user) return alert("Please login to add to cart.");
    addToCart(product);
  };

  if (loading) {
    return <div className="text-center mt-10 text-xl text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500 text-xl">{error}</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
      <div className="flex justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-full max-w-md rounded-xl shadow-lg"
        />
      </div>

      <div className="flex flex-col gap-6">
        <h2 className="text-3xl font-semibold">{product.name}</h2>

        <div className="flex items-center gap-2 text-yellow-500">
          <Star size={20} />
          <span className="text-lg font-medium">{product.rating || 4.2}</span>
          <span className="text-sm text-gray-500">({product.numReviews || 88} reviews)</span>
        </div>

        <p className="text-xl text-green-600 font-bold">₹{product.price}</p>
        <p className="text-gray-700 leading-relaxed">{product.description}</p>
        <p className="text-sm text-gray-400">Brand: {product.brand}</p>
        <p className="text-sm text-gray-400">Category: {product.category}</p>
        <p className="text-sm text-gray-400">
          Stock: {product.stock > 0 ? "In Stock" : "Out of Stock"}
        </p>

        <div className="flex gap-4 mt-6">
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
          >
            <ShoppingCart size={18} /> Add to Cart
          </button>

          <button
            onClick={handleWishlist}
            className={`flex items-center gap-2 border px-4 py-2 rounded-lg transition ${
              isInWishlist
                ? "bg-red-100 border-red-400 text-red-600"
                : "bg-white hover:bg-gray-100 border-gray-300 text-gray-700"
            }`}
          >
            <Heart size={18} fill={isInWishlist ? "red" : "none"} />{" "}
            {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
          </button>
        </div>

        {!user && (
          <p className="text-red-500 text-sm mt-4">
            Please log in to add items to your cart or wishlist.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
