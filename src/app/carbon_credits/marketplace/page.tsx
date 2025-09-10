"use client";

const farmers = [
  { id: 1, name: "Farmer A", credits: "300 kg CO₂", value: "₹3,000" },
  { id: 2, name: "Farmer B", credits: "150 kg CO₂", value: "₹1,500" },
  { id: 3, name: "Farmer C", credits: "500 kg CO₂", value: "₹5,000" },
];

export default function Marketplace() {
  return (
    <div
      className="min-h-screen p-6 bg-gray-50 text-gray-900"
      style={{
        backgroundImage: "url('/bg.jpg')", // optional background
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-3xl font-bold text-center text-green-700 mb-8">
        🏪 Carbon Credit Marketplace
      </h1>

      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {farmers.map((farmer) => (
          <div
            key={farmer.id}
            className="bg-white/90 border-2 border-green-500 p-6 rounded-xl shadow-md hover:shadow-lg transition"
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-green-200 flex items-center justify-center text-2xl">
                👨‍🌾
              </div>
              <h2 className="text-lg font-semibold">{farmer.name}</h2>
            </div>

            <p className="mt-4 text-gray-700">🌱 {farmer.credits}</p>
            <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              {farmer.value}
            </span>

            <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition">
              Buy Credits
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
