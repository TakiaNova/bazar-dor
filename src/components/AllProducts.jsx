
function toBanglaNumber(value) {
  return String(value ?? "").replace(/[0-9]/g, (digit) =>
    "০১২৩৪৫৬৭৮৯"[Number(digit)]
  );
}

function ProductCard({ product }) {
  const direction = product.change?.dir;

  return (
    <article className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-md">
      {/* Product Image and Name */}
      <div className="flex items-center gap-3">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-[#f1f7f0] text-4xl">
          {product.image || product.categoryIcon || "🛒"}
        </div>

        <div className="min-w-0">
          <h3 className="font-bold text-gray-800">
            {product.nameBn}
          </h3>

          <p className="mt-1 text-xs text-gray-500">
            {product.unit === "kg"
              ? "প্রতি কেজি"
              : product.unit === "liter"
                ? "প্রতি লিটার"
                : product.unit === "piece"
                  ? "প্রতি পিস"
                  : `প্রতি ${product.unit || "একক"}`}
          </p>
        </div>
      </div>

      {/* Price and Percentage */}
      <div className="mt-4 flex items-end justify-between border-t border-gray-100 pt-3">
        <div>
          <p className="text-xs text-gray-500">
            আজকের দাম
          </p>

          <p className="mt-1 text-xl font-extrabold text-gray-900">
        {toBanglaNumber(product.today)} টাকা
          </p>
        </div>

        <div className="flex flex-col items-end gap-1 pb-1">
          {product.change?.pct != null && (
            <span
              className={`text-sm font-bold ${
                direction === "up"
                  ? "text-red-600"
                  : direction === "down"
                    ? "text-green-600"
                    : "text-gray-500"
              }`}
            >
              {direction === "up"
                ? "▲"
                : direction === "down"
                  ? "▼"
                  : ""}
              {" "}{toBanglaNumber(product.change.pct)}%
            </span>
          )}

          {product.rating != null && (
            <span className="text-sm text-gray-600">
              <span className="text-yellow-500">★</span>{" "}
              {toBanglaNumber(product.rating)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

export default function AllProducts({ products = [] }) {
  return (
    <section
      id="products"
      className="mx-auto max-w-7xl px-5 py-8"
    >
      {/* Section Heading */}
      <div className="mb-6">
        <h2 className="text-xl font-extrabold text-[#202820] md:text-2xl">
          সব পণ্য
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          মোট {toBanglaNumber(products.length)}টি পণ্য দেখানো হচ্ছে
        </p>
      </div>

      {/* Product Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-gray-100 bg-white py-12 text-center">
          <p className="text-gray-500">
            কোনো পণ্য পাওয়া যায়নি।
          </p>
        </div>
      )}
    </section>
  );
}
