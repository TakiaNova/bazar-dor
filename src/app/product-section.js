
import Link from "next/link";
import Image from "next/image";
import { getProducts, getCategories } from "@/lib/api";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import ProductSection from "./product-section";
import SignOutButton from "./profile/signout-button";

export const instant = false;

const bn = (value) =>
  new Intl.NumberFormat("bn-BD").format(value ?? 0);

function PriceCard({ product, type }) {
  const isUp = type === "up";
  const change = Math.abs(product.change?.pct ?? 0);

  return (
    <Link
      href={`/product/${product.slug}`}
      className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-green-50 text-4xl">
          {product.image || "🛒"}
        </div>

        <div className="min-w-0">
          <h3 className="font-bold text-gray-900">{product.nameBn}</h3>
          <p className="mt-1 text-xs text-gray-500">
            প্রতি {product.unit}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-xs text-gray-500">আজকের দাম</p>
        <p className="mt-1 text-2xl font-extrabold text-gray-900">
          {bn(product.today)} টাকা
        </p>
      </div>

      <div className="mt-3 flex items-end justify-between">
        <p className="text-xs text-gray-400">
          গতকালের দাম: {bn(product.yesterday)} টাকা
        </p>

        <span
          className={`rounded-full px-2 py-1 text-xs font-bold ${
            isUp
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-600"
          }`}
        >
          {isUp ? "▲" : "▼"} {bn(change)}%
        </span>
      </div>
    </Link>
  );
}

export default async function HomePage() {
  const products = await getProducts();
  const categories = await getCategories();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const today = new Intl.DateTimeFormat("bn-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  const rising = products
    .filter((p) => p.change?.dir === "up")
    .sort((a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct))
    .slice(0, 6);

  const falling = products
    .filter((p) => p.change?.dir === "down")
    .sort((a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct))
    .slice(0, 6);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-5 md:flex-row md:items-center md:justify-between">
          <div>
            <Link href="/" className="text-3xl font-extrabold text-green-700">
              🛒 বাজার দর
            </Link>

            <p className="mt-1 text-xs text-gray-500">{today}</p>

            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-gray-600">
              {categories.map((category) => {
                const id = category.slug || category.id;

                return (
                  <Link
                    key={id}
                    href={`/category/${id}`}
                    className="transition hover:text-green-700"
                  >
                    {category.icon || category.categoryIcon || "•"}{" "}
                    {category.nameBn || category.name || category.nameEn}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* User Dropdown */}
          <div className="shrink-0">
            {session ? (
              <details className="group relative">
                <summary className="flex cursor-pointer list-none items-center gap-2 rounded-lg border border-gray-200 px-4 py-3 font-semibold text-gray-800 hover:bg-gray-50">
                  {session.user.name}
                  <span className="text-gray-500">⌄</span>
                </summary>

                <div className="absolute right-0 z-30 mt-2 w-48 rounded-xl border border-gray-100 bg-white p-3 shadow-lg">
                  <Link
                    href="/profile"
                    className="block rounded-lg px-3 py-2 text-sm hover:bg-green-50"
                  >
                    আমার প্রোফাইল
                  </Link>
                  <div className="mt-2 border-t border-gray-100 pt-2">
                    <SignOutButton />
                  </div>
                </div>
              </details>
            ) : (
              <div className="flex gap-2">
                <Link
                  href="/signin"
                  className="rounded-lg border border-green-700 px-4 py-2 text-sm font-semibold text-green-700"
                >
                  সাইন ইন
                </Link>
                <Link
                  href="/signup"
                  className="rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white"
                >
                  সাইন আপ
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Price Ticker */}
      <div className="overflow-hidden border-y border-black bg-white py-3">
        <div className="price-ticker flex w-max items-center gap-10">
          {[...products, ...products].map((product, index) => (
            <span
              key={`${product.id}-${index}`}
              className="whitespace-nowrap text-sm font-semibold text-gray-800"
            >
              {product.image || "🛒"} {product.nameBn} — {bn(product.today)} টাকা
              {" "}
              {product.change?.dir === "up" ? (
                <span className="text-green-700">
                  ▲ {bn(Math.abs(product.change.pct))}%
                </span>
              ) : product.change?.dir === "down" ? (
                <span className="text-red-600">
                  ▼ {bn(Math.abs(product.change.pct))}%
                </span>
              ) : (
                <span className="text-gray-500">— ০.০%</span>
              )}
            </span>
          ))}
        </div>
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-5 py-8 md:py-12">
        <div className="grid items-center gap-8 rounded-3xl border border-gray-100 bg-white p-7 shadow-sm md:grid-cols-2 md:p-12">
          <div>
            <p className="inline-block rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
              আপনার প্রতিদিনের বাজার সঙ্গী · {today}
            </p>

            <h1 className="mt-6 text-4xl font-extrabold leading-tight text-gray-900 md:text-5xl">
              আজকের বাজারের
              <br />
              <span className="text-green-700">দাম এক নজরে</span>
            </h1>

            <p className="mt-5 max-w-lg leading-7 text-gray-500">
              নিত্যপ্রয়োজনীয় পণ্যের প্রতিদিনের দাম জানুন, বাজারের তুলনা করুন
              এবং সাশ্রয়ী কেনাকাটার সিদ্ধান্ত নিন।
            </p>

            <a
              href="#সব-পণ্য"
              className="mt-7 inline-block rounded-xl bg-green-700 px-7 py-3 font-bold text-white transition hover:bg-green-800"
            >
              সব পণ্য দেখুন →
            </a>
          </div>

          <div className="flex justify-center">
            <Image
              src="/bazar-hero.png"
              alt="বাজারের পণ্য"
              width={550}
              height={400}
              priority
              className="h-auto w-full max-w-lg object-contain"
            />
          </div>
        </div>
      </section>

      {/* Rising Products */}
      <section className="mx-auto max-w-7xl px-5 py-6">
        <h2 className="text-2xl font-extrabold text-gray-900">
          আজ দাম বেড়েছে <span className="text-green-700">▲</span>
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rising.map((product) => (
            <PriceCard key={product.id} product={product} type="up" />
          ))}
        </div>
      </section>

      {/* Falling Products */}
      <section className="mx-auto max-w-7xl px-5 py-8">
        <h2 className="text-2xl font-extrabold text-gray-900">
          আজ দাম কমেছে <span className="text-red-600">▼</span>
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {falling.map((product) => (
            <PriceCard key={product.id} product={product} type="down" />
          ))}
        </div>
      </section>

      {/* All Products */}
      <ProductSection products={products} categories={categories} />

      {/* Footer */}
      <footer className="mt-16 border-t border-gray-200 bg-white px-5 py-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <p className="font-semibold text-gray-800">
            বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
          </p>
          <p className="text-sm text-gray-500 sm:text-right">
            সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
          </p>
        </div>
      </footer>
    </main>
  );
}
