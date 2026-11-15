
export default function PriceTicker({ products = [] }) {
  if (!products.length) return null;

  const tickerItems = [...products, ...products];

  return (
    <div className="w-full overflow-hidden border-b border-green-100 bg-[#f9fcf9]">
      <div className="flex items-center">
        {/* Ticker Label */}
        <div className="z-10 shrink-0 border-r border-green-100 bg-[#eef5ef] px-4 py-3 text-xs font-bold text-green-800">
          বাজার দর
        </div>

        {/* Moving Prices */}
        <div className="min-w-0 flex-1 overflow-hidden">
          <div className="price-ticker flex w-max items-center">
            {tickerItems.map((product, index) => (
              <div
                key={`${product.id}-${index}`}
                className="flex shrink-0 items-center gap-2 border-r border-green-100 px-5 py-3 text-xs"
              >
                <span>{product.categoryIcon || product.image}</span>

                <span className="font-semibold text-gray-700">
                  {product.nameBn}
                </span>

                <span className="font-bold text-gray-800">
                  ৳{product.today}/{product.unit}
                </span>

                {product.change?.dir === "up" ? (
                  <span className="font-bold text-red-600">
                    ▲ {product.change.pct}%
                  </span>
                ) : product.change?.dir === "down" ? (
                  <span className="font-bold text-green-700">
                    ▼ {product.change.pct}%
                  </span>
                ) : (
                  <span className="font-semibold text-gray-500">
                    — ০.০%
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
