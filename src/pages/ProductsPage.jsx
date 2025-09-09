import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  // Example products, replace with your real data source
  const products = [
    {
      id: 1,
      name: "Fiddle Leaf Fig",
      price: 29.99,
      img: "",
      category: "Indoor",
    },
    {
      id: 2,
      name: "Snake Plant",
      price: 19.99,
      img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
      category: "Air Purifier",
    },
    {
      id: 3,
      name: "Monstera",
      price: 24.99,
      img: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=400&q=80",
      category: "Tropical",
    },
    {
      id: 4,
      name: "Peace Lily",
      price: 14.99,
      img: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
      category: "Flowering",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 relative">
      {/* Banner/Header */}
      <div className="w-full h-48 bg-gradient-to-r from-green-600 to-lime-400 flex items-center justify-center shadow-lg mb-12 relative">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg tracking-wide">Houseplants Shop</h1>
        <img src="/vite.svg" alt="Logo" className="absolute right-8 top-8 w-16 h-16 opacity-30 hidden md:block" />
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-gray-800">Shop the Best Plants</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {products.map((plant) => (
            <div
              key={plant.id}
              className="bg-white/90 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 p-6 flex flex-col items-center border border-green-100 hover:border-green-300 relative overflow-hidden"
            >
              <img
                src={plant.img}
                alt={plant.name}
                className="w-36 h-36 object-cover mb-4 rounded-xl shadow-md border-4 border-green-100"
              />
              <h3 className="text-lg font-semibold mb-1 text-gray-900">{plant.name}</h3>
              <p className="text-green-700 font-bold mb-3 text-lg">${plant.price}</p>
              <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full mb-2 font-medium shadow-sm">{plant.category}</span>
              <button
                disabled={!!cart.find((item) => item.id === plant.id)}
                onClick={() => dispatch(addToCart(plant))}
                className={`mt-4 px-5 py-2 rounded-full w-full font-semibold shadow transition-all duration-200 text-white text-base ${
                  cart.find((i) => i.id === plant.id)
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {cart.find((i) => i.id === plant.id) ? "Added" : "Add to Cart"}
              </button>
              <span className="absolute top-3 right-3 bg-green-200 text-green-800 text-xs px-2 py-1 rounded-full font-medium shadow-sm">Bestseller</span>
            </div>
          ))}
        </div>
      </div>
      {/* Subtle background pattern */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/leaf.png')]" />
    </div>
  );
};

export default ProductsPage;
