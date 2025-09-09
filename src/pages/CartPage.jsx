<div className="p-6 max-w-4xl mx-auto">
  <h2 className="text-3xl font-bold mb-6">Shopping Cart</h2>

  {cart.length === 0 ? (
    <p>Your cart is empty.</p>
  ) : (
    <>
      <ul className="space-y-4">
        {cart.map((item) => (
          <li
            key={item.id}
            className="flex items-center gap-4 p-4 border rounded-xl hover:shadow-md transition bg-white"
          >
            <img
              src={item.img}
              alt={item.name}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h4 className="font-semibold">{item.name}</h4>
              <p className="text-gray-600">${item.price} each</p>
              <p className="text-gray-700 font-bold">Subtotal: ${item.price * item.quantity}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => dispatch(decrease(item.id))}
                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => dispatch(increase(item.id))}
                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
              >
                +
              </button>
            </div>
            <button
              onClick={() => dispatch(remove(item.id))}
              className="ml-4 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-6 p-4 bg-green-50 rounded-xl flex justify-between items-center flex-wrap gap-4">
        <div>
          <p className="font-semibold text-lg">Total Items: {totalItems}</p>
          <p className="font-bold text-xl text-green-700">Total Cost: ${totalCost}</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-green-600 hover:bg-green-800 text-white px-6 py-3 rounded-lg font-semibold transition">
            Checkout (Coming Soon)
          </button>
          <Link
            to="/products"
            className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </>
  )}
</div>
