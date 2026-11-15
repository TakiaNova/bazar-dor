
function toBanglaNumber(value) {
  return String(value ?? "").replace(/[0-9]/g, (digit) =>
    "০১২৩৪৫৬৭৮৯"[Number(digit)]
  );
}

function ProductCard({ product }) {
  const rating = product.rating;
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

      {/* Price Information */}
      <div className="mt-4 border-t border-gray-100 pt-3">
        <p className="text-xs text-gray-500">
          আজকের দাম
        </p>
        <p className="mt-1 text-xl font-extrabold text-gray-900">
        {toBanglaNumber(product.today)} টাকা
        </p>
      </div>
  {/* Right: Percentage and Rating */}
  <div className="flex flex-col items-end gap-1 pb-1">
    {product.change?.pct != null && (
      <span
        className={`text-sm font-bold ${
          product.change.dir === "up"
            ? "text-red-600"
            : "text-green-600"
        }`}
      >
        {product.change.dir === "up" ? "▲" : "▼"}{" "}
        {toBanglaNumber(product.change.pct)}%
      </span>
    )}
    {product.rating != null && (
      <span className="text-sm text-gray-600">
        <span className="text-yellow-500">★</span>{" "}
        {toBanglaNumber(product.rating)}
      </span>
    )}
  </div>
    </article>
  );
}

function ProductSection({ title, products, direction }) {
  const filteredProducts = products
    .filter((product) => product.change?.dir === direction)
    .slice(0, 6);

  if (filteredProducts.length === 0) return null;

  return (
    <section className="mb-10">
      <h2 className="mb-5 text-xl font-extrabold text-[#202820] md:text-2xl">
        {title}
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default function PriceHighlights({ products = [] }) {
  return (
    <div className="mx-auto max-w-7xl px-5 py-8">
      <ProductSection
        title="আজ দাম বেড়েছে"
        products={products}
        direction="up"
      />

      <ProductSection
        title="আজ দাম কমেছে"
        products={products}
        direction="down"
      />
    </div>
  );
}
