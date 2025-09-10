"use client";
import { useRouter } from "next/navigation";

export default function CarbonResult() {
  const router = useRouter();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50 text-gray-900"
      style={{
        backgroundImage: "url('/bg.jpg')", // optional background image
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white/90 p-8 rounded-2xl shadow-lg w-full max-w-md border-2 border-green-600">
        <h1 className="text-3xl font-bold mb-6 text-center text-green-700">
          🌍 Carbon Credit Report
        </h1>

        <div className="space-y-6 text-center">
          <div>
            <p className="text-lg">Total Carbon Credits</p>
            <p className="text-green-700 text-2xl font-bold">
              120 kg CO₂ (~0.12 tons)
            </p>
          </div>

          <div>
            <p className="text-lg">Estimated Market Value</p>
            <p className="text-blue-600 text-4xl font-bold">₹1,200</p>
          </div>
        </div>

        <button
          onClick={() => router.push("/carbon_credits/marketplace")}
          className="w-full mt-8 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Publish to Marketplace
        </button>

        <p className="mt-4 text-xs text-gray-500 italic text-center">
          *Estimates are approximate, actual credits may vary.*
        </p>
      </div>
    </div>
  );
}
