import UserMenu from "@/components/UserMenu";
import Link from "next/link";
import Image from "next/image";
import { connection } from "next/server";

import { getProducts, getCategories } from "@/lib/api";

import PriceTicker from "@/components/PriceTicker";
import HeroSection from "@/components/HeroSection";
import PriceHighlights from "@/components/PriceHighlights";
import AllProducts from "@/components/AllProducts";
import Footer from "@/components/Footer";

export default async function Home() {
  await connection();

  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <main className="min-h-screen bg-[#eef5ef] text-[#202820]">
      {/* Header */}
      <header className="bg-[#f8fcf8]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-700">
              <Image
                src="/logo-icon.png"
                alt="বাজার দর"
                width={36}
                height={36}
                priority
                className="h-9 w-9 object-contain"
              />
            </div>

            <div>
  <h1 className="text-xl font-extrabold text-[#202820]">
    বাজার দর
  </h1>

  <p className="text-xs text-gray-500">
    {new Intl.DateTimeFormat("bn-BD", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date())}
  </p>
</div>
          </Link>

          {/* User Menu - dropdown will be added separately */}
          <UserMenu />
        </div>

        {/* Categories directly below logo/header */}
        <div className="border-t border-green-100">
          <nav className="mx-auto flex max-w-7xl gap-7 overflow-x-auto px-5 py-3">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="flex shrink-0 items-center gap-2 text-sm font-semibold text-gray-700 transition hover:text-green-700"
              >
                <span>{category.icon}</span>
                <span>{category.nameBn}</span>
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Market Price Ticker */}
      <PriceTicker products={products} />

      {/* Hero */}
      <HeroSection />

      {/* Increased and decreased price sections */}
      <PriceHighlights products={products} />

      {/* All Products */}
      <section id="products">
        <AllProducts
          products={products}
          categories={categories}
        />
      </section>

      <Footer />
    </main>
  );
}
      