import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Provider, useSelector, useDispatch } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { ShoppingCart, Search } from "lucide-react";

// Redux
const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const existing = state.find(i => i.id === action.payload.id);
      if (existing) existing.quantity += 1;
      else state.push({ ...action.payload, quantity: 1 });
    },
    increase: (state, action) => {
      const item = state.find(i => i.id === action.payload);
      if (item) item.quantity += 1;
    },
    decrease: (state, action) => {
      const item = state.find(i => i.id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
    },
    remove: (state, action) => state.filter(i => i.id !== action.payload),
  },
});

const { addToCart, increase, decrease, remove } = cartSlice.actions;
const store = configureStore({ reducer: { cart: cartSlice.reducer } });

// Sample plant data
const plants = [
  { id: 1, name: "Aloe Vera", price: 10, category: "Succulent", img: "https://picsum.photos/200?random=1" },
  { id: 2, name: "Snake Plant", price: 15, category: "Succulent", img: "https://picsum.photos/200?random=2" },
  { id: 3, name: "Peace Lily", price: 12, category: "Flowering", img: "https://picsum.photos/200?random=3" },
  { id: 4, name: "Spider Plant", price: 8, category: "Air Purifier", img: "https://picsum.photos/200?random=4" },
  { id: 5, name: "Fern", price: 9, category: "Air Purifier", img: "https://picsum.photos/200?random=5" },
  { id: 6, name: "Orchid", price: 20, category: "Flowering", img: "https://picsum.photos/200?random=6" },
];

// Header like Amazon/Flipkart
function Header() {
  const cart = useSelector(state => state.cart);
  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <header className="fixed top-0 w-full bg-green-700 text-white z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="text-2xl font-bold">🌿 GreenLeaf</Link>
        <div className="flex flex-1 mx-4 items-center">
          <input
            type="text"
            placeholder="Search for plants..."
            className="flex-1 p-2 rounded-l-md text-black"
          />
          <button className="bg-yellow-400 p-2 rounded-r-md">
            <Search className="w-5 h-5"/>
          </button>
        </div>
        <nav className="flex items-center gap-4">
          <Link to="/products" className="hover:underline">Products</Link>
          <Link to="/cart" className="relative">
            <ShoppingCart className="w-6 h-6"/>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 w-5 h-5 text-xs rounded-full flex items-center justify-center">{totalItems}</span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}

// Hero banner
function HeroBanner() {
  return (
    <div className="h-96 bg-[url('https://picsum.photos/1200/500?blur=3')] bg-cover bg-center relative mt-16">
      <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center">
        <h1 className="text-5xl text-white font-bold mb-4">Bring Nature Home</h1>
        <p className="text-xl text-white mb-6">Fresh houseplants delivered to your door</p>
        <Link to="/products" className="bg-green-600 hover:bg-green-800 px-6 py-3 rounded-xl text-lg text-white font-semibold shadow-lg transition">
          Shop Now
        </Link>
      </div>
    </div>
  );
}

// Product Listing (real store style)
function ProductsPage() {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const categories = [...new Set(plants.map(p => p.category))];

  return (
    <div className="pt-24 max-w-7xl mx-auto p-4">
      {categories.map(cat => (
        <div key={cat} className="mb-12">
          <h2 className="text-3xl font-bold mb-6">{cat}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {plants.filter(p => p.category === cat).map(plant => {
              const inCart = cart.find(i => i.id === plant.id);
              return (
                <div key={plant.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-4 flex flex-col items-center">
                  <img src={plant.img} alt={plant.name} className="w-40 h-40 object-cover rounded-xl mb-3"/>
                  <h3 className="text-lg font-semibold">{plant.name}</h3>
                  <p className="text-green-700 font-bold">${plant.price}</p>
                  <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full mt-1">{plant.category}</span>
                  <button
                    disabled={!!inCart}
                    onClick={() => dispatch(addToCart(plant))}
                    className={`mt-4 w-full py-2 rounded-lg font-semibold transition ${
                      inCart ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-800 text-white"
                    }`}
                  >
                    {inCart ? "Added" : "Add to Cart"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

// Cart page
function CartPage() {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);
  const totalCost = cart.reduce((sum, i) => sum + i.quantity * i.price, 0);

  return (
    <div className="pt-24 max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map(item => (
            <div key={item.id} className="flex items-center justify-between bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
              <img src={item.img} alt={item.name} className="w-20 h-20 object-cover rounded-lg"/>
              <div className="flex-1 ml-4">
                <h4 className="font-semibold">{item.name}</h4>
                <p>${item.price} each</p>
                <p className="font-bold text-green-700">Subtotal: ${item.price * item.quantity}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => dispatch(decrease(item.id))} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition">-</button>
                <span>{item.quantity}</span>
                <button onClick={() => dispatch(increase(item.id))} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition">+</button>
              </div>
              <button onClick={() => dispatch(remove(item.id))} className="ml-4 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition">Delete</button>
            </div>
          ))}
          <div className="mt-6 p-4 bg-green-50 rounded-xl flex justify-between items-center flex-wrap gap-4">
            <div>
              <p className="font-semibold text-lg">Total Items: {totalItems}</p>
              <p className="font-bold text-xl text-green-700">Total Cost: ${totalCost}</p>
            </div>
            <div className="flex gap-4">
              <button className="bg-green-600 hover:bg-green-800 text-white px-6 py-3 rounded-lg font-semibold transition">Checkout (Coming Soon)</button>
              <Link to="/products" className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold transition">Continue Shopping</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Main App
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HeroBanner />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
