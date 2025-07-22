
// import { useNavigate, useLocation, Link } from "react-router-dom";
// import { Menu, X, ShoppingCart, Heart, LogOut, User, Bell, Search, ChevronDown } from "lucide-react";
// import { useState, useEffect } from "react";
// import logo from "../assets/tt.png";
// import { useCart } from "../context/CartContext";
// import { useDispatch, useSelector } from "react-redux";
// import { logout } from "../redux/slices/authSlice";
// import { FiSearch } from "react-icons/fi";

// const Navbar = ({ onSearchChange }) => {
//   const { pathname } = useLocation();
//   const navigate = useNavigate();
//   const { cartItems } = useCart();
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);

//   const [menuOpen, setMenuOpen] = useState(false);
//   const [searchInput, setSearchInput] = useState("");
//   const [userDropdownOpen, setUserDropdownOpen] = useState(false);
//   const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);
//   const guestNavLinks = [
//     { name: "Home", path: "/" },
//     { name: "Shop", path: "/shop" },
//     { name: "About", path: "/about" },
//     { name: "Contact", path: "/contact" },
//   ];

//   const userNavLinks = [
//     { name: "Home", path: "/" },
//     { name: "Shop", path: "/shop" },
//     { name: "Categories", path: "/categories" },
//     { name: "Deals", path: "/deals" },
//   ];

//   const navLinks = user ? userNavLinks : guestNavLinks;

//   // Close dropdowns when clicking outside
//   useEffect(() => {
//     const handleClickOutside = () => {
//       setUserDropdownOpen(false);
//       setLoginDropdownOpen(false);
//     };
//     document.addEventListener('click', handleClickOutside);
//     return () => document.removeEventListener('click', handleClickOutside);
//   }, []);

//   const handleSearch = (e) => {
//     const value = e.target.value;
//     setSearchInput(value);
//     onSearchChange && onSearchChange(value);
//   };

//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     if (searchInput.trim()) {
//       onSearchChange && onSearchChange(searchInput);
//       navigate("/shop");
//     }
//   };

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate("/login");
//     setUserDropdownOpen(false);
//     setMenuOpen(false);
//   };

//   const toggleUserDropdown = (e) => {
//     e.stopPropagation();
//     setUserDropdownOpen(!userDropdownOpen);
//   };

//   const toggleLoginDropdown = (e) => {
//     e.stopPropagation();
//     setLoginDropdownOpen(!loginDropdownOpen);
//   };

//   const handleAuthNavigation = (path) => {
//     navigate(path);
//     setLoginDropdownOpen(false);
//   };

//   return (
//     <>
//       <nav className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-100">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16 lg:h-20">
            
//             {/* Logo */}
//             <Link to="/" className="flex items-center space-x-2">
//               <img src={logo} alt="Logo" className="h-12 lg:h-16 w-auto object-contain" />
//               <span className="text-xs text-gray-500 italic hidden sm:block"> Adi <span className="text-yellow-500 font-semibold">Trends ✨</span></span>
//             </Link>

//             {/* Search Bar - Only show for authenticated users on desktop */}
//             <form onSubmit={handleSearchSubmit} className="flex-1 mx-2 sm:mx-4">
//               <div className="flex items-center bg-blue-50 rounded-md px-2 py-1 sm:px-3 sm:py-2">
//                 <FiSearch className="text-gray-500 mr-2" size={16} />
//                 <input
//                   type="text"
//                   placeholder="Search for Products, Brands and More"
//                   value={searchInput}
//                   onChange={handleSearch}
//                   className="bg-transparent outline-none w-full placeholder:text-sm text-gray-700 text-sm"
//                 />
//               </div>
//             </form>

//             {/* Desktop Navigation */}
//             <div className="hidden lg:flex items-center space-x-6">
              
//               {/* Navigation Links */}
//               <div className="flex items-center space-x-6 text-sm font-medium">
//                 {navLinks.map((link) => (
//                   <Link
//                     key={link.path}
//                     to={link.path}
//                     className={`relative transition-colors duration-300 ${
//                       pathname === link.path
//                         ? "text-blue-600"
//                         : "text-gray-700 hover:text-blue-600"
//                     }`}
//                   >
//                     {link.name}
//                     {pathname === link.path && (
//                       <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 rounded-full"></span>
//                     )}
//                   </Link>
//                 ))}
//               </div>

//               {/* User Actions */}
//               {user ? (
//                 <div className="flex items-center space-x-4 ml-6 border-l border-gray-200 pl-6">
                  
//                   {/* Notifications */}
//                   <button className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors">
//                     <Bell size={20} />
//                     <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
//                   </button>

//                   {/* Wishlist */}
//                   {/* <Link
//                     to="/wishlist"
//                     className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors group"
//                   >
//                     <Heart size={20} className="group-hover:scale-110 transition-transform" />
//                     {wishlist.length > 0 && (
//                       <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
//                         {wishlist.length}
//                       </span>
//                     )}
//                   </Link> */}

//                   {/* Cart */}
//                   <Link
//                     to="/cart"
//                     className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors group"
//                   >
//                     <ShoppingCart size={20} className="group-hover:scale-110 transition-transform" />
//                     {cartItems.length > 0 && (
//                       <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
//                         {cartItems.length}
//                       </span>
//                     )}
//                   </Link>

//                   {/* User Profile Dropdown */}
//                   <div className="relative">
//                     <button
//                       onClick={toggleUserDropdown}
//                       className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
//                     >
//                       <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
//                         {user.name?.charAt(0).toUpperCase()}
//                       </div>
//                       <span className="text-sm font-medium text-gray-700 max-w-20 truncate">
//                         {user.name}
//                       </span>
//                     </button>

//                     {/* User Dropdown Menu */}
//                     {userDropdownOpen && (
//                       <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50">
//                         <div className="px-4 py-3 border-b border-gray-100">
//                           <p className="text-sm font-medium text-gray-900">{user.name}</p>
//                           <p className="text-xs text-gray-500">{user.email}</p>
//                         </div>
                        
//                         <Link
//                           to="/dashboard"
//                           className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
//                           onClick={() => setUserDropdownOpen(false)}
//                         >
//                           <User className="mr-3" size={16} />
//                           My Dashboard
//                         </Link>
                        
//                         <Link
//                           to="/orders"
//                           className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
//                           onClick={() => setUserDropdownOpen(false)}
//                         >
//                           <ShoppingCart className="mr-3" size={16} />
//                           My Orders
//                         </Link>
                        
//                         <div className="border-t border-gray-100 mt-2 pt-2">
//                           <button
//                             onClick={handleLogout}
//                             className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
//                           >
//                             <LogOut className="mr-3" size={16} />
//                             Logout
//                           </button>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ) : (
//                 /* Guest Actions with Login Dropdown */
//                 <div className="flex items-center space-x-4 ml-6 border-l border-gray-200 pl-6">
                  
//                   {/* Login Dropdown */}
//                   <div className="relative">
//                     <button
//                       onClick={toggleLoginDropdown}
//                       className="flex items-center space-x-1 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors rounded-md hover:bg-blue-50"
//                     >
//                       <User size={16} />
//                       <span>Login</span>
//                       <ChevronDown size={14} className={`transition-transform duration-200 ${loginDropdownOpen ? 'rotate-180' : ''}`} />
//                     </button>

//                     {/* Login Dropdown Menu */}
//                     {loginDropdownOpen && (
//                       <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50">
                        
//                         {/* Header */}
//                         <div className="px-4 py-3 border-b border-gray-100">
//                           <p className="text-sm font-semibold text-gray-900">Welcome to Adi Trends</p>
//                           <p className="text-xs text-gray-500">Sign in to access your account</p>
//                         </div>
                        
//                         {/* Login Option */}
//                         <button
//                           onClick={() => handleAuthNavigation('/login')}
//                           className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
//                         >
//                           <div className="flex items-center space-x-3">
//                             <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
//                               <User size={16} className="text-blue-600" />
//                             </div>
//                             <div className="text-left">
//                               <p className="font-medium">Sign In</p>
//                               <p className="text-xs text-gray-500">Access your existing account</p>
//                             </div>
//                           </div>
//                         </button>
                        
//                         <div className="border-t border-gray-100 my-2"></div>
                        
//                         {/* Signup Option */}
//                         <button
//                           onClick={() => handleAuthNavigation('/signup')}
//                           className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
//                         >
//                           <div className="flex items-center space-x-3">
//                             <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
//                               <User size={16} className="text-green-600" />
//                             </div>
//                             <div className="text-left">
//                               <p className="font-medium">Create Account</p>
//                               <p className="text-xs text-gray-500">Join for exclusive deals</p>
//                             </div>
//                           </div>
//                         </button>
                        
//                         {/* Footer */}
//                         <div className="px-4 py-3 border-t border-gray-100 mt-2">
//                           <p className="text-xs text-gray-500 text-center">
//                             New customers get <span className="font-semibold text-blue-600">20% off</span> first order!
//                           </p>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Mobile Actions */}
//             <div className="flex items-center space-x-2 lg:hidden">
//               {/* Mobile Search for authenticated users */}
//               {user && (
//                 <button 
//                   className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
//                   onClick={() => navigate('/search')}
//                 >
//                   <Search size={20} />
//                 </button>
//               )}

//               {/* Mobile Menu Button */}
//               <button
//                 onClick={() => setMenuOpen(!menuOpen)}
//                 className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
//               >
//                 {menuOpen ? <X size={24} /> : <Menu size={24} />}
//               </button>
//             </div>
//           </div>

//           {/* Mobile Search Bar - Only for authenticated users */}
//           {user && (
//             <div className="lg:hidden pb-4">
//               <form onSubmit={handleSearchSubmit}>
//                 <div className="flex items-center bg-gray-50 rounded-full px-4 py-3">
//                   {/* <Search className="text-gray-400 mr-3" size={18} />
//                   <input
//                     type="text"
//                     placeholder="Search products..."
//                     value={searchInput}
//                     onChange={handleSearch}
//                     className="bg-transparent outline-none w-full placeholder:text-gray-400 text-gray-700 text-sm"
//                   /> */}
//                 </div>
//               </form>
//             </div>
//           )}
//         </div>

//         {/* Mobile Navigation Menu */}
//         {menuOpen && (
//           <div className="lg:hidden fixed inset-y-0 left-0 w-80 bg-white shadow-2xl z-50 overflow-y-auto">
//             <div className="flex flex-col h-full">
              
//               {/* Header Section */}
//               {user ? (
//                 <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-6 text-white">
//                   <div className="flex items-center space-x-4">
//                     <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-lg">
//                       {user.name?.charAt(0).toUpperCase()}
//                     </div>
//                     <div>
//                       <p className="font-semibold text-lg">{user.name}</p>
//                       <p className="text-blue-100 text-sm">{user.email}</p>
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-6">
//                   <div className="flex items-center space-x-3">
//                     <User className="text-white" size={24} />
//                     <span className="text-white font-medium text-lg">Welcome to Adi Trends</span>
//                   </div>
//                 </div>
//               )}

//               {/* Menu Items Container */}
//               <div className="flex-1 overflow-y-auto">
                
//                 {/* Guest Auth Options - Show at TOP for non-authenticated users */}
//                 {!user && (
//                   <div className="py-2 border-b border-gray-200">
//                     {/* Sign In Option */}
//                     <button
//                       onClick={() => {
//                         navigate('/login');
//                         setMenuOpen(false);
//                       }}
//                       className="flex items-center w-full px-4 py-4 border-b border-gray-100 hover:bg-blue-50 transition-colors text-gray-700 hover:text-blue-600"
//                     >
//                       <div className="flex items-center space-x-4 w-full">
//                         <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
//                           <User size={16} className="text-blue-600" />
//                         </div>
//                         <div className="text-left">
//                           <span className="font-medium block">Sign In</span>
//                           <span className="text-xs text-gray-500">Access your account</span>
//                         </div>
//                       </div>
//                     </button>

//                     {/* Create Account Option */}
//                     <button
//                       onClick={() => {
//                         navigate('/signup');
//                         setMenuOpen(false);
//                       }}
//                       className="flex items-center w-full px-4 py-4 hover:bg-green-50 transition-colors text-gray-700 hover:text-green-600"
//                     >
//                       <div className="flex items-center space-x-4 w-full">
//                         <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
//                           <User size={16} className="text-green-600" />
//                         </div>
//                         <div className="text-left">
//                           <span className="font-medium block">Create Account</span>
//                           <span className="text-xs text-gray-500">Join for exclusive deals</span>
//                         </div>
//                       </div>
//                     </button>
//                   </div>
//                 )}
                
//                 {/* Navigation Links */}
//                 <div className="py-2">
//                   {navLinks.map((link, index) => (
//                     <Link
//                       key={link.path}
//                       to={link.path}
//                       onClick={() => setMenuOpen(false)}
//                       className={`flex items-center px-4 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
//                         pathname === link.path ? "bg-blue-50 text-blue-600" : "text-gray-700"
//                       }`}
//                     >
//                       <div className="flex items-center space-x-4 w-full">
//                         <div className="w-6 h-6 flex items-center justify-center">
//                           {index === 0 && <span className="text-lg">🏠</span>}
//                           {index === 1 && <span className="text-lg">🛍️</span>}
//                           {index === 2 && <span className="text-lg">{user ? "📂" : "ℹ️"}</span>}
//                           {index === 3 && <span className="text-lg">{user ? "🔥" : "📞"}</span>}
//                         </div>
//                         <span className="font-medium">{link.name}</span>
//                       </div>
//                     </Link>
//                   ))}
//                 </div>

//                 {/* Authenticated User Menu Items */}
//                 {user && (
//                   <div className="py-2">
//                     <Link
//                       to="/orders"
//                       onClick={() => setMenuOpen(false)}
//                       className="flex items-center px-4 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors text-gray-700"
//                     >
//                       <div className="flex items-center space-x-4 w-full">
//                         <span className="text-lg">📦</span>
//                         <span className="font-medium">My Orders</span>
//                       </div>
//                     </Link>

//                     <Link
//                       to="/cart"
//                       onClick={() => setMenuOpen(false)}
//                       className="flex items-center px-4 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors text-gray-700"
//                     >
//                       <div className="flex items-center justify-between w-full">
//                         <div className="flex items-center space-x-4">
//                           <span className="text-lg">🛒</span>
//                           <span className="font-medium">My Cart</span>
//                         </div>
//                         {cartItems.length > 0 && (
//                           <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
//                             {cartItems.length}
//                           </span>
//                         )}
//                       </div>
//                     </Link>

                    
//                     <Link
//                       to="/dashboard"
//                       onClick={() => setMenuOpen(false)}
//                       className="flex items-center px-4 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors text-gray-700"
//                     >
//                       <div className="flex items-center space-x-4 w-full">
//                         <span className="text-lg">👤</span>
//                         <span className="font-medium">My Account</span>
//                       </div>
//                     </Link>

//                     <button
//                       onClick={handleLogout}
//                       className="flex items-center w-full px-4 py-4 border-b border-gray-100 hover:bg-red-50 transition-colors text-red-600"
//                     >
//                       <div className="flex items-center space-x-4 w-full">
//                         <span className="text-lg">🚪</span>
//                         <span className="font-medium">Logout</span>
//                       </div>
//                     </button>
//                   </div>
//                 )}

//                 {/* Promotional Info for Guests - Show at bottom */}
//                 {!user && (
//                   <div className="px-4 py-4 bg-gradient-to-r from-blue-50 to-green-50 mx-4 my-2 rounded-lg">
//                     <div className="text-center">
//                       <p className="text-sm font-medium text-gray-800">🎉 Special Offer!</p>
//                       <p className="text-xs text-gray-600 mt-1">Get 20% off your first order when you sign up today</p>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Footer Info - Fixed at bottom */}
//               <div className="border-t border-gray-200 bg-gray-50 px-4 py-4 mt-auto">
//                 <div className="text-xs text-gray-500 space-y-1">
//                   <p>📞 Customer Support: 1-800-TRENDS</p>
//                   <p>✉️ Email: support@aditrends.com</p>
//                   <p>🌟 Premium Fashion Since 2024</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </nav>

//       {/* Mobile Menu Overlay */}
//       {menuOpen && (
//         <div 
//           className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
//           onClick={() => setMenuOpen(false)}
//         ></div>
//       )}
//     </>
//   );
// };

// export default Navbar;






import { useNavigate, useLocation, Link } from "react-router-dom";
import { Menu, X, ShoppingCart, Heart, LogOut, User, Bell, Search, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import logo from "../assets/tt.png";
import { useCart } from "../context/CartContext";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { FiSearch } from "react-icons/fi";

const Navbar = ({ onSearchChange }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  // Add wishlist selector
  const { items: wishlistItems } = useSelector((state) => state.wishlist);

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);
  
  const guestNavLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const userNavLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Categories", path: "/categories" },
    { name: "Deals", path: "/deals" },
  ];

  const navLinks = user ? userNavLinks : guestNavLinks;

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setUserDropdownOpen(false);
      setLoginDropdownOpen(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    onSearchChange && onSearchChange(value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearchChange && onSearchChange(searchInput);
      navigate("/shop");
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    setUserDropdownOpen(false);
    setMenuOpen(false);
  };

  const toggleUserDropdown = (e) => {
    e.stopPropagation();
    setUserDropdownOpen(!userDropdownOpen);
  };

  const toggleLoginDropdown = (e) => {
    e.stopPropagation();
    setLoginDropdownOpen(!loginDropdownOpen);
  };

  const handleAuthNavigation = (path) => {
    navigate(path);
    setLoginDropdownOpen(false);
  };

  return (
    <>
      <nav className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <img src={logo} alt="Logo" className="h-12 lg:h-16 w-auto object-contain" />
              <span className="text-xs text-gray-500 italic hidden sm:block"> Adi <span className="text-yellow-500 font-semibold">Trends ✨</span></span>
            </Link>

            {/* Search Bar - Only show for authenticated users on desktop */}
            <form onSubmit={handleSearchSubmit} className="flex-1 mx-2 sm:mx-4">
              <div className="flex items-center bg-blue-50 rounded-md px-2 py-1 sm:px-3 sm:py-2">
                <FiSearch className="text-gray-500 mr-2" size={16} />
                <input
                  type="text"
                  placeholder="Search for Products, Brands and More"
                  value={searchInput}
                  onChange={handleSearch}
                  className="bg-transparent outline-none w-full placeholder:text-sm text-gray-700 text-sm"
                />
              </div>
            </form>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6">
              
              {/* Navigation Links */}
              <div className="flex items-center space-x-6 text-sm font-medium">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative transition-colors duration-300 ${
                      pathname === link.path
                        ? "text-blue-600"
                        : "text-gray-700 hover:text-blue-600"
                    }`}
                  >
                    {link.name}
                    {pathname === link.path && (
                      <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 rounded-full"></span>
                    )}
                  </Link>
                ))}
              </div>

              {/* User Actions */}
              {user ? (
                <div className="flex items-center space-x-4 ml-6 border-l border-gray-200 pl-6">
                  
                  {/* Notifications */}
                  <button className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors">
                    <Bell size={20} />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                  </button>

                  {/* Wishlist */}
                  <Link
                    to="/wishlist"
                    className="relative p-2 text-gray-600 hover:text-pink-600 transition-colors group"
                  >
                    <Heart size={20} className="group-hover:scale-110 transition-transform group-hover:fill-pink-500" />
                    {wishlistItems.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                        {wishlistItems.length}
                      </span>
                    )}
                  </Link>

                  {/* Cart */}
                  <Link
                    to="/cart"
                    className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors group"
                  >
                    <ShoppingCart size={20} className="group-hover:scale-110 transition-transform" />
                    {cartItems.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                        {cartItems.length}
                      </span>
                    )}
                  </Link>

                  {/* User Profile Dropdown */}
                  <div className="relative">
                    <button
                      onClick={toggleUserDropdown}
                      className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {user.name?.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-sm font-medium text-gray-700 max-w-20 truncate">
                        {user.name}
                      </span>
                    </button>

                    {/* User Dropdown Menu */}
                    {userDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50">
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                        
                        <Link
                          to="/dashboard"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setUserDropdownOpen(false)}
                        >
                          <User className="mr-3" size={16} />
                          My Dashboard
                        </Link>
                        
                        <Link
                          to="/orders"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setUserDropdownOpen(false)}
                        >
                          <ShoppingCart className="mr-3" size={16} />
                          My Orders
                        </Link>
                        
                        <div className="border-t border-gray-100 mt-2 pt-2">
                          <button
                            onClick={handleLogout}
                            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <LogOut className="mr-3" size={16} />
                            Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                /* Guest Actions with Login Dropdown */
                <div className="flex items-center space-x-4 ml-6 border-l border-gray-200 pl-6">
                  
                  {/* Login Dropdown */}
                  <div className="relative">
                    <button
                      onClick={toggleLoginDropdown}
                      className="flex items-center space-x-1 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors rounded-md hover:bg-blue-50"
                    >
                      <User size={16} />
                      <span>Login</span>
                      <ChevronDown size={14} className={`transition-transform duration-200 ${loginDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Login Dropdown Menu */}
                    {loginDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50">
                        
                        {/* Header */}
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="text-sm font-semibold text-gray-900">Welcome to Adi Trends</p>
                          <p className="text-xs text-gray-500">Sign in to access your account</p>
                        </div>
                        
                        {/* Login Option */}
                        <button
                          onClick={() => handleAuthNavigation('/login')}
                          className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <User size={16} className="text-blue-600" />
                            </div>
                            <div className="text-left">
                              <p className="font-medium">Sign In</p>
                              <p className="text-xs text-gray-500">Access your existing account</p>
                            </div>
                          </div>
                        </button>
                        
                        <div className="border-t border-gray-100 my-2"></div>
                        
                        {/* Signup Option */}
                        <button
                          onClick={() => handleAuthNavigation('/signup')}
                          className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                              <User size={16} className="text-green-600" />
                            </div>
                            <div className="text-left">
                              <p className="font-medium">Create Account</p>
                              <p className="text-xs text-gray-500">Join for exclusive deals</p>
                            </div>
                          </div>
                        </button>
                        
                        {/* Footer */}
                        <div className="px-4 py-3 border-t border-gray-100 mt-2">
                          <p className="text-xs text-gray-500 text-center">
                            New customers get <span className="font-semibold text-blue-600">20% off</span> first order!
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center space-x-2 lg:hidden">
              {/* Mobile Search for authenticated users */}
              {user && (
                <button 
                  className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                  onClick={() => navigate('/search')}
                >
                  <Search size={20} />
                </button>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar - Only for authenticated users */}
          {user && (
            <div className="lg:hidden pb-4">
              <form onSubmit={handleSearchSubmit}>
                <div className="flex items-center bg-gray-50 rounded-full px-4 py-3">
                
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Mobile Navigation Menu */}
        {menuOpen && (
          <div className="lg:hidden fixed inset-y-0 left-0 w-80 bg-white shadow-2xl z-50 overflow-y-auto">
            <div className="flex flex-col h-full">
              
              {/* Header Section */}
              {user ? (
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-6 text-white">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{user.name}</p>
                      <p className="text-blue-100 text-sm">{user.email}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-6">
                  <div className="flex items-center space-x-3">
                    <User className="text-white" size={24} />
                    <span className="text-white font-medium text-lg">Welcome to Adi Trends</span>
                  </div>
                </div>
              )}

              {/* Menu Items Container */}
              <div className="flex-1 overflow-y-auto">
                
                {/* Guest Auth Options - Show at TOP for non-authenticated users */}
                {!user && (
                  <div className="py-2 border-b border-gray-200">
                    {/* Sign In Option */}
                    <button
                      onClick={() => {
                        navigate('/login');
                        setMenuOpen(false);
                      }}
                      className="flex items-center w-full px-4 py-4 border-b border-gray-100 hover:bg-blue-50 transition-colors text-gray-700 hover:text-blue-600"
                    >
                      <div className="flex items-center space-x-4 w-full">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <User size={16} className="text-blue-600" />
                        </div>
                        <div className="text-left">
                          <span className="font-medium block">Sign In</span>
                          <span className="text-xs text-gray-500">Access your account</span>
                        </div>
                      </div>
                    </button>

                    {/* Create Account Option */}
                    <button
                      onClick={() => {
                        navigate('/signup');
                        setMenuOpen(false);
                      }}
                      className="flex items-center w-full px-4 py-4 hover:bg-green-50 transition-colors text-gray-700 hover:text-green-600"
                    >
                      <div className="flex items-center space-x-4 w-full">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <User size={16} className="text-green-600" />
                        </div>
                        <div className="text-left">
                          <span className="font-medium block">Create Account</span>
                          <span className="text-xs text-gray-500">Join for exclusive deals</span>
                        </div>
                      </div>
                    </button>
                  </div>
                )}
                
                {/* Navigation Links */}
                <div className="py-2">
                  {navLinks.map((link, index) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setMenuOpen(false)}
                      className={`flex items-center px-4 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                        pathname === link.path ? "bg-blue-50 text-blue-600" : "text-gray-700"
                      }`}
                    >
                      <div className="flex items-center space-x-4 w-full">
                        <div className="w-6 h-6 flex items-center justify-center">
                          {index === 0 && <span className="text-lg">🏠</span>}
                          {index === 1 && <span className="text-lg">🛍️</span>}
                          {index === 2 && <span className="text-lg">{user ? "📂" : "ℹ️"}</span>}
                          {index === 3 && <span className="text-lg">{user ? "🔥" : "📞"}</span>}
                        </div>
                        <span className="font-medium">{link.name}</span>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Authenticated User Menu Items */}
                {user && (
                  <div className="py-2">
                    <Link
                      to="/orders"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center px-4 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors text-gray-700"
                    >
                      <div className="flex items-center space-x-4 w-full">
                        <span className="text-lg">📦</span>
                        <span className="font-medium">My Orders</span>
                      </div>
                    </Link>

                    {/* Mobile Wishlist Link */}
                    <Link
                      to="/wishlist"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center px-4 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors text-gray-700"
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center space-x-4">
                          <span className="text-lg">❤️</span>
                          <span className="font-medium">My Wishlist</span>
                        </div>
                        {wishlistItems.length > 0 && (
                          <span className="bg-pink-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                            {wishlistItems.length}
                          </span>
                        )}
                      </div>
                    </Link>

                    <Link
                      to="/cart"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center px-4 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors text-gray-700"
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center space-x-4">
                          <span className="text-lg">🛒</span>
                          <span className="font-medium">My Cart</span>
                        </div>
                        {cartItems.length > 0 && (
                          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                            {cartItems.length}
                          </span>
                        )}
                      </div>
                    </Link>

                    
                    <Link
                      to="/dashboard"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center px-4 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors text-gray-700"
                    >
                      <div className="flex items-center space-x-4 w-full">
                        <span className="text-lg">👤</span>
                        <span className="font-medium">My Account</span>
                      </div>
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-4 border-b border-gray-100 hover:bg-red-50 transition-colors text-red-600"
                    >
                      <div className="flex items-center space-x-4 w-full">
                        <span className="text-lg">🚪</span>
                        <span className="font-medium">Logout</span>
                      </div>
                    </button>
                  </div>
                )}

                {/* Promotional Info for Guests - Show at bottom */}
                {!user && (
                  <div className="px-4 py-4 bg-gradient-to-r from-blue-50 to-green-50 mx-4 my-2 rounded-lg">
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-800">🎉 Special Offer!</p>
                      <p className="text-xs text-gray-600 mt-1">Get 20% off your first order when you sign up today</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer Info - Fixed at bottom */}
              <div className="border-t border-gray-200 bg-gray-50 px-4 py-4 mt-auto">
                <div className="text-xs text-gray-500 space-y-1">
                  <p>📞 Customer Support: 1-800-TRENDS</p>
                  <p>✉️ Email: support@aditrends.com</p>
                  <p>🌟 Premium Fashion Since 2024</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Navbar;

