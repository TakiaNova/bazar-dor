
export default function PriceTicker({ products = [] }) {
  if (!products.length) return null;

  const tickerItems = [...products, ...products];
  const toBanglaNumber = (number) => {
  return String(number).replace(/[0-9]/g, (digit) =>
    "০১২৩৪৫৬৭৮৯"[Number(digit)]
  );
};

  return (
    <div className="overflow-hidden border-y border-green-100 bg-green-50">
      <div className="flex items-center">
        

        <div className="overflow-hidden">
          <div className="price-ticker flex w-max items-center gap-10 whitespace-nowrap px-6">
            {tickerItems.map((product, index) => (
              <div
                key={`${product.id}-${index}`}
                className="flex items-center gap-2 py-3 text-sm"
              >
                <span>{product.image}</span>
                <span className="font-semibold text-gray-700">
                  {product.nameBn}
                </span>
                <span className="font-bold text-gray-700">
                  {toBanglaNumber(product.today)} টাকা/কেজি
                </span>

                <span
                  className={
                    product.change?.dir === "up"
                      ? "font-semibold text-red-500"
                      : product.change?.dir === "down"
                        ? "font-semibold text-green-600"
                        : "text-gray-400"
                  }
                >
                  {product.change?.dir === "up"
                    ? `▲ ${toBanglaNumber(product.change?.pct)}%%`
                    : product.change?.dir === "down"
                      ? `▼ ${toBanglaNumber(product.change?.pct)}%%`
                      : "—"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
