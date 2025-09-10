"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CarbonInput() {
  const router = useRouter();
  const [form, setForm] = useState({
    plantName: "",
    duration: "",
    location: "",
    water: "",
    plants: "",
    manure: "",
    manureQty: "",
    fertilizer: "",
    fertilizerQty: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/carbon_credits/result");
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-gray-50 text-gray-900 ">
      <h1 className="text-3xl font-bold mb-8 text-green-700 border-4 border-green-600 p-2 rounded-2xl">
        🌱 Carbon Credit Counter
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl space-y-6"
      >
        {/* Basic Details */}
        <section>
          <h2 className="text-xl font-semibold border-b pb-2 mb-4">Basic Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Plant Name"
              value={form.plantName}
              onChange={(e) => setForm({ ...form, plantName: e.target.value })}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-500"
            />
            <input
              type="number"
              placeholder="Duration (Years)"
              value={form.duration}
              onChange={(e) => setForm({ ...form, duration: e.target.value })}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              placeholder="Location"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>
        </section>

        {/* Resources */}
        <section>
          <h2 className="text-xl font-semibold border-b pb-2 mb-4">Resources</h2>
          <input
            type="number"
            placeholder="Avg. Water Consumption (Litres/day)"
            value={form.water}
            onChange={(e) => setForm({ ...form, water: e.target.value })}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-500 mb-3"
          />
          <input
            type="number"
            placeholder="Total Number of Plants"
            value={form.plants}
            onChange={(e) => setForm({ ...form, plants: e.target.value })}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-500 mb-3"
          />

          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Manure Name"
              value={form.manure}
              onChange={(e) => setForm({ ...form, manure: e.target.value })}
              className="border p-3 rounded-lg focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              placeholder="Manure Quantity"
              value={form.manureQty}
              onChange={(e) => setForm({ ...form, manureQty: e.target.value })}
              className="border p-3 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 mt-3">
            <input
              type="text"
              placeholder="Fertilizer Name"
              value={form.fertilizer}
              onChange={(e) => setForm({ ...form, fertilizer: e.target.value })}
              className="border p-3 rounded-lg focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              placeholder="Fertilizer Quantity"
              value={form.fertilizerQty}
              onChange={(e) => setForm({ ...form, fertilizerQty: e.target.value })}
              className="border p-3 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>
        </section>

        {/* Uploads */}
        <section>
          <h2 className="text-xl font-semibold border-b pb-2 mb-4">Uploads</h2>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Plant Image</label>
            <input
              type="file"
              accept="image/*"
              className="w-full border p-2 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Field Images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              className="w-full border p-2 rounded-lg"
            />
          </div>
        </section>

        <button
          type="submit"
          className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Calculate Credits
        </button>
      </form>
    </div>
  );
}
