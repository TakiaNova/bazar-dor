
import Link from "next/link";
import { getProducts, getCategories } from "@/lib/api";
import ProductSection from "./product-section";

export default async function HomePage() {
  const products = await getProducts();
  const categories = await getCategories();

  const rising = products.filter(
    (product) => product.change?.dir === "up"
  );

  const falling = products.filter(
    (product) => product.change?.dir === "down"
  );

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link href="/" className="text-2xl font-bold text-green-700">
            🛒 Bazar Dor
          </Link>

          <div className="flex gap-4 text-sm font-medium">
            <Link href="/">Home</Link>
            <Link href="/profile">Profile</Link>
            <Link href="/signin">Sign In</Link>
            <Link href="/signup">Sign Up</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-green-800 px-5 py-16 text-center text-white">
        <h1 className="text-4xl font-bold md:text-5xl">
          Know Your Market. Save Your Money.
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-green-100">
          Track daily grocery prices, compare markets and make smarter
          shopping decisions.
        </p>

        <a
          href="#products"
          className="mt-7 inline-block rounded-lg bg-white px-7 py-3 font-semibold text-green-800"
        >
          Explore Products
        </a>
      </section>

      {/* Statistics */}
      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-5 px-5 py-10 sm:grid-cols-3">
        <div className="rounded-xl bg-white p-6 text-center shadow">
          <p className="text-3xl font-bold">{products.length}</p>
          <p className="mt-2 text-gray-500">Total Products</p>
        </div>

        <div className="rounded-xl bg-white p-6 text-center shadow">
          <p className="text-3xl font-bold text-red-600">
            {rising.length}
          </p>
          <p className="mt-2 text-gray-500">Prices Increased</p>
        </div>

        <div className="rounded-xl bg-white p-6 text-center shadow">
          <p className="text-3xl font-bold text-green-600">
            {falling.length}
          </p>
          <p className="mt-2 text-gray-500">Prices Decreased</p>
        </div>
      </section>

      {/* Product Search and Category Filter */}
      <ProductSection
        products={products}
        categories={categories}
      />

      {/* Footer */}
      <footer className="mt-12 bg-gray-900 px-5 py-8 text-center text-gray-300">
        <h2 className="text-xl font-bold text-white">Bazar Dor</h2>

        <p className="mt-2 text-sm">
          Smarter shopping starts with better price information.
        </p>

        <p className="mt-4 text-xs text-gray-500">
          © 2026 Bazar Dor. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
