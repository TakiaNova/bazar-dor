
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProducts, getCategories } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function CategoryPage({ params }) {
  const { slug } = await params;

  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  const category = categories.find((item) => item.slug === slug);

  if (!category) {
    notFound();
  }

  const categoryProducts = products.filter(
    (product) => product.category === slug
  );

  return (
    <main className="min-h-screen bg-[#eef5ef] px-5 py-10">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/"
          className="mb-6 inline-block font-semibold text-green-700 hover:underline"
        >
          ← Back to Home
        </Link>

        <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-3xl">{category.icon}</p>
          <h1 className="mt-3 text-2xl font-bold text-gray-900">
            {category.nameBn}
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            এই ক্যাটাগরির মোট {categoryProducts.length}টি পণ্য
          </p>
        </div>

        {categoryProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categoryProducts.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                className="rounded-2xl bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-green-50 text-4xl">
                    {product.image || "🛒"}
                  </div>

                  <div>
                    <h2 className="font-bold text-gray-900">
                      {product.nameBn}
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      প্রতি {product.unit}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                  <span className="text-sm text-gray-500">
                    আজকের দাম
                  </span>
                  <span className="text-xl font-bold text-green-700">
                    ৳{product.today}
                  </span>
                </div>

                <p className="mt-3 text-right text-sm font-semibold text-green-700">
                  বিস্তারিত দেখুন →
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl bg-white p-10 text-center">
            <p className="text-4xl">🛒</p>
            <h2 className="mt-4 text-lg font-bold text-gray-800">
              এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি
            </h2>
            <Link
              href="/"
              className="mt-5 inline-block rounded-lg bg-green-700 px-5 py-3 font-semibold text-white"
            >
              হোমপেজে ফিরে যান
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
