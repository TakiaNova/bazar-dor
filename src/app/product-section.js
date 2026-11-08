
"use client";

import { useState } from "react";
import Link from "next/link";

export default function ProductSection({ products, categories }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" ||
      product.category === selectedCategory;

    const matchesSearch = product.nameBn
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="products" className="mx-auto max-w-7xl px-5 py-8">
      <h2 className="text-3xl font-bold text-gray-900">
        Today's Grocery Prices
      </h2>

      <p className="mt-2 text-gray-500">
        Search and filter grocery products.
      </p>

      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mt-6 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-green-600"
      />

      <div className="my-5 flex flex-wrap gap-2">
        <button
  type="button"
  onClick={() => {
    setSelectedCategory("all");
    setSearch("");
  }}
  className={`rounded-full px-4 py-2 text-sm font-semibold ${
    selectedCategory === "all"
      ? "bg-green-700 text-white"
      : "bg-white text-gray-700"
  }`}
>
  All Products
</button>

        {categories.map((category) => (
          <button
            key={category.slug || category.id || category.name}
            onClick={() =>
              setSelectedCategory(category.slug || category.id)
            }
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              selectedCategory === (category.slug || category.id)
                ? "bg-green-700 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            {category.icon || "🛒"} {category.nameBn}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="rounded-xl bg-white p-5 shadow">
            <span className="text-4xl">{product.image}</span>
            <h3 className="mt-4 text-lg font-bold">{product.nameBn}</h3>
            <p className="mt-2 text-2xl font-bold text-green-700">
              ৳{product.today}
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Yesterday: ৳{product.yesterday}
            </p>
            <p className="mt-2 text-sm">
              {product.change?.dir === "up"
                ? "🔺 Price increased"
                : product.change?.dir === "down"
                ? "🔻 Price decreased"
                : "➡️ No change"}
            </p>
            <Link
              href={`/product/${product.slug}`}
              className="mt-4 block rounded-lg bg-green-700 py-2 text-center text-white"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p className="py-10 text-center text-gray-500">
          No products found.
        </p>
      )}
    </section>
  );
}
