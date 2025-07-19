// src/components/dashboard/RecentlyViewed.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const RecentlyViewed = () => {
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("recentlyViewed")) || [];
    setRecent(data.slice(0, 5)); // show last 5
  }, []);

  if (recent.length === 0) return null;

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
      <h3 className="text-lg font-semibold text-gray-700 dark:text-white mb-2">
        👀 Recently Viewed Products
      </h3>
      <div className="flex gap-4 overflow-x-auto">
        {recent.map((product) => (
          <Link
            to={`/product/${product._id}`}
            key={product._id}
            className="min-w-[120px] rounded-lg border p-2 bg-gray-100 dark:bg-gray-700"
          >
            <img src={product.image} alt={product.name} className="w-full h-20 object-cover rounded" />
            <p className="text-xs mt-1 text-center">{product.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewed;
