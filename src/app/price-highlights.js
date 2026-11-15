
export default function PriceHighlights({ products = [] }) {
  const increasedProducts = products
    .filter((product) => product.change?.dir === "up")
    .slice(0, 6);

  if (!increasedProducts.length) return null;

  return (
    <section className="mx-auto max-w-7xl px-5 py-7">
      {/* Section Heading */}
      <div className="mb-5 flex items-center gap-2">
        <span className="text-red-600">▲</span>
        <h2 className="text-xl font-extrabold text-[#202820]">
          আজ দাম বেড়েছে
        </h2>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {increasedProducts.map((product) => (
          <article
            key={product.id}
            className="rounded-2xl border border-green-100 bg-[#f9fdf9] p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              {/* Product Info */}
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-3xl">
                  {product.image || product.categoryIcon || "🛒"}
                </div>

                <div>
                  <h3 className="font-bold text-gray-800">
                    {product.nameBn}
                  </h3>

                  <p className="mt-1 text-xs text-gray-500">
                    প্রতি {product.unit}
                  </p>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="mt-5 flex items-end justify-between">
              <div>
                <p className="text-xs text-gray-500">
                  আজকের বাজার দর
                </p>

                <p className="mt-1 text-xl font-extrabold text-gray-900">
                  ৳{product.today}
                  <span className="ml-1 text-xs font-medium text-gray-500">
                    টাকা
                  </span>
                </p>
              </div>

              <span className="rounded-full bg-red-50 px-3 py-1.5 text-xs font-bold text-red-600">
                ▲ {product.change?.pct}%
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
