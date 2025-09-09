import { ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Header() {
  const items = useSelector((state) => state.cart.items);
  const count = Object.values(items).reduce((sum, i) => sum + i.quantity, 0);

  return (
    <header className="flex justify-between items-center p-4 bg-green-200 shadow-md">
      <nav className="space-x-4">
        <Link to="/" className="font-bold">Home</Link>
        <Link to="/products" className="font-bold">Products</Link>
      </nav>
      <Link to="/cart" className="relative">
        <ShoppingCart className="w-6 h-6" />
        {count > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
            {count}
          </span>
        )}
      </Link>
    </header>
  );
}
