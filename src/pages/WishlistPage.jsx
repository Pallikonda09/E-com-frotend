
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../redux/slices/wishlistSlice";
import { useCart } from "../context/CartContext";
import { Trash2, Heart, ShoppingBag, Sparkles, Check, Filter, X, Star } from "lucide-react";

const WishlistPage = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const { cartItems, addToCart } = useCart();

  const [removingItem, setRemovingItem] = useState(null);
  const [addingToCart, setAddingToCart] = useState(null);
  const [addedToCart, setAddedToCart] = useState(new Set());
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  // Enhanced categories with icons and colors
  const categories = [
    { name: "Smartphones", icon: "📱", color: "from-blue-500 to-cyan-500" },
    { name: "Laptops", icon: "💻", color: "from-gray-500 to-slate-600" },
    { name: "Fashion", icon: "👗", color: "from-pink-500 to-rose-500" },
    { name: "Accessories", icon: "⌚", color: "from-amber-500 to-orange-500" },
    { name: "Gaming", icon: "🎮", color: "from-purple-500 to-indigo-600" }
  ];

  const handleRemove = (id) => {
    setRemovingItem(id);
    setTimeout(() => {
      dispatch(removeFromWishlist(id));
      setRemovingItem(null);
    }, 300);
  };

  const handleAddToCart = (item) => {
    setAddingToCart(item._id);
    addToCart(item);
    setTimeout(() => {
      setAddingToCart(null);
      setAddedToCart((prev) => new Set(prev).add(item._id));
      setTimeout(() => {
        setAddedToCart((prev) => {
          const newSet = new Set(prev);
          newSet.delete(item._id);
          return newSet;
        });
      }, 2000);
    }, 500);
  };

  const handleAddAllToCart = () => {
    const itemsToAdd = filteredWishlist.filter(item => !isInCart(item._id));
    itemsToAdd.forEach((item) => addToCart(item));
    
    // Enhanced success feedback
    const addedCount = itemsToAdd.length;
    if (addedCount > 0) {
      // You can replace this with a toast notification
      alert(`Successfully added ${addedCount} item${addedCount > 1 ? 's' : ''} to cart!`);
    } else {
      alert("All items are already in your cart!");
    }
  };

  const isInCart = (itemId) => cartItems.some((cartItem) => cartItem._id === itemId);

  const filteredWishlist = selectedCategory
    ? wishlistItems.filter((item) => item.category === selectedCategory)
    : wishlistItems;

  // Empty state with enhanced design
  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="text-center max-w-md">
            <div className="relative mb-8">
              <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-xl opacity-20"></div>
              <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl p-12 shadow-2xl border border-white/20">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <Heart size={80} className="text-gray-300 dark:text-gray-600" />
                    <Sparkles size={24} className="absolute -top-2 -right-2 text-purple-400 animate-bounce" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                  Your Wishlist is Empty
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
                  Discover amazing products and start building your dream wishlist today
                </p>
                <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full font-bold hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                  Start Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Enhanced Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="relative">
              <Heart className="text-red-500 animate-pulse" size={40} />
              <div className="absolute inset-0 animate-ping bg-red-400 rounded-full opacity-20"></div>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 bg-clip-text text-transparent">
              Your Wishlist
            </h1>
          </div>
          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-full px-6 py-3 inline-block border border-white/20">
            <p className="text-gray-600 dark:text-gray-300 text-lg font-medium">
              {wishlistItems.length} treasure{wishlistItems.length !== 1 ? "s" : ""} waiting for you
            </p>
          </div>
        </div>

        {/* Enhanced Category Filter */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
              <Filter className="text-purple-500" size={24} />
              Filter by Category
            </h2>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full p-3 border border-white/20 hover:scale-105 transition-transform"
            >
              {showFilters ? <X size={20} /> : <Filter size={20} />}
            </button>
          </div>
          
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`group relative px-6 py-3 rounded-full font-bold border-2 transition-all duration-300 hover:scale-105 ${
                  selectedCategory === null
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white border-transparent shadow-lg"
                    : "bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-600 hover:border-purple-300"
                }`}
              >
                <span className="flex items-center gap-2">
                  ✨ All Categories
                </span>
                {selectedCategory === null && (
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-20 animate-pulse"></div>
                )}
              </button>
              
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`group relative px-6 py-3 rounded-full font-bold border-2 transition-all duration-300 hover:scale-105 ${
                    selectedCategory === cat.name
                      ? `bg-gradient-to-r ${cat.color} text-white border-transparent shadow-lg`
                      : "bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-600 hover:border-purple-300"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {cat.icon} {cat.name}
                  </span>
                  {selectedCategory === cat.name && (
                    <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Wishlist Grid */}
        {filteredWishlist.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredWishlist.map((item, index) => (
              <div
                key={item._id}
                className={`group relative transition-all duration-500 transform hover:scale-105 ${
                  removingItem === item._id ? "scale-95 opacity-0 pointer-events-none" : "hover:-translate-y-2"
                }`}
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
              >
                <div className="relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 p-6 border border-white/20 hover:border-purple-200 dark:hover:border-purple-700 overflow-hidden group">
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Enhanced Remove Button */}
                  <button
                    onClick={() => handleRemove(item._id)}
                    className="absolute top-4 right-4 z-10 bg-red-100/90 dark:bg-red-900/50 text-red-500 p-3 rounded-full opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:text-white transform scale-90 hover:scale-100 transition-all duration-300 shadow-lg backdrop-blur-sm"
                    disabled={removingItem === item._id}
                  >
                    <Trash2 size={16} />
                  </button>

                  {/* Enhanced Product Image */}
                  <div className="relative mb-6">
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-2xl p-6 aspect-square flex items-center justify-center overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                    
                    {/* Enhanced Wishlist Badge */}
                    <div className="absolute -top-3 -left-3 bg-gradient-to-r from-red-400 to-pink-500 text-white p-3 rounded-full shadow-lg animate-pulse">
                      <Heart size={14} className="fill-current" />
                    </div>
                    
                    {/* Rating Badge */}
                    <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-white p-2 rounded-full shadow-lg">
                      <Star size={12} className="fill-current" />
                    </div>
                  </div>

                  {/* Enhanced Product Details */}
                  <div className="space-y-4 relative z-10">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white leading-tight line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                      {item.name}
                    </h3>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        ₹{item.price?.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-1 text-yellow-500">
                        <Star size={14} className="fill-current" />
                        <span className="text-sm font-medium">4.8</span>
                      </div>
                    </div>

                    {/* Enhanced Action Button */}
                    <button
                      onClick={() => handleAddToCart(item)}
                      disabled={addingToCart === item._id}
                      className={`w-full py-4 px-6 rounded-2xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 transform hover:scale-105 ${
                        addedToCart.has(item._id)
                          ? 'bg-green-500 hover:bg-green-600 text-white'
                          : isInCart(item._id)
                          ? 'bg-gray-400 text-white cursor-not-allowed'
                          : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white'
                      }`}
                    >
                      {addingToCart === item._id ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                          Adding...
                        </>
                      ) : addedToCart.has(item._id) ? (
                        <>
                          <Check size={20} />
                          Added to Cart!
                        </>
                      ) : isInCart(item._id) ? (
                        <>
                          <ShoppingBag size={20} />
                          Already in Cart
                        </>
                      ) : (
                        <>
                          <ShoppingBag size={20} />
                          Add to Cart
                        </>
                      )}
                    </button>
                  </div>

                  {/* Animated Border Effect */}
                  <div className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                  <div className="absolute inset-[2px] rounded-3xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl -z-10"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center mt-20">
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-3xl p-12 max-w-md mx-auto border border-white/20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
                No items found
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Try selecting a different category or clear your filters
              </p>
            </div>
          </div>
        )}

        {/* Enhanced Add All to Cart Section */}
        {filteredWishlist.length > 1 && (
          <div className="mt-16">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 max-w-2xl mx-auto text-center">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
                  Ready for a shopping spree?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Add all {filteredWishlist.filter(item => !isInCart(item._id)).length} available items to your cart at once
                </p>
              </div>
              
              <button
                onClick={handleAddAllToCart}
                className="bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 hover:from-emerald-600 hover:via-green-600 hover:to-teal-600 text-white font-bold py-5 px-10 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-3 mx-auto"
              >
                <ShoppingBag size={24} />
                Add All to Cart
                <Sparkles size={20} className="animate-pulse" />
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default WishlistPage;