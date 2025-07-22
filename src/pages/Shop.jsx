
// import { useState, useEffect } from "react";
// import axios from "axios";
// import ProductCard from "../components/ProductCard";

// const Shop = ({ globalSearch = "" }) => {
//   const [products, setProducts] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [sortOption, setSortOption] = useState("");
//   const [loading, setLoading] = useState(true);

//   // Fetch products from backend
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/products");
//         setProducts(res.data);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching products:", err);
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const categories = ["All", ...new Set(products.map((item) => item.category))];

//   // Apply search and category filter
//   const filteredProducts = products.filter((item) => {
//     const search = globalSearch.toLowerCase();

//     const matchesSearch =
//       item.name.toLowerCase().includes(search) ||
//       item.brand.toLowerCase().includes(search) ||
//       item.category.toLowerCase().includes(search) ||
//       (item.description && item.description.toLowerCase().includes(search));

//     const matchesCategory =
//       selectedCategory === "All" || item.category === selectedCategory;

//     return matchesSearch && matchesCategory;
//   });

//   // Apply sorting
//   const sortedProducts = [...filteredProducts].sort((a, b) => {
//     if (sortOption === "priceLow") return a.price - b.price;
//     if (sortOption === "priceHigh") return b.price - a.price;
//     if (sortOption === "ratingHigh") return b.rating - a.rating;
//     return 0;
//   });

//   if (loading) {
//     return (
//       <div className="p-6 text-center text-gray-500 dark:text-gray-300">
//         Loading products...
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
//       <h2 className="text-3xl font-bold mb-6 text-center text-blue-600 dark:text-white">
//         Shop Products
//       </h2>

//       {/* Category and Sort Controls */}
//       <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 max-w-5xl mx-auto">
//         <select
//           value={selectedCategory}
//           onChange={(e) => setSelectedCategory(e.target.value)}
//           className="w-full sm:w-1/3 px-4 py-2 rounded-lg border border-gray-300 dark:bg-slate-800 dark:text-white"
//         >
//           {categories.map((category) => (
//             <option key={category} value={category}>
//               {category}
//             </option>
//           ))}
//         </select>

//         <select
//           value={sortOption}
//           onChange={(e) => setSortOption(e.target.value)}
//           className="w-full sm:w-1/3 px-4 py-2 rounded-lg border border-gray-300 dark:bg-slate-800 dark:text-white"
//         >
//           <option value="">Sort By</option>
//           <option value="priceLow">Price: Low to High</option>
//           <option value="priceHigh">Price: High to Low</option>
//           <option value="ratingHigh">Rating: High to Low</option>
//         </select>
//       </div>

//       {/* Product Grid */}
//       {sortedProducts.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
//           {sortedProducts.map((product) => (
//             <ProductCard key={product._id} product={product} />
//           ))}
//         </div>
//       ) : (
//         <p className="text-center text-red-500 mt-10 text-lg">
//           No products match your search or filter.
//         </p>
//       )}
//     </div>
//   );
// };

// export default Shop;

// Updated Shop.js with debugging
import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const Shop = ({ globalSearch = "" }) => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("");
  const [loading, setLoading] = useState(true);

  // Debug: Log the globalSearch prop
  useEffect(() => {
    console.log("Global search received:", globalSearch);
  }, [globalSearch]);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://e-com-backend-fxxd.onrender.com/api/products");
        console.log("Fetched products:", res.data); // Debug log
        setProducts(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = ["All", ...new Set(products.map((item) => item.category))];

  // Apply search and category filter
  const filteredProducts = products.filter((item) => {
    const search = globalSearch.toLowerCase().trim();
    
    // If no search term, show all products for the selected category
    if (!search) {
      return selectedCategory === "All" || item.category === selectedCategory;
    }

    const matchesSearch =
      item.name.toLowerCase().includes(search) ||
      item.brand.toLowerCase().includes(search) ||
      item.category.toLowerCase().includes(search) ||
      (item.description && item.description.toLowerCase().includes(search));

    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Debug: Log filtered results
  useEffect(() => {
    console.log("Filtered products:", filteredProducts.length);
    console.log("Search term:", globalSearch);
    console.log("Selected category:", selectedCategory);
  }, [filteredProducts, globalSearch, selectedCategory]);

  // Apply sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "priceLow") return a.price - b.price;
    if (sortOption === "priceHigh") return b.price - a.price;
    if (sortOption === "ratingHigh") return b.rating - a.rating;
    return 0;
  });

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500 dark:text-gray-300">
        Loading products...
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600 dark:text-white">
        Shop Products
      </h2>

      {/* Debug Info - Remove this after testing */}
      {globalSearch && (
        <div className="mb-4 p-2 bg-yellow-100 rounded">
          <p>Searching for: "{globalSearch}"</p>
          <p>Found {filteredProducts.length} products</p>
        </div>
      )}

      {/* Category and Sort Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 max-w-5xl mx-auto">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full sm:w-1/3 px-4 py-2 rounded-lg border border-gray-300 dark:bg-slate-800 dark:text-white"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="w-full sm:w-1/3 px-4 py-2 rounded-lg border border-gray-300 dark:bg-slate-800 dark:text-white"
        >
          <option value="">Sort By</option>
          <option value="priceLow">Price: Low to High</option>
          <option value="priceHigh">Price: High to Low</option>
          <option value="ratingHigh">Rating: High to Low</option>
        </select>
      </div>

      {/* Product Grid */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {sortedProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center mt-10">
          <p className="text-red-500 text-lg mb-2">
            {globalSearch 
              ? `No products found for "${globalSearch}"` 
              : "No products match your filter."
            }
          </p>
          {globalSearch && (
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Clear Search & Show All Products
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Shop;
