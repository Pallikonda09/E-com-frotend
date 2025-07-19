
// import { useCart } from "../context/CartContext";
// import { useWishlist } from "../context/WishlistContext";
// import { Heart, ShoppingCart, Star, Eye, Share2, Zap } from "lucide-react";
// import toast from "react-hot-toast";
// import { useState } from "react";
// import { Link } from "react-router-dom";

// const ProductCard = ({ product }) => {
//   const { addToCart } = useCart();
//   const { toggleWishlist, isInWishlist } = useWishlist();
//   const [isHovered, setIsHovered] = useState(false);
//   const [imageLoaded, setImageLoaded] = useState(false);
//   const [quantity, setQuantity] = useState(1);

//   const inWishlist = isInWishlist(product._id);
//   const stock = product.stock ?? 0;
//   const isOutOfStock = stock === 0 || product.availability === false;
//   const isLowStock = stock > 0 && stock <= 5;

//   const discountedPrice = product.price - (product.price * (product.discount || 0)) / 100;
//   const savings = product.price - discountedPrice;

//   const handleWishlistToggle = (e) => {
//     e.stopPropagation();
//     toggleWishlist(product);
//     toast[!inWishlist ? "success" : "error"](
//       `${product.name} ${!inWishlist ? "added to" : "removed from"} wishlist`,
//       {
//         icon: !inWishlist ? "❤️" : "💔",
//         style: {
//           borderRadius: "10px",
//           background: "#333",
//           color: "#fff",
//         },
//       }
//     );
//   };

//   const handleAddToCart = (e) => {
//     e.stopPropagation();
//     for (let i = 0; i < quantity; i++) {
//       addToCart(product);
//     }
//     toast.success(`${quantity} ${product.name} added to cart!`, {
//       icon: "🛒",
//       style: {
//         borderRadius: "10px",
//         background: "#333",
//         color: "#fff",
//       },
//     });
//   };

//   const handleShare = (e) => {
//     e.stopPropagation();
//     if (navigator.share) {
//       navigator.share({
//         title: product.name,
//         text: `Check out this ${product.name} for ₹${discountedPrice.toFixed(2)}`,
//         url: window.location.href,
//       });
//     } else {
//       navigator.clipboard.writeText(window.location.href);
//       toast.success("Product link copied to clipboard!", {
//         icon: "📋",
//         style: {
//           borderRadius: "10px",
//           background: "#333",
//           color: "#fff",
//         },
//       });
//     }
//   };

//   const renderStars = (rating) => {
//     const stars = [];
//     const fullStars = Math.floor(rating);
//     const hasHalfStar = rating % 1 !== 0;

//     for (let i = 0; i < fullStars; i++) {
//       stars.push(<Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />);
//     }

//     if (hasHalfStar) {
//       stars.push(<Star key="half" className="w-4 h-4 fill-amber-400/50 text-amber-400" />);
//     }

//     const remainingStars = 5 - Math.ceil(rating);
//     for (let i = 0; i < remainingStars; i++) {
//       stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
//     }

//     return stars;
//   };

//   return (
//     <div
//       className="group relative border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-white dark:bg-slate-800 overflow-hidden transform hover:-translate-y-2"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       {/* Discount Badge */}
//       {product.discount > 0 && (
//         <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
//           -{product.discount}% OFF
//         </div>
//       )}

//       {/* Wishlist & Share Buttons */}
//       <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
//         <button
//           onClick={handleWishlistToggle}
//           className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
//             inWishlist
//               ? "bg-red-500/90 text-white shadow-lg"
//               : "bg-white/90 dark:bg-slate-800/90 text-gray-600 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20"
//           }`}
//         >
//           <Heart className={`w-5 h-5 ${inWishlist ? "fill-current" : ""}`} />
//         </button>
//         <button
//           onClick={handleShare}
//           className="p-2 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300"
//         >
//           <Share2 className="w-5 h-5" />
//         </button>
//       </div>

//       {/* Stock Badge */}
//       {isLowStock && !isOutOfStock && (
//         <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
//           <Zap className="w-3 h-3" />
//           Only {stock} left!
//         </div>
//       )}

//       {/* Product Image with Link */}
//       <Link to={`/product/${product._id}`}>
//         <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-700 dark:to-slate-600 p-6 h-64">
//           {!imageLoaded && (
//             <div className="absolute inset-0 bg-gray-200 dark:bg-slate-700 animate-pulse rounded-lg" />
//           )}
//           <img
//             src={product.image}
//             alt={product.name}
//             className={`w-full h-full object-contain transition-all duration-500 ${
//               imageLoaded ? "opacity-100" : "opacity-0"
//             } ${isHovered ? "scale-110" : "scale-100"}`}
//             onLoad={() => setImageLoaded(true)}
//           />
//           <div
//             className={`absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${
//               isHovered ? "opacity-100" : "opacity-0"
//             }`}
//           >
//             <button className="bg-white text-gray-800 px-4 py-2 rounded-full font-medium flex items-center gap-2 hover:bg-gray-100 transition-colors">
//               <Eye className="w-4 h-4" />
//               Quick View
//             </button>
//           </div>
//         </div>
//       </Link>

//       {/* Product Info */}
//       <div className="p-6 space-y-4">
//         <div className="flex items-center justify-between text-sm">
//           <span className="text-blue-600 dark:text-blue-400 font-medium">{product.brand}</span>
//           <span className="text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded-full text-xs">
//             {product.category}
//           </span>
//         </div>

//         <Link to={`/product/${product._id}`}>
//           <h3 className="text-lg font-bold text-gray-800 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
//             {product.name}
//           </h3>
//         </Link>

//         <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
//           {product.description}
//         </p>

//         <div className="flex items-center gap-2">
//           <div className="flex items-center">{renderStars(product.rating || 0)}</div>
//           <span className="text-sm text-gray-600 dark:text-gray-300">({product.rating || 0})</span>
//         </div>

//         <div className="space-y-2">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <span className="text-2xl font-bold text-gray-800 dark:text-white">
//                 ₹{discountedPrice.toFixed(2)}
//               </span>
//               {product.discount > 0 && (
//                 <span className="text-lg line-through text-gray-400">₹{product.price}</span>
//               )}
//             </div>
//             {savings > 0 && (
//               <span className="text-sm text-green-600 dark:text-green-400 font-medium">
//                 Save ₹{savings.toFixed(2)}
//               </span>
//             )}
//           </div>
//         </div>

//         <div className="flex items-center justify-between text-sm">
//           <span>
//             <strong>Stock:</strong>{" "}
//             <span
//               className={`font-medium ${
//                 isOutOfStock
//                   ? "text-red-500"
//                   : isLowStock
//                   ? "text-amber-500"
//                   : "text-green-600"
//               }`}
//             >
//               {isOutOfStock ? "Out of Stock" : `${stock} Available`}
//             </span>
//           </span>
//         </div>

//         {/* Quantity Selector & Add to Cart */}
//         <div className="flex items-center gap-3 pt-2">
//           {!isOutOfStock && (
//             <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   setQuantity(Math.max(1, quantity - 1));
//                 }}
//                 className="px-3 py-2 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
//               >
//                 -
//               </button>
//               <span className="px-4 py-2 font-medium text-gray-800 dark:text-white min-w-[3rem] text-center">
//                 {quantity}
//               </span>
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   setQuantity(Math.min(stock, quantity + 1));
//                 }}
//                 className="px-3 py-2 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
//               >
//                 +
//               </button>
//             </div>
//           )}

//           <button
//             onClick={handleAddToCart}
//             disabled={isOutOfStock}
//             className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
//               isOutOfStock
//                 ? "bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed"
//                 : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
//             }`}
//           >
//             <ShoppingCart className="w-5 h-5" />
//             {isOutOfStock ? "Out of Stock" : "Add to Cart"}
//           </button>
//         </div>
//       </div>

//       {!imageLoaded && (
//         <div className="absolute inset-0 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm flex items-center justify-center">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductCard;



// import { useCart } from "../context/CartContext";

// import { Heart, ShoppingCart, Star, Eye, Share2, Zap } from "lucide-react";
// import toast from "react-hot-toast";
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux"; // ✅ Redux auth
// const ProductCard = ({ product }) => {
//   const { addToCart } = useCart();

//   const [isHovered, setIsHovered] = useState(false);
//   const [imageLoaded, setImageLoaded] = useState(false);
//   const [quantity, setQuantity] = useState(1);

//   const navigate = useNavigate();
//   const { user } = useSelector((state) => state.auth);
//   const isAuthenticated = Boolean(user); // ✅ Authenticated if user exists

  
//   const stock = product.stock ?? 0;
//   const isOutOfStock = stock === 0 || product.availability === false;
//   const isLowStock = stock > 0 && stock <= 5;

//   const discountedPrice = product.price - (product.price * (product.discount || 0)) / 100;
//   const savings = product.price - discountedPrice;

//   const handleWishlistToggle = (e) => {
//     e.stopPropagation();
//     if (!isAuthenticated) {
//       toast.error("Please login to add items to wishlist");
//       navigate("/login");
//       return;
//     }

//     toggleWishlist(product);
//     toast[!inWishlist ? "success" : "error"](
//       `${product.name} ${!inWishlist ? "added to" : "removed from"} wishlist`,
//       {
//         icon: !inWishlist ? "❤️" : "💔",
//         style: {
//           borderRadius: "10px",
//           background: "#333",
//           color: "#fff",
//         },
//       }
//     );
//   };

//   const handleAddToCart = (e) => {
//     e.stopPropagation();
//     if (!isAuthenticated) {
//       toast.error("Please login to add items to cart");
//       navigate("/login");
//       return;
//     }

//     for (let i = 0; i < quantity; i++) {
//       addToCart(product);
//     }

//     toast.success(`${quantity} ${product.name} added to cart!`, {
//       icon: "🛒",
//       style: {
//         borderRadius: "10px",
//         background: "#333",
//         color: "#fff",
//       },
//     });
//   };

//   const handleShare = (e) => {
//     e.stopPropagation();
//     if (navigator.share) {
//       navigator.share({
//         title: product.name,
//         text: `Check out this ${product.name} for ₹${discountedPrice.toFixed(2)}`,
//         url: window.location.href,
//       });
//     } else {
//       navigator.clipboard.writeText(window.location.href);
//       toast.success("Product link copied to clipboard!", {
//         icon: "📋",
//         style: {
//           borderRadius: "10px",
//           background: "#333",
//           color: "#fff",
//         },
//       });
//     }
//   };

//   const renderStars = (rating) => {
//     const stars = [];
//     const fullStars = Math.floor(rating);
//     const hasHalfStar = rating % 1 !== 0;

//     for (let i = 0; i < fullStars; i++) {
//       stars.push(<Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />);
//     }

//     if (hasHalfStar) {
//       stars.push(<Star key="half" className="w-4 h-4 fill-amber-400/50 text-amber-400" />);
//     }

//     const remainingStars = 5 - Math.ceil(rating);
//     for (let i = 0; i < remainingStars; i++) {
//       stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
//     }

//     return stars;
//   };

//   return (
//     <div
//       className="group relative border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-white dark:bg-slate-800 overflow-hidden transform hover:-translate-y-2"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       {product.discount > 0 && (
//         <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
//           -{product.discount}% OFF
//         </div>
//       )}

    

//       {isLowStock && !isOutOfStock && (
//         <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
//           <Zap className="w-3 h-3" />
//           Only {stock} left!
//         </div>
//       )}

//       <Link to={`/product/${product._id}`}>
//         <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-700 dark:to-slate-600 p-6 h-64">
//           {!imageLoaded && <div className="absolute inset-0 bg-gray-200 dark:bg-slate-700 animate-pulse rounded-lg" />}
//           <img
//             src={product.image}
//             alt={product.name}
//             className={`w-full h-full object-contain transition-all duration-500 ${imageLoaded ? "opacity-100" : "opacity-0"} ${isHovered ? "scale-110" : "scale-100"}`}
//             onLoad={() => setImageLoaded(true)}
//           />
//           <div className={`absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}>
//             <button className="bg-white text-gray-800 px-4 py-2 rounded-full font-medium flex items-center gap-2 hover:bg-gray-100 transition-colors">
//               <Eye className="w-4 h-4" />
//               Quick View
//             </button>
//           </div>
//         </div>
//       </Link>

//       {/* Product Info */}
//       <div className="p-6 space-y-4">
//         <div className="flex items-center justify-between text-sm">
//           <span className="text-blue-600 dark:text-blue-400 font-medium">{product.brand}</span>
//           <span className="text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded-full text-xs">{product.category}</span>
//         </div>

//         <Link to={`/product/${product._id}`}>
//           <h3 className="text-lg font-bold text-gray-800 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{product.name}</h3>
//         </Link>

//         <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{product.description}</p>

//         <div className="flex items-center gap-2">
//           <div className="flex items-center">{renderStars(product.rating || 0)}</div>
//           <span className="text-sm text-gray-600 dark:text-gray-300">({product.rating || 0})</span>
//         </div>

//         <div className="space-y-2">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <span className="text-2xl font-bold text-gray-800 dark:text-white">
//                 ₹{discountedPrice.toFixed(2)}
//               </span>
//               {product.discount > 0 && (
//                 <span className="text-lg line-through text-gray-400">₹{product.price}</span>
//               )}
//             </div>
//             {savings > 0 && (
//               <span className="text-sm text-green-600 dark:text-green-400 font-medium">
//                 Save ₹{savings.toFixed(2)}
//               </span>
//             )}
//           </div>
//         </div>

//         <div className="flex items-center justify-between text-sm">
//           <span>
//             <strong>Stock:</strong>{" "}
//             <span className={`font-medium ${isOutOfStock ? "text-red-500" : isLowStock ? "text-amber-500" : "text-green-600"}`}>
//               {isOutOfStock ? "Out of Stock" : `${stock} Available`}
//             </span>
//           </span>
//         </div>

//         {/* Quantity + Add to Cart */}
//         <div className="flex items-center gap-3 pt-2">
//           {!isOutOfStock && (
//             <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
//               <button onClick={(e) => { e.stopPropagation(); setQuantity(Math.max(1, quantity - 1)); }} className="px-3 py-2 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors">-</button>
//               <span className="px-4 py-2 font-medium text-gray-800 dark:text-white min-w-[3rem] text-center">{quantity}</span>
//               <button onClick={(e) => { e.stopPropagation(); setQuantity(Math.min(stock, quantity + 1)); }} className="px-3 py-2 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors">+</button>
//             </div>
//           )}

//           <button onClick={handleAddToCart} disabled={isOutOfStock} className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${isOutOfStock ? "bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed" : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105"}`}>
//             <ShoppingCart className="w-5 h-5" />
//             {isOutOfStock ? "Out of Stock" : "Add to Cart"}
//           </button>
//         </div>
//       </div>

//       {!imageLoaded && (
//         <div className="absolute inset-0 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm flex items-center justify-center">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductCard;

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
