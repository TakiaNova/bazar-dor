
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { connection } from "next/server";

import { getProducts, getCategories } from "@/lib/api";
import PriceTicker from "@/components/PriceTicker";
import UserMenu from "@/components/UserMenu";

async function AuthHeaderContent() {
  await connection();

  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <>
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
                আপনার নিত্যদিনের বাজার
              </p>
            </div>
          </Link>

          <UserMenu />
        </div>

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

      <PriceTicker products={products} />
    </>
  );
}

function AuthHeaderFallback() {
  return (
    <div className="bg-[#f8fcf8]">
      <div className="mx-auto max-w-7xl animate-pulse px-5 py-8">
        <div className="h-10 w-40 rounded-lg bg-green-100" />
        <div className="mt-5 h-8 w-full rounded-lg bg-green-50" />
      </div>
    </div>
  );
}

export default function AuthLayout({ children }) {
  return (
    <main className="min-h-screen bg-[#eef5ef] text-[#202820]">
      <Suspense fallback={<AuthHeaderFallback />}>
        <AuthHeaderContent />
      </Suspense>

      {children}
    </main>
  );
}
