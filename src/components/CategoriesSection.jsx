import React from "react";
import { Link } from "react-router-dom";

const categories = [
  {
    id: 1,
    name: "Electronics",
    image: "https://cdn-icons-png.flaticon.com/512/1041/1041916.png",
  },
  {
    id: 2,
    name: "Fashion",
    image: "https://cdn-icons-png.flaticon.com/512/892/892458.png",
  },
  {
    id: 3,
    name: "Home & Kitchen",
    image: "https://cdn-icons-png.flaticon.com/512/1516/1516713.png",
  },
  {
    id: 4,
    name: "Books",
    image: "https://cdn-icons-png.flaticon.com/512/2933/2933811.png",
  },
  {
    id: 5,
    name: "Fitness",
    image: "https://cdn-icons-png.flaticon.com/512/3771/3771535.png",
  },
  {
    id: 6,
    name: "Toys",
    image: "https://cdn-icons-png.flaticon.com/512/3465/3465515.png",
  },
  {
    id: 7,
    name: "Groceries",
    image: "https://cdn-icons-png.flaticon.com/512/3144/3144456.png",
  },
  {
    id: 8,
    name: "Mobiles",
    image: "https://cdn-icons-png.flaticon.com/512/753/753345.png",
  },
  {
    id: 9,
    name: "Beauty",
    image: "https://cdn-icons-png.flaticon.com/512/3014/3014789.png",
  },
  {
    id: 10,
    name: "Gaming",
    image: "https://cdn-icons-png.flaticon.com/512/1238/1238032.png",
  },
];

const CategoriesSection = () => {
  return (
    <section className="py-10 px-4 sm:px-8 md:px-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
          🔍 Shop by Categories
        </h2>
        <Link
          to="/categories"
          className="text-sm text-blue-600 hover:underline dark:text-blue-400"
        >
          View All
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-700 p-4 rounded-2xl shadow-sm hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer text-center"
          >
            <div className="w-20 h-20 mx-auto mb-3">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
              {category.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;
