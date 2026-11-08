
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProducts } from "@/lib/api";
export const instant = false;

export default async function ProductDetailsPage({ params }) {
  const { slug } = await params;
  const products = await getProducts();

  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50 px-5 py-10">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/"
          className="mb-8 inline-block font-semibold text-green-700 hover:underline"
        >
          ← Back to Home
        </Link>

        <div className="rounded-2xl bg-white p-6 shadow-md sm:p-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="flex h-32 w-32 items-center justify-center rounded-2xl bg-green-50 text-7xl">
              {product.image || "🛒"}
            </div>

            <div>
              <p className="text-sm font-medium text-green-700">
                {product.categoryIcon} {product.categoryNameBn}
              </p>

              <h1 className="mt-2 text-3xl font-bold text-gray-900">
                {product.nameBn}
              </h1>

              <p className="mt-2 text-gray-500">
                Unit: {product.unit}
              </p>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-green-50 p-5">
              <p className="text-sm text-gray-500">Today's Price</p>
              <p className="mt-2 text-2xl font-bold text-green-700">
                ৳{product.today}
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-5">
              <p className="text-sm text-gray-500">Yesterday's Price</p>
              <p className="mt-2 text-2xl font-bold text-gray-800">
                ৳{product.yesterday}
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-5">
              <p className="text-sm text-gray-500">Last Week's Price</p>
              <p className="mt-2 text-2xl font-bold text-gray-800">
                ৳{product.lastWeek}
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-gray-100 p-5">
            <h2 className="text-lg font-bold text-gray-900">
              Price Change
            </h2>

            {product.change?.dir === "up" ? (
              <p className="mt-3 font-semibold text-red-600">
                ↑ Price increased by {product.change.pct}%
              </p>
            ) : product.change?.dir === "down" ? (
              <p className="mt-3 font-semibold text-green-600">
                ↓ Price decreased by {Math.abs(product.change.pct)}%
              </p>
            ) : (
              <p className="mt-3 font-semibold text-gray-600">
                → No price change
              </p>
            )}
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Market Price Comparison
            </h2>

            {product.markets?.length > 0 ? (
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-3">Market</th>
                      <th className="p-3">Division</th>
                      <th className="p-3">Minimum</th>
                      <th className="p-3">Maximum</th>
                    </tr>
                  </thead>

                  <tbody>
                    {product.markets.map((market, index) => (
                      <tr
                        key={`${market.market}-${index}`}
                        className="border-b border-gray-100"
                      >
                        <td className="p-3">{market.market}</td>
                        <td className="p-3">{market.division}</td>
                        <td className="p-3 text-green-700">
                          ৳{market.min}
                        </td>
                        <td className="p-3 text-red-600">
                          ৳{market.max}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="mt-3 text-gray-500">
                No market comparison available.
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
