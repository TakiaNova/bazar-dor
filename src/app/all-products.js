
function ProductCard({ product }) {
  const direction = product.change?.dir;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-center gap-3">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-3xl">
          {product.categoryIcon || product.image || "🛒"}
        </div>

        <div>
          <h3 className="font-bold text-gray-900">
            {product.nameBn}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            প্রতি {product.unit}
          </p>
        </div>
      </div>

      <div className="mt-5 border-t border-gray-100 pt-4">
        <p className="text-sm text-gray-500">আজকের দাম</p>

        <div className="mt-1 flex items-center justify-between gap-2">
          <p className="text-2xl font-extrabold text-gray-900">
            ৳{product.today}
          </p>

          {product.change?.pct != null && (
            <span
              className={`rounded-full px-3 py-1 text-sm font-semibold ${
                direction === "up"
                  ? "bg-red-50 text-red-600"
                  : direction === "down"
                  ? "bg-green-50 text-green-700"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {direction === "up"
                ? "▲"
                : direction === "down"
                ? "▼"
                : "●"}{" "}
              {product.change.pct}%
            </span>
          )}
        </div>

        <p className="mt-2 text-xs text-gray-500">
          গতকালের দাম: ৳{product.yesterday}
        </p>
      </div>
    </div>
  );
}

export default function AllProducts({ products }) {
  return (
    <section
      id="products"
      className="mx-auto max-w-7xl px-5 py-12"
    >
      <div className="mb-7">
        <h2 className="text-2xl font-extrabold text-gray-900">
          🛒 সকল পণ্য
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          মোট {products.length}টি পণ্য দেখানো হচ্ছে
        </p>
      </div>

      {products.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product.id || product.slug}
              product={product}
            />
          ))}
        </div>
      ) : (
        <p className="rounded-xl bg-gray-50 p-6 text-center text-gray-500">
          কোনো পণ্য পাওয়া যায়নি।
        </p>
      )}
    </section>
  );
}
