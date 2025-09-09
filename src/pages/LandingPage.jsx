function LandingPage() {
  return (
    <div
      className="h-screen flex flex-col items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: "url(https://picsum.photos/1200/800?blur=3)" }}
    >
      <div className="absolute inset-0 bg-black/50"></div> {/* dark overlay */}
      <div className="relative text-center text-white p-4">
        <h1 className="text-6xl font-bold mb-4 drop-shadow-lg">GreenLeaf Co.</h1>
        <p className="text-xl mb-6 drop-shadow-md">
          Fresh houseplants delivered to your home. Make your space greener and healthier!
        </p>
        <Link
          to="/products"
          className="inline-block bg-green-600 hover:bg-green-800 transition px-8 py-3 rounded-xl text-lg font-semibold shadow-lg"
        >
          Browse Plants
        </Link>
      </div>
    </div>
  );
}
